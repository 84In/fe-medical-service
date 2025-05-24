export const metadata = {
  title: "Admin Dashboard",
  description: "Trang quản trị hệ thống",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <header className="mb-6 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
