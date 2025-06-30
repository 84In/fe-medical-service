"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { getNews, getNewsBySlugServer } from "@/services/news.service";
import type { News } from "@/types/news";
import { formatDMYDate } from "@/utils/format-utils";
import {
  ChevronRight,
  Facebook,
  Home,
  LinkIcon,
  Mail,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock data cho tin tức chi tiết theo cấu trúc chuẩn
interface Props {
  article: News | null;
  relatedNews: News[]; // nhận sẵn từ server hoặc có thể fetch lại
}

export async function NewsDetailPage({ article, relatedNews }: Props) {
  if (!article)
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

  const handleShareFacebook = (url: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareTwitter = (url: string, title: string) => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleShareEmail = (url: string, title: string) => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(url)}`;
    window.location.href = emailUrl;
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "📋 Đã sao chép liên kết!",
        description: "Bạn có thể chia sẻ liên kết này ở bất kỳ đâu.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "❌ Không thể sao chép",
        description: "Trình duyệt không hỗ trợ hoặc xảy ra lỗi.",
        variant: "destructive",
      });
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
                  <span>{formatDMYDate(article.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={article.thumbnailUrl || ""}
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
                      className="tiptap prose prose-lg max-w-none"
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
                          onClick={() => handleShareFacebook(currentUrl)}
                        >
                          <Facebook className="h-4 w-4" />
                          Facebook
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() =>
                            handleShareTwitter(currentUrl, article.name)
                          }
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() =>
                            handleShareEmail(currentUrl, article.name)
                          }
                        >
                          <Mail className="h-4 w-4" />
                          Email
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handleCopyLink(currentUrl)}
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
                                  src={related.thumbnailUrl || ""}
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
                                <span>
                                  📅 {formatDMYDate(related.createdAt)}
                                </span>
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
