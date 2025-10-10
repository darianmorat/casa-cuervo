import express from "express";
import { privateRoute } from "../middleware/auth.middleware";
import {
   createProduct,
   deleteProduct,
   editProduct,
   getProducts,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/get-all", getProducts);
router.post("/create", privateRoute, createProduct);
router.post("/edit/:id", privateRoute, editProduct);
router.delete("/delete/:id", privateRoute, deleteProduct);

export default router;
