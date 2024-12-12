export interface CreateUser {
   name: string;
   email: string;
   password: string;
}

export interface LoginUser {
   email: string;
   password: string;
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
class UserDTO {
   constructor(id, name, email, password) {}
}
