import { MedicalAdminNav } from "@/components/medical-admin-nav";

export const metadata = {
  title: "Admin Dashboard",
  description: "Trang quản trị hệ thống",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <MedicalAdminNav />
      <main className="flex-1 p-8 pt-20 lg:pt-8">{children}</main>
    </div>
  );
}
