import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Merch = {
   id: string;
   title: string;
   category: string;
   technique: string;
   price: string;
   size: string;
   year: string;
   image: string;
   available: boolean;
};

type CreateProps = {
   title: string;
   category: string;
   technique: string;
   price: string;
   size: string;
   year: string;
   image: string;
   available: boolean;
};

type Store = {
   isLoading: boolean;
   products: Merch[];
   getProducts: () => Promise<void>;
   createProduct: (values: CreateProps, files: File[]) => Promise<void>;
   editProduct: (values: CreateProps, files: File[], id: string) => Promise<void>;
   deleteProduct: (id: string) => Promise<void>;
   deleteAsset: (url: string) => Promise<boolean | void>;
};

export const useProductStore = create<Store>((set, get) => ({
   isLoading: false,
   products: [],

   getProducts: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/product/get-all");
         if (res.data.success) {
            set({ products: res.data.products });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   createProduct: async (values, files) => {
      set({ isLoading: true });
      try {
         const resImg = await api.get("/asset/generate-signature");
         const file = files[0];

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

         const body = {
            title: values.title,
            category: values.category,
            technique: values.technique,
            price: values.price,
            size: values.size,
            year: values.year,
            image: uploadedData.secure_url,
            available: values.available,
         };

         const res = await api.post("/product/create", body);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentProducts = get().products;
            const newProduct = res.data.newProduct;
            set({ products: [...currentProducts, newProduct] });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   editProduct: async (values, files, id) => {
      set({ isLoading: true });
      try {
         let imageUrl = values.image;

         if (files.length >= 1) {
            const resImg = await api.get("/asset/generate-signature");
            const file = files[0];

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

               imageUrl = uploadedData.secure_url;
            }
         }

         const body = {
            title: values.title,
            category: values.category,
            technique: values.technique,
            price: values.price,
            size: values.size,
            year: values.year,
            image: imageUrl,
            available: values.available,
         };

         const res = await api.post(`/product/edit/${id}`, body);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentProducts = get().products;
            const updatedProduct = res.data.product;
            set({
               products: currentProducts.map((product) =>
                  product.id === id ? updatedProduct : product,
               ),
            });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   deleteProduct: async (id) => {
      set({ isLoading: true });
      try {
         const res = await api.delete(`/product/delete/${id}`);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentProduct = get().products;
            const updatedProducts = currentProduct.filter((product) => product.id !== id);
            set({ products: updatedProducts });

            if (res.data.product.image) {
               get().deleteAsset(res.data.product.image);
            }
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   deleteAsset: async (url) => {
      try {
         const urlParts = url.split("/");
         const filename = urlParts[urlParts.length - 1];
         const publicId = filename.split(".")[0];

         const res = await api.delete(`/asset/delete/${publicId}`);

         if (res.data.success) {
            return true;
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   },
}));
