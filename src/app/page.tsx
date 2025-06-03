import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  FileText,
  Heart,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Tính năng nổi bật
          </h3>
          <p className="text-lg text-gray-600">
            Quản lý hiệu quả mọi hoạt động của cơ sở y tế
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Quản lý bệnh nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Hệ thống quản lý hồ sơ bệnh nhân toàn diện với khả năng tìm kiếm
                và phân loại thông minh.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Quản lý bác sĩ</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Quản lý thông tin bác sĩ, chuyên khoa, lịch làm việc và đánh giá
                hiệu suất.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Đặt lịch hẹn</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Hệ thống đặt lịch hẹn thông minh với khả năng tự động phân bổ và
                nhắc nhở.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Hồ sơ y tế</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Lưu trữ và quản lý hồ sơ y tế điện tử an toàn, tuân thủ các tiêu
                chuẩn quốc tế.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Thống kê hệ thống
            </h3>
            <p className="text-lg text-gray-600">
              Hiệu quả hoạt động được chứng minh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-gray-600 text-lg">
                Bệnh nhân đang điều trị
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">45</div>
              <div className="text-gray-600 text-lg">Bác sĩ chuyên khoa</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">28</div>
              <div className="text-gray-600 text-lg">Lịch hẹn hôm nay</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                99.9%
              </div>
              <div className="text-gray-600 text-lg">Thời gian hoạt động</div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
