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
   status: HomeStatus;
   rent_price: string;
   discounted_rent_price: string;
   discounted_rate: string;
   rating: string;
   address: string;
   city: string;
   state: string;
   pincode: string;
   description: string;
   depositAmount: string;
   bedrooms: string;
   bathrooms: string;
   area: string;
   propertyType: Property;
   availableFrom: Date;
   lessDurationMonths: string;
   furnitureAvailable: Permission;
   petPermission: Permission;
   parkingAvailable: Permission;

}
