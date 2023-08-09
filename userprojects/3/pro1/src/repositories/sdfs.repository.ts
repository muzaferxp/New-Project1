import { getConnection, getRepository, In } from "typeorm";
import { unscoped } from "typeorm-global-scopes";
import { ERROR_MESSAGE } from "../constants/index";
import {  NotFoundException } from "../utils/error.util";
import { ISdfsPayload } from "../dto/sdfs.dto";
import { Sdfs } from "../models/sdfs.model";
import { User } from "../models";

//EXTRA_IMPORTS



/**
 *
 * @returns Array of Sdfs
 */
export const getSdfss = async (
): Promise<Array<Sdfs>> => {

  let sdfsRepository = getRepository(Sdfs);
  const sdfss =  await sdfsRepository.find({})
   return sdfss
};



/**
 *
 * @param payload ISdfsPayload
 * @param reqUser User
 * @returns Sdfs
 */
export const createSdfs = async (
  payload: ISdfsPayload,
  reqUser: User 
): Promise<Sdfs>=> {

  let sdfsRepository =  getRepository(Sdfs);

  //MODEL_CONVERSION

  let sdfs  = new Sdfs()
  let newSdfs = await sdfsRepository.save({
    ...sdfs,
    ...payload,
    createdBy : reqUser?.id,
    updatedBy : reqUser?.id,
    //MODEL_FIELD
  })

  return newSdfs
};




/**
 *
 * @param id Sdfs id
 * @returns Sdfs
 */
export const getSdfs = async (id: string): Promise<Sdfs>=> {

  let sdfsRepository =  getRepository(Sdfs);  

  const sdfs =  await sdfsRepository.find({id: id})

  if (!sdfs?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_DATA_FOUND);
  }

   return sdfs[0]

};



/**
 *
 * @param id user id
 * @param payload ISdfsPayload
 * @param reqUser User
 * @returns Sdfs
 */
export const updateSdfs = async (
  id: string,
  payload: ISdfsPayload,
  reqUser: User
): Promise<Sdfs> => {
  const sdfsRepository = getRepository(Sdfs);

  const sdfss = await sdfsRepository.find({
    id: id,
  });
  if (!sdfss?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_DATA_FOUND);
  }
  
  return sdfsRepository.save({
    ...sdfss[0],
    ...payload,
    updatedBy: reqUser?.id ?? sdfss[0].updatedBy,
  });
};





/**
 *
 * @param id User id
 * @returns Sdfs
 */
export const deleteSdfs = async (id: string, reqUser: User): Promise<Sdfs> => {
  const sdfsRepository = getRepository(Sdfs);
  const sdfss = await sdfsRepository.find({
    id: id,
  });

  if (!sdfss?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_DATA_FOUND);
  }

  return await sdfsRepository.save({
    ...sdfss[0],
    isDeleted: false,
    updatedBy : reqUser?.id
  });
};


//CUSTOM_REPOSITORY