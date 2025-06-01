import { NewsTypesManagement } from "@/components/news-types-management";

export const metadata = {
  title: "Quản lý loại tin tức - VitaCare Medical",
  description: "Quản lý các loại tin tức trong hệ thống",
};

export default function NewsTypesPage() {
  return (
    <div className="container mx-auto px-6 py-6">
      <NewsTypesManagement />
    </div>
  );
}
