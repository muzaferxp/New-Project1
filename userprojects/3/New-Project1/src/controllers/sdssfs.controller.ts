
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
import { ISdssfsPayload,ISdssfsResponse,SdssfsResponseFields } from "../dto/sdssfs.dto";
import { createSdssfs, deleteSdssfs, getSdssfs, getSdssfss, updateSdssfs, } from "../repositories/sdssfs.repository";

//EXTRA_IMPORTS


@Route("sdssfs")
@Tags("Sdssfs")
@Security("api_key")
export default class SdssfsController {
constructor(private req: Request) {}


/**
    *
    * @returns Sdssfs
    */
@Get("/")
public async getSdssfss(
): Promise<IResponseDto<ISdssfsResponse[]>> {
    const sdssfss = await getSdssfss();
    return new ApiResponse(true, sdssfss, RESPONSE_MESSAGE.SDSSFSS_FETCHED);
}



/**
    *
    * @param body ISdssfsPayload
    * @returns Sdssfs
    */
@Post("/")
public async createSdssfs(
    @Body() body: ISdssfsPayload
): Promise<IResponseDto<ISdssfsResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const sdssfs = await createSdssfs(body, this.req.user);
    return new ApiResponse(
    true,
    mask(sdssfs, SdssfsResponseFields),
    RESPONSE_MESSAGE.SDSSFS_CREATED
    );
}



/**
    *
    * @param id Sdssfs Id
    * @returns
    */
@Get("{id}")
public async getSdssfs(
    @Path() id: string
): Promise<IResponseDto<ISdssfsResponse>> {
    const sdssfs = await getSdssfs(id);
    return new ApiResponse(true, sdssfs, RESPONSE_MESSAGE.SDSSFSS_FETCHED);
}




/**
    *
    * @param id Sdssfs Id
    * @param body ISdssfsPayload
    * @returns Sdssfs
    */
@Put("{id}")
public async updateSdssfs(
    @Path() id: string,
    @Body() body: ISdssfsPayload
): Promise<IResponseDto<ISdssfsResponse>> {
    if (!this.req.user) throw new UnauthorizedException();

    const sdssfs = await updateSdssfs(id, body, this.req.user);
    return new ApiResponse(
    true,
    mask(sdssfs, SdssfsResponseFields),
    RESPONSE_MESSAGE.USER_MODIFIED
    );
}




/**
    *
    * @param id Sdssfs Id
    * @returns
    */
@Delete("{id}")
public async deleteSdssfs(
    @Path() id: string
): Promise<IResponseDto<ISdssfsResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const sdssfs = await deleteSdssfs(id, this.req.user);
    return new ApiResponse(
    true,
    mask(sdssfs, SdssfsResponseFields),
    RESPONSE_MESSAGE.SDSSFS_DELETED
    );
}



//CUSTOM_CONTROLLER

}