import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type Activity = {
   id: string;
   title: string;
   date: string;
   time: string;
   image: string;
   description: string;
   spots: string;
   phone: string;
};

type ActivityProps = {
   title: string;
   date: string;
   time: string;
   image: string;
   description: string;
   spots: string;
   phone: string;
};

type Store = {
   isLoading: boolean;
   activities: Activity[];
   getActivities: () => Promise<void>;
   createActivity: (values: ActivityProps, files: File[]) => Promise<void>;
   editActivity: (values: ActivityProps, files: File[], id: string) => Promise<void>;
   deleteActivity: (id: string) => Promise<void>;
   deleteAsset: (url: string) => Promise<boolean | void>;
};

export const useActivityStore = create<Store>((set, get) => ({
   isLoading: false,
   activities: [],

   getActivities: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/activity/get-all");
         if (res.data.success) {
            set({ activities: res.data.activities });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   createActivity: async (values, files) => {
      set({ isLoading: true });
      try {
         if (files.length !== 1) {
            toast.error("Solo puedes subir una imagen.");
            return;
         }

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
            date: values.date,
            time: values.time,
            image: uploadedData.secure_url,
            description: values.description,
            spots: values.spots,
            phone: values.phone,
         };

         const res = await api.post("/activity/create", body);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentActivities = get().activities;
            const newActivity = res.data.newActivity;
            set({ activities: [...currentActivities, newActivity] });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   editActivity: async (values, files, id) => {
      set({ isLoading: true });
      try {
         if (files.length !== 1) {
            toast.error("Solo puedes subir una imagen.");
            return;
         }

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
            date: values.date,
            time: values.time,
            image: uploadedData.secure_url,
            description: values.description,
            spots: values.spots,
            phone: values.phone,
         };

         const res = await api.post(`/activity/edit/${id}`, body);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentActivities = get().activities;
            const updatedActivity = res.data.activity;
            set({
               activities: currentActivities.map((activity) =>
                  activity.id === id ? updatedActivity : activity,
               ),
            });
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   deleteActivity: async (id) => {
      set({ isLoading: true });
      try {
         const res = await api.delete(`/activity/delete/${id}`);

         if (res.data.success) {
            toast.success(res.data.message);
            const currentActivities = get().activities;
            const updatedActivities = currentActivities.filter(
               (activity) => activity.id !== id,
            );
            set({ activities: updatedActivities });

            if (res.data.activity.image) {
               get().deleteAsset(res.data.activity.image);
            }
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   },

   deleteAsset: async (url) => {
      set({ isLoading: true });
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
