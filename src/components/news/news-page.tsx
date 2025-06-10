"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { NewsType, News } from "@/types/news";
import { ChevronRight, Home } from "lucide-react";

// Mock data cho NewsType
const newsTypes: NewsType[] = [
  {
    id: 1,
    name: "Tin tức y tế",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Sức khỏe cộng đồng",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Nghiên cứu khoa học",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Công nghệ y tế",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Chăm sóc sức khỏe",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Dinh dưỡng",
    status: "ACTIVE",
  },
  {
    id: 7,
    name: "Thể dục thể thao",
    status: "ACTIVE",
  },
  {
    id: 8,
    name: "Sức khỏe tâm thần",
    status: "ACTIVE",
  },
];

// Tạo mock data cho News theo cấu trúc chuẩn
const generateNewsData = (): News[] => {
  const baseNews: News[] = [
    {
      id: 1,
      slug: "breakthrough-dieu-tri-benh-tim-mach",
      name: "Breakthrough trong điều trị bệnh tim mạch: Kỹ thuật phẫu thuật mới giúp giảm 90% nguy cơ biến chứng",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      descriptionShort:
        "Các chuyên gia tim mạch tại VitaCare Medical đã áp dụng thành công kỹ thuật phẫu thuật tim ít xâm lấn mới, mang lại hy vọng cho hàng nghìn bệnh nhân...",
      contentHtml: `
        <h2>Kỹ thuật phẫu thuật tim mới - Bước đột phá trong y học</h2>
        <p>Trong những năm gần đây, y học tim mạch đã có những bước tiến vượt bậc...</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[2], // Nghiên cứu khoa học
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
    },
    {
      id: 2,
      slug: "chuong-trinh-tiem-chung-mo-rong-2024",
      name: "Chương trình tiêm chủng mở rộng 2024: Bảo vệ trẻ em khỏi 15 bệnh nguy hiểm",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      descriptionShort:
        "VitaCare Medical triển khai chương trình tiêm chủng toàn diện với vaccine mới nhất, đảm bảo an toàn tuyệt đối cho trẻ em từ 0-18 tuổi...",
      contentHtml: `
        <h2>Chương trình tiêm chủng mở rộng 2024</h2>
        <p>Nhằm bảo vệ sức khỏe trẻ em một cách toàn diện...</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[1], // Sức khỏe cộng đồng
      createdAt: "2024-01-12T09:00:00Z",
      updatedAt: "2024-01-12T09:00:00Z",
    },
    {
      id: 3,
      slug: "ai-trong-chan-doan-y-te",
      name: "AI trong chẩn đoán y tế: Cách mạng hóa quy trình khám bệnh",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      descriptionShort:
        "Công nghệ trí tuệ nhân tạo đang thay đổi cách thức chẩn đoán và điều trị bệnh, mang lại độ chính xác cao hơn và giảm thời gian chờ đợi...",
      contentHtml: `
        <h2>AI trong chẩn đoán y tế</h2>
        <p>Công nghệ AI đang cách mạng hóa ngành y tế...</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[3], // Công nghệ y tế
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: 4,
      slug: "10-thoi-quen-tot-cho-suc-khoe-tim-mach",
      name: "10 thói quen tốt cho sức khỏe tim mạch",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      descriptionShort:
        "Các chuyên gia tim mạch chia sẻ 10 thói quen đơn giản nhưng hiệu quả để bảo vệ sức khỏe tim mạch và phòng ngừa bệnh tật...",
      contentHtml: `
        <h2>10 thói quen tốt cho sức khỏe tim mạch</h2>
        <p>Chăm sóc tim mạch từ những thói quen hàng ngày...</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[4], // Chăm sóc sức khỏe
      createdAt: "2024-01-08T11:00:00Z",
      updatedAt: "2024-01-08T11:00:00Z",
    },
    {
      id: 5,
      slug: "che-do-an-dia-trung-hai",
      name: "Chế độ ăn Địa Trung Hải: Bí quyết sống khỏe và trường thọ",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      descriptionShort:
        "Nghiên cứu mới cho thấy chế độ ăn Địa Trung Hải có thể giảm 30% nguy cơ mắc bệnh tim mạch và tăng tuổi thọ đáng kể...",
      contentHtml: `
        <h2>Chế độ ăn Địa Trung Hải</h2>
        <p>Khám phá bí quyết sống khỏe từ vùng Địa Trung Hải...</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[5], // Dinh dưỡng
      createdAt: "2024-01-05T12:00:00Z",
      updatedAt: "2024-01-05T12:00:00Z",
    },
    {
      id: 6,
      slug: "yoga-va-thien-dinh-lieu-phap-tu-nhien",
      name: "Yoga và thiền định: Liệu pháp tự nhiên cho sức khỏe tâm thần",
      thumbnailUrl: "/placeholder.svg?height=400&width=600",
      descriptionShort:
        "Các nghiên cứu khoa học chứng minh yoga và thiền định có tác dụng tích cực trong việc giảm stress, lo âu và cải thiện chất lượng giấc ngủ...",
      contentHtml: `
        <h2>Yoga và thiền định</h2>
        <p>Liệu pháp tự nhiên cho sức khỏe tâm thần...</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[7], // Sức khỏe tâm thần
      createdAt: "2024-01-03T13:00:00Z",
      updatedAt: "2024-01-03T13:00:00Z",
    },
  ];

  // Tạo thêm 30 tin tức nữa để demo phân trang
  const extraNews: News[] = [];
  for (let i = 0; i < 30; i++) {
    const baseArticle = baseNews[i % baseNews.length];
    const newsTypeIndex = i % newsTypes.length;

    extraNews.push({
      ...baseArticle,
      id: baseNews.length + i + 1,
      slug: `${baseArticle.slug}-${i + 1}`,
      name: `${baseArticle.name} - Phiên bản ${i + 1}`,
      newsType: newsTypes[newsTypeIndex],
      createdAt: new Date(2024, 0, 1 + i, 8 + (i % 12)).toISOString(),
      updatedAt: new Date(2024, 0, 1 + i, 8 + (i % 12)).toISOString(),
      status: i % 5 === 0 ? "INACTIVE" : "ACTIVE", // Một số tin không active
    });
  }

  return [...baseNews, ...extraNews];
};

