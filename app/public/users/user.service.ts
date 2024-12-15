import { ApiError } from "../../utils/ApiError";
import { CreateUser, LoginUser } from "./DTO/user.dto";
import bcrypt from "bcrypt";
import { userDOA } from "./DOA/user.doa";
import JWT from "jsonwebtoken";
import { prisma } from "../../config/config";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import { User } from "@prisma/client";

async function isPasswordCheck(currentPassword: string, dbPassword: string) {
   return await bcrypt.compare(currentPassword, dbPassword);
}

function generateAccessAndRefreshToken(email: string, id: string) {
   const accessToken = JWT.sign(
      {
         id: id,
         email: email,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
   );
   const refreshToken = JWT.sign(
      {
         id: id,
         email: email,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
   );

   return { accessToken, refreshToken };
}


//Create Service Function ITS very simulate to DOA and DTO
async function createAccount(data: CreateUser) {
   if (
      [data.name, data.email, data.password].some(
         (field) => field?.trim() === ""
      )
   ) {
      console.error("Required filed Empty");
      new ApiError(404, "Required Filed Are Empty ....");
   }

   const existedUser = await userDOA.findUserAccount({
      email: data.email,
      password: data.password,
   });

   if (existedUser) {
      console.error("This Account all Ready Available");
      new ApiError(400, "This Account All Ready Existed ....");
   }

   let hashedPassword = await bcrypt.hash(data.password, 10);

   return await userDOA.createUserAccount({
      name: data.name,
      email: data.email,
      password: hashedPassword,
   });
}

async function loginAccount(data: LoginUser) {
   if (!data.email && !data.password) {
      console.error("Required filed Empty");
      throw new ApiError(404, "Required Filed Are Empty ....");
   }

   const result = await userDOA.findUserAccount(data);

   if (!result) {
      console.error("User Has Not Existed in DB");
      throw new ApiError(400, "User Has Not Existed in DB ....");
   }

   const isPasswordTest = await isPasswordCheck(data.password, result.password);

   if (!isPasswordTest) {
      console.error("User Has Not Existed in DB");
      throw new ApiError(400, "User Has Not Existed in DB ....");
   }
   const { accessToken, refreshToken } = generateAccessAndRefreshToken(
      result.email,
      result.id
   );

   //mini database update, RefreshToken
   await prisma.user.update({
      where: {
         email: result.email,
      },
      data: {
         refreshToken: refreshToken,
      },
   });
   return { accessToken, refreshToken };
}

async function logoutAccount(id:string){
   return await prisma.user.update({
      where:{
         id:id
      },data:{
         refreshToken:null
      }
   })
}

async function uploadProfilePicture(id:string, profilePictureUrl:string){
   if(!profilePictureUrl){
      throw new ApiError(400,"Upload Photo URL Not Available");
   }
   const {uploadedObject} = await uploadOnCloudinary(profilePictureUrl);
   
   if(!uploadedObject){
      throw new ApiError(400,"Images Not Uploaded")
   }
   const dbUpdateProfile = await userDOA.uploadProfilePicture(id,uploadedObject.secure_url);

   if(!dbUpdateProfile){
      throw new ApiError(500,"DB Not update profile url")
   }
   return dbUpdateProfile
}

async function updateAccountDetails(id:string,data:User) {
   if(!data){
      throw new ApiError(400,"Require Filed Are Empty");
   }

   const result = await userDOA.updateUserAccountDetails(id,data);

   if(!result){
      throw new ApiError(501,"User Details Not Update")
   }
   return result
}

async function verifyEmail(token:string){
   if(!token){
      throw new ApiError(400,"Verify Token Not Collected");
   }
   const decoded = JWT.verify(token,process.env.EMAIL_TOKEN_SECRET) as LoginUser;
   const updated = await prisma.user.update({
      where:{
         id:decoded.id,
      },data:{
         isVerified:true,
         verifyToken:null,
      }
   })
   if(!updated){
      throw new ApiError(501,"Your Email Not Update in DB To Verified")
   }
   return updated
}

export { createAccount, loginAccount, logoutAccount, uploadProfilePicture , updateAccountDetails,verifyEmail };
