"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://192.168.1.109:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor: gắn token vào header
api.interceptors.request.use(
  (config) => {
    const isGet = config.method?.toUpperCase() === "GET";
    const skipAuthPaths = ["/auth/login", "/auth/logout"];

    const shouldSkip =
      isGet || skipAuthPaths.some((path) => config.url?.includes(path));

    if (!shouldSkip) {
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
      const errorData = error.response?.data as any;

      // Lấy thông tin lỗi từ response
      const code = errorData?.code ?? error.response?.status ?? -1;
      const message =
        errorData?.message ??
        (error.response
          ? "Có lỗi xảy ra, vui lòng thử lại sau."
          : "Không thể kết nối tới máy chủ.");
      const result = errorData?.result ?? null;

      // ✅ Hiển thị toast nếu cần
      if (code === 401) {
        useAuthStore.getState().logout();
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        window.location.href = "/login";
      } else {
        toast.error(message);
      }

      // ✅ Trả về một lỗi chuẩn theo định dạng backend
      return Promise.reject({ code, message, result });
    }

    // Trường hợp không có window (SSR), vẫn reject theo dạng chuẩn
    return Promise.reject({
      code: error.response?.status ?? -1,
      message: "Đã có lỗi xảy ra.",
      result: null,
    });
  }
);

export default api;
