import { Home } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";
import { homeDOA } from "./DOA/home.doa";
import { HomeDTO, RequestFileType } from "./DTO/home.dto";
import { uploadOnCloudinary } from "../../utils/cloudinary";

async function createHouse(userId: string, data: HomeDTO, imagesOfHome:any) {
   console.log("This Filed Are ",imagesOfHome)
   if (!data && !imagesOfHome) {
      throw new ApiError(400, "Required Filed Not Filed Up");
   }
   console.log("Upload data Pass:- ",data)
   const uploadedThumbnailOfHouse:string = await uploadOnCloudinary(
      imagesOfHome.thumbnail[0].path
   );
   console.log("Upload Thumbnail:- ",uploadedThumbnailOfHouse)

   
   //this block of imagesOfHouse....

   if (!imagesOfHome.imagesOfHome || !Array.isArray(imagesOfHome?.imagesOfHome)) {
      throw new ApiError(400, "Invalid data: ImagesOfHome is not provided");
   }

   const collectedValue = imagesOfHome.imagesOfHome?.map(
      async (path:any) => {
         console.log("path",path.path)
         return await uploadOnCloudinary(path.path);
      }
   );

   const uploadedAllImagesOfHouse:Array<string> = await Promise.all(collectedValue);

   if (!uploadedAllImagesOfHouse && !uploadedThumbnailOfHouse) {
      throw new ApiError(501, "Images Not Uploaded Server Issue");
   }
   console.log("Done Report")
   const response = await homeDOA.createNewHomeFiled(
      uploadedThumbnailOfHouse,
      uploadedAllImagesOfHouse,
      data,
      userId
   );

   if (!response) {
      throw new ApiError(500, "Details Not Submit In Database");
   }
   console.log(response)
   return response;
}


async function updateHouseDetail(data:HomeDTO,userId:string){
   if(!data){
      throw new ApiError(400,"Updating Filed Are Empty and Not Transfer to Server");
   }
   const response = await homeDOA.updateNewHouse(data,userId)
   if(!response){
      throw new ApiError(501,"Info Not update in db");
   }

   return response
}
export { createHouse,updateHouseDetail };
