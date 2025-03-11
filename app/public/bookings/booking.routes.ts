import {
   authorization,
   verifyingUserToken,
} from "../../middlewares/auth.middleware";
import { Router } from "express";
import {
   createBookingForCustomer,
   showBookingOfCustomer,
   showBookingOfOwner,
   updateBookingRequest,
   getIdBookingDetails
} from "./booking.controller";
const router = Router();

router
   .route("/create")
   .post(
      verifyingUserToken,
      authorization(["Customer"]),  
      createBookingForCustomer
   );
router
   .route("/update")
   .put(verifyingUserToken, authorization(["Owner","Customer"]), updateBookingRequest);

router.route("/delete").delete(verifyingUserToken, authorization(["Owner"]));// method not apply
router
   .route("/getCustomer")
   .get(verifyingUserToken, authorization(["Customer"]), showBookingOfCustomer);
router
   .route("/getOwner")
   .get(verifyingUserToken, authorization(["Owner"]), showBookingOfOwner);
router
   .route("/:bookingId")
   .get(verifyingUserToken, getIdBookingDetails);

export default router;
