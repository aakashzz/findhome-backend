import { Requests } from "../../types/request.type";
import { ApiError } from "../../utils/ApiError";
import { Response } from "express";
import { createHouse, updateHouseDetail } from "./home.service";
import { HomeDTO } from "./DTO/home.dto";
import { homeDOA } from "./DOA/home.doa";

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

async function showAllHouseDetails(req: Requests, res: Response) {
   try {
      const id = req.params.id;
      if (!id) {
         throw new ApiError(400, "Required ID Not Here");
      }
      const result = await homeDOA.showSelectedHome(id);
      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      throw new ApiError(error?.statusCode, error?.message);
   }
}

async function showOwnerHouse(req: Requests, res: Response) {
   try {
      const { id } = req.user;
      const result = await homeDOA.showOwnerHouse(id);
      if (!result) {
         throw new ApiError(400, "User Not Authorize other wise Login");
      }

      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      throw new ApiError(error?.statusCode, error?.message);
   }
}

async function deleteHouse(req: Requests, res: Response) {
   try {
      const { houseId } = req.body;
      const { id } = req.user;
      const result = await homeDOA.deleteOwnerHouse(houseId, id);
      if (!result) {
         throw new ApiError(
            400,
            "House Id Not Supply Rather then db not deleting"
         );
      }
      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      throw new ApiError(error?.statusCode, error?.message);
   }
}

export {
   newHouseCreate,
   updateHouseDetails,
   showAllHouseDetails,
   showOwnerHouse,
   deleteHouse,
};
