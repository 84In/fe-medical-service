export const metadata = {
  title: "Trang quản trị bác sĩ - VitaCare Inc.",
  description: "Trang quản trị hệ thống bác sĩ của VitaCare",
  keywords:
    "quản lý bác sĩ, chuyên khoa, nhân sự y tế, VitaCare Medical, bệnh viện",
};

export default function DoctorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="space-y-6">
        <div className="min-h-screen">{children}</div>
      </div>
    </>
  );
}
