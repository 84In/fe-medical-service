// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/axios";
import { toast } from "react-hot-toast";

interface AuthState {
  token: string | null;
  user: any | null;
  username: string | null;
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  setUser: (user: any) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      user: null,
      setToken: (token) => {
        set({ token });
      },
      setUsername: (username) => set({ username }),
      setUser: (user) => set({ user }),

      fetchUser: async () => {
        const token = get().token;
        const username = get().username;
        if (!username) return;
        if (!token) return;

        try {
          const res = await api.get(`/users/${username}`);
          if (res.data.code !== 0) {
            toast.error(
              res.data.message || "Không thể tải thông tin người dùng"
            );
            return;
          }
          set({ user: res.data.result });
        } catch (err) {
          toast.error(
            (err as any).response?.data?.message ||
              "Không thể tải thông tin người dùng"
          );
        }
      },

      logout: () => {
        set({ token: null, user: null, username: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
