"use client";
import { Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { fetchNews } from "@/services/news.service";
import { formatDMYDate } from "@/utils/format-utils";
import { useEffect, useState } from "react";
import { News } from "@/types";

export function NewsHero() {
  const [news, setNews] = useState<News[]>([]);
  const fetchLimitNews = async () => {
    try {
      const data = await fetchNews(0, 6, "", "ACTIVE", 0);
      setNews(data.items || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách tin tức:", error as Error);
    }
  };
  useEffect(() => {
    fetchLimitNews();
  }, []);
  return (
    <div className="h-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="h-6 w-6 text-green-600 mr-3" />
          Tin tức y tế
        </h3>
        <p className="text-gray-600">
          Cập nhật thông tin và kiến thức sức khỏe
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {news.length > 0 &&
          news.map((item) => (
            <Link key={item.id} href={`tin-tuc/${item.slug}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDMYDate(item.createdAt)}
                    </div>
                    <h4 className="font-semibold text-gray-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.descriptionShort}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>

      <Link href={"/tin-tuc"}>
        <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
          Xem tất cả tin tức
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
