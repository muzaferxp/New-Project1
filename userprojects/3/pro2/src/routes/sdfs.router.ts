import express, { Response, Request } from "express";
import httpStatus from "http-status";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { bodyValidator } from "../middlewares/body-validator.middleware";
import {
  sdfsUpdateValidationSchema,
  sdfsValidationSchema,
} from "../validations/sdfs.validation";
import { authorizeUser } from "../middlewares/auth.middleware";
import SdfsController from "../controllers/sdfs.controller";
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
      const response = await new SdfsController(req).getSdfss();
      res.send(response);
    })
  )

  
  
.post(
    authorizeUser([]),

    bodyValidator(sdfsValidationSchema),
    catchAsync(async (req: Request, res: Response) => {
      let body = req.body;
      
      const response = await new SdfsController(req).createSdfs(body);
      res.status(httpStatus.CREATED).send(response);
    })
  );


router
  .route("/:id")
  
  .get(
    authorizeUser([]),

    catchAsync(async (req: Request, res: Response) => {
      const response = await new SdfsController(req).getSdfs(req.params.id);
      res.send(response);
    })
  )

  
.put(
    authorizeUser([]),

    bodyValidator(sdfsUpdateValidationSchema),
    catchAsync(async (req: Request, res: Response) => {
      const response = await new SdfsController(req).updateSdfs(
        req.params.id,
        req.body
      );
      res.send(response);
    })
  )

  
.delete(
    authorizeUser([]),

    catchAsync(async (req: Request, res: Response) => {
      const response = await new SdfsController(req).deleteSdfs(req.params.id);
      res.send(response);
    })
  );



//CUSTOM_ROUTE

export default router;
