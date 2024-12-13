import { ApiError } from "../../../utils/ApiError";
import { CreateUser, LoginUser } from "../DTO/user.dto";
import bcrypt from "bcrypt";
import { customerDOA } from "../DOA/customer.doa";
import JWT from "jsonwebtoken";
import { prisma } from "../../../config/config";

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

   const existedUser = await customerDOA.findUserAccount({
      email: data.email,
      password: data.password,
   });

   if (existedUser) {
      console.error("This Account all Ready Available");
      new ApiError(400, "This Account All Ready Existed ....");
   }

   let hashedPassword = await bcrypt.hash(data.password, 10);

   return await customerDOA.createUserAccount({
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

   const result = await customerDOA.findUserAccount(data);

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
   await prisma.customer.update({
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
   return await prisma.customer.update({
      where:{
         id:id
      },data:{
         refreshToken:null
      }
   })
}
export { createAccount, loginAccount, logoutAccount  };
