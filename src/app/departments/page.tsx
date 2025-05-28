import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Clock, ArrowRight } from "lucide-react";
import type { Department } from "@/types/doctor";

// Mock data
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml:
      "<p>Khoa Tim mạch chuyên điều trị các bệnh lý về tim và mạch máu...</p>",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml:
      "<p>Khoa Nhi chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến 16 tuổi...</p>",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: "<p>Khoa Cấp cứu hoạt động 24/7...</p>",
    status: "ACTIVE",
  },
];

export default function DepartmentsPage() {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Các chuyên khoa tại VitaCare Medical
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá các chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm và
              trang thiết bị hiện đại
            </p>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockDepartments.map((department) => (
            <Card
              key={department.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Building2 className="h-8 w-8 text-blue-600" />
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
                <CardTitle className="text-xl">{department.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {stripHtml(department.contentHtml)}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>15+ bác sĩ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>24/7</span>
                  </div>
                </div>

                <Link href={`/departments/${department.id}`}>
                  <Button className="w-full">
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Chuyên khoa - VitaCare Medical",
  description:
    "Danh sách các chuyên khoa tại VitaCare Medical với đội ngũ bác sĩ chuyên nghiệp",
};
