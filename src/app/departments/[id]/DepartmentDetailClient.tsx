"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  BookmarkPlus,
  Star,
} from "lucide-react";
import type { Department } from "@/types/doctor";
import { useState } from "react";

// Mock data - trong thực tế sẽ fetch từ API
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: `
      <h2>Khoa Tim mạch - Chăm sóc tim mạch chuyên nghiệp</h2>
      <p>Khoa Tim mạch của VitaCare Medical là một trong những khoa hàng đầu về điều trị các bệnh lý tim mạch tại Việt Nam. Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tim mạch tốt nhất.</p>
      
      <h3>Dịch vụ chuyên khoa</h3>
      <ul>
        <li><strong>Khám và tư vấn tim mạch:</strong> Đánh giá tổng quát sức khỏe tim mạch</li>
        <li><strong>Siêu âm tim:</strong> Chẩn đoán hình ảnh tim và van tim</li>
        <li><strong>Điện tâm đồ (ECG):</strong> Theo dõi nhịp tim và hoạt động điện của tim</li>
        <li><strong>Holter 24h:</strong> Theo dõi liên tục nhịp tim trong 24 giờ</li>
        <li><strong>Test gắng sức:</strong> Đánh giá khả năng hoạt động của tim</li>
      </ul>

      <img src="/placeholder.svg?height=300&width=600" alt="Phòng khám tim mạch hiện đại" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

      <h3>Đội ngũ chuyên gia</h3>
      <p>Khoa Tim mạch có đội ngũ gồm <strong>15 bác sĩ chuyên khoa</strong> với nhiều năm kinh nghiệm, trong đó có 3 giáo sư, 5 phó giáo sư và các bác sĩ được đào tạo tại các trường đại học y khoa hàng đầu.</p>

      <h3>Trang thiết bị hiện đại</h3>
      <ul>
        <li>Máy siêu âm tim 4D thế hệ mới</li>
        <li>Hệ thống điện tâm đồ 12 chuyển đạo</li>
        <li>Máy Holter 24h không dây</li>
        <li>Hệ thống cấp cứu tim mạch 24/7</li>
      </ul>

      <p><em>Để đặt lịch khám hoặc tư vấn, vui lòng liên hệ hotline: <strong>1900-1234</strong></em></p>
    `,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: `
      <h2>Khoa Nhi - Chăm sóc sức khỏe trẻ em toàn diện</h2>
      <p>Khoa Nhi của VitaCare Medical chuyên cung cấp dịch vụ chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 16 tuổi. Với môi trường thân thiện, an toàn và đội ngũ y bác sĩ tận tâm, chúng tôi luôn đặt sức khỏe và sự thoải mái của các bé lên hàng đầu.</p>

      <img src="/placeholder.svg?height=250&width=500" alt="Phòng khám nhi khoa thân thiện" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

      <h3>Dịch vụ nhi khoa</h3>
      <ul>
        <li><strong>Khám sức khỏe định kỳ:</strong> Theo dõi phát triển của trẻ</li>
        <li><strong>Tiêm chủng:</strong> Đầy đủ các loại vaccine theo lịch</li>
        <li><strong>Điều trị bệnh lý nhi khoa:</strong> Cảm cúm, tiêu hóa, hô hấp</li>
        <li><strong>Tư vấn dinh dưỡng:</strong> Hướng dẫn chế độ ăn phù hợp</li>
        <li><strong>Cấp cứu nhi:</strong> Xử lý các tình huống khẩn cấp</li>
      </ul>

      <h3>Môi trường thân thiện</h3>
      <p>Phòng khám được thiết kế với màu sắc tươi sáng, đồ chơi giáo dục và không gian vui chơi giúp các bé cảm thấy thoải mái khi đến khám.</p>
    `,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: `
      <h2>Khoa Cấp cứu - Sẵn sàng 24/7</h2>
      <p>Khoa Cấp cứu của VitaCare Medical hoạt động 24/7, sẵn sàng tiếp nhận và xử lý các trường hợp cấp cứu, chấn thương và các tình huống y tế khẩn cấp với tốc độ nhanh nhất và chất lượng cao nhất.</p>

      <h3>Dịch vụ cấp cứu</h3>
      <ul>
        <li><strong>Cấp cứu tim mạch:</strong> Xử lý đột quỵ, nhồi máu cơ tim</li>
        <li><strong>Cấp cứu hô hấp:</strong> Khó thở, ngừng thở</li>
        <li><strong>Xử lý chấn thương:</strong> Tai nạn giao thông, chấn thương</li>
        <li><strong>Cấp cứu sản khoa:</strong> Sinh non, biến chứng thai sản</li>
        <li><strong>Cấp cứu nhi khoa:</strong> Trẻ em cấp cứu</li>
      </ul>

      <h3>Trang thiết bị cấp cứu</h3>
      <ul>
        <li>Xe cấp cứu hiện đại với đầy đủ thiết bị</li>
        <li>Phòng cấp cứu được trang bị máy thở, máy sốc tim</li>
        <li>Hệ thống theo dõi bệnh nhân liên tục</li>
        <li>Phòng mổ cấp cứu sẵn sàng 24/7</li>
      </ul>

      <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 16px 0;">
        <h3 style="color: #dc2626; margin-top: 0;">Liên hệ cấp cứu</h3>
        <p style="margin-bottom: 0;"><strong style="font-size: 18px; color: #dc2626;">Hotline cấp cứu: 115</strong><br>
        <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM<br>
        <strong>Thời gian:</strong> 24/7 - Tất cả các ngày trong tuần</p>
      </div>
    `,
    status: "ACTIVE",
  },
];

