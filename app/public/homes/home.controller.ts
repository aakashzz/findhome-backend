import { Requests } from "../../types/request.type";
import { ApiError, ApiResponse } from "../../utils/ApiError";
import { Response } from "express";
import {
   createHouse,
   updateHouseDetail,
   updateHouseImages,
} from "./home.service";
import { homeDOA } from "./DOA/home.doa";

async function newHouseCreate(req: Requests, res: Response) {
   try {
      const data = req.body;
      const { id } = req.user;
      const imagesOfHome = req.files;
      console.log(data);
      console.log("This is Multiple", req.files);
      // console.log("Images Of Home",data.imagesOfHome.)

      const result = await createHouse(id, data, imagesOfHome);
      if (!result) {
         throw new ApiError(500, "Server Issue Let me Check in service file");
      }

      res.status(201).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(error.statusCode).json(
         new ApiError(error.statusCode || error.status, error.message)
      );
   }
}

async function updateHouseDetails(req: Requests, res: Response) {
   try {
      const data = req.body;
      const { id } = req.user;
      console.log(req.body);
      const result = await updateHouseDetail(data, id);
      if (!result) {
         throw new ApiError(500, "Server Issue Let me Check in service file");
      }

      res.status(200).json(new ApiResponse(200, "House Details Update SuccessFully", result));
   } catch (error: any) {
      console.error(error);
      res.status(error.statusCode).json(
         new ApiError(error.statusCode,"",[{"message":error.message}])
      );
   }
}

async function showSelectedHouseDetails(req: Requests, res: Response) {
   try {
      const id = req.params.id;
      if (!id) {
         throw new ApiError(400, "Required ID Not Here");
      }
      const result = await homeDOA.showSelectedHome(id);
      if (!result) {
         throw new ApiError(404, "Database Not Fetching....");
      }
      const RelatedHouse = await homeDOA.relatedHomeDetails(
         result.country,
         result.id
      );
      res.status(200).json(
         new ApiResponse(200, "Response SuccessFully", { result, RelatedHouse })
      );
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(
         new ApiError(error.statusCode,"",[{"message":error.message}])
      );
   }
}

async function showOwnerHouse(req: Requests, res: Response) {
   try {
      const { id } = req.user;
      const result = await homeDOA.showOwnerHouse(id);
      if (!result) {
         throw new ApiError(400, "User Not Authorize other wise Login");
      }

      res.status(200).json(
         new ApiResponse(200, "Owner House Fetch SuccessFully", result)
      );
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(
         new ApiError(error.statusCode, "", [{ message: error.message }])
      );
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
            "House Id Not Supply Rather then db not deleting",
         );
      }
      res.status(200).json(new ApiResponse(200, "Delete House SuccessFully", result));
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(
         new ApiError(error.statusCode, "", [{ message: error.message }])
      );
   }
}

async function updateImagesOfHome(req: Requests, res: Response) {
   try {
      const { houseId } = req.body;
      const { id } = req.user;
      const imagesOfHome = req.files;
      // console.log(houseId,imagesOfHome)
      console.log(imagesOfHome);
      const response = await updateHouseImages(houseId, imagesOfHome, id);
      if (!response) {
         throw new ApiError(500, "Response Not Correct Let Check");
      }
      res.status(201).json(new ApiResponse(200, "Update Images SuccessFully", response));
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(
         new ApiError(error.statusCode, "", [{ message: error.message }])
      );
   }
}

export {
   newHouseCreate,
   updateHouseDetails,
   showSelectedHouseDetails,
   showOwnerHouse,
   deleteHouse,
   updateImagesOfHome,
};
