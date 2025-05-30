export const metadata = {
  title: "Trang quản trị dịch vụ y tế - VitaCare Inc.",
  description: "Trang quản trị hệ thống dịch vụ y tế của VitaCare",
  keywords: "quản lý dịch vụ, dịch vụ y tế, VitaCare Medical, bệnh viện",
};

export default function ServicesLayout({
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
