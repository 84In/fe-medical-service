"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor: gắn token vào header
api.interceptors.request.use(
  (config) => {
    const skipAuth = ["/auth/login", "/auth/logout"];
    if (!skipAuth.some((path) => config.url?.includes(path))) {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined") {
      // chỉ gọi toast hoặc redirect khi đang ở client
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          useAuthStore.getState().logout;
          window.location.href = "/login";
        }

        toast.error(
          (error.response.data as any)?.message ??
            "Có lỗi xảy ra, vui lòng thử lại sau."
        );
      } else {
        toast.error("Không thể kết nối tới máy chủ.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
