import { create } from "zustand";
import { toast } from "react-toastify";
import api from "@/api/axios";

type User = {
   id: string;
   username: string;
   email: string;
   phone: string;
};

type Store = {
   isAuth: boolean;
   isLoading: boolean;
   checkingAuth: boolean;
   user: User | null;
   authenticate: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   checkAuth: () => Promise<void>;
   updateUserPhone: (phone: string) => Promise<void>;
   getPhone: () => Promise<string | null | undefined>;
};

export const useAuthStore = create<Store>((set, get) => ({
   isAuth: false,
   isLoading: false,
   checkingAuth: true,
   user: null,

   getPhone: async () => {
      set({ isLoading: true });
      try {
         const res = await api.get("/auth/get-phone");

         if (res.data.success) {
            return res.data.phone;
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   authenticate: async (email, password) => {
      set({ isLoading: true });
      try {
         const body = {
            email: email,
            password: password,
         };

         const res = await api.post("/auth/access", body);

         if (res.data.success) {
            await get().checkAuth();
            toast.success(res.data.message);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },

   logout: async () => {
      try {
         const res = await api.post("/auth/logout");

         if (res.data.success) {
            set({ isAuth: false, user: null });
            toast.info(res.data.message);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   },

   checkAuth: async () => {
      const cookie = document.cookie.includes("flag");

      if (!cookie) {
         set({ isAuth: false, checkingAuth: false, user: null });
         return;
      }

      set({ checkingAuth: true });
      try {
         const res = await api.get("/auth/verify");

         if (res.data.success) {
            set({ isAuth: true, user: res.data.user });
         }
      } catch (_error) {
         set({ isAuth: false, user: null });
      } finally {
         set({ checkingAuth: false });
      }
   },

   updateUserPhone: async (phone) => {
      set({ isLoading: true });
      try {
         const body = {
            phone: phone,
         };

         const res = await api.post("/auth/phone", body);

         if (res.data.success) {
            get().checkAuth();
            set({ user: res.data.user });
            toast.info(res.data.message);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({ isLoading: false });
      }
   },
}));