// Tạo dữ liệu mẫu lớn hơn
const allNewsData = generateNewsData();

// Mô phỏng API call để lấy tin tức theo trang
const fetchNews = async (
  page: number,
  perPage: number,
  newsTypeId: number | null = null,
  search = ""
): Promise<{
  news: News[];
  featuredNews: News[];
  totalItems: number;
  totalPages: number;
}> => {
  // Mô phỏng độ trễ của API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Filter theo newsType và search, chỉ lấy tin ACTIVE
  let filteredNews = allNewsData.filter((item) => item.status === "ACTIVE");

  if (newsTypeId) {
    filteredNews = filteredNews.filter(
      (item) => item.newsType.id === newsTypeId
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredNews = filteredNews.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.descriptionShort.toLowerCase().includes(searchLower) ||
        item.newsType.name.toLowerCase().includes(searchLower)
    );
  }

  // Lấy tin nổi bật (3 tin mới nhất)
  const featuredNews = filteredNews
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  // Lấy tin thường (loại bỏ tin nổi bật)
  const regularNews = filteredNews.filter(
    (item) => !featuredNews.some((featured) => featured.id === item.id)
  );

  // Tính toán phân trang
  const totalItems = regularNews.length;
  const totalPages = Math.ceil(totalItems / perPage);

  // Lấy tin tức cho trang hiện tại
  const startIndex = (page - 1) * perPage;
  const paginatedNews = regularNews.slice(startIndex, startIndex + perPage);

  return {
    news: paginatedNews,
    featuredNews,
    totalItems,
    totalPages,
  };
};

interface NewsPageProps {
  initialPage?: number;
  initialNewsType?: number | null;
  initialPerPage?: number;
}

