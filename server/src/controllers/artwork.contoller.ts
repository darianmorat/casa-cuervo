import { Request, Response } from "express";
import { artworkService } from "../services/artwork.service";

export const getArtworks = async (_req: Request, res: Response) => {
   try {
      const artworks = await artworkService.getAll();

      res.status(200).json({
         success: true,
         artworks: artworks,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const createArtwork = async (req: Request, res: Response) => {
   try {
      const { title, price, size, year, image } = req.body;

      const artwork = await artworkService.create(title, price, size, year, image);

      res.status(200).json({
         success: true,
         message: "Creación exitosa",
         newArtwork: artwork,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const editArtwork = async (req: Request, res: Response) => {
   try {
      const { title, price, size, year, image } = req.body;
      const { id } = req.params;

      const artwork = await artworkService.edit(id, title, price, size, year, image);

      res.status(200).json({
         success: true,
         message: "Edición exitosa",
         artwork: artwork,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deleteArtwork = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const artwork = await artworkService.delete(id);

      res.status(200).json({
         success: true,
         message: "Eliminación exitosa",
         artwork: artwork,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
