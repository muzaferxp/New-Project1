import express, { Request, Response } from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";
import sdfsRouter from "./sdfs.router";
import sdssfsRouter from "./sdssfs.router";
//ROUTES_IMPORT_FLAG



import { catchAsync } from "../utils/error.util";

const router = express.Router();

router.get(
  "/ping",
  catchAsync(async (_req: Request, res: Response) => {
    const response = "Pong";
    return res.send(response);
  })
);


router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
  router.use("/sdfs", sdfsRouter)
router.use("/sdssfs", sdssfsRouter)
//ROUTES_USE_FLAG

export default router;

