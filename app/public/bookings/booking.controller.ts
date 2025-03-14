import { Requests } from "../../types/request.type";
import { ApiError } from "../../utils/ApiError";
import { Response } from "express";
import { Bookings } from "./DTO/booking.dto";
import {
   createBooking,
   getCustomerBooking,
   getOwnerBooking,
   updateBookingRequestByOwner,
} from "./booking.service";
import { bookingDOA } from "./DOA/booking.doa";

async function createBookingForCustomer(req: Requests, res: Response) {
   try {
      const data = req.body;
      console.log("TJHis",data)
      const { id } = req.user;
      //service file method
      const result = await createBooking(data, id);
      if (!result) {
         throw new ApiError(500, "Service Layer Problem Check");
      }
      res.status(201).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(error.statusCode).json(new ApiError(error.statusCode,"",[{"message":error.message}]));
   }
}

async function showBookingOfOwner(req: Requests, res: Response) {
   try {
      const { id } = req.user;
      const result = await getOwnerBooking(id);
      if (result) {
         throw new ApiError(404, "Not Found Let Check Now");
      }
      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(error.statusCode).json(new ApiError(error.statusCode,"",[{"message":error.message}]));
   }
}

async function updateBookingRequest(req: Requests, res: Response) {
   try {
      const { id } = req.user;
      const data = req.body;
      const result = await updateBookingRequestByOwner(id, data);
      if (result) {
         throw new ApiError(404, "Not Update Let Check");
      }
      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(error.statusCode).json(new ApiError(error.statusCode,"",[{"message":error.message}]));
   }
}

async function showBookingOfCustomer(req: Requests, res: Response) {
   try {
      const { id } = req.user;
      const result = await getCustomerBooking(id);
      if (!result) {
         throw new ApiError(404, "Not Found Let Check Now");
      }
      console.log(result)
      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(error.statusCode).json(new ApiError(error.statusCode,"",[{"message":error.message}]));
   }
}

async function getIdBookingDetails(req:Requests, res: Response) {
   try {
      const id = req.params.bookingId;
      const result = await bookingDOA.getBookingIdShow(id)
      if (!result) {
         throw new ApiError(404, "Not Found Let Check Now");
      }
      console.log(result)
      res.status(200).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(error.statusCode).json(new ApiError(error.statusCode,"",[{"message":error.message}]));
   }
}
export {
   createBookingForCustomer,
   showBookingOfOwner,
   updateBookingRequest,
   showBookingOfCustomer,
   getIdBookingDetails
};