export function NewsPage({
  initialPage = 1,
  initialNewsType = null,
  initialPerPage = 6,
}: NewsPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedNewsType, setSelectedNewsType] = useState<number | null>(
    initialNewsType
  );
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const [news, setNews] = useState<News[]>([]);
  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update URL when pagination changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    if (selectedNewsType) {
      params.set("type", selectedNewsType.toString());
    }

    if (itemsPerPage !== 6) {
      params.set("perPage", itemsPerPage.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(url, { scroll: false });
  }, [currentPage, selectedNewsType, itemsPerPage, pathname, router]);

  // Fetch news when pagination, newsType, or search changes
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const result = await fetchNews(
          currentPage,
          itemsPerPage,
          selectedNewsType,
          debouncedSearchTerm
        );
        setNews(result.news);
        setFeaturedNews(result.featuredNews);
        setTotalItems(result.totalItems);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [currentPage, itemsPerPage, selectedNewsType, debouncedSearchTerm]);

  // Reset to page 1 when newsType or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedNewsType, debouncedSearchTerm]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} phút`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              href="/"
              className="flex items-center justify-center hover:text-blue-600"
            >
              <Home className="h-4 w-4 mr-1" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">Tin tức</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tin Tức Y Tế & Sức Khỏe
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Cập nhật những thông tin mới nhất về y tế, sức khỏe và các
              breakthrough trong điều trị
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">📰 Tin tức nóng</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  👨‍⚕️ Chuyên gia chia sẻ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">🔬 Y học hiện đại</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Tìm kiếm tin tức, chủ đề, từ khóa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔍
                    </div>
                  </div>
                </div>
                <Select
                  value={selectedNewsType?.toString() || "all"}
                  onValueChange={(value) =>
                    setSelectedNewsType(
                      value === "all" ? null : Number.parseInt(value)
                    )
                  }
                >
                  <SelectTrigger className="w-full md:w-[250px] h-12">
                    <SelectValue placeholder="Chọn loại tin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại tin</SelectItem>
                    {newsTypes
                      .filter((type) => type.status === "ACTIVE")
                      .map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={selectedNewsType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedNewsType(null)}
              >
                Tất cả loại tin
              </Button>
              {newsTypes
                .filter((type) => type.status === "ACTIVE")
                .map((type) => (
                  <Button
                    key={type.id}
                    variant={
                      selectedNewsType === type.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedNewsType(type.id)}
                  >
                    {type.name}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              📌 Tin Tức Nổi Bật
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredNews.map((article, index) => (
                <Link href={`/tin-tuc/${article.slug}`} key={article.id}>
                  <Card
                    className={`group hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden h-full cursor-pointer ${
                      index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                    }`}
                  >
                    <div className={`relative h-48`}>
                      <Image
                        src={article.thumbnailUrl || "/placeholder.svg"}
                        alt={article.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 text-white">
                          🔥 Nổi bật
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-blue-100 text-blue-800 mb-2">
                          {article.newsType.name}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3
                        className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${
                          index === 0 ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {article.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.descriptionShort}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            📅 {formatDate(article.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            ⏱️ {getReadTime(article.contentHtml)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">
                          {article.newsType.name}
                        </span>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Đọc tiếp →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📰 Tin Tức Mới Nhất
            </h2>
            <p className="text-gray-600 text-lg">
              {totalItems} bài viết được tìm thấy
              {selectedNewsType && (
                <span className="text-blue-600">
                  {" "}
                  trong danh mục "
                  {newsTypes.find((t) => t.id === selectedNewsType)?.name}"
                </span>
              )}
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-8">
                {news.map((article) => (
                  <Link href={`/tin-tuc/${article.slug}`} key={article.id}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden h-full cursor-pointer">
                      <div className="relative h-48">
                        <Image
                          src={article.thumbnailUrl || "/placeholder.svg"}
                          alt={article.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-100 text-blue-800">
                            {article.newsType.name}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                          {article.descriptionShort}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              📅 {formatDate(article.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              ⏱️ {getReadTime(article.contentHtml)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-blue-600">
                            {article.newsType.name}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              📤 Chia sẻ
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Đọc →
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* No Results */}
              {news.length === 0 && !isLoading && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Không tìm thấy tin tức
                  </h3>
                  <p className="text-gray-500">
                    Vui lòng thử lại với từ khóa hoặc loại tin khác
                  </p>
                </div>
              )}
            </>
          )}

          {/* Items per page selector */}
          {totalItems > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-12 mb-6 px-4 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Hiển thị:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number.parseInt(value));
                    setCurrentPage(1); // Reset to first page when changing items per page
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">tin tức mỗi trang</span>
              </div>
              <div className="">
                {/* Advanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center px-4 gap-4">
                    <div className="flex items-center gap-2">
                      {/* First Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1 || isLoading}
                        className="hidden sm:flex"
                      >
                        Đầu
                      </Button>

                      {/* Previous Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1 || isLoading}
                      >
                        Trước
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {(() => {
                          const pages = [];
                          const showPages = 5; // Number of page buttons to show
                          let startPage = Math.max(
                            1,
                            currentPage - Math.floor(showPages / 2)
                          );
                          const endPage = Math.min(
                            totalPages,
                            startPage + showPages - 1
                          );

                          // Adjust start page if we're near the end
                          if (endPage - startPage < showPages - 1) {
                            startPage = Math.max(1, endPage - showPages + 1);
                          }

                          // Show first page and ellipsis if needed
                          if (startPage > 1) {
                            pages.push(
                              <Button
                                key={1}
                                variant={
                                  1 === currentPage ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(1)}
                                disabled={isLoading}
                                className="w-10"
                              >
                                1
                              </Button>
                            );
                            if (startPage > 2) {
                              pages.push(
                                <span
                                  key="ellipsis1"
                                  className="px-2 text-gray-500"
                                >
                                  ...
                                </span>
                              );
                            }
                          }

                          // Show page numbers
                          for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                              <Button
                                key={i}
                                variant={
                                  i === currentPage ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(i)}
                                disabled={isLoading}
                                className="w-10"
                              >
                                {i}
                              </Button>
                            );
                          }

                          // Show ellipsis and last page if needed
                          if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                              pages.push(
                                <span
                                  key="ellipsis2"
                                  className="px-2 text-gray-500"
                                >
                                  ...
                                </span>
                              );
                            }
                            pages.push(
                              <Button
                                key={totalPages}
                                variant={
                                  totalPages === currentPage
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={isLoading}
                                className="w-10"
                              >
                                {totalPages}
                              </Button>
                            );
                          }

                          return pages;
                        })()}
                      </div>

                      {/* Next Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages || isLoading}
                      >
                        Sau
                      </Button>

                      {/* Last Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages || isLoading}
                        className="hidden sm:flex"
                      >
                        Cuối
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-600">
                Hiển thị{" "}
                {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} trong tổng số{" "}
                {totalItems} tin tức
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Follow Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 rounded-2xl mx-6 my-16 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            🩺 Cùng VitaCare chăm sóc sức khỏe mỗi ngày
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Theo dõi chúng tôi để nhận thông tin y tế hữu ích, cập nhật các
            chương trình khám sức khỏe định kỳ và ưu đãi mới nhất!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold text-lg shadow-md"
            >
              🌐 Fanpage Facebook
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold text-lg shadow-md"
            >
              📺 Kênh YouTube
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
