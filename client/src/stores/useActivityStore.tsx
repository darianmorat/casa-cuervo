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
   createActivity: (values: ActivityProps) => Promise<void>;
   editActivity: (values: ActivityProps, id: string) => Promise<void>;
   deleteActivity: (id: string) => Promise<void>;
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

   createActivity: async (values) => {
      set({ isLoading: true });
      try {
         const body = {
            title: values.title,
            date: values.date,
            time: values.time,
            image: values.image,
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

   editActivity: async (values, id) => {
      set({ isLoading: true });
      try {
         const body = {
            title: values.title,
            date: values.date,
            time: values.time,
            image: values.image,
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
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   },
}));
