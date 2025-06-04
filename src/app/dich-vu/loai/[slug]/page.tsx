import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Home, Phone } from "lucide-react";
import { toSlug } from "@/utils/slugify";
import type { Service, ServiceType } from "@/types/services";

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

// Tìm loại dịch vụ theo slug
const getServiceTypeBySlug = (slug: string): ServiceType | undefined => {
  // Lấy ID từ slug (phần cuối cùng sau dấu gạch ngang)
  const parts = slug.split("-");
  const id = Number.parseInt(parts[parts.length - 1]);

  return serviceTypesMock.find(
    (type) => type.id === id && type.status === "ACTIVE"
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceType = getServiceTypeBySlug(slug);

  if (!serviceType) {
    return {
      title: "Loại dịch vụ không tồn tại | VitaCare Medical",
      description: "Loại dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `Dịch vụ ${serviceType.name} | VitaCare Medical`,
    description: serviceType.description,
  };
}

export default async function ServiceTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceType = getServiceTypeBySlug(slug);

  if (!serviceType) {
    notFound();
  }

  const services = mockServices.filter(
    (service) =>
      service.serviceType.id === serviceType.id && service.status === "ACTIVE"
  );

  return (
    <div className="container mx-auto py-4 px-4 md:px-2">
      {/* Breadcrumb */}
      <nav className="flex items-center px-2 text-sm bg-white border border-green-600 py-2 rounded-md text-gray-500 mb-3">
        <Link href="/" className="flex items-center hover:text-blue-600">
          <Home className="h-4 w-4 mr-1" />
          <span>Trang chủ</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/dich-vu" className="hover:text-blue-600">
          Dịch vụ
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 font-medium">{serviceType.name}</span>
      </nav>

      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center"></div>
        <div className="relative p-4 md:p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Dịch vụ {serviceType.name}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            {serviceType.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Phone className="h-4 w-4 mr-2" />
              Hotline: 1900-1234
            </Button>
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Danh sách dịch vụ {serviceType.name.toLowerCase()}
        </h2>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không có dịch vụ
            </h3>
            <p className="text-gray-600 mb-6">
              Hiện tại không có dịch vụ nào thuộc loại {serviceType.name}
            </p>
            <Link href="/dich-vu">
              <Button>Xem tất cả dịch vụ</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Other service types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Các loại dịch vụ khác</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceTypesMock
            .filter(
              (type) => type.id !== serviceType.id && type.status === "ACTIVE"
            )
            .map((type) => (
              <Link
                key={type.id}
                href={`/dich-vu/loai/${toSlug(type.name)}-${type.id}`}
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardDescription>{type.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full text-blue-600 hover:text-blue-700"
                    >
                      Xem dịch vụ <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
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
        <Link href={`/dich-vu/${serviceSlug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
