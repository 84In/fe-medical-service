import MainLayout from "@/components/layout/main-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chuyên khoa - VitaCare Medical",
  description:
    "Danh sách các chuyên khoa tại VitaCare Medical với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại",
  keywords:
    "chuyên khoa, bệnh viện, VitaCare Medical, tim mạch, nhi khoa, cấp cứu, mắt, xương khớp, thần kinh",
};

export default function DepartmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
