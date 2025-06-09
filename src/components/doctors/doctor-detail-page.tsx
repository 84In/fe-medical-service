"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import type {
  Doctor,
  Department,
  Position,
  Title,
  Specialty,
  Education,
  Achievement,
} from "@/types";
import { ChevronRight, Home } from "lucide-react";

// Mock data sử dụng types đã định nghĩa
const departmentsData: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml:
      "<p>Chuyên khoa Tim mạch chuyên điều trị các bệnh lý về tim và mạch máu</p>",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: "<p>Chuyên khoa Nhi chuyên chăm sóc sức khỏe trẻ em</p>",
    status: "ACTIVE",
  },
];

const positionsData: Position[] = [
  {
    id: 1,
    name: "Trưởng khoa Tim mạch",
    description: "Trưởng khoa chuyên môn Tim mạch",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Phó Giám đốc",
    description: "Phó Giám đốc bệnh viện",
    status: "ACTIVE",
  },
];

const titlesData: Title[] = [
  {
    id: 1,
    name: "BS.",
    description: "Bác sĩ",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "PGS.TS.",
    description: "Phó Giáo sư Tiến sĩ",
    status: "ACTIVE",
  },
];

interface DoctorDetail extends Doctor {
  slug: string;
  rating: number;
  totalReviews: number;
  specialties: Specialty[];
  education: Education[];
  experience_detail: string[];
  achievements: Achievement[];
  contact: {
    phone: string;
    email: string;
    office: string;
  };
  services: string[];
  reviews: Array<{
    id: number;
    patient: string;
    rating: number;
    date: string;
    comment: string;
  }>;
}

const dayOfWeekOptions = [
  { value: "MONDAY", label: "Thứ 2" },
  { value: "TUESDAY", label: "Thứ 3" },
  { value: "WEDNESDAY", label: "Thứ 4" },
  { value: "THURSDAY", label: "Thứ 5" },
  { value: "FRIDAY", label: "Thứ 6" },
  { value: "SATURDAY", label: "Thứ 7" },
  { value: "SUNDAY", label: "Chủ nhật" },
];

