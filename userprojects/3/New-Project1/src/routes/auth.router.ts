import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../controllers/auth.controller";
import { catchAsync } from "../utils/error.util";
import { authorizeUser } from "../middlewares/auth.middleware";

const AuthRouter = Router();

AuthRouter.post(
  "/login",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const response = await new AuthController(req).login(req.body);
    res.send(response);
  })
);

AuthRouter.post(
  "/validateUser",
  authorizeUser(),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const response = await new AuthController(req).validateUser();
    res.send(response);
  })
);

AuthRouter.post(
  "/logout",
  authorizeUser(),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const response = await new AuthController(req).logout();
    res.send(response);
  })
);

AuthRouter.post(
  "/refreshToken",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const response = await new AuthController(req).refreshToken(req.body);
    res.send(response);
  })
);

export default AuthRouter;
