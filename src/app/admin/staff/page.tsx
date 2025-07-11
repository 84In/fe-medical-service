import { UserManagement } from "@/components/admin/user/user-management";

export const metadata = {
  title: "Quản lý nhân viên | VitaCare Medical Admin",
  description: "Quản lý tài khoản và phân quyền nhân viên",
};

export default function StaffPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <UserManagement />
    </div>
  );
}
