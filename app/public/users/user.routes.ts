import { Router } from "express";
import { createUserAccount,loginUserAccount,logoutUserAccount,getCurrentUserAccount, uploadUserProfilePicture, updateUserInformation, verifyUserEmail,} from "./user.controller";
import { verifyingUserToken } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer.middleware";

const router = Router();

router.route("/create").post(createUserAccount);
router.route("/login").post(loginUserAccount);
router.route("/logout").get(verifyingUserToken,logoutUserAccount);
router.route("/get-user").get(verifyingUserToken,getCurrentUserAccount);
router.route("/upload-profile-image").post(verifyingUserToken,upload.single("profilePicture"),uploadUserProfilePicture)
router.route("/update-account-details").post(verifyingUserToken,updateUserInformation)
router.route("/verify-email").post(verifyUserEmail)

export default router