import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { MedicalAdminNav } from "@/components/medical-admin-nav";

export const metadata = {
  title: "Admin Dashboard",
  description: "Trang quản trị hệ thống",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <MedicalAdminNav />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-blue-500 overflow-hidden">
        {/* Mobile header spacer */}
        <div className="lg:hidden h-16  border-b border-gray-200 flex-shrink-0"></div>{" "}
        {/*bg-white*/}
        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-6 pt-6">
            <DynamicBreadcrumb />
          </div>
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
