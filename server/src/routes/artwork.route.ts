import express from "express";
import { privateRoute } from "../middleware/auth.middleware";
import {
   createArtwork,
   deleteArtwork,
   editArtwork,
   getArtworks,
} from "../controllers/artwork.contoller";

const router = express.Router();

router.get("/get-all", getArtworks);
router.post("/create", privateRoute, createArtwork);
router.post("/edit/:id", privateRoute, editArtwork);
router.delete("/delete/:id", privateRoute, deleteArtwork);

export default router;
