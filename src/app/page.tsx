import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Shield,
  Users,
  ArrowRight,
  Stethoscope,
  Calendar,
  FileText,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-gray-200 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="VitaCare Medical Logo"
                  width={60}
                  height={60}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  VitaCare Medical
                </h1>
                <p className="text-sm text-gray-600">
                  Chăm sóc tận tâm – Sống khỏe mỗi ngày
                </p>
              </div>
            </div>
            <Link href="/admin">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Shield className="h-4 w-4 mr-2" />
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

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

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng nâng cao hiệu quả quản lý?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Bắt đầu sử dụng VitaCare Medical ngay hôm nay và trải nghiệm sự khác
            biệt.
          </p>
          <Link href="/admin">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Bắt đầu ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">VitaCare Medical</span>
            </div>
            <p className="text-gray-400 mb-4 text-lg">
              Chăm sóc tận tâm – Sống khỏe mỗi ngày
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-sm text-gray-500">
                © 2024 VitaCare Medical. Phát triển bởi VASD IT Team.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
