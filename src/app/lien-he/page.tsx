import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Youtube,
  Instagram,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/header";
import MainLayout from "@/components/layout/main-layout";

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn về các dịch vụ y
              tế tốt nhất
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8">
            {/* Hotline */}
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">HOTLINE 24/7</h3>
                <p className="text-2xl font-bold text-red-600 mb-1">
                  1900 6923
                </p>
                <p className="text-sm text-gray-600">Tư vấn miễn phí</p>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">ĐỊA CHỈ</h3>
                <p className="text-gray-700 text-sm">
                  215 Nguyễn Văn Cừ
                  <br />
                  Quận 5, TP. Hồ Chí Minh
                </p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">EMAIL</h3>
                <p className="text-gray-700 text-sm">
                  info@vitacaremedical.vn
                  <br />
                  support@vitacaremedical.vn
                </p>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">GIỜ LÀM VIỆC</h3>
                <p className="text-gray-700 text-sm">
                  T2-T6: 7:00 - 17:00
                  <br />
                  T7-CN: 8:00 - 16:00
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600 flex items-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    Gửi tin nhắn cho chúng tôi
                  </CardTitle>
                  <p className="text-gray-600">
                    Điền thông tin vào form bên dưới, chúng tôi sẽ liên hệ lại
                    với bạn trong thời gian sớm nhất.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Họ *</Label>
                      <Input
                        id="firstName"
                        placeholder="Nhập họ của bạn"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Tên *</Label>
                      <Input
                        id="lastName"
                        placeholder="Nhập tên của bạn"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0123 456 789"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Chủ đề</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chủ đề cần tư vấn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Tư vấn chung</SelectItem>
                        <SelectItem value="appointment">
                          Đặt lịch khám
                        </SelectItem>
                        <SelectItem value="services">Dịch vụ y tế</SelectItem>
                        <SelectItem value="insurance">Bảo hiểm y tế</SelectItem>
                        <SelectItem value="emergency">Cấp cứu</SelectItem>
                        <SelectItem value="complaint">Khiếu nại</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tin nhắn *</Label>
                    <Textarea
                      id="message"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Gửi tin nhắn
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Bằng cách gửi form này, bạn đồng ý với{" "}
                    <a
                      href="/chinh-sach-bao-mat"
                      className="text-blue-600 hover:underline"
                    >
                      chính sách bảo mật
                    </a>{" "}
                    của chúng tôi.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              {/* Map */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Vị trí của chúng tôi
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gray-200 rounded-b-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=256&width=500"
                      alt="Bản đồ VitaCare Medical"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                        <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold text-gray-900">
                          VitaCare Medical
                        </p>
                        <p className="text-sm text-gray-600">
                          215 Nguyễn Văn Cừ, Q.5
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="shadow-lg border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Zap className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-600 mb-2">
                        TRƯỜNG HỢP KHẨN CẤP
                      </h3>
                      <p className="text-gray-700 mb-3">
                        Nếu bạn gặp tình huống khẩn cấp cần hỗ trợ y tế ngay lập
                        tức, vui lòng gọi:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-red-600" />
                          <span className="font-bold text-red-600 text-lg">
                            115
                          </span>
                          <span className="text-gray-600">
                            (Cấp cứu quốc gia)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-red-600" />
                          <span className="font-bold text-red-600 text-lg">
                            1900 6923
                          </span>
                          <span className="text-gray-600">
                            (Hotline VitaCare)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Kết nối với chúng tôi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-red-50 hover:border-red-300"
                    >
                      <Youtube className="h-5 w-5 text-red-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-pink-50 hover:border-pink-300"
                    >
                      <Instagram className="h-5 w-5 text-pink-600" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Theo dõi chúng tôi trên mạng xã hội để cập nhật những thông
                    tin y tế hữu ích và các chương trình khuyến mãi mới nhất.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dưới đây là những câu hỏi thường gặp từ khách hàng. Nếu bạn không
              tìm thấy câu trả lời, vui lòng liên hệ trực tiếp với chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Làm thế nào để đặt lịch khám?
                </h3>
                <p className="text-gray-600 text-sm">
                  Bạn có thể đặt lịch khám qua hotline 1900 6923, website của
                  chúng tôi, hoặc trực tiếp tại quầy lễ tân của bệnh viện.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Bệnh viện có nhận bảo hiểm y tế không?
                </h3>
                <p className="text-gray-600 text-sm">
                  Có, chúng tôi nhận tất cả các loại bảo hiểm y tế bao gồm BHYT,
                  bảo hiểm tư nhân và các gói bảo hiểm doanh nghiệp.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Thời gian chờ khám bao lâu?
                </h3>
                <p className="text-gray-600 text-sm">
                  Thời gian chờ khám trung bình từ 15-30 phút. Đối với các
                  trường hợp đặt lịch trước, thời gian chờ sẽ được tối ưu hóa.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Có dịch vụ khám tại nhà không?
                </h3>
                <p className="text-gray-600 text-sm">
                  Có, chúng tôi cung cấp dịch vụ khám tại nhà cho một số chuyên
                  khoa. Vui lòng liên hệ hotline để biết thêm chi tiết.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
