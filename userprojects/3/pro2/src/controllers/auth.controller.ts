import { ILoginDto } from "../dto/auth.dto";
import { Body, Post, Route, Tags, Security } from "tsoa";
import * as authRepository from "../repositories/auth.repository";
import { verifyToken } from "../utils/auth.util";
import { ApiResponse, IResponseDto, IRefreshTokenDto } from "../dto";
import { RESPONSE_MESSAGE } from "../constants";
import { Request } from "express";
import {
  ServerErrorException,
  UnauthorizedException,
} from "../utils/error.util";

@Route("auth")
@Tags("Authentication")
export default class AuthController {
  constructor(private req: Request) {}

  /**
   *
   * @param body ILogin Dto
   * @returns User details including token
   */
  @Post("/login")
  public async login(@Body() body: ILoginDto): Promise<IResponseDto> {
    const loginResponse = await authRepository.login(body);
    return new ApiResponse(true, loginResponse, RESPONSE_MESSAGE.LOGGED_IN);
  }

  /**
   * @return IRefreshTokenResponseDto
   */
  @Post("/validateUser")
  @Security("api_key")
  public async validateUser(): Promise<IResponseDto> {
    return new ApiResponse(
      true,
      null,
      RESPONSE_MESSAGE.USER_VALIDATION_SUCCESS
    );
  }

  /**
   *
   * @returns null
   */
  @Post("/logout")
  @Security("api_key")
  public async logout(): Promise<IResponseDto> {
    const tokenString = this.req.headers.authorization;
    if (!tokenString) {
      throw new ServerErrorException();
    }
    if (!this.req.user) throw new UnauthorizedException();

    const response = await authRepository.logout(tokenString, this.req.user);
    return new ApiResponse(true, response, RESPONSE_MESSAGE.LOGGED_OUT);
  }

  /**
   * @return IRefreshTokenResponseDto
   */
  @Post("/refreshToken")
  public async refreshToken(
    @Body() body: IRefreshTokenDto
  ): Promise<IResponseDto> {
    if (!body.refreshToken) {
      throw new ServerErrorException();
    }
    const tokenResult = verifyToken(body.refreshToken);
    if (!tokenResult.result)
      throw new UnauthorizedException(tokenResult.payload);
    const response = await authRepository.refreshToken(
      tokenResult.payload,
      body.refreshToken
    );
    return new ApiResponse(
      true,
      response,
      RESPONSE_MESSAGE.TOKEN_REFRESH_SUCCESS
    );
  }
}
