import { Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service";

export const getImages = async (_req: Request, res: Response) => {
   try {
      const images = await portfolioService.getAll();

      res.status(200).json({
         success: true,
         images: images,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const uploadImage = async (req: Request, res: Response) => {
   try {
      const { id, image } = req.body;

      const newImage = await portfolioService.upload(id, image);

      res.status(200).json({
         success: true,
         message: "Subida exitosa",
         newImage: newImage,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deleteImage = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const artwork = await portfolioService.delete(id);

      res.status(200).json({
         success: true,
         message: `Eliminación exitosa: ${artwork.id}`,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