// Interface cho Next.js 15 - params là Promise
interface DepartmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Client component để handle state
export default function DepartmentDetailClient({
  department,
}: {
  department: Department;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${department.name} - VitaCare Medical`,
          text: `Thông tin về khoa ${department.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép link vào clipboard!");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Trong thực tế sẽ lưu vào localStorage hoặc gọi API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/departments">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {department.name}
                </h1>
                <p className="text-sm text-gray-600">VitaCare Medical</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
              >
                <BookmarkPlus className="h-4 w-4 mr-2" />
                {isBookmarked ? "Đã lưu" : "Lưu"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Department Status */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    className={
                      department.status === "ACTIVE"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    {department.status === "ACTIVE"
                      ? "Đang hoạt động"
                      : "Tạm ngừng"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.8/5)</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-semibold text-gray-900">
                      15+
                    </div>
                    <div className="text-xs text-gray-600">Bác sĩ</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Heart className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-semibold text-gray-900">
                      1000+
                    </div>
                    <div className="text-xs text-gray-600">Bệnh nhân/tháng</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-lg font-semibold text-gray-900">
                      24/7
                    </div>
                    <div className="text-xs text-gray-600">Hoạt động</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Content - Hiển thị contentHtml */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700 prose-img:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: department.contentHtml }}
                />
              </CardContent>
            </Card>

            {/* Related Departments */}
            <Card>
              <CardHeader>
                <CardTitle>Chuyên khoa liên quan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockDepartments
                    .filter((d) => d.id !== department.id)
                    .slice(0, 2)
                    .map((relatedDept) => (
                      <Link
                        key={relatedDept.id}
                        href={`/departments/${relatedDept.id}`}
                        className="block"
                      >
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <h4 className="font-medium text-gray-900">
                            {relatedDept.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {relatedDept.contentHtml
                              .replace(/<[^>]*>/g, "")
                              .substring(0, 100)}
                            ...
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Đặt lịch khám</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog
                  open={showAppointmentDialog}
                  onOpenChange={setShowAppointmentDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Đặt lịch ngay
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Đặt lịch khám - {department.name}
                      </DialogTitle>
                      <DialogDescription>
                        Vui lòng liên hệ hotline để được hỗ trợ đặt lịch khám.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold text-blue-900">
                          1900-1234
                        </div>
                        <div className="text-sm text-blue-700">
                          Hotline đặt lịch (24/7)
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 text-center">
                        Hoặc đến trực tiếp tại quầy lễ tân để được hỗ trợ
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi tư vấn
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Địa chỉ</div>
                    <div className="text-sm text-gray-600">
                      123 Đường ABC, Quận 1, TP.HCM
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Điện thoại</div>
                    <div className="text-sm text-gray-600">(028) 1234-5678</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Giờ làm việc
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Thứ 2 - Thứ 6: 7:00 - 17:00</div>
                      <div>Thứ 7 - CN: 8:00 - 16:00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">Cấp cứu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    115
                  </div>
                  <div className="text-sm text-red-700">
                    Hotline cấp cứu 24/7
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
