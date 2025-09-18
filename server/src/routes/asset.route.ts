import express from "express";
import { privateRoute } from "../middleware/auth.middleware";
import { deleteImage, metadata, signature } from "../controllers/asset.controller";

const router = express.Router();

router.get("/generate-signature", privateRoute, signature);
router.post("/save-metadata", privateRoute, metadata);
router.delete("/delete/:publicId", privateRoute, deleteImage);

export default router;
