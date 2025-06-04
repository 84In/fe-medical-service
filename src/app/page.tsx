import { HeroCarousel } from "@/components/home/hero-carousel";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Heart,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Hệ thống quản lý y tế
              <span className="text-blue-600"> hiện đại</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              VitaCare Medical cung cấp giải pháp quản lý toàn diện cho các cơ sở
              y tế, từ quản lý bệnh nhân đến điều phối nhân sự và tài chính.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admin">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                >
                  Truy cập hệ thống
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section> */}
      <HeroCarousel />
      {/* Services & News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Services Column */}
          <div className="h-full">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Stethoscope className="h-6 w-6 text-blue-600 mr-3" />
                Dịch vụ y tế
              </h3>
              <p className="text-gray-600">
                Các dịch vụ chăm sóc sức khỏe chuyên nghiệp
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <Link href={"/dich-vu/kham-tong-quat-1"}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Khám tổng quát
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Khám sức khỏe định kỳ và tầm soát bệnh lý
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Chuyên khoa tim mạch
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Điều trị các bệnh lý về tim và mạch máu
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Nhi khoa
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Chăm sóc sức khỏe trẻ em từ sơ sinh đến 16 tuổi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Cấp cứu 24/7
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Dịch vụ cấp cứu và chăm sóc khẩn cấp
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Link href={"/dich-vu"} passHref>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                Xem tất cả dịch vụ
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>

          {/* News Column */}
          <div className="h-full">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 text-green-600 mr-3" />
                Tin tức y tế
              </h3>
              <p className="text-gray-600">
                Cập nhật thông tin và kiến thức sức khỏe
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      15/12/2024
                    </div>
                    <h4 className="font-semibold text-gray-900 leading-tight">
                      Phòng ngừa bệnh tim mạch trong mùa đông
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Những lưu ý quan trọng để bảo vệ sức khỏe tim mạch khi
                      thời tiết chuyển lạnh...
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      12/12/2024
                    </div>
                    <h4 className="font-semibold text-gray-900 leading-tight">
                      Chương trình tiêm chủng mở rộng cho trẻ em
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      VitaCare Medical triển khai chương trình tiêm chủng miễn
                      phí cho trẻ em dưới 5 tuổi...
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      10/12/2024
                    </div>
                    <h4 className="font-semibold text-gray-900 leading-tight">
                      Khánh thành phòng khám chuyên khoa mới
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Chính thức đưa vào hoạt động phòng khám chuyên khoa thần
                      kinh với trang thiết bị hiện đại...
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      08/12/2024
                    </div>
                    <h4 className="font-semibold text-gray-900 leading-tight">
                      Hội thảo "Dinh dưỡng và sức khỏe"
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Tham gia hội thảo miễn phí về dinh dưỡng và lối sống lành
                      mạnh vào cuối tuần...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Link href={"/tin-tuc"}>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                Xem tất cả tin tức
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Vì sao chọn chúng tôi?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              VitaCare Medical cam kết mang đến dịch vụ chăm sóc sức khỏe tốt
              nhất với những ưu điểm vượt trội
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Đội ngũ chuyên gia hàng đầu
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Bác sĩ giàu kinh nghiệm, được đào tạo bài bản tại các trường đại
                học y khoa uy tín trong và ngoài nước
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Trang thiết bị hiện đại
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Đầu tư máy móc, thiết bị y tế tiên tiến nhất, đảm bảo chẩn đoán
                chính xác và điều trị hiệu quả
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Dịch vụ 24/7
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Hoạt động liên tục, sẵn sàng phục vụ bệnh nhân mọi lúc, đặc biệt
                trong các trường hợp cấp cứu
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Quy trình chuẩn quốc tế
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Áp dụng quy trình khám chữa bệnh theo tiêu chuẩn quốc tế, đảm
                bảo an toàn và chất lượng cao nhất
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Chăm sóc tận tâm
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Đặt bệnh nhân làm trung tâm, chăm sóc chu đáo từ khâu tiếp đón
                đến theo dõi sau điều trị
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Môi trường thân thiện
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Không gian thoải mái, nhân viên thân thiện, tạo cảm giác an tâm
                cho bệnh nhân và gia đình
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
