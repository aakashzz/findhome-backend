import { ApiError } from "../../../utils/ApiError";
import { CreateUser } from "../DTO/user.dto";
import bcrypt from "bcrypt";
import { customerDOA } from "../DOA/customer.doa";


//Create Service Function ITS very simulate to DOA and DTO
async function createAccount(data: CreateUser) {
   if ([data.name, data.email, data.password].some((field) => field?.trim() === "")) {
      console.error("Required filed Empty");
      new ApiError(404, "Required Filed Are Empty ....");
   }

   const existedUser = await customerDOA.findUserAccount({
      email: data.email,
      password: data.password,
   });

   if (existedUser) {
      console.error("This Account all Ready Available");
      new ApiError(400, "This Account All Ready Existed ....");
   }

   let hashedPassword = await bcrypt.hash(data.password, 10);

   return await customerDOA.createUserAccount({
      name: data.name,
      email: data.email,
      password: hashedPassword,
   });
}

export { createAccount };
