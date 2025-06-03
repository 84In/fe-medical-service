import { DepartmentsManagement } from "@/components/admin/doctors/departments-management";

export default function DepartmentsPage() {
  return (
    <div className="pt-6 pb-8 px-6">
      <DepartmentsManagement />
    </div>
  );
}
export const metadata = {
  title: "Quản lý chuyên khoa - VitaCare Medical",
  description:
    "Quản lý các chuyên khoa trong hệ thống bệnh viện, thêm sửa xóa chuyên khoa",
};
