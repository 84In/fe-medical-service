import MainLayout from "@/components/layout/main-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VitaCare Medical - Dịch vụ y tế",
  description: "Chăm sóc tận tâm – Sống khỏe mỗi ngày",
  keywords:
    "medical, healthcare, admin, dashboard, hospital, clinic, patient management",
  authors: [{ name: "VASD IT Team" }],
};

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
