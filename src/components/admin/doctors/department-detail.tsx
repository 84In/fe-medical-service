"use client";

import { useState } from "react";
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
import Link from "next/link";

interface DepartmentDetailProps {
  department: Department;
}

export function DepartmentDetail({ department }: DepartmentDetailProps) {
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

            {/* Department Content */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
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
                  <Link href="/departments/2" className="block">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Nhi khoa</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Chăm sóc sức khỏe trẻ em
                      </p>
                    </div>
                  </Link>
                  <Link href="/departments/3" className="block">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Cấp cứu</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Dịch vụ cấp cứu 24/7
                      </p>
                    </div>
                  </Link>
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
