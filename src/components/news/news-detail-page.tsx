"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { News, NewsType } from "@/types/news";
import Image from "next/image";
import {
  ChevronRight,
  Facebook,
  Home,
  LinkIcon,
  Mail,
  Newspaper,
  Twitter,
} from "lucide-react";

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
];

// Mock data cho tin tức chi tiết theo cấu trúc chuẩn
const getNewsBySlug = (slug: string): News | null => {
  const newsData: Record<string, News> = {
    "breakthrough-dieu-tri-benh-tim-mach": {
      id: 1,
      slug: "breakthrough-dieu-tri-benh-tim-mach",
      name: "Breakthrough trong điều trị bệnh tim mạch: Kỹ thuật phẫu thuật mới giúp giảm 90% nguy cơ biến chứng",
      thumbnailUrl:
        "https://umcclinic.com.vn/Data/Sites/1/media/kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-khi-kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng.jpg",
      descriptionShort:
        "Các chuyên gia tim mạch tại VitaCare Medical đã áp dụng thành công kỹ thuật phẫu thuật tim ít xâm lấn mới, mang lại hy vọng cho hàng nghìn bệnh nhân...",
      contentHtml: `
        <h2>Kỹ thuật phẫu thuật tim mới - Bước đột phá trong y học</h2>
        
        <p>Trong những năm gần đây, y học tim mạch đã có những bước tiến vượt bậc, đặc biệt là trong lĩnh vực phẫu thuật ít xâm lấn. Tại VitaCare Medical, đội ngũ chuyên gia tim mạch đã thành công trong việc áp dụng kỹ thuật phẫu thuật tim mới, giúp giảm đáng kể nguy cơ biến chứng và thời gian hồi phục cho bệnh nhân.</p>

        <h3>Ưu điểm vượt trội của kỹ thuật mới</h3>
        
        <p>Kỹ thuật phẫu thuật tim ít xâm lấn mới này mang lại nhiều lợi ích:</p>
        
        <ul>
          <li><strong>Giảm 90% nguy cơ biến chứng:</strong> So với phương pháp truyền thống, kỹ thuật mới giúp giảm đáng kể các biến chứng sau phẫu thuật.</li>
          <li><strong>Thời gian hồi phục nhanh:</strong> Bệnh nhân có thể xuất viện sớm hơn 3-5 ngày so với phương pháp cũ.</li>
          <li><strong>Scar tối thiểu:</strong> Vết mổ nhỏ, thẩm mỹ cao, giúp bệnh nhân tự tin hơn sau phẫu thuật.</li>
          <li><strong>Đau đớn ít hơn:</strong> Giảm đáng kể cảm giác đau sau phẫu thuật.</li>
        </ul>

        <h3>Quy trình phẫu thuật</h3>
        
        <p>Quy trình phẫu thuật được thực hiện theo các bước sau:</p>
        
        <ol>
          <li><strong>Chuẩn bị:</strong> Bệnh nhân được thăm khám toàn diện và chuẩn bị kỹ lưỡng trước phẫu thuật.</li>
          <li><strong>Gây mê:</strong> Sử dụng phương pháp gây mê hiện đại, an toàn tuyệt đối.</li>
          <li><strong>Phẫu thuật:</strong> Thực hiện qua các đường mổ nhỏ với sự hỗ trợ của camera nội soi và robot.</li>
          <li><strong>Theo dõi:</strong> Bệnh nhân được theo dõi sát sao trong phòng hồi sức.</li>
        </ol>

        <h3>Kết quả điều trị</h3>
        
        <p>Sau 6 tháng áp dụng kỹ thuật mới, VitaCare Medical đã ghi nhận:</p>
        
        <ul>
          <li>100% ca phẫu thuật thành công</li>
          <li>Không có ca tử vong</li>
          <li>95% bệnh nhân hài lòng với kết quả</li>
          <li>Thời gian nằm viện trung bình giảm 40%</li>
        </ul>

        <p>Để được tư vấn chi tiết về kỹ thuật phẫu thuật mới, bệnh nhân có thể liên hệ trực tiếp với khoa Tim mạch VitaCare Medical qua hotline 1900-1234 hoặc đặt lịch khám online.</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[2], // Nghiên cứu khoa học
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
    },
    "chuong-trinh-tiem-chung-mo-rong-2024": {
      id: 2,
      slug: "chuong-trinh-tiem-chung-mo-rong-2024",
      name: "Chương trình tiêm chủng mở rộng 2024: Bảo vệ trẻ em khỏi 15 bệnh nguy hiểm",
      thumbnailUrl:
        "https://umcclinic.com.vn/Data/Sites/1/media/kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-khi-kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng.jpg?height=500&width=800",
      descriptionShort:
        "VitaCare Medical triển khai chương trình tiêm chủng toàn diện với vaccine mới nhất, đảm bảo an toàn tuyệt đối cho trẻ em từ 0-18 tuổi...",
      contentHtml: `
        <h2>Chương trình tiêm chủng mở rộng 2024</h2>
        
        <p>Nhằm bảo vệ sức khỏe trẻ em một cách toàn diện, VitaCare Medical đã chính thức triển khai chương trình tiêm chủng mở rộng 2024 với nhiều loại vaccine mới và dịch vụ chăm sóc sức khỏe chuyên nghiệp.</p>

        <h3>Các loại vaccine trong chương trình</h3>
        
        <p>Chương trình bao gồm các vaccine quan trọng:</p>
        
        <ul>
          <li><strong>Vaccine cơ bản:</strong> BCG, DPT, Polio, Sởi, Rubella</li>
          <li><strong>Vaccine mở rộng:</strong> Pneumococcus, Rotavirus, HPV, Meningococcus</li>
          <li><strong>Vaccine mùa:</strong> Cúm, COVID-19 cho trẻ em</li>
          <li><strong>Vaccine du lịch:</strong> Viêm gan A, Thương hàn, Encephalitis</li>
        </ul>

        <h3>Lịch tiêm chủng khuyến nghị</h3>
        
        <p>Lịch tiêm được thiết kế theo độ tuổi:</p>
        
        <ul>
          <li><strong>0-2 tháng:</strong> BCG, Viêm gan B, DPT-VGB-Hib</li>
          <li><strong>2-4 tháng:</strong> DPT-VGB-Hib, Polio, Pneumococcus</li>
          <li><strong>6-12 tháng:</strong> Sởi, Rubella, Viêm gan A</li>
          <li><strong>12-24 tháng:</strong> MMR, Varicella, DPT nhắc lại</li>
        </ul>

        <p>Để đăng ký chương trình tiêm chủng, phụ huynh có thể liên hệ hotline 1900-1234 hoặc đặt lịch trực tuyến qua website.</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[1], // Sức khỏe cộng đồng
      createdAt: "2024-01-12T09:00:00Z",
      updatedAt: "2024-01-12T09:00:00Z",
    },
    "ai-trong-chan-doan-y-te": {
      id: 3,
      slug: "ai-trong-chan-doan-y-te",
      name: "AI trong chẩn đoán y tế: Cách mạng hóa quy trình khám bệnh",
      thumbnailUrl:
        "https://umcclinic.com.vn/Data/Sites/1/media/kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-khi-kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng.jpg?height=500&width=800",
      descriptionShort:
        "Công nghệ trí tuệ nhân tạo đang thay đổi cách thức chẩn đoán và điều trị bệnh, mang lại độ chính xác cao hơn và giảm thời gian chờ đợi...",
      contentHtml: `
        <h2>AI trong chẩn đoán y tế</h2>
        
        <p>Công nghệ trí tuệ nhân tạo (AI) đang cách mạng hóa ngành y tế, đặc biệt trong lĩnh vực chẩn đoán và điều trị. VitaCare Medical đã đầu tư mạnh mẽ vào công nghệ AI để nâng cao chất lượng dịch vụ y tế.</p>

        <h3>Ứng dụng AI trong chẩn đoán</h3>
        
        <ul>
          <li><strong>Phân tích hình ảnh y tế:</strong> AI có thể phát hiện các bất thường trong X-quang, CT, MRI với độ chính xác cao</li>
          <li><strong>Chẩn đoán sớm:</strong> Hệ thống AI giúp phát hiện bệnh ở giai đoạn sớm</li>
          <li><strong>Dự đoán nguy cơ:</strong> AI phân tích dữ liệu để dự đoán nguy cơ mắc bệnh</li>
          <li><strong>Hỗ trợ quyết định:</strong> Đưa ra gợi ý điều trị dựa trên dữ liệu lớn</li>
        </ul>

        <h3>Lợi ích của AI trong y tế</h3>
        
        <ul>
          <li>Tăng độ chính xác chẩn đoán lên 95%</li>
          <li>Giảm thời gian chờ đợi kết quả</li>
          <li>Hỗ trợ bác sĩ đưa ra quyết định tốt hơn</li>
          <li>Giảm chi phí điều trị</li>
        </ul>

        <p>VitaCare Medical cam kết tiếp tục đầu tư vào công nghệ AI để mang lại dịch vụ y tế tốt nhất cho bệnh nhân.</p>
      `,
      status: "ACTIVE",
      newsType: newsTypes[3], // Công nghệ y tế
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
  };

  return newsData[slug] || null;
};

// Mock data cho tin tức liên quan
const getRelatedNews = (currentId: number): News[] => {
  const allNews = [
    {
      id: 2,
      slug: "chuong-trinh-tiem-chung-mo-rong-2024",
      name: "Chương trình tiêm chủng mở rộng 2024",
      thumbnailUrl:
        "https://umcclinic.com.vn/Data/Sites/1/media/kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-khi-kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng.jpg?height=200&width=300",
      descriptionShort:
        "VitaCare Medical triển khai chương trình tiêm chủng toàn diện...",
      contentHtml: "",
      status: "ACTIVE" as const,
      newsType: newsTypes[1],
      createdAt: "2024-01-12T09:00:00Z",
      updatedAt: "2024-01-12T09:00:00Z",
    },
    {
      id: 3,
      slug: "ai-trong-chan-doan-y-te",
      name: "AI trong chẩn đoán y tế: Cách mạng hóa quy trình khám bệnh",
      thumbnailUrl:
        "https://umcclinic.com.vn/Data/Sites/1/media/kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-khi-kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng.jpg?height=200&width=300",
      descriptionShort: "Công nghệ AI đang thay đổi cách thức chẩn đoán...",
      contentHtml: "",
      status: "ACTIVE" as const,
      newsType: newsTypes[3],
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
  ];

  return allNews.filter((news) => news.id !== currentId).slice(0, 3);
};

interface NewsDetailPageProps {
  slug: string;
}

export function NewsDetailPage({ slug }: NewsDetailPageProps) {
  const article = getNewsBySlug(slug);

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

  const relatedNews = getRelatedNews(article.id);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-blue-600"
            >
              <Home className="h-4 w-4" />
              <span>Trang chủ</span>
            </Link>

            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />

            <Link
              href="/tin-tuc"
              className="hover:text-blue-600 hidden sm:inline-flex items-center"
            >
              Tin tức
            </Link>

            <ChevronRight className="h-4 w-4 mx-1 text-gray-400 hidden sm:inline" />

            <Link
              href={`/tin-tuc?type=${article.newsType.id}`}
              className="hover:text-blue-600 hidden md:inline-flex items-center"
            >
              {article.newsType.name}
            </Link>

            <ChevronRight className="h-4 w-4 mx-1 text-gray-400 hidden md:inline" />

            <span
              className="font-medium truncate max-w-[60vw] lg:max-w-none text-gray-900"
              title={article.name}
            >
              {article.name}
            </span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-8">
        <div className="mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className="bg-blue-100 text-blue-800 mb-4">
                {article.newsType.name}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {article.descriptionShort}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{formatDate(article.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={
                  article.thumbnailUrl ||
                  "https://umcclinic.com.vn/Data/Sites/1/media/kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-khi-kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng.jpg"
                }
                alt={article.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-12">
        <div className=" mx-auto px-2">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />

                    {/* Social Share */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        📤 Chia sẻ bài viết
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Facebook className="h-4 w-4" />
                          Facebook
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          Email
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <LinkIcon className="h-4 w-4" />
                          Copy link
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* News Type Info */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Danh mục</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                        {article.newsType.name}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-4">
                        Khám phá thêm nhiều bài viết khác trong danh mục này
                      </p>
                      <Link href={`/tin-tuc?type=${article.newsType.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full"
                        >
                          Xem tất cả →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                {relatedNews.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>📰 Bài viết liên quan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {relatedNews.map((related) => (
                          <Link
                            key={related.id}
                            href={`/tin-tuc/${related.slug}`}
                          >
                            <div className="group cursor-pointer">
                              <div className="relative h-24 mb-2 rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    related.thumbnailUrl ||
                                    "https://umcclinic.com.vn/Data/Sites/1/media/kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-khi-kh%C3%A1m-s%C3%A0ng-l%E1%BB%8Dc-ung-th%C6%B0-%C4%91%E1%BA%A1i-tr%E1%BB%B1c-tr%C3%A0ng.jpg"
                                  }
                                  alt={related.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                {related.name}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Badge variant="secondary" className="text-xs">
                                  {related.newsType.name}
                                </Badge>
                                <span>📅 {formatDate(related.createdAt)}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 rounded-2xl mx-6 my-16 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            🩺 Cần tư vấn y tế?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Đội ngũ chuyên gia VitaCare Medical luôn sẵn sàng hỗ trợ bạn 24/7 –
            đừng ngần ngại liên hệ!
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold text-lg shadow-md"
            >
              📞 Hotline: 1900-1234
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
