
export * from "./global-config.constants";

export const HASH_SALT_ROUNDS = 10;

export const ERROR_MESSAGE = {
  SUBSCRIPTION_NAME_REQUIRED : "Subscription_Name is required",
DESCRIPTION_REQUIRED : "Description is required",
SUBSCRISPTION_NAME_REQUIRED : "Subscrisption_Name is required",
DESSCRIPTION_REQUIRED : "Desscription is required",
//ERROR_MESSAGE_FLAG
  USERNAME_EXISTS: "Username already exists",
  PHONE_EXISTS: "Phone no already exists",
  EMAIL_EXISTS: "Email already exists",
  INVALID_CREDENTIALS: "Username/password is incorrect",
  SERVER_ERROR: "Something went wrong",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
  FORBIDDEN_ACCESS: "User not permitted",
  NO_USER_FOUND: "No user found",
  EMAIL_PHONE_MANDATORY: "Email and phone number are mandatory",
  BAD_REQUEST: "Bad request",
  FIRST_NAME_REQUIRED: "First name is required",

  FIRST_NAME_SRING: "First name must be a string",

  LAST_NAME_REQUIRED: "Last name is required",

  LAST_NAME_SRING: "Last name must be a string",

  PASSWORD_REQUIRED: "Password is required",

  ID_REQUIRED: "Id is required",

  INVALID_PASSWORD_PATTERN: "Password must have at least 8 characters length with 1 uppercase, 1 lowercase, 1 numeric and 1 special character",

  EMAIL_REQUIRED: "Email id is required",

  INVALID_EMAIL_PATTERN: "Invalid email id",

  PHONENO_REQUIRED: "Phone number is required",

  INVALID_PHONENO_PATTERN: "Phone number is invalid",

  ROLE_REQUIRED: "Role is required",

  INVALID_ROLE: "Role is invalid",

  NOT_FOUND: "Not found",

  NO_DATA_FOUND: "No data found",

  ONLY_IMAGES: "Please upload only images, extension not supported",

  NO_DOCUMENTS_SUBMITTED: "No documents submitted",

};

export const RESPONSE_MESSAGE = {
  SDFSS_FETCHED : "Sdfs fetched successfully",
SDFS_CREATED : "Sdfs created successfully",
SDFS_FETCHED : "Sdfs fetched successfully",
SDFS_MODIFIED : "Sdfs modified successfully",
SDFS_DELETED : "Sdfs deleted successfully",
SDSSFSS_FETCHED : "Sdssfs fetched successfully",
SDSSFS_CREATED : "Sdssfs created successfully",
SDSSFS_FETCHED : "Sdssfs fetched successfully",
SDSSFS_MODIFIED : "Sdssfs modified successfully",
SDSSFS_DELETED : "Sdssfs deleted successfully",
//RESPONSE_MESSAGE_FLAG
  SUCCESS : "Success",
  LOGGED_IN: "User logged in successfully",
  LOGGED_OUT: "User logged out successfully",
  USER_VALIDATION_SUCCESS: "User validation successful",
  TOKEN_REFRESH_SUCCESS: "Token refreshed successfully",


  USERS_FETCHED: "User fetched successfully",
  USER_CREATED: "User created successfully",
  USER_FETCHED: "User fetched successfully",
  USER_MODIFIED: "User modified successfully",
  USER_DELETED: "User deleted successfully",
}


export const regex = {
  EMAIL_REGEX:
    /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){1,}@([\w\-]+)((\.[a-zA-Z0-9_-]{2,})+)$/,
  PHONENO_REGEX: /^([+]\d{2})?\d{10}$/,
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#&%$*])[A-Za-z\d!@#&%$*]{8,}$/,
  PINCODE_REGEX: /^[0-9]{6}$/,
};

export const TYPE_ORM_ERROR_CODE = {
  ER_DUP_ENTRY: "ER_DUP_ENTRY",
};


export const FILE_UPLOAD_PATH = "files";
