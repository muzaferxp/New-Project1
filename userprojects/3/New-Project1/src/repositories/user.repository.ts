import { getConnection, getRepository, In } from "typeorm";
import { unscoped } from "typeorm-global-scopes";
import { ERROR_MESSAGE } from "../constants/index";
import {
  IUserPayload,
  IUserUpdatePayload,
} from "../dto/user.dto";
import { User } from "../models";
import { generateHash } from "../utils/auth.util";
import { BadRequestException, NotFoundException } from "../utils/error.util";
import {  Role } from "../enums";


/**
 *
 * @returns Array of User
 */
export const getUsers = async (
  searchTerm?: string,
  ulbId?: string,
  role?: Role,
  isActive?: boolean
): Promise<Array<User>> => {
  let WhereClause = "1=1";
  if (searchTerm)
    WhereClause += ` and (user.firstName like '%${searchTerm}%' or user.lastName like '%${searchTerm}%' or user.phone_number like '%${searchTerm}%' or user.username like '%${searchTerm}%')`;
  if (role) WhereClause += ` and user.role='${role}'`;
  if (isActive) WhereClause += ` and user.is_active=${isActive}`;

  const userRepository = getRepository(unscoped(getConnection(), User));
  
  
  
  let data: any = await userRepository.query(
    `select user.*from user  where ${WhereClause} and user.is_deleted=0`
  );

  data.forEach(function(v: { password: any; }){ delete v.password });

  return data
};

/**
 *
 * @param payload IUserPayload
 * @param reqUser User
 * @returns User
 */
export const createUser = async (
  payload: IUserPayload,
): Promise<User> => {
  const userRepository = getRepository(User);
  await validateUserEntity(payload);

  const user = new User();
  const hashedPassword = await generateHash(payload.password);

  return await userRepository.save({
    ...user,
    ...payload,
    password: hashedPassword,
    createdBy: "test",
    updatedBy: "test",
  });
};

/**
 *
 * @param id User id
 * @returns User
 */
export const getUser = async (id: string): Promise<User> => {
  const userRepository = getRepository(unscoped(getConnection(), User));
  const userResponse = await userRepository.query(
    `select user.*,ulb.name as ulbName, ulb.district as district,fieldAgent.supervisorId AS supervisorId from user left join ulb on ulb.id=user.ulbId LEFT JOIN fieldAgent ON fieldAgent.userId = user.id where user.id='${id}' and user.is_deleted=0`
  );
  return userResponse[0];
};

/**
 *
 * @param id user id
 * @param payload IUserUpdatePayload
 * @param reqUser User
 * @returns User
 */
export const updateUser = async (
  id: string,
  payload: IUserUpdatePayload,
  reqUser: User
): Promise<User> => {
  const userRepository = getRepository(User);

  const users = await getRepository(unscoped(getConnection(), User)).find({
    id: id,
  });
  if (!users?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_USER_FOUND);
  }
  
  if (payload.password) {
    payload.password = await generateHash(payload.password);
  }

  return userRepository.save({
    ...users[0],
    ...payload,
    updatedBy: reqUser?.id ?? users[0].updatedBy,
  });
};

/**
 *
 * @param id User id
 * @returns User
 */
export const deleteUser = async (id: string, reqUser: User): Promise<User> => {
  const userRepository = getRepository(User);
  const users = await getRepository(unscoped(getConnection(), User)).find({
    id: id,
  });

  if (!users?.length) {
    throw new NotFoundException(ERROR_MESSAGE.NO_USER_FOUND);
  }

  return await userRepository.save({
    ...users[0],
    isDeleted: false,
  });
};

/**
 *
 * @param username String
 * @param email string
 * @param phoneNumber string
 * @returns User or null
 */
export const findUser = async (
  username: string,
  email: string,
  phoneNumber: string
): Promise<User | null> => {
  const users = await getRepository(unscoped(getConnection(), User)).find({
    where: [{ username }, { email }, { phoneNumber }],
  });

  if (users?.length) return users[0];
  return null;
};

/**
 *
 * @param username string
 * @returns User or Undefined
 */
export const findUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ username });
};

/**
 *
 * @param payload IUserPayload
 * @returns boolean
 */
const validateUserEntity = async (payload: IUserPayload): Promise<boolean> => {
  if (!payload.email || !payload.phoneNumber)
    throw new Error(ERROR_MESSAGE.EMAIL_PHONE_MANDATORY);
  const duplicateUser = await findUser(
    payload.username,
    payload.email,
    payload.phoneNumber
  );
  if (duplicateUser) {
    let errorMessage = "";
    if (payload.username === duplicateUser.username)
      errorMessage = ERROR_MESSAGE.USERNAME_EXISTS;
    else if (payload.email === duplicateUser.email)
      errorMessage = ERROR_MESSAGE.EMAIL_EXISTS;
    else if (payload.phoneNumber === duplicateUser.phoneNumber)
      errorMessage = ERROR_MESSAGE.PHONE_EXISTS;

    throw new BadRequestException(errorMessage);
  }

  return true;
};

/**
 *
 * @param id string
 * @param fcm string
 * @param reqUser User
 * @returns User
 */
export const updateFCM = async (
  id: string,
  fcm: string = "",
  reqUser: User
): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });
  if (!user) {
    throw new NotFoundException(ERROR_MESSAGE.NO_USER_FOUND);
  }
  const updatedUser = await userRepository.save({
    ...user,
    fcm: fcm,
    updatedBy: reqUser?.id ?? user.updatedBy,
  });
  return updatedUser;
};

