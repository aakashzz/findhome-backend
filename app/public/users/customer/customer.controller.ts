import { Request, Response } from "express";
import { createAccount, loginAccount, logoutAccount } from "./customer.service";
import { ApiError } from "../../../utils/ApiError";
import { Requests } from "../../../types/request.type";

//POST method create customer account
async function createCustomerAccount(req: Request, res: Response) {
   try {
      const data = req.body;
      const result = await createAccount(data);
      if (!result) {
         console.error("Server Problem I Think Account Not Create");
         new ApiError(502, "Server Problem I Think Account Not Create");
      }
      res.status(201).json({
         result,
      });
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function loginCustomerAccount(req: Request, res: Response) {
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

async function logoutCustomerAccount(req: Requests, res: Response) {
   try {
      const data = req.user;
      const result = await logoutAccount(data.id);
      res.status(200)
         .clearCookie("accessToken")
         .clearCookie("refreshToken")
         .json({ message: "User Account Delete SuccessFully", result });
   } catch (error:any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}

async function getCurrentCustomerAccount(req:Requests,res:Response){
   try {
      res.status(200).json(req.user)
   } catch (error:any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400, error?.message));
   }
}
export { createCustomerAccount, loginCustomerAccount, logoutCustomerAccount,getCurrentCustomerAccount };
