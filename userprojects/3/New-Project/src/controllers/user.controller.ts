import {
  IFcmUpdatePayload,
  IUserPayload,
  IUserUpdatePayload,
} from "../dto/user.dto";
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  Security,
  Query,
} from "tsoa";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateFCM,
} from "../repositories/user.repository";
import {
  ApiResponse,
  IResponseDto,
  IUserResponse,
  UserResponseFields,
} from "../dto";
import { RESPONSE_MESSAGE } from "../constants";
import { Request } from "express";
import mask from "../utils/mask.util";
import { UnauthorizedException } from "../utils/error.util";
import { Role } from "../enums";


@Route("users")
@Tags("User")
@Security("api_key")
export default class UserController {
  constructor(private req: Request) {}



  /**
   *
   * @returns User
   */
  @Get("/")
  public async getUsers(
    @Query() searchTerm?: string,
    @Query() ulbId?: string,
    @Query() role?: Role,
    @Query() isActive?: boolean
  ): Promise<IResponseDto<IUserResponse[]>> {
    const users = await getUsers(searchTerm, ulbId, role, isActive);
    return new ApiResponse(true, users, RESPONSE_MESSAGE.USERS_FETCHED);
  }

  /**
   *
   * @param body IUserPayload
   * @returns User
   */
  @Post("/")
  public async createUser(
    @Body() body: IUserPayload
  ): Promise<IResponseDto<IUserResponse>> {
    // if (!this.req.user) throw new UnauthorizedException();

    console.log("==================creating===========")

    const user = await createUser(body);
    return new ApiResponse(
      true,
      mask(user, UserResponseFields),
      RESPONSE_MESSAGE.USER_CREATED
    );
  }

  /**
   *
   * @param id User Id
   * @returns
   */
  @Get("{id}")
  public async getUser(
    @Path() id: string
  ): Promise<IResponseDto<IUserResponse>> {
    const user = await getUser(id);
    return new ApiResponse(true, user, RESPONSE_MESSAGE.USERS_FETCHED);
  }

  /**
   *
   * @param id User Id
   * @param body IUserUpdatePayload
   * @returns User
   */
  @Put("{id}")
  public async updateUser(
    @Path() id: string,
    @Body() body: IUserUpdatePayload
  ): Promise<IResponseDto<IUserResponse>> {
    if (!this.req.user) throw new UnauthorizedException();

    const user = await updateUser(id, body, this.req.user);
    return new ApiResponse(
      true,
      mask(user, UserResponseFields),
      RESPONSE_MESSAGE.USER_MODIFIED
    );
  }

  /**
   *
   * @param id User Id
   * @returns
   */
  @Delete("{id}")
  public async deleteUser(
    @Path() id: string
  ): Promise<IResponseDto<IUserResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const user = await deleteUser(id, this.req.user);
    return new ApiResponse(
      true,
      mask(user, UserResponseFields),
      RESPONSE_MESSAGE.USER_DELETED
    );
  }

  /**
   *
   * @param id User Id
   * @param body IFcmUploadPayload
   * @returns User
   */
  @Put("/fcm/{id}")
  public async updateFcm(
    @Path() id: string,
    @Body() body: IFcmUpdatePayload
  ): Promise<IResponseDto<IUserResponse>> {
    if (!this.req.user) throw new UnauthorizedException();

    const user = await updateFCM(id, body?.fcm || "", this.req.user);
    return new ApiResponse(
      true,
      mask(user, UserResponseFields),
      RESPONSE_MESSAGE.USER_MODIFIED
    );
  }


}