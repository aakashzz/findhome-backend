import { Router } from "express";
import { createCustomerAccount } from "./customer.controller";

const router = Router();

router.route("/create").post(createCustomerAccount);
router.route("/login").post(createCustomerAccount);

export default router