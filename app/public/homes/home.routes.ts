import { authorization, verifyingUserToken } from "app/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.route("create").post(verifyingUserToken,authorization("Owner"))