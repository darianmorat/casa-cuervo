import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { assetService } from "../services/asset.service";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
   api_key: process.env.CLOUDINARY_API_KEY!,
   api_secret: process.env.CLOUDINARY_API_SECRET!,
   secure: true,
});

export const signature = (_req: Request, res: Response) => {
   const timestamp = Math.round(Date.now() / 1000);
   const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET!,
   );

   res.status(200).json({
      success: true,
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
   });
};

export const metadata = async (req: Request, res: Response) => {
   try {
      const { public_id, secure_url, resource_type } = req.body;

      if (!public_id || !secure_url || !resource_type) {
         res.status(400).json({ error: "Missing required fields" });
         return;
      }

      await assetService.create(public_id, secure_url, resource_type);

      res.status(200).json({
         success: true,
         message: `Asset creado exitosamente`,
      });
   } catch (error) {
      res.status(500).json({ error: "DB insert failed" });
   }
};

export const deleteImage = async (req: Request, res: Response) => {
   try {
      const { publicId } = req.params;

      const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

      if (cloudinaryResult.result !== "ok") {
         res.status(400).json({
            success: false,
            message: "Ha ocurrido un error, inténtalo nuevamente",
         });

         return;
      }

      await assetService.delete(publicId);

      res.status(200).json({
         success: true,
         message: "Imagen eliminada",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
