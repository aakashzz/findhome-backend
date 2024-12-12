import { Request, Response } from "express";
import { createAccount } from "./customer.service";
import { ApiError } from "../../../utils/ApiError";

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
      res.status(error?.statusCode).json(new ApiError(400,error?.message));
   }
}

async function loginCustomerAccount(req: Request, res: Response) {
   try {
   } catch (error: any) {
      console.error(error);
      res.status(error?.statusCode).json(new ApiError(400,error?.message));
   }
}
export { createCustomerAccount };
