import Joi from "joi";
import { ERROR_MESSAGE, regex } from "../constants";

export const sdssfsValidationSchema = Joi.object({

  subscrisption_name : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.SUBSCRISPTION_NAME_REQUIRED,
                    "string.empty": ERROR_MESSAGE.SUBSCRISPTION_NAME_REQUIRED,
                    "string.base": ERROR_MESSAGE.SUBSCRISPTION_NAME_REQUIRED,
                }),desscription : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.DESSCRIPTION_REQUIRED,
                    "string.empty": ERROR_MESSAGE.DESSCRIPTION_REQUIRED,
                    "string.base": ERROR_MESSAGE.DESSCRIPTION_REQUIRED,
                }),
 
  }).unknown();

export const sdssfsUpdateValidationSchema = Joi.object({
    

  subscrisption_name : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.SUBSCRISPTION_NAME_REQUIRED,
                    "string.empty": ERROR_MESSAGE.SUBSCRISPTION_NAME_REQUIRED,
                    "string.base": ERROR_MESSAGE.SUBSCRISPTION_NAME_REQUIRED,
                }),desscription : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.DESSCRIPTION_REQUIRED,
                    "string.empty": ERROR_MESSAGE.DESSCRIPTION_REQUIRED,
                    "string.base": ERROR_MESSAGE.DESSCRIPTION_REQUIRED,
                }),

});
