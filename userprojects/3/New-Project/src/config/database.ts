import { ConnectionOptions } from "typeorm";

const basePath = process.env.NODE_ENV === "production" ? "build" : "src";
const extension = process.env.NODE_ENV === "production" ? "js" : "ts";

const dbConfig: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST ,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  entities: [`${basePath}/models/*.${extension}`],
  migrations: [`${basePath}/database/migrations/*.${extension}`],
  subscribers: [`${basePath}/subscribers/*.${extension}`],
  synchronize: process.env.DB_SYNCHRONIZE === "ENABLED",
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/subscribers",
  },
  logging: Boolean(process.env.ENABLE_QUERY_LOGGING) || false,
  logger: (process.env.QUERY_LOG_OUTPUT || "file") as any,
  timezone: "+00:00",
  cache: {
    duration: 120000, // 2 minutes,
    ignoreErrors: true,
    type: "redis",
    options: {
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
      legacyMode: true,
    },
  },
};

export const mongodbConfig = {
  level: "http",
  db: process.env.MONGO_DB_URL || "",
  collection: `${process.env.PROJECT_LOGS_COLLECTION_NAME}` || `logs`,
  metaKey: "details",
  options: {
    useUnifiedTopology: true,
  },
  // capped: true,
  // cappedSize: 50000000, //50MB
};

export const performanceMongodbConfig = {
  level: "http",
  db: process.env.MONGO_DB_URL || "",
  collection: `performanceLogs`,
  metaKey: "details",
  options: {
    useUnifiedTopology: true,
  },
  capped: true,
  cappedSize: 50000000, //50MB
};

export default dbConfig;
