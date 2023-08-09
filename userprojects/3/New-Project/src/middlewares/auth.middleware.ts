import { NextFunction, Request, Response } from "express";
import {
  catchAsync,
  ForbiddenAccessException,
  UnauthorizedException,
} from "../utils/error.util";
import { Role } from "../enums";
import { checkUserTokenInCache, verifyToken } from "../utils/auth.util";
import { getRepository } from "typeorm";
import {  User } from "../models";
import { Socket } from "socket.io";

export const validateToken = async (
  tokenString?: string,
  roles?: string[],
  secretPass?: string
): Promise<User | undefined> => {
  if (tokenString) {
    const token = tokenString.split(" ")[1];

    const tokenResult = verifyToken(token);
    if (!tokenResult.result) {
      throw new UnauthorizedException(tokenResult.payload);
    }
    const tokenId = `${tokenResult.payload.id}-accessToken-${tokenResult.payload.uuid}`;

    if (
      process.env.NODE_ENV !== "local" &&
      !(await checkUserTokenInCache(tokenId, token))
    ) {
      throw new UnauthorizedException();
    }

    if (
      Array.isArray(roles) &&
      roles.length > 0 &&
      tokenResult.payload.role !== Role.ADMIN &&
      roles.indexOf(tokenResult.payload.role) < 0
    ) {
      throw new ForbiddenAccessException();
    }

    let user;
   
    if (secretPass && secretPass === process.env.ADMIN_PASS) {
      const user = await getRepository(User).findOne("admin");
      if (user) return user;
    }
           user = await getRepository(User).findOne({id : tokenResult.payload.id});
           console.log(user)
          if (user) return user;
    throw new UnauthorizedException();
  }
};

/**
 *
 * @param roles User Roles = Roles Enum
 * @returns Req.user
 */
export const authorizeUser = (roles?: Role[], allowPublicReq = false) =>
  catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const tokenString = req.headers.authorization || process.env.DEFAULT_TOKEN;
    if (!tokenString && (allowPublicReq || req.params.secretPass)) {
      next();
    } else {
      const user = await validateToken(
        tokenString,
        roles,
        req.params.secretPass
      );
      if (user instanceof User) req.user = user;
      next();
    }
  });

export const authorizeSocketUser = async (
  socket: Socket,
  next: NextFunction
) => {
  const tokenString = socket.handshake.auth.token;
  const user = await validateToken(tokenString);
  if (!user) {
    const err = new Error("not authorized");
    err.message = "Please retry later";
    next(err);
  }
  socket.data = { ...socket.data, user };
  next();
};
