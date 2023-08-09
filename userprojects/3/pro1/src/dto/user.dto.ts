import { Role } from "../enums";


export interface IBaseUser {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface IUserPayload extends IBaseUser {
  username: string;
  role: Role;
  password: string;
  city: string;

}

export interface IUserUpdatePayload {
  email?: string;
  username?: string;
  role?: Role;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  city?: string;
}

export interface IFcmUpdatePayload {
  fcm: string;
}


export const BaseUserResponseFields = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  initials: undefined,
  phoneNumber: undefined,
  email: undefined,
  city: undefined,

};

export const BaseUserPublicResponseFields = {
  firstName: undefined,
  lastName: undefined,
  // phoneNumber: undefined,
};

export interface IBaseUserPublicResponse {
  firstName?: string;
  lastName?: string;
  // phoneNumber?: string;
}
export interface IBaseUserResponse {
  id?: string;
  firstName?: string;
  lastName?: string;
  initials?: string;
  phoneNumber?: string;
  email?: string;
  city?: string;

}

export const UserResponseFields = {
  ...BaseUserResponseFields,
  username: undefined,
  role: undefined,
};

export interface IUserResponse extends IBaseUserResponse {
  username?: string;
  role?: Role;
}


