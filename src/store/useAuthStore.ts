// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/axios";
import { toast } from "react-hot-toast";

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  phone: string;
  email: string;
  role: Role;
}

interface AuthState {
  token: string | null;
  user: User | null;
  username: string | null;
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response === "object" &&
    (error as any).response !== null &&
    "data" in (error as any).response &&
    typeof (error as any).response.data === "object" &&
    (error as any).response.data !== null &&
    "message" in (error as any).response.data &&
    typeof (error as any).response.data.message === "string"
  ) {
    return (error as any).response.data.message;
  }
  return "Không thể tải thông tin người dùng";
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      user: null,
      setToken: (token) => set({ token }),
      setUsername: (username) => set({ username }),
      setUser: (user) => set({ user }),

      fetchUser: async () => {
        const token = get().token;
        const username = get().username;
        if (!username || !token) return;

        try {
          const res = await api.get<{
            code: number;
            message?: string;
            result: User;
          }>(`/users/${username}`);

          if (res.data.code !== 0) {
            toast.error(
              res.data.message ?? "Không thể tải thông tin người dùng"
            );
            return;
          }

          set({ user: res.data.result });
        } catch (error: unknown) {
          toast.error(getErrorMessage(error));
        }
      },

      logout: () => set({ token: null, user: null, username: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
