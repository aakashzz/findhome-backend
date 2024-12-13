import JWT from "jsonwebtoken";
import { prisma } from "../config/config";
import { Requests } from "../types/request.type";
import { NextFunction, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { Customer } from "@prisma/client";

export async function verifyingUserToken(
   req: Requests,
   _: Response,
   next: NextFunction
) : Promise<any>{
   try {
      const accessToken =
         req.cookies?.accessToken ||
         req.headers.authorization.replace("Bearer ", "")!;

      if (!accessToken) {
         console.error("User Not Authorize Please Login");
         throw new ApiError(400, "User Not Authorize Please Login");
      }

      const decodedValue = JWT.verify(
         accessToken,
         process.env.ACCESS_TOKEN_SECRET
      ) as Customer;

      const searchedUser = await prisma.customer.findFirst({
         where: {
            email: decodedValue.email,
         },
      });

      if (!searchedUser) {
         throw new ApiError(
            400,
            "Something Wrong Please Check query in middle"
         );
      }
      req.user = searchedUser;

      next();
   } catch (error) {
      console.error("Decoded Token Error ", error);
       next(
         new ApiError(401, "Token is expired or invalid Please check ")
      );
   }
}