const getDoctorBySlug = (slug: string): DoctorDetail | null => {
  const doctors: Record<string, DoctorDetail> = {
    "nguyen-van-an": {
      id: 1,
      name: "Nguyễn Văn An",
      slug: "nguyen-van-an",
      avatarUrl: "/placeholder.svg?height=300&width=300",
      introduction:
        "Bác sĩ chuyên khoa Tim mạch với hơn 15 năm kinh nghiệm trong điều trị các bệnh lý tim mạch phức tạp. Với phương châm 'Lấy bệnh nhân làm trung tâm', BS. An luôn tận tâm chăm sóc và mang lại kết quả điều trị tốt nhất cho bệnh nhân.",
      experience_years: "15",
      status: "ACTIVE",
      rating: 4.9,
      totalReviews: 234,
      specialties: [
        {
          id: 1,
          name: "Phẫu thuật tim",
          status: "ACTIVE",
          description: "Phẫu thuật tim",
        },
        {
          id: 2,
          name: "Siêu âm tim",
          status: "ACTIVE",
          description: "Siêu âm tim",
        },
        {
          id: 3,
          name: "Điện tâm đồ",
          description: "Điện tâm đồ",
          status: "ACTIVE",
        },
        {
          id: 4,
          name: "Can thiệp tim mạch",
          description: "Can thiệp tim mạch",
          status: "ACTIVE",
        },
        {
          id: 5,
          name: "Điều trị suy tim",
          description: "Điều trị suy tim",
          status: "ACTIVE",
        },
      ],
      department: departmentsData[0], // Tim mạch
      position: positionsData[0], // Trưởng khoa
      title: titlesData[0], // BS.
      education: [
        {
          id: 1,
          degree: "Bác sĩ Đa khoa",
          institution: "Đại học Y Hà Nội",
          year: "1998",
          description: "Bác sĩ đa khoa",
        },
        {
          id: 2,
          degree: "Chuyên khoa I Tim mạch",
          institution: "Bệnh viện Bạch Mai",
          year: "2003",
          description: "Chuyên khoa I Tim mạch",
        },
        {
          id: 3,
          degree: "Chuyên khoa II Tim mạch",
          institution: "Đại học Y Paris",
          year: "2008",
          description: "Chuyên khoa II Tim mạch",
        },
        {
          id: 4,
          degree: "Chứng chỉ Can thiệp tim mạch",
          institution: "Hoa Kỳ",
          year: "2012",
          description: "Chứng chỉ Can thiệp tim mạch - Hoa Kỳ",
        },
      ],
      experience_detail: [
        "2020-nay: Trưởng khoa Tim mạch - VitaCare Medical",
        "2015-2020: Phó trưởng khoa Tim mạch - Bệnh viện Bạch Mai",
        "2010-2015: Bác sĩ điều trị - Viện Tim mạch Quốc gia",
        "2005-2010: Bác sĩ nội trú - Bệnh viện Chợ Rẫy",
      ],
      achievements: [
        {
          id: 1,
          title: "Giải thưởng Thầy thuốc trẻ xuất sắc 2018",
          year: "2018",
          type: "AWARD",
          description: "Giải thưởng của bộ y tế",
        },
        {
          id: 2,
          title: "Bằng khen của Bộ Y tế về thành tích trong điều trị tim mạch",
          year: "2019",
          type: "AWARD",
          description: "Bằng khen của bộ y tế",
        },
        {
          id: 3,
          title: "Chứng nhận ISO 9001:2015 về chất lượng dịch vụ y tế",
          year: "2020",
          type: "CERTIFICATION",
          description: "Chứng chỉ y khoa",
        },
        {
          id: 4,
          title: "Hơn 50 bài báo khoa học được đăng trên tạp chí quốc tế",
          year: "",
          type: "RESEARCH",
          description:
            "Những bài báo khoa học đã được đăng tải trên tạp chí quốc tế",
        },
      ],
      // Add missing properties for DoctorDetail
      workExperience: [
        {
          id: 1,
          position: "Trưởng khoa Tim mạch",
          organization: "VitaCare Medical",
          startYear: "2020",
          endYear: "",
          description: "",
        },
        {
          id: 2,
          position: "Phó trưởng khoa Tim mạch",
          organization: "Bệnh viện Bạch Mai",
          startYear: "2015",
          endYear: "2020",
          description: "",
        },
        {
          id: 3,
          position: "Bác sĩ điều trị",
          organization: "Viện Tim mạch Quốc gia",
          startYear: "2010",
          endYear: "2015",
          description: "",
        },
        {
          id: 4,
          position: "Bác sĩ nội trú",
          organization: "Bệnh viện Chợ Rẫy",
          startYear: "2005",
          endYear: "2010",
          description: "",
        },
      ],
      workingHours: [
        {
          id: 1,
          dayOfWeek: "MONDAY",
          startTime: "8:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          id: 2,
          dayOfWeek: "TUESDAY",
          startTime: "8:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          id: 3,
          dayOfWeek: "WEDNESDAY",
          startTime: "8:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          id: 4,
          dayOfWeek: "THURSDAY",
          startTime: "8:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          id: 5,
          dayOfWeek: "FRIDAY",
          startTime: "8:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          id: 6,
          dayOfWeek: "SATURDAY",
          isAvailable: false,
          startTime: "",
          endTime: "",
        },
        {
          id: 7,
          dayOfWeek: "SUNDAY",
          isAvailable: false,
          startTime: "",
          endTime: "",
        },
      ],
      languages: ["Tiếng Việt", "English"],
      contact: {
        phone: "0123-456-789",
        email: "bs.an@vitacare.com",
        office: "Phòng 301 - Tầng 3 - Khoa Tim mạch",
      },
      services: [
        "Khám và tư vấn bệnh lý tim mạch",
        "Siêu âm tim, điện tâm đồ",
        "Phẫu thuật tim hở và nội soi",
        "Can thiệp tim mạch qua da",
        "Điều trị suy tim, rối loạn nhịp tim",
        "Tư vấn phòng ngừa bệnh tim mạch",
      ],
      reviews: [
        {
          id: 1,
          patient: "Nguyễn Thị B.",
          rating: 5,
          date: "2024-01-10",
          comment:
            "Bác sĩ An rất tận tâm và chuyên nghiệp. Giải thích rõ ràng về tình trạng bệnh và phương pháp điều trị. Cảm ơn bác sĩ rất nhiều!",
        },
        {
          id: 2,
          patient: "Trần Văn C.",
          rating: 5,
          date: "2024-01-08",
          comment:
            "Phẫu thuật rất thành công. Bác sĩ có tay nghề cao và đội ngũ y tá hỗ trợ rất tốt. Tôi rất hài lòng với dịch vụ.",
        },
        {
          id: 3,
          patient: "Lê Thị D.",
          rating: 4,
          date: "2024-01-05",
          comment:
            "Bác sĩ khám rất kỹ và tư vấn chi tiết. Thời gian chờ hơi lâu nhưng chất lượng khám rất tốt.",
        },
      ],
    },
  };

  return doctors[slug] || null;
};

