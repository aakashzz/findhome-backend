import { User } from "@prisma/client";
import { prisma } from "../../../config/config";
import { CreateUser, LoginUser } from "../DTO/user.dto";

class UserDOA {
   async createUserAccount(data: CreateUser) {
      return await prisma.user.create({
         data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: "Customer",
         },
      });
   }

   async findUserAccount(data: LoginUser) {
      return await prisma.user.findFirst({
         where: {
            email: data.email,
            id:data.id
         },
      });
   }

   async updateUserAccountDetails(id: string, data: User) {
      return await prisma.user.update({
         where: {
            id: id,
         },
         data: {
            address: data.address!,
            mobileNumber: data.mobileNumber!,
            profession: data.profession!,
         },
      });
   }

   async uploadProfilePicture(id: string, profilePicture: string) {
      return await prisma.user.update({
         where: {
            id: id,
         },
         data: {
            profilePicture: profilePicture,
         },
      });
   }
   // some method are missing complete task its my aim
}

export const userDOA = new UserDOA();
