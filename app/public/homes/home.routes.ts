import {
   authorization,
   verifyingUserToken,
} from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer.middleware";
import { Router } from "express";
import {
   deleteHouse,
   newHouseCreate,
   showAllHouseDetails,
   showOwnerHouse,
   updateHouseDetails,
} from "./home.controller";

const router = Router();

router.route("/create").post(
   verifyingUserToken,
   authorization(["Owner"]),
   upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "imagesOfHome", maxCount: 10 },
   ]),
   newHouseCreate
);
router
   .route("/update")
   .put(verifyingUserToken, authorization(["Owner"]), updateHouseDetails);

router.route("/getAll").get(verifyingUserToken, showAllHouseDetails);

router.route("/getOwner").get(verifyingUserToken,authorization(["Owner"]),showOwnerHouse)

router.route("/delete").delete(verifyingUserToken,authorization(["Admin","Owner"]),deleteHouse)

export default router;
