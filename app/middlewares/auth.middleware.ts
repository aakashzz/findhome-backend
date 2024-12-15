import JWT from "jsonwebtoken";
import { prisma } from "../config/config";
import { Requests } from "../types/request.type";
import { NextFunction, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { User, UserRole } from "@prisma/client";

export async function verifyingUserToken(
   req: Requests,
   _: Response,
   next: NextFunction
): Promise<any> {
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
      ) as User;

      const searchedUser = await prisma.user.findFirst({
         where: {
            email: decodedValue.email,
            isVerified:true
         },
      });

      if (!searchedUser) {
         throw new ApiError(
            400,
            "Something Wrong Please Check query in middle And You Are Not Verified"
         );
      }

      req.user = searchedUser;

      next();
   } catch (error) {
      console.error("Decoded Token Error ", error);
      next(new ApiError(401, "Token is expired or invalid Please check "));
   }
}

export function authorization(roles: UserRole) {
   return function (req: Requests, _: Response, next: NextFunction) {
      if (!req.user?.isVerified) {
         throw new ApiError(403, "UnVerified Account");
      }
      if (roles && !roles.includes(req.user?.role)) {
         throw new ApiError(403, "UnAuthorized Account");
      }
      next();
   };
}