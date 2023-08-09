import { getConnection, getRepository, In } from "typeorm";
import { unscoped } from "typeorm-global-scopes";
import { ERROR_MESSAGE } from "../constants/index";
import {  NotFoundException } from "../utils/error.util";
import { ISdssfsPayload } from "../dto/sdssfs.dto";
import { Sdssfs } from "../models/sdssfs.model";
import { User } from "../models";

//EXTRA_IMPORTS



/**
 *
 * @returns Array of Sdssfs
 */
export const getSdssfss = async (
): Promise<Array<Sdssfs>> => {

  let sdssfsRepository = getRepository(Sdssfs);
  const sdssfss =  await sdssfsRepository.find({})
   return sdssfss
};



/**
 *
 * @param payload ISdssfsPayload
 * @param reqUser User
 * @returns Sdssfs
 */
export const createSdssfs = async (
  payload: ISdssfsPayload,
  reqUser: User 
): Promise<Sdssfs>=> {

  let sdssfsRepository =  getRepository(Sdssfs);

  //MODEL_CONVERSION

  let sdssfs  = new Sdssfs()
  let newSdssfs = await sdssfsRepository.save({
    ...sdssfs,
    ...payload,
    createdBy : reqUser?.id,
    updatedBy : reqUser?.id,
    //MODEL_FIELD
  })

  return newSdssfs
};




/**
 *
 * @param id Sdssfs id
 * @returns Sdssfs
 */
export const getSdssfs = async (id: string): Promise<Sdssfs>=> {

  let sdssfsRepository =  getRepository(Sdssfs);  

  const sdssfs =  await sdssfsRepository.find({id: id})

  if (!sdssfs?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_DATA_FOUND);
  }

   return sdssfs[0]

};



/**
 *
 * @param id user id
 * @param payload ISdssfsPayload
 * @param reqUser User
 * @returns Sdssfs
 */
export const updateSdssfs = async (
  id: string,
  payload: ISdssfsPayload,
  reqUser: User
): Promise<Sdssfs> => {
  const sdssfsRepository = getRepository(Sdssfs);

  const sdssfss = await sdssfsRepository.find({
    id: id,
  });
  if (!sdssfss?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_DATA_FOUND);
  }
  
  return sdssfsRepository.save({
    ...sdssfss[0],
    ...payload,
    updatedBy: reqUser?.id ?? sdssfss[0].updatedBy,
  });
};





/**
 *
 * @param id User id
 * @returns Sdssfs
 */
export const deleteSdssfs = async (id: string, reqUser: User): Promise<Sdssfs> => {
  const sdssfsRepository = getRepository(Sdssfs);
  const sdssfss = await sdssfsRepository.find({
    id: id,
  });

  if (!sdssfss?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_DATA_FOUND);
  }

  return await sdssfsRepository.save({
    ...sdssfss[0],
    isDeleted: false,
    updatedBy : reqUser?.id
  });
};


//CUSTOM_REPOSITORY