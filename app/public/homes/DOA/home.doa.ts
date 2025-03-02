import { prisma } from "../../../config/config";
import { HomeDTO } from "../DTO/home.dto";
import { Home, Prisma } from "@prisma/client";

class HomeDOA {
   async createNewHomeFiled(
      thumbnailUrl: string,
      imagesOfHouseUrl: Array<string>,
      data: HomeDTO,
      ownerId: string
   ) {
      return await prisma.home.create({
         data: {
            thumbnail: thumbnailUrl,
            imagesOfHome: imagesOfHouseUrl,
            country: data.country,
            address: data.address,
            city: data.city,
            depositAmount: data.depositAmount,
            description: data.description,
            furnitureAvailable: data.furnitureAvailable,
            parkingAvailable: data.parkingAvailable,
            petsPermission: data.petsPermission,
            pincode: data.pincode,
            propertyType: data.propertyType,
            rating: data.rating,
            rent_price: data.rent_price,
            state: data.state,
            status: data.status,
            userId: ownerId,
            BHK: data.BHK,
            contract_based_deal: data.contract_based_deal,
         },
      });
   }

   async updateNewHouse(data: HomeDTO, userId: string) {
      return await prisma.home.update({
         where: {
            userId: userId,
            id: data.id,
         },
         data: {
            address: data.address!,
            depositAmount: data.city!,
            description: data.description!,
            furnitureAvailable: data.furnitureAvailable!,
            parkingAvailable: data.parkingAvailable!,
            petsPermission: data.petsPermission!,
            rent_price: data.rent_price!,
            status: data.status!,
            contract_based_deal: data.contract_based_deal!,
            BHK: data.BHK,
         },
      });
   }

   async showSelectedHome(homeId: string) {
      //this for all people to seeing houses and other qury after will sorted
      return await prisma.home.findFirst({
         where: {
            id: homeId,
         },
         include: {
            user: true,
         },
      });
   }

   async relatedHomeDetails(country:string, state: string){
      return await prisma.home.findMany({
         where:{
            country:country,
            state:state
         },
         include:{
            user:true,
         }
      })
   }

   async showOwnerHouse(ownerId: string) {
      return await prisma.home.findMany({
         where: {
            userId: ownerId,
         },
      });
   }

   async deleteOwnerHouse(houseId: string, ownerId: string) {
      return await prisma.home.delete({
         where: {
            id: houseId,
            userId: ownerId,
         },
      });
   }

   async updateThumbnailAndImagesOfHome(houseId: string, imagesOfHome: Array<string>, thumbnail: string, userId: string ){
      return await prisma.home.update({
         where:{
            id: houseId,
            userId: userId
         },
         data:{
            thumbnail: thumbnail!,
            imagesOfHome: imagesOfHome!,
         }
      })
   }
}


export const homeDOA = new HomeDOA();
