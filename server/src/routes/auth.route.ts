import express from "express";
import { authenticate, logout, updatePhone, verify } from "../controllers/auth.controller";
import { privateRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/access", authenticate);
router.post("/logout", logout);
router.get("/verify", privateRoute, verify);
router.post("/phone", privateRoute, updatePhone);

export default router;
