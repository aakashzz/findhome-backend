import { User } from "@prisma/client";
import { Request } from "express";

export interface Requests extends Request{
    user?:User
}