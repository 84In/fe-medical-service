"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Users,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Calendar,
  Phone,
  Star,
  MapPin,
  Activity,
  Zap,
  ChevronRight,
  Home,
} from "lucide-react";
import type { Department } from "@/types";
import { toSlug } from "@/utils/slugify";

// Mock data với thông tin chi tiết hơn
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: `
      <p>Khoa Tim mạch chuyên điều trị các bệnh lý về tim và mạch máu với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.</p>
      <h3>Dịch vụ chính:</h3>
      <ul>
        <li>Khám và tư vấn tim mạch</li>
        <li>Siêu âm tim 4D</li>
        <li>Điện tâm đồ (ECG)</li>
        <li>Holter 24h</li>
        <li>Test gắng sức</li>
        <li>Can thiệp tim mạch</li>
      </ul>
    `,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: `
      <p>Khoa Nhi chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến 16 tuổi với môi trường thân thiện và an toàn.</p>
      <h3>Dịch vụ chính:</h3>
      <ul>
        <li>Khám sức khỏe định kỳ</li>
        <li>Tiêm chủng đầy đủ</li>
        <li>Điều trị bệnh lý nhi khoa</li>
        <li>Tư vấn dinh dưỡng</li>
        <li>Cấp cứu nhi</li>
      </ul>
    `,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: `
      <p>Khoa Cấp cứu hoạt động 24/7, sẵn sàng tiếp nhận và xử lý các trường hợp cấp cứu với tốc độ nhanh nhất.</p>
      <h3>Dịch vụ chính:</h3>
      <ul>
        <li>Cấp cứu tim mạch</li>
        <li>Cấp cứu hô hấp</li>
        <li>Xử lý chấn thương</li>
        <li>Cấp cứu sản khoa</li>
        <li>Cấp cứu nhi khoa</li>
      </ul>
    `,
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Mắt",
    contentHtml: `
      <p>Khoa Mắt chuyên điều trị các bệnh lý về mắt với công nghệ laser hiện đại và đội ngũ bác sĩ chuyên môn cao.</p>
      <h3>Dịch vụ chính:</h3>
      <ul>
        <li>Khám mắt tổng quát</li>
        <li>Phẫu thuật cận thị</li>
        <li>Điều trị glaucoma</li>
        <li>Phẫu thuật cataract</li>
        <li>Điều trị võng mạc</li>
      </ul>
    `,
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Xương khớp",
    contentHtml: `
      <p>Khoa Xương khớp chuyên điều trị các bệnh lý về xương, khớp và cột sống với phương pháp điều trị tiên tiến.</p>
      <h3>Dịch vụ chính:</h3>
      <ul>
        <li>Khám xương khớp</li>
        <li>Phẫu thuật thay khớp</li>
        <li>Điều trị cột sống</li>
        <li>Vật lý trị liệu</li>
        <li>Phẫu thuật nội soi</li>
      </ul>
    `,
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Thần kinh",
    contentHtml: `
      <p>Khoa Thần kinh chuyên chẩn đoán và điều trị các bệnh lý về hệ thần kinh trung ương và ngoại biên.</p>
      <h3>Dịch vụ chính:</h3>
      <ul>
        <li>Khám thần kinh</li>
        <li>Điều trị đột quỵ</li>
        <li>Điều trị động kinh</li>
        <li>Điều trị Parkinson</li>
        <li>Phẫu thuật thần kinh</li>
      </ul>
    `,
    status: "ACTIVE",
  },
];

// Mock data cho thống kê
const departmentStats = {
  totalDepartments: mockDepartments.length,
  totalDoctors: 85,
  totalPatients: 12500,
  emergencyAvailable: true,
};

// Function to create slug from name and id
const createSlug = (name: string, id: number): string => {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
  return `${slug}-${id}`;
};

