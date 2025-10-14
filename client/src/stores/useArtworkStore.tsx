import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Artwork = {
   id: string;
   title: string;
   category: string;
   technique: string;
   price: string;
   size: string;
   year: string;
   images: string[];
   available: boolean;
};

type CreateProps = {
   title: string;
   category: string;
   technique: string;
   price: string;
   size: string;
   year: string;
   images: string[];
   available: boolean;
};

type Store = {
   isLoading: boolean;
   artworks: Artwork[];
   getArtworks: () => Promise<void>;
   createArtwork: (values: CreateProps, files: File[]) => Promise<void>;
   editArtwork: (values: CreateProps, files: File[], id: string) => Promise<void>;
   deleteArtwork: (id: string) => Promise<void>;
   deleteAsset: (urls: string[]) => Promise<boolean | void>;
};

export const useArtworkStore = create<Store>((set, get) => ({
   isLoading: false,
   artworks: [],

   getArtworks: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/artwork/get-all");
         if (res.data.success) {
            set({ artworks: res.data.artworks });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   createArtwork: async (values, files) => {
      set({ isLoading: true });
      try {
         const srcArtworks = [];

         for (const file of files) {
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
               throw new Error();
            }

            const uploadedData = await cloudRes.json();

            if (uploadedData.secure_url) {
               await api.post("/asset/save-metadata", {
                  public_id: uploadedData.public_id,
                  secure_url: uploadedData.secure_url,
                  resource_type: uploadedData.resource_type,
               });
            }

            srcArtworks.push(uploadedData.secure_url);
         }

         const body = {
            title: values.title,
            category: values.category,
            technique: values.technique,
            price: values.price,
            size: values.size,
            year: values.year,
            images: srcArtworks,
            available: values.available,
         };

         const res = await api.post("/artwork/create", body);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentArtworks = get().artworks;
            const newArtwork = res.data.newArtwork;
            set({ artworks: [...currentArtworks, newArtwork] });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   editArtwork: async (values, files, id) => {
      set({ isLoading: true });
      try {
         const imagesUrls = [...values.images];

         if (files.length > 0) {
            for (const file of files) {
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

               imagesUrls.push(uploadedData.secure_url);
            }
         }

         const body = {
            title: values.title,
            category: values.category,
            technique: values.technique,
            price: values.price,
            size: values.size,
            year: values.year,
            images: imagesUrls,
            available: values.available,
         };

         const res = await api.post(`/artwork/edit/${id}`, body);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentArtworks = get().artworks;
            const updatedArtwork = res.data.artwork;
            set({
               artworks: currentArtworks.map((artwork) =>
                  artwork.id === id ? updatedArtwork : artwork,
               ),
            });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   deleteArtwork: async (id) => {
      set({ isLoading: true });
      try {
         const res = await api.delete(`/artwork/delete/${id}`);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentArtwork = get().artworks;
            const updatedArtworks = currentArtwork.filter((artwork) => artwork.id !== id);
            set({ artworks: updatedArtworks });

            if (res.data.artwork.images) {
               get().deleteAsset(res.data.artwork.images);
            }
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   deleteAsset: async (urls) => {
      try {
         const deletePromises = urls.map(async (url) => {
            const urlParts = url.split("/");
            const filename = urlParts[urlParts.length - 1];
            const publicId = filename.split(".")[0];
            return api.delete(`/asset/delete/${publicId}`);
         });

         await Promise.all(deletePromises);
         return true;
      } catch (error) {
         toast.error(error.response.data.message);
      }
   },
}));
