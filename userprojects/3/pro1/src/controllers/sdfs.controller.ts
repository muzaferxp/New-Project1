
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
ApiResponse,
IResponseDto,
} from "../dto";
import { RESPONSE_MESSAGE } from "../constants";
import { Request } from "express";
import mask from "../utils/mask.util";
import { UnauthorizedException } from "../utils/error.util";
import { ISdfsPayload,ISdfsResponse,SdfsResponseFields } from "../dto/sdfs.dto";
import { createSdfs, deleteSdfs, getSdfs, getSdfss, updateSdfs, } from "../repositories/sdfs.repository";

//EXTRA_IMPORTS


@Route("sdfs")
@Tags("Sdfs")
@Security("api_key")
export default class SdfsController {
constructor(private req: Request) {}


/**
    *
    * @returns Sdfs
    */
@Get("/")
public async getSdfss(
): Promise<IResponseDto<ISdfsResponse[]>> {
    const sdfss = await getSdfss();
    return new ApiResponse(true, sdfss, RESPONSE_MESSAGE.SDFSS_FETCHED);
}



/**
    *
    * @param body ISdfsPayload
    * @returns Sdfs
    */
@Post("/")
public async createSdfs(
    @Body() body: ISdfsPayload
): Promise<IResponseDto<ISdfsResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const sdfs = await createSdfs(body, this.req.user);
    return new ApiResponse(
    true,
    mask(sdfs, SdfsResponseFields),
    RESPONSE_MESSAGE.SDFS_CREATED
    );
}



/**
    *
    * @param id Sdfs Id
    * @returns
    */
@Get("{id}")
public async getSdfs(
    @Path() id: string
): Promise<IResponseDto<ISdfsResponse>> {
    const sdfs = await getSdfs(id);
    return new ApiResponse(true, sdfs, RESPONSE_MESSAGE.SDFSS_FETCHED);
}




/**
    *
    * @param id Sdfs Id
    * @param body ISdfsPayload
    * @returns Sdfs
    */
@Put("{id}")
public async updateSdfs(
    @Path() id: string,
    @Body() body: ISdfsPayload
): Promise<IResponseDto<ISdfsResponse>> {
    if (!this.req.user) throw new UnauthorizedException();

    const sdfs = await updateSdfs(id, body, this.req.user);
    return new ApiResponse(
    true,
    mask(sdfs, SdfsResponseFields),
    RESPONSE_MESSAGE.USER_MODIFIED
    );
}




/**
    *
    * @param id Sdfs Id
    * @returns
    */
@Delete("{id}")
public async deleteSdfs(
    @Path() id: string
): Promise<IResponseDto<ISdfsResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const sdfs = await deleteSdfs(id, this.req.user);
    return new ApiResponse(
    true,
    mask(sdfs, SdfsResponseFields),
    RESPONSE_MESSAGE.SDFS_DELETED
    );
}



//CUSTOM_CONTROLLER

}