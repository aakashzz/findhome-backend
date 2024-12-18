import { prisma } from "../../../config/config";
import { HomeDTO } from "../DTO/home.dto";
import { Home, Prisma } from "@prisma/client";

class HomeDOA {
   async createNewHomeFiled(
      thumbnailUrl: string,
      imagesOfHouseUrl: Array<string>,
      data: HomeDTO,
      ownerId: string
   ) 
   {
      return await prisma.home.create({
         data: {
            thumbnail: thumbnailUrl,
            imagesOfHome: imagesOfHouseUrl,
            address: data.address,
            availableFrom: data.availableFrom,
            bathrooms: data.bathrooms,
            bedrooms: data.bedrooms,
            city: data.city,
            depositAmount: data.depositAmount,
            description: data.description,
            discount_rate: data.discounted_rate,
            discounted_rent_price: data.discounted_rent_price,
            furnitureAvailable: data.furnitureAvailable,
            lessDurationMonths: data.lessDurationMonths,
            parkingAvailable: data.parkingAvailable,
            petsPermission: data.petPermission,
            pinCode: data.pincode,
            propertyType: data.propertyType,
            rating: data.rating,
            rent_price: data.rent_price,
            state: data.state,
            status: data.status,
            userId: ownerId,
            area: data.area,
         } ,
      });
      
   }

   async updateNewHouse(data:HomeDTO,userId:string){
      return await prisma.home.update({
         where:{
            userId:userId,
            id:data.id
         },data:{
            address:data.address!,
            availableFrom:data.availableFrom!,
            bathrooms:data.bathrooms!,
            bedrooms:data.bedrooms!,
            depositAmount:data.city!,
            description:data.description!,
            discount_rate:data.discounted_rate!,
            discounted_rent_price:data.discounted_rent_price!,
            furnitureAvailable:data.furnitureAvailable!,
            lessDurationMonths:data.lessDurationMonths!,
            parkingAvailable:data.parkingAvailable!,
            petsPermission:data.petPermission!,
            rent_price:data.rent_price!,
            status:data.status!,
         }
      })
   }
}

export const homeDOA = new HomeDOA();
