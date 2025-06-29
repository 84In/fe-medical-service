import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACT_INFO } from "@/constants/information";
import { getDepartmentByIdServer } from "@/services";
import type { Department } from "@/types";
import {
  Award,
  Calendar,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  Phone,
  Shield,
  Star,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Function to parse slug and get department
const getDepartmentFromSlug = async (
  slug: string
): Promise<Department | null> => {
  const parts = slug.split("-");
  const id = Number.parseInt(parts[parts.length - 1]);

  if (isNaN(id)) return null;

  return await getDepartmentByIdServer(id);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartmentFromSlug(slug);

  if (!department) {
    return {
      title: "Chuyên khoa không tìm thấy - VitaCare Medical",
    };
  }

  return {
    title: `${department.name} - VitaCare Medical`,
    description: `Khoa ${department.name} tại VitaCare Medical với đội ngũ bác sĩ chuyên môn cao và trang thiết bị hiện đại`,
    keywords: `${department.name}, chuyên khoa, VitaCare Medical, bệnh viện, y tế`,
  };
}

export default async function ChuyenKhoaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartmentFromSlug(slug);

  if (!department) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="hidden lg:inline-flex items-center">
              <Link href="/chuyen-khoa" className="hover:text-blue-600">
                Chuyên khoa
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
            </span>
            <span className="text-gray-900 font-medium">{department.name}</span>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6"></div>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">
                  {department.name.charAt(0)}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Khoa {department.name.toLocaleLowerCase()}
                </h1>
                <div className="h-1/2 justify-center items-center">
                  <Badge
                    className={
                      department.status === "ACTIVE"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    {department.status === "ACTIVE" ? "Hoạt động" : "Tạm ngừng"}
                  </Badge>
                </div>
              </div>
              <p className="text-xl text-blue-100 max-w-3xl">
                Chuyên khoa {department.name} tại VitaCare Medical với đội ngũ
                bác sĩ chuyên môn cao và trang thiết bị hiện đại
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Giới thiệu chuyên khoa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-h4:font-semibold prose-h4:mb-2 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:space-y-1 prose-li:text-gray-800"
                  dangerouslySetInnerHTML={{ __html: department.contentHtml }}
                />
              </CardContent>
            </Card>

            {/* Stats */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {departmentInfo.doctorCount}
                  </div>
                  <div className="text-sm text-gray-600">Bác sĩ</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {departmentInfo.patientCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Bệnh nhân/năm</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2 fill-current" />
                  <div className="text-2xl font-bold text-gray-900">
                    {departmentInfo.rating}
                  </div>
                  <div className="text-sm text-gray-600">Đánh giá</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">A+</div>
                  <div className="text-sm text-gray-600">Chất lượng</div>
                </CardContent>
              </Card>
            </div> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-medium">
                  Thông tin liên hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Hotline</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {CONTACT_INFO.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Vị trí</div>
                    <div className="text-gray-600">{CONTACT_INFO.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Giờ làm việc</div>
                    <div className="text-gray-600">
                      {CONTACT_INFO.workingHours}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Đặt lịch khám</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Đặt lịch online
                </Button> */}
                <a href="tel:19001234" className="w-full">
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Gọi tư vấn
                  </Button>
                </a>
                <Button variant="outline" className="w-full">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Xem bác sĩ
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Ưu điểm nổi bật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Trang thiết bị hiện đại</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Bác sĩ giàu kinh nghiệm</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm">Dịch vụ chất lượng cao</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">Thời gian chờ ngắn</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
