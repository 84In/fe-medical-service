import api from "@/utils/axios";
import { deleteCookie, setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  setUser: () => void;
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

      setToken: (token) => {
        set({ token });
        setCookie("access_token", token, {
          maxAge: 60 * 60 * 24, // 1 ngày
          path: "/",
        });
      },

      setUsername: (username) => {
        set({ username });
        setCookie("username", username, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
      },

      setUser: async () => {
        const user = get().user;
        set({ user });
        setCookie("user_role", user?.role.name, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
      },

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
          }

          set({ user: res.data.result });
        } catch (error: unknown) {
          toast.error(getErrorMessage(error));
        }
      },

      logout: () => {
        set({ token: null, user: null, username: null });
        deleteCookie("access_token");
        deleteCookie("username");
        deleteCookie("user_role");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
