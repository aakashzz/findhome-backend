import { Request, Response } from "express";
import {
   createAccount,
   loginAccount,
   logoutAccount,
   updateAccountDetails,
   uploadProfilePicture,
   verifyEmail,
} from "./user.service";
import { ApiError } from "../../utils/ApiError";
import { Requests } from "../../types/request.type";
import { sendEmail } from "../../utils/mailling";

//POST method create customer account
async function createUserAccount(req: Request, res: Response) {
   try {
      const data = req.body;
      const result = await createAccount(data);
      if (!result) {
         console.error("Server Problem I Think Account Not Create");
         new ApiError(502, "Server Problem I Think Account Not Create");
      }
      const mailResponse = await sendEmail(result.id,result.email);
      console.log(mailResponse)
      res.status(201).json({
         result,
      });
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function loginUserAccount(req: Request, res: Response) {
   try {
      const data = req.body;
      const result = await loginAccount(data);
      if (!result) {
         console.error(
            "Server Problem I Think Account Not Login and Generate Token"
         );
         new ApiError(
            502,
            "Server Problem I Think Account Not Login and Generate Token"
         );
      }

      res.status(200)
         .cookie("accessToken", result.accessToken)
         .cookie("refreshToken", result.refreshToken)
         .json({ message: "User LoggedIN SuccessFully" });
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function logoutUserAccount(req: Requests, res: Response) {
   try {
      const data = req.user;
      const result = await logoutAccount(data.id);
      res.status(200)
         .clearCookie("accessToken")
         .clearCookie("refreshToken")
         .json({ message: "User Account Delete SuccessFully", result });
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function getCurrentUserAccount(req: Requests, res: Response) {
   try {
      res.status(200).json(req.user);
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function uploadUserProfilePicture(req: Requests, res: Response) {
   try {
      const profilePicture = req.file.path;
      console.log(profilePicture);
      const { id } = req.user;
      const result = await uploadProfilePicture(id, profilePicture);

      if (!result) {
         console.error("Server Problem I Think Your Image Not Upload");
         new ApiError(502, "Server Problem I Think Your Image Not Upload");
      }
      res.status(202).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function updateUserInformation(req:Requests, res:Response){
   try {
      const data = req.body;
      const {id} = req.user
      const results = await updateAccountDetails(id,data);
      if(!results){
         throw new ApiError(401,"In Update Account Details Issue");
      }
      res.status(200).json(results)
      
   } catch (error:any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function verifyUserEmail(req:Requests,res:Response){
   try {
      const {token} = req.query
      console.log(token)
      const result = await verifyEmail(`${token}`);
      if(!result){
         throw new ApiError(401,"In Update Account Details Issue");
      }
      res.status(200).json(result);
   } catch (error:any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

export {
   createUserAccount,
   loginUserAccount,
   logoutUserAccount,
   getCurrentUserAccount,
   uploadUserProfilePicture,
   updateUserInformation,
   verifyUserEmail
};
