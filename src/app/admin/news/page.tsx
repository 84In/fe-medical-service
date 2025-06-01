import { NewsManagement } from "@/components/news-management";

export const metadata = {
  title: "Quản lý tin tức - VitaCare Medical",
  description: "Quản lý tin tức, thông báo và bài viết của hệ thống",
};

export default function NewsPage() {
  return (
    <div className="container mx-auto px-6 py-6">
      <NewsManagement />
    </div>
  );
}
