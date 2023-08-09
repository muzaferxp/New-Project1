import Joi, { Schema, ValidationError } from "joi";
import { NextFunction, Request, Response } from "express";
import { BadRequestException, catchAsync } from "../utils/error.util";
// import logger from "../utils/logger.util";

/**
 * 
 * @param schema Defined Validation
 * @returns req.body
 */
export const bodyValidator = (schema: Schema) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const joiSchema = Joi.compile(schema);
      const value = await joiSchema.validateAsync(req.body);
      req.body = value;
    } catch (error) {
      if (error && error instanceof ValidationError) {
        const errorMessage = error.details
          .map((details: any) => details.message)
          .join(", ");

        throw new BadRequestException(errorMessage);
      }
      next(error);
    }
    return next();
  });


  export const cleanupRequestMiddleWare =(req: Request, res: Response, next: NextFunction) =>{
    try{
      if(req.body && req.body.replaceAll)
      req.body = JSON.parse(req.body.replaceAll('\n', ''));
    } catch(e){
      // logger.error("error cleanup-", String(e))
    }
    next();
  }