interface DoctorDetailPageProps {
  slug: string;
}

export function DoctorDetailPage({ slug }: DoctorDetailPageProps) {
  const doctor = getDoctorBySlug(slug);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
            <Link href="/doi-ngu-bac-si" className="hover:text-blue-600">
              Đội ngũ bác sĩ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">
              {doctor.title.name} {doctor.name}
            </span>
          </div>
        </div>
      </div>

      {/* Doctor Profile Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Avatar & Basic Info */}
                  <Avatar className="h-48 w-48 border-4 border-blue-100 shadow-lg mb-6">
                    <AvatarImage
                      src={doctor.avatarUrl || "/placeholder.svg"}
                      alt={doctor.name}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src =
                          "/placeholder.svg?height=300&width=300";
                      }}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-4xl font-bold">
                      {doctor.name
                        .split(" ")
                        .slice(-2)
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center lg:text-left">
                    <Badge className="bg-blue-100 text-blue-800 mb-2">
                      {doctor.department.name}
                    </Badge>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-yellow-500">
                        ★
                      </span>
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-600">
                        ({doctor.totalReviews} đánh giá)
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {doctor.experience_years} năm kinh nghiệm
                    </p>
                  </div>
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {doctor.title.name} {doctor.name}
                  </h1>
                  <p className="text-xl text-blue-600 font-semibold mb-4">
                    {doctor.position.name}
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {doctor.introduction}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Kinh nghiệm:
                      </h3>
                      <p className="text-gray-700">
                        {doctor.experience_years} năm
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Liên hệ:
                      </h3>
                      <p className="text-gray-700">{doctor.contact.phone}</p>
                      <p className="text-gray-700">{doctor.contact.email}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Chuyên môn:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specialties.map((specialty, index) => (
                        <Badge
                          key={specialty.id ?? index}
                          variant="secondary"
                          className="text-sm"
                        >
                          {specialty.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Liên hệ qua điện thoại
                    </Button>
                    <Button size="lg" variant="outline">
                      Gửi email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="info" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="education">Học vấn</TabsTrigger>
                <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                {/* <TabsTrigger value="services">Dịch vụ</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger> */}
              </TabsList>

              {/* Schedule Tab */}
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch làm việc</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {doctor.workingHours.map((working, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                        >
                          <span className="font-medium text-gray-900">
                            {dayOfWeekOptions.find(
                              (opt) => opt.value === working.dayOfWeek
                            )?.label || working.dayOfWeek}
                          </span>
                          <span
                            className={`${
                              working.isAvailable === false
                                ? "text-red-600"
                                : "text-green-600"
                            } font-medium`}
                          >
                            {working.isAvailable === false
                              ? "Nghỉ"
                              : `${working.startTime} - ${working.endTime}`}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Thông tin liên hệ:</strong> Để được tư vấn và
                        đặt lịch khám, vui lòng liên hệ hotline: 1900-1234 hoặc
                        email: info@vitacare.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Trình độ học vấn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {doctor.education.map((edu) => (
                        <div
                          key={edu.id}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">
                            {edu.degree} - {edu.institution} ({edu.year})
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Kinh nghiệm làm việc</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {doctor.workExperience.map((exp, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">{`${exp.startYear} - ${
                              exp.endYear === "" ? "Hiện nay" : exp.endYear
                            }: ${exp.position} - ${exp.organization}`}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Thành tích & Giải thưởng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {doctor.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{achievement.title}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Services Tab */}
              {/* <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Dịch vụ khám chữa bệnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctor.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          <p className="text-gray-700">{service}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}

              {/* Reviews Tab */}
              {/* <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Đánh giá từ bệnh nhân</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {doctor.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-100 pb-6 last:border-0"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="font-semibold text-blue-600">
                                  {review.patient.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {review.patient}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {review.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${
                                    i < review.rating
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
