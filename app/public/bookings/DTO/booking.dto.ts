import { BookingStatus } from "@prisma/client";
export class Bookings  {
    id:string
    homeId:string;
    customerId:string;
    booking_date:Date;
    booking_status: BookingStatus;
}