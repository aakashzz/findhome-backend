import { authorization, verifyingUserToken } from "../../middlewares/auth.middleware";
import { Router } from "express";
import { searchLocation } from "./search.controller";

const router = Router();

router.route("/").get(searchLocation);

export default router