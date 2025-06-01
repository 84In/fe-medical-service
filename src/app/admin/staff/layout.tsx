export const metadata = {
  title: "Quản lý nhân viên | VitaCare Medical Admin",
  description: "Quản lý tài khoản và phân quyền nhân viên",
};

export default function StaffLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="space-y-6">{children}</div>;
}
