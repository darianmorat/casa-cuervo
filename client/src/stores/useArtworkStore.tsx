import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Artwork = {
   id: string;
   title: string;
   price: string;
   size: string;
   year: string;
   image: string;
};

type CreateProps = {
   title: string;
   price: string;
   size: string;
   year: string;
   image: string;
};

type Store = {
   isLoading: boolean;
   artworks: Artwork[];
   getArtworks: () => Promise<void>;
   createArtwork: (values: CreateProps) => Promise<void>;
   editArtwork: (values: CreateProps, id: string) => Promise<void>;
   deleteArtwork: (id: string) => Promise<void>;
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

   createArtwork: async (values) => {
      set({ isLoading: true });
      try {
         const body = {
            title: values.title,
            price: values.price,
            size: values.size,
            year: values.year,
            image: values.image,
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

   editArtwork: async (values, id) => {
      set({ isLoading: true });
      try {
         const body = {
            title: values.title,
            price: values.price,
            size: values.size,
            year: values.year,
            image: values.image,
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
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   },
}));
