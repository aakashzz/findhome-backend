import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError";
import fs from "fs";
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadOnCloudinary(localFilePath: any) {
   console.log("Local File Path",localFilePath)
   try {
      if (!localFilePath) throw new ApiError(400, "File Path Not Submit");

      const uploadedObject = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto",
      });
      console.log(uploadedObject.secure_url);
      fs.unlinkSync(localFilePath);
      return  uploadedObject.secure_url ;
   } catch (error: any) {
      fs.unlinkSync(localFilePath);
      throw new ApiError(500, error?.message);
   }
}
