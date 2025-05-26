export const metadata = {
  title: "Trang quản trị bác sĩ - VitaCare Inc.",
  description: "Trang quản trị hệ thống bác sĩ của VitaCare",
};

export default function DoctorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
