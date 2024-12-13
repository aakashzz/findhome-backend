import { prisma } from "../../../config/config";
import { CreateUser, LoginUser } from "../DTO/user.dto";

class CustomerDOA {
   async createUserAccount(data: CreateUser) {
      return await prisma.customer.create({
         data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: "Customer",
         },
      });
   }

   async findUserAccount(data: LoginUser) {
      return await prisma.customer.findUnique({
         where: {
            email: data.email,
         },
      });
   }

   async updateUserAccountDetails(data) {
     
   }
   // some method are missing complete task its my aim
}

export const customerDOA = new CustomerDOA();
