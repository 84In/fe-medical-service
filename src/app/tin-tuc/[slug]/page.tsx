import { NewsDetailPage } from "@/components/news/news-detail-page";
import { Button } from "@/components/ui/button";
import { fetchNews, getNewsBySlugServer } from "@/services/news.service";
import type { Metadata } from "next";
import Link from "next/link";

const getNewsBySlug = (slug: string) => getNewsBySlugServer(slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

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
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy bài viết
          </h1>
          <p className="text-gray-600 mb-6">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/tin-tuc">
            <Button>← Quay lại tin tức</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedNewsResponse = await fetchNews(
    0,
    3,
    undefined,
    "ACTIVE",
    article.newsType.id
  );
  const relatedNews = relatedNewsResponse.items.filter(
    (item) => item.id !== article.id
  );

  return <NewsDetailPage article={article} relatedNews={relatedNews} />;
}
