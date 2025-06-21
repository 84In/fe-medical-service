import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Doctor } from "@/types";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Award,
  Calendar,
  ChevronRight,
  GraduationCap,
  Home,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

const dayOfWeekOptions = [
  { value: "MONDAY", label: "Thứ 2" },
  { value: "TUESDAY", label: "Thứ 3" },
  { value: "WEDNESDAY", label: "Thứ 4" },
  { value: "THURSDAY", label: "Thứ 5" },
  { value: "FRIDAY", label: "Thứ 6" },
  { value: "SATURDAY", label: "Thứ 7" },
  { value: "SUNDAY", label: "Chủ nhật" },
];

interface DoctorDetailPageProps {
  doctor: Doctor | null;
}

export async function DoctorDetailPage({ doctor }: DoctorDetailPageProps) {
  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy bác sĩ
          </h1>
          <p className="text-gray-600 mb-6">
            Bác sĩ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/doi-ngu-bac-si">
            <Button>Quay lại danh sách bác sĩ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              href="/"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/doi-ngu-bac-si"
              className="hover:text-blue-600 transition-colors"
            >
              Đội ngũ bác sĩ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">
              {doctor.title.name} {doctor.name}
            </span>
          </div>
        </div>
      </div>

      {/* Doctor Profile Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Left Column - Avatar & Quick Info */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center text-center">
                    <Avatar className="h-40 w-40 border-4 border-white shadow-lg mb-6">
                      <AvatarImage
                        src={doctor.avatarUrl || "/placeholder.svg"}
                        alt={doctor.name}
                      />
                      <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold">
                        {doctor.name
                          .split(" ")
                          .slice(-2)
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <Badge className="bg-blue-600 text-white mb-4 px-3 py-1">
                      {doctor.department.name}
                    </Badge>

                    <div className="space-y-3 w-full">
                      <div className="flex items-center justify-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {doctor.experienceYears} năm kinh nghiệm
                        </span>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{doctor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{doctor.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Main Info */}
                  <div className="lg:w-2/3 p-8">
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {doctor.title.name} {doctor.name}
                      </h1>
                      <p className="text-lg text-blue-600 font-semibold mb-4">
                        {doctor.position.name}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {doctor.introduction}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        Chuyên môn
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-sm"
                          >
                            {specialty.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Liên hệ ngay
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Gửi email
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="schedule" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
                <TabsTrigger
                  value="schedule"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Lịch làm việc
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  Học vấn
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="flex items-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  Kinh nghiệm
                </TabsTrigger>
              </TabsList>

              {/* Schedule Tab */}
              <TabsContent value="schedule">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Lịch làm việc hàng tuần
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      {doctor.workingHours.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-900">
                            {
                              dayOfWeekOptions.find(
                                (i) => i.value === item.dayOfWeek
                              )?.label
                            }
                          </span>
                          <span
                            className={`font-medium ${
                              item.isAvailable === false
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {item.isAvailable
                              ? `${item.startTime.slice(
                                  0,
                                  5
                                )} - ${item.endTime.slice(0, 5)}`
                              : "Nghỉ"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm text-blue-800">
                        <strong>Lưu ý:</strong> Để được tư vấn và đặt lịch khám,
                        vui lòng liên hệ trước qua hotline: 1900-1234 hoặc
                        email: info@vitacare.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                      Trình độ học vấn & Chứng chỉ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {doctor.education.map((edu, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-200"
                        >
                          <div className="w-3 h-3 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                          <p className="text-gray-700 font-medium">{`${edu.degree} tại ${edu.institution} ${edu.year}`}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-600" />
                        Kinh nghiệm làm việc
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {doctor.workExperience.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-green-200"
                          >
                            <div className="w-3 h-3 bg-green-600 rounded-full mt-1 flex-shrink-0"></div>
                            <p className="text-gray-700 font-medium">{`${
                              item.position
                            }  ${item.organization} (${item.startYear} - ${
                              item.endYear ? item.endYear : "Hiện nay"
                            })`}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        Thành tích & Giải thưởng
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {doctor.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-200"
                          >
                            <div className="w-3 h-3 bg-yellow-600 rounded-full mt-1 flex-shrink-0"></div>
                            <p className="text-gray-700 font-medium">
                              {`${achievement.title}  ${
                                achievement.year ? `(${achievement.year})` : ""
                              } `}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
