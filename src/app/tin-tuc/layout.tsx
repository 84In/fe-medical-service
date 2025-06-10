import MainLayout from "@/components/layout/main-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VitaCare Medical - Tin tức y tế",
  description: "Chăm sóc tận tâm – Sống khỏe mỗi ngày",
  keywords:
    "medical, healthcare, admin, dashboard, hospital, clinic, patient management",
  authors: [{ name: "VASD IT Team" }],
  robots: "noindex, nofollow",
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
