import { Request, Response } from "express";
import { productService } from "../services/product.service";

export const getProducts = async (_req: Request, res: Response) => {
   try {
      const products = await productService.getAll();

      res.status(200).json({
         success: true,
         products: products,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const createProduct = async (req: Request, res: Response) => {
   try {
      const { title, category, technique, price, size, year, images, available } =
         req.body;

      const product = await productService.create(
         title,
         category,
         technique,
         price,
         size,
         year,
         images,
         available,
      );

      res.status(200).json({
         success: true,
         message: "Creación exitosa",
         newProduct: product,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const editProduct = async (req: Request, res: Response) => {
   try {
      const { title, category, technique, price, size, year, images, available } =
         req.body;
      const { id } = req.params;

      const product = await productService.edit(
         id,
         title,
         category,
         technique,
         price,
         size,
         year,
         images,
         available,
      );

      res.status(200).json({
         success: true,
         message: "Edición exitosa",
         product: product,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deleteProduct = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const product = await productService.delete(id);

      res.status(200).json({
         success: true,
         message: "Eliminación exitosa",
         product: product,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
