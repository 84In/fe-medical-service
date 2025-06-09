import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Clock,
  FileText,
  Home,
  MapPin,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toSlug } from "@/utils/slugify";
import type { Service, ServiceType } from "@/types/services";

export const metadata: Metadata = {
  title: "Dịch vụ y tế | VitaCare Medical",
  description: "Các dịch vụ y tế chất lượng cao tại VitaCare Medical",
};

// Mock data
const serviceTypesMock: ServiceType[] = [
  {
    id: 1,
    name: "Khám tổng quát",
    description: "Dịch vụ khám sức khỏe tổng quát",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Tầm soát ung thư",
    description: "Dịch vụ tầm soát ung thư",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Chẩn đoán hình ảnh",
    description: "Dịch vụ chẩn đoán hình ảnh",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Xét nghiệm",
    description: "Dịch vụ xét nghiệm y tế",
    status: "ACTIVE",
  },
];

const mockServices: Service[] = [
  {
    id: 1,
    slug: "kham-suc-khoe-tong-quat",
    name: "Khám sức khỏe tổng quát",
    thumbnailUrl:
      "https://umcclinic.com.vn/Data/Sites/1/media/dich-vu/ca-nhan/kham-suc-khoe-tong-quat-va-tam-soat-ung-thu/h1.jpg",
    descriptionShort:
      "Gói khám sức khỏe tổng quát giúp phát hiện sớm các vấn đề sức khỏe.",
    contentHtml: `<p>Nội dung chi tiết về khám sức khỏe tổng quát</p>`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[0],
  },
  {
    id: 2,
    slug: "tam-soat-ung-thu",
    name: "Tầm soát ung thư",
    thumbnailUrl:
      "https://umcclinic.com.vn/Data/Sites/1/media/dich-vu/ca-nhan/kham-suc-khoe-tong-quat-va-tam-soat-ung-thu/h1.jpg",
    descriptionShort:
      "Gói tầm soát ung thư giúp phát hiện sớm các dấu hiệu ung thư.",
    contentHtml: `<p>Nội dung chi tiết về tầm soát ung thư</p>`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[1],
  },
  {
    id: 3,
    slug: "sieu-am-tong-quat",
    name: "Siêu âm tổng quát",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    descriptionShort:
      "Dịch vụ siêu âm tổng quát với công nghệ hiện đại, chẩn đoán chính xác.",
    contentHtml: `<p>Nội dung chi tiết về siêu âm tổng quát</p>`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[2],
  },
  {
    id: 4,
    slug: "xet-nghiem-mau",
    name: "Xét nghiệm máu",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    descriptionShort: "Dịch vụ xét nghiệm máu với các chỉ số đầy đủ.",
    contentHtml: `<p>Nội dung chi tiết về xét nghiệm máu</p>`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[3],
  },
  {
    id: 5,
    slug: "kham-suc-khoe-doanh-nghiep",
    name: "Khám sức khỏe doanh nghiệp",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    descriptionShort: "Gói khám sức khỏe cho nhân viên doanh nghiệp.",
    contentHtml: `<p>Nội dung chi tiết về khám sức khỏe doanh nghiệp</p>`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[0],
  },
  {
    id: 6,
    slug: "tam-soat-ung-thu-vu",
    name: "Tầm soát ung thư vú",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    descriptionShort: "Gói tầm soát ung thư vú chuyên sâu.",
    contentHtml: `<p>Nội dung chi tiết về tầm soát ung thư vú</p>`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[1],
  },
];

// Tạo slug kết hợp giữa tên và id
const getServiceSlug = (service: Service) => {
  return `${toSlug(service.name)}-${service.id}`;
};

export default function ServicesPage() {
  // Nhóm dịch vụ theo loại
  const servicesByType = serviceTypesMock.map((type) => {
    return {
      ...type,
      services: mockServices.filter(
        (service) =>
          service.serviceType.id === type.id && service.status === "ACTIVE"
      ),
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="text-gray-900 font-medium">Dịch vụ</span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800  overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center"></div>
        <div className="relative p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ y tế</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            VitaCare Medical cung cấp các dịch vụ y tế chất lượng cao với đội
            ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Phone className="h-4 w-4 mr-2" />
              Hotline: 1900-1234
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/20"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Tìm phòng khám
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for service types */}
      <Tabs defaultValue="all" className="mb-12 mx-auto py-4 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Danh mục dịch vụ</h2>
          <TabsList className="hidden md:flex">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            {serviceTypesMock.map((type) => (
              <TabsTrigger key={type.id} value={`type-${type.id}`}>
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* All services */}
        <TabsContent value="all">
          <div className="space-y-12">
            {servicesByType.map((type) => (
              <div key={type.id}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                    {type.name}
                  </h3>
                  <Link href={`/dich-vu/loai/${toSlug(type.name)}-${type.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {type.services.slice(0, 3).map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Services by type */}
        {serviceTypesMock.map((type) => (
          <TabsContent key={type.id} value={`type-${type.id}`}>
            <div className="mb-6">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                {type.name}
              </h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockServices
                .filter(
                  (service) =>
                    service.serviceType.id === type.id &&
                    service.status === "ACTIVE"
                )
                .map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Contact section */}
      <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-blue-800">
              Cần tư vấn về dịch vụ?
            </h2>
            <p className="text-gray-700">
              Đội ngũ tư vấn viên của VitaCare Medical luôn sẵn sàng hỗ trợ bạn
              24/7. Liên hệ ngay để được tư vấn chi tiết về các dịch vụ y tế.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-blue-700">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">1900-1234</span>
              </div>
              <div className="flex items-center text-blue-700">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const serviceSlug = getServiceSlug(service);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={service.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
          alt={service.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <Badge
          variant="outline"
          className="w-fit mb-2 bg-blue-50 text-blue-700 border-blue-200"
        >
          {service.serviceType.name}
        </Badge>
        <CardTitle className="text-lg">
          <Link
            href={`/dich-vu/${serviceSlug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {service.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {service.descriptionShort}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-500">
          <FileText className="h-4 w-4 mr-1" />
          <span>Chi tiết dịch vụ</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dich-vu/${serviceSlug}`} className="w-full text-sm">
          <Button variant="outline" className="w-full text-sm">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
