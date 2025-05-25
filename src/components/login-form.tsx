"use client";
import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "@/utils/axios";
import { isAxiosError } from "axios";

import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [error, setError] = useState("");
  // const token = useAuthStore((state) => state.token);
  // const user = useAuthStore((state) => state.user);
  // const username = useAuthStore((state) => state.username);
  const setToken = useAuthStore((state) => state.setToken);
  const setUsername = useAuthStore((state) => state.setUsername);
  // const logout = useAuthStore((state) => state.logout);
  const fetchUserData = useAuthStore((state) => state.fetchUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setError("");
    try {
      const res = await axios.post("/auth/login", data);
      if (res.data.code === 0) {
        setToken(res.data.result.token);
        setUsername(res.data.result.username);
        fetchUserData();
        router.push("/admin");
      } else {
        setError(res.data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Đăng nhập thất bại");
      } else {
        setError("Đăng nhập thất bại");
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">VitaCare Inc.</span>
            </a>
            <h1 className="text-xl font-bold">
              Chào mừng đến với VitaCare Inc.
            </h1>
            <p className="text-sm text-muted-foreground">
              Vui lòng đăng nhập để tiếp tục sử dụng hệ thống!
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Tài khoản</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập của bạn"
                {...register("username", {
                  required: "Bạn chưa nhập tài khoản",
                })}
                aria-invalid={errors.username ? "true" : "false"}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                {...register("password", {
                  required: "Bạn chưa nhập mật khẩu",
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Đang đăng nhập..." : "Login"}
            </Button>
            {error && (
              <p className="text-center text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Nếu quên mật khẩu, vui lòng liên hệ quản trị viên để được cấp lại
              qua email:{" "}
              <a href="mailto:admin@vitacare.com" className="underline">
                admin@vitacare.com
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
