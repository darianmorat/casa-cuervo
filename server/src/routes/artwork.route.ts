import express from "express";
import { privateRoute } from "../middleware/auth.middleware";
import {
   createArtwork,
   deleteArtwork,
   getArtworks,
} from "../controllers/artwork.contoller";

const router = express.Router();

router.get("/get-all", privateRoute, getArtworks);
router.post("/create", privateRoute, createArtwork);
router.delete("/delete/:id", privateRoute, deleteArtwork);

export default router;
