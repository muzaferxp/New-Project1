import Joi from "joi";
import { ERROR_MESSAGE, regex } from "../constants";

export const userValidationSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "any.required": ERROR_MESSAGE.FIRST_NAME_REQUIRED,
    "string.empty": ERROR_MESSAGE.FIRST_NAME_REQUIRED,
    "string.base": ERROR_MESSAGE.FIRST_NAME_REQUIRED,
  }),
  lastName: Joi.string()
    .messages({
      "string.base": ERROR_MESSAGE.LAST_NAME_REQUIRED,
    })
    .trim(),
  password: Joi.string().min(8).max(64).required().messages({
    "any.required": ERROR_MESSAGE.PASSWORD_REQUIRED,
    "string.pattern.base": ERROR_MESSAGE.INVALID_PASSWORD_PATTERN,
  }),
  email: Joi.string().required().trim().pattern(regex.EMAIL_REGEX).messages({
    "any.required": ERROR_MESSAGE.EMAIL_REQUIRED,
    "string.empty": ERROR_MESSAGE.EMAIL_REQUIRED,
    "string.pattern.base": ERROR_MESSAGE.INVALID_EMAIL_PATTERN,
  }),
  phoneNumber: Joi.string().required().pattern(regex.PHONENO_REGEX).messages({
    "any.required": ERROR_MESSAGE.PHONENO_REQUIRED,
    "string.empty": ERROR_MESSAGE.PHONENO_REQUIRED,
    "string.pattern.base": ERROR_MESSAGE.INVALID_PHONENO_PATTERN,
    "string.base": ERROR_MESSAGE.INVALID_PHONENO_PATTERN,
  }),
  role: Joi.string().required().messages({
    "any.required": ERROR_MESSAGE.INVALID_ROLE,
    "string.empty": ERROR_MESSAGE.INVALID_ROLE,
    "any.allow": ERROR_MESSAGE.INVALID_ROLE,
  }),
  
  username: Joi.string().default((parent) => parent.email),


  }).unknown();

export const userUpdateValidationSchema = Joi.object({
  firstName: Joi.string().optional().trim().messages({
    "any.required": ERROR_MESSAGE.FIRST_NAME_REQUIRED,
    "string.empty": ERROR_MESSAGE.FIRST_NAME_REQUIRED,
    "string.base": ERROR_MESSAGE.FIRST_NAME_REQUIRED,
  }),
  lastName: Joi.string()
    .messages({
      "string.base": ERROR_MESSAGE.FIRST_NAME_REQUIRED,
    })
    .trim(),
  password: Joi.string().optional().messages({
    "any.required": ERROR_MESSAGE.PASSWORD_REQUIRED,
    "string.pattern.base": ERROR_MESSAGE.INVALID_PASSWORD_PATTERN,
  }),
  email: Joi.string().optional().trim().pattern(regex.EMAIL_REGEX).messages({
    "any.required": ERROR_MESSAGE.EMAIL_REQUIRED,
    "string.empty": ERROR_MESSAGE.EMAIL_REQUIRED,
    "string.pattern.base": ERROR_MESSAGE.INVALID_EMAIL_PATTERN,
  }),
  phoneNumber: Joi.string()
    .allow(null, "")
    .optional()
    .pattern(regex.PHONENO_REGEX)
    .messages({
      "any.required": ERROR_MESSAGE.PHONENO_REQUIRED,
      "string.empty": ERROR_MESSAGE.PHONENO_REQUIRED,
      "string.pattern.base": ERROR_MESSAGE.INVALID_PHONENO_PATTERN,
      "string.base": ERROR_MESSAGE.INVALID_PHONENO_PATTERN,
    }),
  role: Joi.string().optional().messages({
    "any.required": ERROR_MESSAGE.PHONENO_REQUIRED,
    "string.empty": ERROR_MESSAGE.PHONENO_REQUIRED,
    "any.allow": ERROR_MESSAGE.INVALID_ROLE,
  }),
 
  username: Joi.string().default((parent) => parent.email),
  }).unknown();


