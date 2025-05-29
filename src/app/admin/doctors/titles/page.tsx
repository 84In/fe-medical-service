import { TitlesManagement } from "@/components/titles-management";

export default function TitlesPage() {
  return (
    <div className="pt-6 pb-8 px-6">
      <TitlesManagement />
    </div>
  );
}

export const metadata = {
  title: "Quản lý chức danh - VitaCare Medical",
  description:
    "Quản lý các chức danh khoa học và nghề nghiệp, thêm sửa xóa chức danh",
};
