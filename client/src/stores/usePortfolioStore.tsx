import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Image = {
   id: string;
   image: string;
};

type Store = {
   isLoading: boolean;
   images: Image[];
   getImages: () => Promise<void>;
   uploadImage: (position: string, file: File) => Promise<void>;
   deleteImage: (id: string) => Promise<void>;
   deleteAsset: (url: string) => Promise<boolean | void>;
};

export const usePortfolioStore = create<Store>((set, get) => ({
   isLoading: false,
   images: [],

   getImages: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/portfolio/get-all");
         if (res.data.success) {
            set({ images: res.data.images });
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Error al cargar imágenes");
      } finally {
         set({ isLoading: false });
      }
   },

   uploadImage: async (position: string, file: File) => {
      set({ isLoading: true });
      try {
         const resImg = await api.get("/asset/generate-signature");

         const formData = new FormData();
         formData.append("file", file);
         formData.append("api_key", resImg.data.apiKey);
         formData.append("timestamp", resImg.data.timestamp);
         formData.append("signature", resImg.data.signature);

         const cloudName = resImg.data.cloudName;
         const cloudRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            {
               method: "POST",
               body: formData,
            },
         );

         if (!cloudRes.ok) {
            throw new Error("Error al subir imagen a Cloudinary");
         }

         const uploadedData = await cloudRes.json();

         if (uploadedData.secure_url) {
            await api.post("/asset/save-metadata", {
               public_id: uploadedData.public_id,
               secure_url: uploadedData.secure_url,
               resource_type: uploadedData.resource_type,
            });
         }

         const res = await api.post("/portfolio/upload", {
            id: position,
            image: uploadedData.secure_url,
         });

         if (res.data.success) {
            toast.success("Imagen subida exitosamente");

            const currentImages = get().images;
            const existingIndex = currentImages.findIndex((img) => img.id === position);

            if (existingIndex >= 0) {
               const updatedImages = [...currentImages];
               updatedImages[existingIndex] = {
                  id: position,
                  image: uploadedData.secure_url,
               };
               set({ images: updatedImages });
            } else {
               set({
                  images: [
                     ...currentImages,
                     {
                        id: position,
                        image: uploadedData.secure_url,
                     },
                  ],
               });
            }
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Error al subir imagen");
      } finally {
         set({ isLoading: false });
      }
   },

   deleteImage: async (id: string) => {
      set({ isLoading: true });
      try {
         const res = await api.delete(`/portfolio/delete/${id}`);

         if (res.data.success) {
            toast.success("Imagen eliminada exitosamente");

            const currentImages = get().images;
            const imageToDelete = currentImages.find((img) => img.id === id);

            const updatedImages = currentImages.filter((img) => img.id !== id);
            set({ images: updatedImages });

            if (imageToDelete?.image) {
               await get().deleteAsset(imageToDelete.image);
            }
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Error al eliminar imagen");
      } finally {
         set({ isLoading: false });
      }
   },

   deleteAsset: async (url: string) => {
      try {
         const urlParts = url.split("/");
         const filename = urlParts[urlParts.length - 1];
         const publicId = filename.split(".")[0];

         const res = await api.delete(`/asset/delete/${publicId}`);

         if (res.data.success) {
            return true;
         }
      } catch (error) {
         console.error("Error deleting asset:", error);
         // Don't show toast here since it's called after main deletion
      }
   },
}));
