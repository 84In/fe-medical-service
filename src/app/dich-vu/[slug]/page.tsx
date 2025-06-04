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
    contentHtml: `
      <h2>Khám sức khoẻ tổng quát</h2>
<p>
  Gói khám sức khỏe tổng quát tại <strong>Bệnh viện VitaCare</strong> được xây dựng nhằm giúp khách hàng đánh giá toàn diện tình trạng sức khỏe hiện tại, phát hiện sớm các nguy cơ tiềm ẩn và có hướng điều trị kịp thời. Gói dịch vụ bao gồm các xét nghiệm từ cơ bản đến chuyên sâu, phù hợp với nhu cầu của nhiều đối tượng khác nhau.
</p>
<p>
  <strong>Đối tượng phù hợp:</strong> Người từ 18 tuổi trở lên, người có tiền sử bệnh lý trong gia đình, hoặc làm việc trong môi trường áp lực, độc hại.<br/>
  <strong>Thời gian thực hiện:</strong> Khoảng 2–3 giờ, bao gồm khám tổng quát, thực hiện xét nghiệm, siêu âm và tư vấn kết quả.<br/>
  <strong>Chi phí:</strong> Dao động từ 1.500.000 VNĐ đến 3.000.000 VNĐ tuỳ theo gói dịch vụ.<br/>
  <strong>Địa điểm:</strong> Bệnh viện VitaCare – 123 Đường ABC, Quận 1, TP. Hồ Chí Minh.
</p>

<h3>Dịch vụ tổng quát bao gồm:</h3>
<ul>
  <li>Khám lâm sàng toàn diện</li>
  <li>Xét nghiệm máu và sinh hoá cơ bản</li>
  <li>Phân tích nước tiểu</li>
  <li>Siêu âm ổ bụng tổng quát</li>
  <li>Đo điện tâm đồ (ECG)</li>
</ul>

<img src="https://umcclinic.com.vn/Data/Sites/1/media/dich-vu/ca-nhan/kham-suc-khoe-tong-quat-va-tam-soat-ung-thu/h1.jpg" alt="Phòng khám tim mạch hiện đại" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

<h3>Đội ngũ chuyên gia</h3>
<p>
  Được dẫn dắt bởi các bác sĩ đầu ngành giàu kinh nghiệm trong lĩnh vực tầm soát và phát hiện sớm bệnh lý, đội ngũ chuyên gia tại VitaCare luôn tận tâm mang đến kết quả chính xác và lời khuyên y khoa kịp thời cho từng khách hàng.
</p>

<h3>Trang thiết bị hiện đại</h3>
<ul>
  <li>Máy siêu âm 4D độ phân giải cao</li>
  <li>Hệ thống xét nghiệm tự động</li>
  <li>Thiết bị đo điện tim, huyết áp và chỉ số sinh tồn tiên tiến</li>
</ul>

<p><em>Để được tư vấn hoặc đặt lịch khám, vui lòng liên hệ hotline: <strong>1900-1234</strong></em></p>
    `,
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
    contentHtml: `<h2>Tầm soát ung thư</h2>
<p>
  Gói tầm soát ung thư tại <strong>Bệnh viện VitaCare</strong> được thiết kế nhằm phát hiện sớm các dấu hiệu bất thường có thể dẫn đến ung thư, từ đó giúp tăng hiệu quả điều trị và cải thiện tiên lượng bệnh. Gói dịch vụ được cá nhân hóa theo độ tuổi, giới tính và yếu tố nguy cơ của từng khách hàng.
</p>

<p>
  <strong>Đối tượng nên thực hiện:</strong> Người trên 30 tuổi, có tiền sử gia đình mắc ung thư, hút thuốc lá, uống rượu, tiếp xúc với hóa chất độc hại hoặc có dấu hiệu bất thường kéo dài không rõ nguyên nhân.<br/>
  <strong>Thời gian thực hiện:</strong> Khoảng 3–4 giờ, bao gồm khám lâm sàng, thực hiện các xét nghiệm chuyên sâu, chẩn đoán hình ảnh và tư vấn kết quả.<br/>
  <strong>Chi phí:</strong> Từ 2.500.000 VNĐ đến 6.000.000 VNĐ tùy theo gói và giới tính.<br/>
  <strong>Địa điểm:</strong> Bệnh viện VitaCare – 123 Đường ABC, Quận 1, TP. Hồ Chí Minh.
</p>

<h3>Các hạng mục tầm soát tiêu biểu:</h3>
<ul>
  <li>Xét nghiệm máu tầm soát ung thư (CEA, AFP, CA-125, CA 19-9,...)</li>
  <li>Nội soi dạ dày – đại tràng</li>
  <li>Siêu âm tuyến giáp, ổ bụng, vú (đối với nữ)</li>
  <li>Chụp X-quang, CT ngực, hoặc MRI (theo chỉ định)</li>
  <li>Tư vấn kết quả và hướng theo dõi, điều trị</li>
</ul>

<img src="https://umcclinic.com.vn/Data/Sites/1/media/dich-vu/ca-nhan/kham-suc-khoe-tong-quat-va-tam-soat-ung-thu/h1.jpg" alt="Máy chụp CT hiện đại tại Bệnh viện VitaCare" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

<h3>Ưu điểm vượt trội</h3>
<ul>
  <li>Phát hiện sớm ung thư ngay cả khi chưa có triệu chứng</li>
  <li>Công nghệ chẩn đoán hình ảnh và xét nghiệm tiên tiến</li>
  <li>Đội ngũ bác sĩ chuyên môn cao trong lĩnh vực ung bướu</li>
  <li>Tư vấn cá nhân hóa theo hồ sơ sức khoẻ</li>
</ul>

<p><em>Liên hệ <strong>1900-1234</strong> để được tư vấn miễn phí và đặt lịch tầm soát kịp thời.</em></p>
`,
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
    contentHtml: `<h2>Siêu âm tổng quát</h2>
<p>Dịch vụ siêu âm tổng quát tại VitaCare Medical sử dụng công nghệ siêu âm 4D hiện đại nhất, giúp chẩn đoán chính xác các bệnh lý về nội tạng.</p>

<h3>Các loại siêu âm</h3>
<ul>
  <li>Siêu âm ổ bụng tổng quát</li>
  <li>Siêu âm tim</li>
  <li>Siêu âm tuyến giáp</li>
  <li>Siêu âm vú</li>
  <li>Siêu âm thai</li>
</ul>

<p><em>Đặt lịch: <strong>1900-1234</strong></em></p>`,
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

// Tìm dịch vụ theo slug
const getServiceBySlug = (slug: string): Service | undefined => {
  // Lấy ID từ slug (phần cuối cùng sau dấu gạch ngang)
  const parts = slug.split("-");
  const id = Number.parseInt(parts[parts.length - 1]);

  return mockServices.find(
    (service) => service.id === id && service.status === "ACTIVE"
  );
};

// Lấy các dịch vụ liên quan (cùng loại dịch vụ)
const getRelatedServices = (service: Service, limit = 3): Service[] => {
  return mockServices
    .filter(
      (s) =>
        s.serviceType.id === service.serviceType.id &&
        s.id !== service.id &&
        s.status === "ACTIVE"
    )
    .slice(0, limit);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

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
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service);

  // ... rest of the component remains the same

  return (
    <div className="container mx-auto py-4 px-4 md:px-2">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm bg-white border border-green-600 py-2 px-2 rounded-md text-gray-500 mb-3">
        <Link href="/" className="flex items-center hover:text-blue-600">
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
      </nav>

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
              <div className="prose prose-blue max-w-none">
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
