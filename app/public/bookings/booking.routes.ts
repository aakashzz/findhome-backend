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
   .put(verifyingUserToken, authorization(["Owner"]), updateBookingRequest);
   
router.route("/delete").delete(verifyingUserToken, authorization(["Owner"]));
router
   .route("/getCustomer")
   .get(
      verifyingUserToken,
      authorization(["Customer"]),
      showBookingOfCustomer
   );
router
   .route("/getOwner")
   .get(verifyingUserToken, authorization(["Owner"]), showBookingOfOwner);

export default router;
