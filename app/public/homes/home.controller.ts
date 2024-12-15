import { Requests } from "app/types/request.type";
import { ApiError } from "app/utils/ApiError";
import { Response } from "express";

async function newHouseCreate(req:Requests,res:Response){
    try {
        
    } catch (error:any) {
        console.error(error?.message);
        throw new ApiError(error?.statusCode,error.message);
    }
}