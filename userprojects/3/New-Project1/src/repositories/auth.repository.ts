import { randomUUID } from "crypto";
import { getRepository } from "typeorm";
import {
  compareHash,
  generateToken,
  storeUserTokenInCache,
  verifyToken,
} from "../utils/auth.util";
import config from "../config/auth.config";

import { ERROR_MESSAGE } from "../constants";
import { ILoginDto } from "../dto/auth.dto";
import { findUserByUsername, updateFCM } from "./user.repository";
import {
  ServerErrorException,
  UnauthorizedException,
} from "../utils/error.util";
import { User } from "../models";
import { removeFromCache } from "../utils/redis.util";

/**
 *
 * @param loginPayload ILoginDto
 * @returns {user , message}
 */
export const login = async (loginPayload: ILoginDto) => {
  const user = await findUserByUsername(loginPayload.username);
  if (!user || !(await compareHash(loginPayload.password, user.password))) {
    throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
  }
  const tokenUuid = randomUUID();
  const refreshToken = generateToken(
    {
      id: user.id,
      uuid: tokenUuid,
    },
    "refresh"
  );
  const accessToken = generateToken({
    id: user.id,
    role: user.role,
    uuid: tokenUuid,
  });
  storeUserTokenInCache(
    `${user.id}-accessToken-${tokenUuid}`,
    accessToken,
    config.accessTokenExpiryTime
  );
  storeUserTokenInCache(
    `${user.id}-refreshToken-${tokenUuid}`,
    refreshToken,
    config.refreshTokenExpiryTime
  );
  return {
    user: { ...user, token: accessToken, accessToken, refreshToken },
    message: "",
  };
};

/**
 *
 * @param tokenPayload User
 * @returns {accessToken, refreshToken}
 */
export const refreshToken = async (tokenPayload: any, token: string) => {
  const { id, uuid } = tokenPayload;
  const user = await getRepository(User).findOne(id);

  if (!user) throw new UnauthorizedException();
  await removeFromCache(`${user.id}-accessToken-${uuid}`);
  const accessToken = generateToken({
    id: user.id,
    role: user.role,
    uuid: uuid,
  });
  await storeUserTokenInCache(
    `${user.id}-accessToken-${uuid}`,
    accessToken,
    config.accessTokenExpiryTime
  );
  return {
    accessToken,
    refreshToken: token,
  };
};

/**
 *
 * @returns {accessToken, refreshToken}
 */
export const logout = async (tokenString: string, user: User) => {
  const token = tokenString?.split(" ")[1];
  if (!token) {
    throw new ServerErrorException();
  }
  await updateFCM(user.id.toString(), "", user);
  if (token && user.id) {
    const tokenResult = verifyToken(token);
    if (tokenResult.result) {
      await removeFromCache(
        `${user.id}-accessToken-${tokenResult.payload.uuid}`
      );
      await removeFromCache(
        `${user.id}-refreshToken-${tokenResult.payload.uuid}`
      );
    }
  }
  return;
};
