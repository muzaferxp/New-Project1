export interface ILoginDto {
  username: string;
  password: string;
}

export interface IRefreshTokenDto {
  refreshToken: string;
}

export interface IRefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}