export default function ChuyenKhoaClientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");

  // Filter departments
  const filteredDepartments = mockDepartments
    .filter((department) => {
      const matchesSearch = department.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || department.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const getDoctorCount = (departmentId: number) => {
    // Mock data - trong thực tế sẽ fetch từ API
    const counts: Record<number, number> = {
      1: 15, // Tim mạch
      2: 12, // Nhi khoa
      3: 8, // Cấp cứu
      4: 10, // Mắt
      5: 14, // Xương khớp
      6: 11, // Thần kinh
    };
    return counts[departmentId] || 8;
  };

  const getPatientCount = (departmentId: number) => {
    // Mock data - trong thực tế sẽ fetch từ API
    const counts: Record<number, number> = {
      1: 2500, // Tim mạch
      2: 1800, // Nhi khoa
      3: 3200, // Cấp cứu
      4: 1500, // Mắt
      5: 2100, // Xương khớp
      6: 1400, // Thần kinh
    };
    return counts[departmentId] || 1000;
  };
  function formatNumberWithDot(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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
            <span className="text-gray-900 font-medium">Chuyên khoa</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Các chuyên khoa tại VitaCare Medical
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Đội ngũ bác sĩ chuyên môn cao, trang thiết bị hiện đại, cam kết
              mang đến dịch vụ y tế chất lượng cao nhất
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {formatNumberWithDot(departmentStats.totalDepartments)}+
                </div>
                <div className="text-blue-200">Chuyên khoa</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {departmentStats.totalDoctors}+
                </div>
                <div className="text-blue-200">Bác sĩ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {departmentStats.totalPatients.toLocaleString()}+
                </div>
                <div className="text-blue-200">Bệnh nhân/năm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200">Cấp cứu</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm chuyên khoa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px] h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả</SelectItem>
                  <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                  <SelectItem value="INACTIVE">Tạm ngừng</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px] h-12">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Theo tên</SelectItem>
                  <SelectItem value="doctors">Theo số bác sĩ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Cấp cứu 24/7</h3>
                <p className="text-red-700">
                  Luôn sẵn sàng phục vụ trong các tình huống khẩn cấp
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">115</div>
                <div className="text-sm text-red-700">Hotline cấp cứu</div>
              </div>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Gọi ngay
              </Button>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepartments.map((department) => {
            const doctorCount = getDoctorCount(department.id);
            const patientCount = getPatientCount(department.id);
            const slug = createSlug(department.name, department.id);

            return (
              <Card
                key={department.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {department.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={
                        department.status === "ACTIVE"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {department.status === "ACTIVE"
                        ? "Hoạt động"
                        : "Tạm ngừng"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {department.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 line-clamp-3">
                    {stripHtml(department.contentHtml)}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {doctorCount}
                      </div>
                      <div className="text-xs text-gray-600">Bác sĩ</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Activity className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {patientCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Bệnh nhân/năm</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        4.8
                      </div>
                      <div className="text-xs text-gray-600">Đánh giá</div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Clock className="h-4 w-4" />
                    <span>
                      {department.name === "Cấp cứu"
                        ? "24/7 - Tất cả các ngày"
                        : "T2-T6: 7:00-17:00, T7-CN: 8:00-16:00"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Link href={`/chuyen-khoa/${slug}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Xem chi tiết
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-blue-50"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No results */}
        {filteredDepartments.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Không tìm thấy chuyên khoa
            </h3>
            <p className="text-gray-600 mb-6">
              Không có chuyên khoa nào phù hợp với tiêu chí tìm kiếm của bạn.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("ALL");
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cần tư vấn hoặc đặt lịch khám?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đội ngũ tư vấn viên của chúng tôi sẵn sàng hỗ trợ bạn 24/7. Liên
              hệ ngay để được tư vấn miễn phí và đặt lịch khám.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Hotline tư vấn
              </h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">1900-1234</p>
              <p className="text-sm text-gray-600">24/7 - Miễn phí</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
              <p className="text-gray-700 mb-1">123 Đường ABC</p>
              <p className="text-sm text-gray-600">Quận 1, TP.HCM</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Đặt lịch online
              </h3>
              <Link href="/dat-lich">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Đặt lịch ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
