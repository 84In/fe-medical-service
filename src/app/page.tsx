import { HeroCarousel } from "@/components/home/hero-carousel";
import { MedicalServices } from "@/components/home/medical-services";
import { NewsHero } from "@/components/home/news-hero";
import MainLayout from "@/components/layout/main-layout";
import { Award, CheckCircle, Clock, Heart, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      <HeroCarousel />
      {/* Services & News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Services Column */}
          <MedicalServices />
          {/* News Column */}
          <NewsHero />
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
