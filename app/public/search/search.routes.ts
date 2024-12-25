import { authorization, verifyingUserToken } from "../../middlewares/auth.middleware";
import { Router } from "express";
import { searchLocation } from "./search.controller";

const router = Router();

router.route("/").get(verifyingUserToken,authorization(["Admin","Customer","Owner"]),searchLocation)

export default router