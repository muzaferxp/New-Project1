import Joi from "joi";
import { ERROR_MESSAGE, regex } from "../constants";

export const sdfsValidationSchema = Joi.object({

  subscription_name : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.SUBSCRIPTION_NAME_REQUIRED,
                    "string.empty": ERROR_MESSAGE.SUBSCRIPTION_NAME_REQUIRED,
                    "string.base": ERROR_MESSAGE.SUBSCRIPTION_NAME_REQUIRED,
                }),description : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.DESCRIPTION_REQUIRED,
                    "string.empty": ERROR_MESSAGE.DESCRIPTION_REQUIRED,
                    "string.base": ERROR_MESSAGE.DESCRIPTION_REQUIRED,
                }),
 
  }).unknown();

export const sdfsUpdateValidationSchema = Joi.object({
    

  subscription_name : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.SUBSCRIPTION_NAME_REQUIRED,
                    "string.empty": ERROR_MESSAGE.SUBSCRIPTION_NAME_REQUIRED,
                    "string.base": ERROR_MESSAGE.SUBSCRIPTION_NAME_REQUIRED,
                }),description : Joi.string().required().trim().messages({
                    "any.required": ERROR_MESSAGE.DESCRIPTION_REQUIRED,
                    "string.empty": ERROR_MESSAGE.DESCRIPTION_REQUIRED,
                    "string.base": ERROR_MESSAGE.DESCRIPTION_REQUIRED,
                }),

});
