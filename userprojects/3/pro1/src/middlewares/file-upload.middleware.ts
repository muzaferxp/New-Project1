import { randomUUID } from "crypto";
import { Request } from "express";
import multer from "multer";
import {

    ERROR_MESSAGE,
  FILE_UPLOAD_PATH,
} from "../constants";

const getExtension = (file: Express.Multer.File): string => {
  const splitArray = file.originalname.split(".");
  return splitArray?.length ? splitArray[splitArray.length - 1] : "";
};


const fileUploadStorage = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    callback: Function
  ) {
    callback(null, FILE_UPLOAD_PATH);
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    callback: Function
  ) {
    const extension = getExtension(file);
    const newFilename = `temp-${Date.now()}.${extension}`;
    callback(null, newFilename);
  },
});

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: Function
  ) => {
    const extension = getExtension(file);
    if (["png", "jpeg", "jpg"].includes(extension)) {
      cb(null, true);
    } else {
      cb(ERROR_MESSAGE.ONLY_IMAGES.replace("extension", extension), false);
    }
  };

export const fileUpload = multer({
    storage: fileUploadStorage,
    fileFilter: fileFilter,
  });