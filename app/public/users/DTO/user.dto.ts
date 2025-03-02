import { UserRole } from "@prisma/client";

export interface CreateUser {
   name: string;
   email: string;
   password: string;
   role:UserRole;
}

export interface LoginUser {
   id?:string;
   email: string;
   password?: string;
}
export type Customer = {
   name: string;
   email: string;
   password: string;
   isVerified: string;
   profession: string;
   role: string;
   profilePicture: string;
   mobileNumber: number;
};

