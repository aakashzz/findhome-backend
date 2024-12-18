import {
   authorization,
   verifyingUserToken,
} from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer.middleware";
import { Router } from "express";
import { newHouseCreate, updateHouseDetails } from "./home.controller";

const router = Router();

router
   .route("/create")
   .post(
      verifyingUserToken,
      authorization("Customer"),
      upload.fields([{name:"thumbnail",maxCount:1},{name:"imagesOfHome",maxCount:10}]),
      newHouseCreate
   );
router
   .route("/update")
   .post(
      verifyingUserToken,
      authorization("Customer"),
      updateHouseDetails
   );

   export default router