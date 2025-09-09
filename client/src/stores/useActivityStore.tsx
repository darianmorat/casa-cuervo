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
};

type CreateProps = {
   title: string;
   date: string;
   time: string;
   image: string;
   description: string;
   spots: string;
};

type Store = {
   isLoading: boolean;
   activities: Activity[];
   getActivities: () => Promise<void>;
   createActivity: (values: CreateProps) => Promise<void>;
   // edit
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
