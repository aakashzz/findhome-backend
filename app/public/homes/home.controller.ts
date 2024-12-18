import { Requests } from "../../types/request.type";
import { ApiError } from "../../utils/ApiError";
import { Response } from "express";
import { createHouse, updateHouseDetail } from "./home.service";
import { HomeDTO } from "./DTO/home.dto";

async function newHouseCreate(req: Requests, res: Response) {
   try {
      const data: HomeDTO = req.body;
      const imagesOfHome = req.files;
      const { id } = req.user;
      console.log(data);
      const result = await createHouse(id, data, imagesOfHome);
      if (!result) {
         throw new ApiError(500, "Server Issue Let me Check in service file");
      }

      res.status(201).json(result);
   } catch (error: any) {
      console.error(error);
      throw new ApiError(error?.statusCode, error?.message);
   }
}

async function updateHouseDetails(req: Requests, res: Response) {
   try {
      const data: HomeDTO = req.body;
      const { id } = req.user;
      const result = await updateHouseDetail(data, id);
      if (!result) {
         throw new ApiError(500, "Server Issue Let me Check in service file");
      }

      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      throw new ApiError(error?.statusCode, error?.message);
   }
}
export { newHouseCreate,updateHouseDetails };
