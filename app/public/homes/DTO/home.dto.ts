import { Home, HomeStatus, Property,Permission } from "@prisma/client";

export interface RequestFileType {
   fieldname: string;
   originalname: string;
   encoding: string;
   mimtype: string;
   destination: string;
   filename: string;
   path: string;
   size: number;
}

export class HomeDTO {
   id:string;
   thumbnail: RequestFileType;
   imagesOfHome:Array<RequestFileType>;
   status: HomeStatus;
   rent_price: string;
   rating: string;
   address: string;
   city: string;
   state: string;
   country:string;
   pincode: string;
   description: string;
   depositAmount: string;
   BHK:string
   propertyType: Property;
   furnitureAvailable: Permission;
   petsPermission: Permission;
   parkingAvailable: Permission;
   contract_based_deal:Permission
}
