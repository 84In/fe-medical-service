import { SpecialtysManagement } from "@/components/admin/doctors/specialtys-management";

export default function SpecialtysPage() {
  return (
    <div className="pt-6 pb-8 px-6">
      <SpecialtysManagement />
    </div>
  );
}
export const metadata = {
  title: "Quản lý chuyên môn - VitaCare Medical",
  description:
    "Quản lý các chuyên môn của bác sĩ trong hệ thống bệnh viện, thêm sửa xóa chuyên môn",
};
