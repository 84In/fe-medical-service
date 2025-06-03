import { PositionsManagement } from "@/components/admin/doctors/positions-management";

export default function PositionsPage() {
  return (
    <div className="pt-6 pb-8 px-6">
      <PositionsManagement />
    </div>
  );
}

export const metadata = {
  title: "Quản lý chức vụ - VitaCare Medical",
  description:
    "Quản lý các chức vụ trong hệ thống bệnh viện, thêm sửa xóa chức vụ",
};
