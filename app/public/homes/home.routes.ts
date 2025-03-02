import {
   authorization,
   verifyingUserToken,
} from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer.middleware";
import { Router } from "express";
import {
   deleteHouse,
   newHouseCreate,
   showSelectedHouseDetails,
   showOwnerHouse,
   updateHouseDetails,
   updateImagesOfHome,
} from "./home.controller";

const router = Router();

//create router
router.route("/create").post(
   verifyingUserToken,
   authorization(["Owner"]),
   upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "imagesOfHome", maxCount: 10 },
   ]),
   newHouseCreate
);

//update route for data
router
   .route("/update")
   .put(verifyingUserToken, authorization(["Owner"]), updateHouseDetails);


//update-image route
router.route("/update-images").put(
   verifyingUserToken,
   authorization(["Owner"]),
   upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "imagesOfHome", maxCount: 10 },
   ]),
   updateImagesOfHome
);


//get id route
router.route("/get-house/:id").get(showSelectedHouseDetails);

//getOwner route
router
   .route("/getOwner")
   .get(verifyingUserToken, authorization(["Owner"]), showOwnerHouse);

//delete route
router
   .route("/delete")
   .delete(verifyingUserToken, authorization(["Admin", "Owner"]), deleteHouse);

export default router;
