import { Customer } from "@prisma/client";
import { Request } from "express";

export interface Requests extends Request{
    user?:Customer
}