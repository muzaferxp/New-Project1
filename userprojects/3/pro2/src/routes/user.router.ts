import express, { Response, Request } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/error.util";
import UserController from "../controllers/user.controller";
import { bodyValidator } from "../middlewares/body-validator.middleware";
import {
  userUpdateValidationSchema,
  userValidationSchema,
} from "../validations/user.validation";
import { authorizeUser } from "../middlewares/auth.middleware";
import { Role } from "../enums";

const router = express.Router();


router
  .route("/")
  .get(
    // authorizeUser(),
    catchAsync(async (req: Request, res: Response) => {
      const response = await new UserController(req).getUsers(
        req.query.searchTerm as string,
        req.query.ulbId as string,
        req.query.role as any,
        Boolean(req.query.isActive)
      );
      res.send(response);
    })
  )
  .post(
    // authorizeUser([Role.EX, Role.CCS]),
    bodyValidator(userValidationSchema),
    catchAsync(async (req: Request, res: Response) => {

      const response = await new UserController(req).createUser(req.body);
      res.status(httpStatus.CREATED).send(response);
    })
  );

router
  .route("/:id")
  .get(
    authorizeUser(),
    catchAsync(async (req: Request, res: Response) => {
      const response = await new UserController(req).getUser(req.params.id);
      res.send(response);
    })
  )
  .put(
    authorizeUser([Role.PARENT]),
    bodyValidator(userUpdateValidationSchema),
    catchAsync(async (req: Request, res: Response) => {
      const response = await new UserController(req).updateUser(
        req.params.id,
        req.body
      );
      res.send(response);
    })
  )
  .delete(
    authorizeUser([Role.PARENT]),
    catchAsync(async (req: Request, res: Response) => {
      const response = await new UserController(req).deleteUser(req.params.id);
      res.send(response);
    })
  );

    
export default router;
