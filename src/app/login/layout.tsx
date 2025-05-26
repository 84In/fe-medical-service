import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập - VitaCare Inc.",
  description: "Trang đăng nhập hệ thống VitaCare",
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-50 h-full p-4">
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
