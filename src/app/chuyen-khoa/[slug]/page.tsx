import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Users,
  Phone,
  Calendar,
  MapPin,
  Star,
  Activity,
  Stethoscope,
  Award,
  Shield,
  Home,
  ChevronRight,
} from "lucide-react";
import type { Department } from "@/types";
import { toSlug } from "@/utils/slugify";

// Mock data - trong thực tế sẽ fetch từ API
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: `
      <div class="space-y-6">
        <p class="text-lg text-gray-700 leading-relaxed">
          Khoa Tim mạch tại VitaCare Medical là một trong những khoa hàng đầu về chẩn đoán và điều trị các bệnh lý tim mạch. 
          Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị y tế hiện đại nhất, chúng tôi cam kết mang đến dịch vụ 
          chăm sóc sức khỏe tim mạch chất lượng cao nhất.
        </p>
        
        <h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Dịch vụ chuyên khoa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-900 mb-2">Chẩn đoán</h4>
            <ul class="text-blue-800 space-y-1">
              <li>• Siêu âm tim 4D</li>
              <li>• Điện tâm đồ (ECG)</li>
              <li>• Holter 24h</li>
              <li>• Test gắng sức</li>
              <li>• CT mạch vành</li>
            </ul>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold text-green-900 mb-2">Điều trị</h4>
            <ul class="text-green-800 space-y-1">
              <li>• Can thiệp tim mạch</li>
              <li>• Đặt stent mạch vành</li>
              <li>• Phẫu thuật tim hở</li>
              <li>• Điều trị rối loạn nhịp tim</li>
              <li>• Phẫu thuật van tim</li>
            </ul>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Bệnh lý điều trị</h3>
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Bệnh mạch vành</h4>
              <p class="text-sm text-gray-600">Hẹp, tắc mạch vành, nhồi máu cơ tim</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Rối loạn nhịp tim</h4>
              <p class="text-sm text-gray-600">Nhanh tim, chậm tim, rung nhĩ</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Bệnh van tim</h4>
              <p class="text-sm text-gray-600">Hẹp van, hở van, thay van tim</p>
            </div>
          </div>
        </div>
      </div>
    `,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: `
      <div class="space-y-6">
        <p class="text-lg text-gray-700 leading-relaxed">
          Khoa Nhi tại VitaCare Medical chuyên chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 16 tuổi. 
          Với môi trường thân thiện, an toàn và đội ngũ y bác sĩ có chuyên môn cao, chúng tôi cam kết mang đến 
          sự chăm sóc tốt nhất cho các bé.
        </p>
        
        <h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Dịch vụ chuyên khoa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-pink-50 p-4 rounded-lg">
            <h4 class="font-semibold text-pink-900 mb-2">Khám và tư vấn</h4>
            <ul class="text-pink-800 space-y-1">
              <li>• Khám sức khỏe định kỳ</li>
              <li>• Tư vấn dinh dưỡng</li>
              <li>• Theo dõi phát triển</li>
              <li>• Khám bệnh lý nhi khoa</li>
            </ul>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h4 class="font-semibold text-purple-900 mb-2">Tiêm chủng & Phòng bệnh</h4>
            <ul class="text-purple-800 space-y-1">
              <li>• Tiêm chủng mở rộng</li>
              <li>• Vaccine tự nguyện</li>
              <li>• Tư vấn lịch tiêm</li>
              <li>• Theo dõi phản ứng sau tiêm</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: `
      <div class="space-y-6">
        <p class="text-lg text-gray-700 leading-relaxed">
          Khoa Cấp cứu VitaCare Medical hoạt động 24/7, luôn sẵn sàng tiếp nhận và xử lý các trường hợp cấp cứu 
          với tốc độ nhanh nhất và chất lượng cao nhất. Đội ngũ y bác sĩ giàu kinh nghiệm cùng trang thiết bị 
          hiện đại đảm bảo cứu chữa kịp thời.
        </p>
        
        <div class="bg-red-50 border border-red-200 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-red-900 mb-4 flex items-center">
            <Phone className="h-6 w-6 mr-2" />
            Hotline cấp cứu: 115
          </h3>
          <p class="text-red-800">Gọi ngay khi gặp tình huống khẩn cấp. Chúng tôi sẵn sàng hỗ trợ 24/7.</p>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Các trường hợp cấp cứu</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-orange-50 p-4 rounded-lg">
            <h4 class="font-semibold text-orange-900 mb-2">Cấp cứu tim mạch</h4>
            <ul class="text-orange-800 space-y-1">
              <li>• Nhồi máu cơ tim</li>
              <li>• Đột quỵ</li>
              <li>• Rối loạn nhịp tim nghiêm trọng</li>
            </ul>
          </div>
          <div class="bg-red-50 p-4 rounded-lg">
            <h4 class="font-semibold text-red-900 mb-2">Cấp cứu ngoại khoa</h4>
            <ul class="text-red-800 space-y-1">
              <li>• Chấn thương nặng</li>
              <li>• Tai nạn giao thông</li>
              <li>• Bỏng nặng</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Mắt",
    contentHtml: `
      <div class="space-y-6">
        <p class="text-lg text-gray-700 leading-relaxed">
          Khoa Mắt VitaCare Medical chuyên chẩn đoán và điều trị các bệnh lý về mắt với công nghệ laser hiện đại 
          và đội ngũ bác sĩ chuyên môn cao. Chúng tôi cam kết bảo vệ và cải thiện thị lực cho bệnh nhân.
        </p>
        
        <h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Dịch vụ chuyên khoa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-cyan-50 p-4 rounded-lg">
            <h4 class="font-semibold text-cyan-900 mb-2">Khám và chẩn đoán</h4>
            <ul class="text-cyan-800 space-y-1">
              <li>• Khám mắt tổng quát</li>
              <li>• Đo thị lực</li>
              <li>• Chụp OCT võng mạc</li>
              <li>• Đo nhãn áp</li>
            </ul>
          </div>
          <div class="bg-indigo-50 p-4 rounded-lg">
            <h4 class="font-semibold text-indigo-900 mb-2">Phẫu thuật</h4>
            <ul class="text-indigo-800 space-y-1">
              <li>• Phẫu thuật cận thị Lasik</li>
              <li>• Phẫu thuật cataract</li>
              <li>• Điều trị glaucoma</li>
              <li>• Phẫu thuật võng mạc</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Xương khớp",
    contentHtml: `
      <div class="space-y-6">
        <p class="text-lg text-gray-700 leading-relaxed">
          Khoa Xương khớp VitaCare Medical chuyên điều trị các bệnh lý về xương, khớp và cột sống với phương pháp 
          điều trị tiên tiến. Từ điều trị bảo tồn đến phẫu thuật nội soi, chúng tôi mang đến giải pháp tối ưu 
          cho từng bệnh nhân.
        </p>
        
        <h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Dịch vụ chuyên khoa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-amber-50 p-4 rounded-lg">
            <h4 class="font-semibold text-amber-900 mb-2">Điều trị bảo tồn</h4>
            <ul class="text-amber-800 space-y-1">
              <li>• Vật lý trị liệu</li>
              <li>• Tiêm khớp</li>
              <li>• Điều trị sóng xung kích</li>
              <li>• Tập phục hồi chức năng</li>
            </ul>
          </div>
          <div class="bg-emerald-50 p-4 rounded-lg">
            <h4 class="font-semibold text-emerald-900 mb-2">Phẫu thuật</h4>
            <ul class="text-emerald-800 space-y-1">
              <li>• Thay khớp gối, hông</li>
              <li>• Phẫu thuật cột sống</li>
              <li>• Nội soi khớp</li>
              <li>• Phẫu thuật chấn thương</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Thần kinh",
    contentHtml: `
      <div class="space-y-6">
        <p class="text-lg text-gray-700 leading-relaxed">
          Khoa Thần kinh VitaCare Medical chuyên chẩn đoán và điều trị các bệnh lý về hệ thần kinh trung ương 
          và ngoại biên. Với trang thiết bị hiện đại và đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết 
          mang đến phương pháp điều trị hiệu quả nhất.
        </p>
        
        <h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Dịch vụ chuyên khoa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-violet-50 p-4 rounded-lg">
            <h4 class="font-semibold text-violet-900 mb-2">Chẩn đoán</h4>
            <ul class="text-violet-800 space-y-1">
              <li>• Điện não đồ (EEG)</li>
              <li>• Điện cơ đồ (EMG)</li>
              <li>• MRI não và cột sống</li>
              <li>• CT scan não</li>
            </ul>
          </div>
          <div class="bg-rose-50 p-4 rounded-lg">
            <h4 class="font-semibold text-rose-900 mb-2">Điều trị</h4>
            <ul class="text-rose-800 space-y-1">
              <li>• Điều trị đột quỵ</li>
              <li>• Điều trị động kinh</li>
              <li>• Điều trị Parkinson</li>
              <li>• Phẫu thuật thần kinh</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    status: "ACTIVE",
  },
];

// Function to parse slug and get department
const getDepartmentFromSlug = (slug: string): Department | null => {
  // Extract ID from slug (last part after the last hyphen)
  const parts = slug.split("-");
  const id = Number.parseInt(parts[parts.length - 1]);

  if (isNaN(id)) return null;

  return mockDepartments.find((dept) => dept.id === id) || null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = getDepartmentFromSlug(slug);

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
  const department = getDepartmentFromSlug(slug);

  if (!department) {
    notFound();
  }

  // Mock data for additional info
  const departmentInfo = {
    doctorCount:
      department.id === 1
        ? 15
        : department.id === 2
        ? 12
        : department.id === 3
        ? 8
        : department.id === 4
        ? 10
        : department.id === 5
        ? 14
        : 11,
    patientCount:
      department.id === 1
        ? 2500
        : department.id === 2
        ? 1800
        : department.id === 3
        ? 3200
        : department.id === 4
        ? 1500
        : department.id === 5
        ? 2100
        : 1400,
    rating: 4.8,
    workingHours:
      department.name === "Cấp cứu"
        ? "24/7 - Tất cả các ngày"
        : "T2-T6: 7:00-17:00, T7-CN: 8:00-16:00",
    location: "Tầng 3, VitaCare Medical",
    phone: department.name === "Cấp cứu" ? "115" : "1900-1234",
  };

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Thông tin liên hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Hotline</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {departmentInfo.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Vị trí</div>
                    <div className="text-gray-600">
                      {departmentInfo.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Giờ làm việc</div>
                    <div className="text-gray-600">
                      {departmentInfo.workingHours}
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Đặt lịch online
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi tư vấn
                </Button>
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
