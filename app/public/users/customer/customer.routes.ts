import { Router } from "express";
import { createCustomerAccount, getCurrentCustomerAccount, loginCustomerAccount, logoutCustomerAccount } from "./customer.controller";
import { verifyingUserToken } from "../../../middlewares/auth.midlleware";

const router = Router();

router.route("/create").post(createCustomerAccount);
router.route("/login").post(loginCustomerAccount);
router.route("/logout").get(verifyingUserToken,logoutCustomerAccount);
router.route("/get").get(verifyingUserToken,getCurrentCustomerAccount);

export default router