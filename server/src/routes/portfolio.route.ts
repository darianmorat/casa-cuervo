import express from "express";
import { privateRoute } from "../middleware/auth.middleware";
import { deleteImage, getImages, uploadImage } from "../controllers/portfolio.controller";

const router = express.Router();

router.get("/get-all", getImages);
router.post("/upload", privateRoute, uploadImage);
router.delete("/delete/:id", privateRoute, deleteImage);

export default router;
