import express, { Response, Request } from "express";
import httpStatus from "http-status";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { bodyValidator } from "../middlewares/body-validator.middleware";
import {
  sdssfsUpdateValidationSchema,
  sdssfsValidationSchema,
} from "../validations/sdssfs.validation";
import { authorizeUser } from "../middlewares/auth.middleware";
import SdssfsController from "../controllers/sdssfs.controller";
import { Role } from "../enums";
import {
  fileUpload,
} from "../middlewares/file-upload.middleware";
import { ERROR_MESSAGE } from "../constants";

//EXTRA_IMPORTS


const router = express.Router();


router
  .route("/")
  
  .get(
    authorizeUser([]),

    catchAsync(async (req: Request, res: Response) => {
      const response = await new SdssfsController(req).getSdssfss();
      res.send(response);
    })
  )

  
  
.post(
    authorizeUser([]),

    bodyValidator(sdssfsValidationSchema),
    catchAsync(async (req: Request, res: Response) => {
      let body = req.body;
      
      const response = await new SdssfsController(req).createSdssfs(body);
      res.status(httpStatus.CREATED).send(response);
    })
  );


router
  .route("/:id")
  
  .get(
    authorizeUser([]),

    catchAsync(async (req: Request, res: Response) => {
      const response = await new SdssfsController(req).getSdssfs(req.params.id);
      res.send(response);
    })
  )

  
.put(
    authorizeUser([]),

    bodyValidator(sdssfsUpdateValidationSchema),
    catchAsync(async (req: Request, res: Response) => {
      const response = await new SdssfsController(req).updateSdssfs(
        req.params.id,
        req.body
      );
      res.send(response);
    })
  )

  
.delete(
    authorizeUser([]),

    catchAsync(async (req: Request, res: Response) => {
      const response = await new SdssfsController(req).deleteSdssfs(req.params.id);
      res.send(response);
    })
  );



//CUSTOM_ROUTE

export default router;
