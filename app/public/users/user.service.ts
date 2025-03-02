import { ApiError } from "../../utils/ApiError";
import { CreateUser, LoginUser } from "./DTO/user.dto";
import bcrypt from "bcrypt";
import { userDOA } from "./DOA/user.doa";
import JWT from "jsonwebtoken";
import { prisma } from "../../config/config";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import { User } from "@prisma/client";
import ms from "ms";
import { sendEmail } from "../../utils/mailling";

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
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY || ms("2 days"),
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
async function createAccount(data: CreateUser): Promise<any> {
   if (
      [data.name, data.email, data.password].some(
         (field) => field?.trim() === ""
      )
   ) {
      console.error("Required filed Empty");
      return new ApiError(404, "Required Filed Are Empty ....");
   }

   const existedUser = await userDOA.findUserAccount({
      email: data.email,
   });

   if (existedUser) {
      if (existedUser.isVerified) {
         return new ApiError(402, "Email Is Verified And Already Take");
      } else {
         const sendedVerifyEmail = await sendEmail(
            existedUser.id,
            existedUser.email
         );
         if (!sendedVerifyEmail) {
            return new ApiError(401, "Verification Email Not Sended Try Again");
         }
      }

      console.error("This Account all Ready Available");
      return new ApiError(400, "This Account All Ready Existed ....");
   } else {
      let hashedPassword = await bcrypt.hash(data.password, 10);

      return await userDOA.createUserAccount({
         name: data.name,
         email: data.email,
         password: hashedPassword,
         role: data.role,
      });
   }
}

async function loginAccount(data: LoginUser): Promise<any> {
   if (!data.email && !data.password) {
      console.error("Required filed Empty");
      throw new ApiError(404, "Required Filed Are Empty ....");
   }
   const result = await userDOA.findUserAccount(data);
   if (!result) {
      console.error("User Has Not Existed in DB");
      throw new ApiError(404, "User Has Not Existed in DB");
   }

   if (result) {
      if (result.isVerified) {
      }
   }

   //error is bcrypt have not accept await
   const isPasswordTest = await isPasswordCheck(data.password, result.password);

   if (!isPasswordTest) {
      console.error("User Password Not Correct");
      throw new ApiError(404, "User Password Not Correct");
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

async function logoutAccount(id: string) {
   return await prisma.user.update({
      where: {
         id: id,
      },
      data: {
         refreshToken: null,
      },
   });
}

async function uploadProfilePicture(id: string, profilePictureUrl: string) {
   if (!profilePictureUrl) {
      throw new ApiError(400, "Upload Photo URL Not Available");
   }
   const secure_url = await uploadOnCloudinary(profilePictureUrl);

   if (!secure_url) {
      throw new ApiError(400, "Images Not Uploaded");
   }
   console.log(secure_url);
   const dbUpdateProfile = await userDOA.uploadProfilePicture(id, secure_url);

   if (!dbUpdateProfile) {
      throw new ApiError(500, "DB Not update profile url");
   }
   return dbUpdateProfile;
}

async function updateAccountDetails(id: string, data: User) {
   if (!data) {
      throw new ApiError(400, "Require Filed Are Empty");
   }

   const result = await userDOA.updateUserAccountDetails(id, data);

   if (!result) {
      throw new ApiError(501, "User Details Not Update");
   }
   return result;
}

async function verifyEmail(token: string) {
   if (!token) {
      throw new ApiError(400, "Verify Token Not Collected");
   }
   const decoded = JWT.verify(
      token,
      process.env.EMAIL_TOKEN_SECRET
   ) as LoginUser;
   const updated = await prisma.user.update({
      where: {
         id: decoded.id,
      },
      data: {
         isVerified: true,
         verifyToken: null,
      },
   });
   if (!updated) {
      throw new ApiError(501, "Your Email Not Update in DB To Verified");
   }
   return updated;
}

export {
   createAccount,
   loginAccount,
   logoutAccount,
   uploadProfilePicture,
   updateAccountDetails,
   verifyEmail,
};
