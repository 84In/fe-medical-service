import { NewsDetailPage } from "@/components/news/news-detail-page";
import { promises } from "dns";
import type { Metadata } from "next";

// Mock function to get news data for metadata
const getNewsBySlug = (slug: string) => {
  const news = {
    "breakthrough-dieu-tri-benh-tim-mach": {
      name: "Breakthrough trong điều trị bệnh tim mạch: Kỹ thuật phẫu thuật mới giúp giảm 90% nguy cơ biến chứng",
      descriptionShort:
        "Các chuyên gia tim mạch tại VitaCare Medical đã áp dụng thành công kỹ thuật phẫu thuật tim ít xâm lấn mới...",
      thumbnailUrl: "/placeholder.svg?height=500&width=800",
    },
    "chuong-trinh-tiem-chung-mo-rong-2024": {
      name: "Chương trình tiêm chủng mở rộng 2024: Bảo vệ trẻ em khỏi 15 bệnh nguy hiểm",
      descriptionShort:
        "VitaCare Medical triển khai chương trình tiêm chủng mở rộng với 15+ loại vaccine mới...",
      thumbnailUrl: "/placeholder.svg?height=500&width=800",
    },
    "ai-trong-chan-doan-y-te": {
      name: "AI trong chẩn đoán y tế: Cách mạng hóa quy trình khám bệnh",
      descriptionShort:
        "Công nghệ trí tuệ nhân tạo đang thay đổi cách thức chẩn đoán và điều trị bệnh...",
      thumbnailUrl: "/placeholder.svg?height=500&width=800",
    },
  };
  return news[slug as keyof typeof news] || null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = getNewsBySlug((await params).slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết - VitaCare Medical",
      description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `${article.name} - VitaCare Medical`,
    description: article.descriptionShort,
    openGraph: {
      title: article.name,
      description: article.descriptionShort,
      images: [article.thumbnailUrl],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.name,
      description: article.descriptionShort,
      images: [article.thumbnailUrl],
    },
  };
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <NewsDetailPage slug={(await params).slug} />;
}

// Generate static params for known articles
export async function generateStaticParams() {
  return [
    { slug: "breakthrough-dieu-tri-benh-tim-mach" },
    { slug: "chuong-trinh-tiem-chung-mo-rong-2024" },
    { slug: "ai-trong-chan-doan-y-te" },
  ];
}
