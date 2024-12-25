import { prisma } from "../../../config/config";
import { Bookings } from "../DTO/booking.dto";

class BookingDOA {
   async createBooking(homeId: string, userId: string, data: Bookings) {
      return await prisma.booking.create({
         data: {
            homeId: homeId,
            customerId: userId,
            booking_date: data.booking_date,
            bookingStatus: data.booking_status,
         },
      });
   }

   async updateBooking(ownerId: string, data: Bookings) {
      return await prisma.booking.update({
         where: {
            id: data.id,
            home: {
               userId: ownerId,
            },
         },
         data: {
            bookingStatus: data.booking_status,
         },
      });
   }

   async deleteBooking(userId: string, bookingId: string) {
      return await prisma.booking.delete({
         where: {
            customerId: userId,
            id: bookingId,
         },
      });
   }

   async customerBooking(customerId: string) {
      return await prisma.booking.findMany({
         where: {
            customerId: customerId,
         },
      });
   }

   async getOwnerBookingDetails(ownerId: string) {
      return await prisma.booking.findMany({
         where: {
            home: {
               userId: ownerId,
            },
         },
         include: {
            home: true,
            user: true,
         },
      });
   }
}

export const bookingDOA = new BookingDOA();
