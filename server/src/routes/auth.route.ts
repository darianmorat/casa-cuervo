import express from "express";
import {
   authenticate,
   getPhone,
   logout,
   updatePhone,
   verify,
} from "../controllers/auth.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/access", authenticate);
router.post("/logout", logout);
router.get("/verify", privateRoute, verify);
router.post("/phone", privateRoute, updatePhone);
router.get("/get-phone", getPhone);

export default router;
