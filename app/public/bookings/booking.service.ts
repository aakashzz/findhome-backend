import { ApiError } from "../../utils/ApiError";
import { bookingDOA } from "./DOA/booking.doa";
import { Bookings } from "./DTO/booking.dto";

async function createBooking(data: Bookings, userId: string) {
   console.log(data)
   if (!data) {
      throw new ApiError(400, "Required Filed Not Here");
   }
   const response = await bookingDOA.createBooking(data.homeId, userId, data);
   if (!response) {
      throw new ApiError(500, "New Booking Not Creating");
   }
   return response;
}

async function getOwnerBooking(ownerId: string) {
   if (!ownerId) {
      throw new ApiError(400, "User Not Logged In Please Login Account");
   }
   const response = await bookingDOA.getOwnerBookingDetails(ownerId);
   if (!response) {
      throw new ApiError(500, "Fetching All Booking Not Working");
   }
   return response;
}

async function updateBookingRequestByOwner(ownerId: string, data: Bookings) {
   if (!data) {
      throw new ApiError(401, "Required Filed Are Empty");
   }
   const response = await bookingDOA.updateBooking(ownerId, data);
   if (!response) {
      throw new ApiError(501, "Update Booking Current State Not working");
   }
   return response;
}

async function getCustomerBooking(customerId: string) {
   if (!customerId) {
      throw new ApiError(400, "User Not Logged In Please Login Account");
   }
   const response = await bookingDOA.customerBooking(customerId);
   if (!response) {
      throw new ApiError(500, "Fetching All Booking Not Working");
   }
   console.log(response)
   return response;
}



export {
   createBooking,
   getOwnerBooking,
   updateBookingRequestByOwner,
   getCustomerBooking,
};
