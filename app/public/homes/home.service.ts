import { ApiError } from "../../utils/ApiError";
import { homeDOA } from "./DOA/home.doa";
import { HomeDTO } from "./DTO/home.dto";
import { uploadOnCloudinary } from "../../utils/cloudinary";

async function createHouse(userId: string, data: HomeDTO, imagesOfHome: any) {
   console.log("This Filed Are ", imagesOfHome);
   if (!data && !imagesOfHome) {
      throw new ApiError(400, "Required Filed Not Filed Up");
   }
   const uploadedThumbnailOfHouse: string = await uploadOnCloudinary(
      imagesOfHome.thumbnail[0].path
   );
   console.log("Upload Thumbnail:- ", uploadedThumbnailOfHouse);

   //this block of imagesOfHouse....

   if (
      !imagesOfHome.imagesOfHome ||
      !Array.isArray(imagesOfHome?.imagesOfHome)
   ) {
      throw new ApiError(400, "Invalid data: ImagesOfHome is not provided");
   }

   const collectedValue = imagesOfHome.imagesOfHome?.map(async (path: any) => {
      console.log("path", path.path);
      return await uploadOnCloudinary(path.path);
   });

   const uploadedAllImagesOfHouse: Array<string> = await Promise.all(
      collectedValue
   );

   if (!uploadedAllImagesOfHouse && !uploadedThumbnailOfHouse) {
      throw new ApiError(501, "Images Not Uploaded Server Issue");
   }
   console.log("Done Report");
   const response = await homeDOA.createNewHomeFiled(
      uploadedThumbnailOfHouse,
      uploadedAllImagesOfHouse,
      data,
      userId
   );

   if (!response) {
      throw new ApiError(500, "Details Not Submit In Database");
   }
   console.log(response);
   return response;
}

//update text details
async function updateHouseDetail(data: HomeDTO, userId: string) {
   console.log("Data Is ",data)
   if (!data) {
      throw new ApiError(
         400,
         "Updating Filed Are Empty and Not Transfer to Server"
      );
   }
   const response = await homeDOA.updateNewHouse(data, userId);
   if (!response) {
      throw new ApiError(501, "Info Not update in db");
   }

   return response;
}

async function updateHouseImages(
   houseId: string,
   imagesOfHome: any,
   userId: string
) {
   //starting project work
   console.log(imagesOfHome);

   //variable declare
   let thumbnailSecureUrl: string;
   let imagesOfHomeSecureUrl: any;

   if (imagesOfHome?.thumbnail) {
      thumbnailSecureUrl = await uploadOnCloudinary(
         imagesOfHome?.thumbnail[0].path
      );
      console.info(thumbnailSecureUrl);
   }
   if (imagesOfHome?.imagesOfHome) {
      const collectedValue = imagesOfHome?.imagesOfHome.map(
         async (path: any) => {
            console.log("path", path.path);
            return await uploadOnCloudinary(path.path);
         }
      );

      imagesOfHomeSecureUrl = await Promise.all(collectedValue);
   }

   //transfer Value and the end

   console.log(thumbnailSecureUrl);
   console.log(imagesOfHomeSecureUrl);

   const result = await homeDOA.updateThumbnailAndImagesOfHome(
      houseId,
      imagesOfHomeSecureUrl,
      thumbnailSecureUrl,
      userId
   );
   console.log(result);
   if (!result) {
      throw new ApiError(500, "In Database Not Update Please Check Internal");
   }
   return result;
}

export { createHouse, updateHouseDetail, updateHouseImages };
