import "module-alias/register";
import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { createConnection } from "typeorm";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import bodyParser from "body-parser";
import { patchSelectQueryBuilder } from "typeorm-global-scopes";
const swStats = require("swagger-stats");
const responseTime = require("response-time");

import Router from "./routes";
import dbConfig from "./config/database";
import sslConfig from "./config/ssl-config";
import {
  errorLogger,
  errorResponder,
  failSafeHandler,
} from "./middlewares/exception.middleware";
import loggerMiddleware from "./middlewares/logger.middleware";
import configCronJobs from "./cron";
import cluster from "cluster";
import { authorizeSocketUser } from "./middlewares/auth.middleware";
import { cleanupRequestMiddleWare } from "./middlewares/body-validator.middleware";
// import logger from "./utils/logger.util";
import { getIndianCurrentTime } from "./utils/dateTimeHandlers";

process.env.TZ = "UTC";

const http = require("http");
const https = require("https");

const PORT = process.argv[2] || process.env.PORT || 3000;

// enables the default scope for typeorm entities
patchSelectQueryBuilder();

const app: Application = express();

configCronJobs();

/**
 * the ivr request is dirty with \n characters which raises
 * exception inside express parsers hence doing below two
 * middlewares for cleaning it.
 */
app.use("/ivr", bodyParser.text({ type: "*/*" }));
app.use("/ivr", cleanupRequestMiddleWare);

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/uploads", express.static("uploads/"));

if (process.env.ENABLE_SWAGGER === "TRUE") {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
}

if (process.env.ENABLE_MONITORING === "TRUE") {
  app.use(
    swStats.getMiddleware({
      // swaggerSpec: "/swagger.json",
      // swaggerSpec: require("/swagger.json"),
      onAuthenticate: function (
        req: Request,
        username: string,
        password: string
      ) {
        // simple check for username and password
        return (
          username ===
            `${process.env.SWAGGER_STATS_USERNAME || "swagger-stats"}` &&
          password ===
            `${process.env.SWAGGER_STATS_PASSWORD || "swagger-stats"}`
        );
      },
    })
  );
}

// app.use(
//   responseTime((req: Request, _res: Response, time: string) => {
//     if (req.baseUrl && req.originalUrl)
//       logger.performance(req.originalUrl?.split("?")[0], {
//         userRole: req.user?.role,
//         userEmail: req.user?.email,
//         method: req.method,
//         url: req.originalUrl,
//         timeInMs: time,
//         host: req.headers.host,
//         xRealIp: req.headers["x-real-ip"],
//         userAgent: req.headers["user-agent"],
//       });
//   })
// );

app.use(loggerMiddleware);

app.use(Router);

app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);
let server = http.Server(app);
// if (process.env.NODE_ENV === "production" && process.env.SSL_ENABLED === "1")
//   server = https.createServer(sslConfig, app);

// let socketConfig: any = {
//   cors: {
//     origin: "*",
//   },
//   allowEIO3: true,
//   pingTimeout: 60000,
// };
// if (process.env.SSL_ENABLED === "1") {
//   socketConfig = {
//     ...socketConfig,
//     secure: true,
//   };
// }
// let io = require("socket.io")(server, socketConfig);
var io = require("socket.io")(server, { cors: { origin: "*" } });

io.use(authorizeSocketUser);

createConnection(dbConfig)
  .then(async (_connection) => {
    if (cluster.isPrimary && process.env.ENABLE_CLUSTER_FORKING === "ENABLED") {
      // Fork workers.
      for (var i = 0; i < 2; i++) {
        cluster.fork();
      }
    } else {
      server.listen(PORT, () => {
        console.log(
          "Server is running on port at -",
          PORT,
          getIndianCurrentTime().toLocaleString()
        );
      });
    }
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
