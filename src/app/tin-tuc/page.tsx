import { NewsPage } from "@/components/news/news-page";
import { Suspense } from "react";

// Lấy page từ URL params
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string; perPage?: string }>;
}) {
  const params = await searchParams;

  const page = params.page ? Number.parseInt(params.page) : 1;
  const newsType = params.type ? Number.parseInt(params.type) : null;
  const perPage = params.perPage ? Number.parseInt(params.perPage) : 6;

  return (
    <Suspense
      fallback={<div className="p-12 text-center">Đang tải tin tức...</div>}
    >
      <NewsPage
        initialPage={page}
        initialNewsType={newsType}
        initialPerPage={perPage}
      />
    </Suspense>
  );
}
