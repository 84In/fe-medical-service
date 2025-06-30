import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Clock,
  FileText,
  Home,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";
import { toSlug } from "@/utils/slugify";
import type { Service, ServiceType } from "@/types/services";
import {
  fetchServices,
  getServiceByIdServer,
  getServices,
} from "@/services/services.service";

const getServiceSlug = (service: Service) => {
  return `${toSlug(service.name)}-${service.id}`;
};

const getServiceBySlug = async (slug: string): Promise<Service | null> => {
  const match = slug.match(/-(\d+)$/); // Tìm id cuối chuỗi (đuôi số)
  if (!match) {
    console.error("Không tìm thấy ID trong slug:", slug);
    return null;
  }

  const id = Number(match[1]); // Lấy ID an toàn
  // const id = Number.parseInt(parts[parts.length - 1]);
  if (Number.isNaN(id)) {
    console.error("Slug không hợp lệ:", slug);
    return null;
  }
  try {
    return await getServiceByIdServer(id);
  } catch (err) {
    console.error("Lỗi khi lấy chi tiết dịch vụ:", err);
    return null;
  }
};

const fetchAllServices = async (itemsPer: number, id: number) => {
  try {
    const data = await fetchServices(0, itemsPer, "", "ACTIVE", id);
    return data.items || [];
  } catch (error) {
    console.error("Lỗi khi tải danh sách dịch vụ:", error as Error);
    return [];
  }
};

const getRelatedServices = async (
  service: Service,
  limit = 3
): Promise<Service[]> => {
  return (await fetchAllServices(limit, service.id)) ?? [];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Dịch vụ không tồn tại | VitaCare Medical",
      description: "Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `${service.name} | VitaCare Medical`,
    description: service.descriptionShort,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Dịch vụ không tồn tại
          </h1>
          <p className="text-gray-600 mb-6">
            Rất tiếc, dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
          </p>
          <Link href="/dich-vu">
            <Button variant="default">Quay lại danh sách dịch vụ</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedServices = await getRelatedServices(service, 3);

  return (
    <div className="container mx-auto pb-2 px-4 md:px-2">
      {/* Breadcrumb */}
      <div className="bg-white rounded-sm">
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
            <span className="hidden md:inline-flex items-center">
              <Link href="/dich-vu" className="hover:text-blue-600">
                Dịch vụ
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link
                href={`/dich-vu/loai/${toSlug(service.serviceType.name)}-${
                  service.serviceType.id
                }`}
                className="hover:text-blue-600"
              >
                {service.serviceType.name}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
            </span>
            <span className="text-gray-900 font-medium">{service.name}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border mb-8">
            {/* Featured image */}
            <div className="aspect-video w-full">
              <img
                src={
                  service.thumbnailUrl ||
                  "/placeholder.svg?height=400&width=800"
                }
                alt={service.name}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>

            {/* Service header */}
            <div className="p-6 md:p-8">
              <Badge
                variant="outline"
                className="mb-3 bg-blue-50 text-blue-700 border-blue-200"
              >
                {service.serviceType.name}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
              <p className="text-lg text-gray-700 mb-6">
                {service.descriptionShort}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <Button variant="outline" size="lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Gọi tư vấn
                </Button>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Service content */}
              <div className="tiptap prose prose-blue max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: service.contentHtml }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin nhanh</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Địa điểm</p>
                    <p className="text-gray-600">
                      Bệnh viện VitaCare – 123 Đường ABC, Quận 1, TP. Hồ Chí
                      Minh
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Thời gian thực hiện</p>
                    <p className="text-gray-600">
                      2-3 giờ (tùy theo gói dịch vụ)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Chuẩn bị</p>
                    <p className="text-gray-600">
                      Nhịn ăn 6-8 giờ trước khi khám (đối với xét nghiệm máu)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Hotline tư vấn</p>
                    <p className="text-blue-600 font-semibold">1900-1234</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related services */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Dịch vụ liên quan</h3>
              <div className="space-y-4">
                {relatedServices.map((relatedService) => {
                  const relatedSlug = getServiceSlug(relatedService);
                  return (
                    <Link
                      key={relatedService.id}
                      href={`/dich-vu/${relatedSlug}`}
                    >
                      <div className="flex items-start group">
                        <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={
                              relatedService.thumbnailUrl ||
                              "/placeholder.svg?height=100&width=100"
                            }
                            alt={relatedService.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                            {relatedService.name}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {relatedService.descriptionShort}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {relatedServices.length === 0 && (
                  <p className="text-gray-500 italic">
                    Không có dịch vụ liên quan
                  </p>
                )}

                <Link
                  href={`/dich-vu/loai/${toSlug(service.serviceType.name)}-${
                    service.serviceType.id
                  }`}
                >
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-blue-600 hover:text-blue-700"
                  >
                    Xem tất cả dịch vụ {service.serviceType.name}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">
                Liên hệ tư vấn ngay
              </h3>
              <p className="mb-4"> </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-blue-700 hover:bg-blue-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Gọi 1900-1234
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
