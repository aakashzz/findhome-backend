import { PrismaClient } from "@prisma/client";

 class PrismaService extends PrismaClient {
   async connection() {
      try {
         await this.$connect();
      } catch (error: any) {
         console.error("Prisma Connection: ", error.message);
         // throw new Error(error);
      }
   }
}

export const prisma = new PrismaService();
