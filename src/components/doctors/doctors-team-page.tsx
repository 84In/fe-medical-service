"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import type {
  Doctor,
  Department,
  Position,
  Specialty,
  Title,
} from "@/types/doctor";
import { ChevronRight, Home, PhoneCall } from "lucide-react";

// Mock data sử dụng types đã định nghĩa
const departmentsData: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: "<p>Chuyên khoa Tim mạch</p>",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: "<p>Chuyên khoa Nhi</p>",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: "<p>Khoa Cấp cứu</p>",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Phẫu thuật",
    contentHtml: "<p>Khoa Phẫu thuật</p>",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Mắt",
    contentHtml: "<p>Khoa Mắt</p>",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Xương khớp",
    contentHtml: "<p>Khoa Xương khớp</p>",
    status: "ACTIVE",
  },
];

const positionsData: Position[] = [
  {
    id: 1,
    name: "Trưởng khoa",
    description: "Trưởng khoa chuyên môn",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Phó trưởng khoa",
    description: "Phó trưởng khoa chuyên môn",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Bác sĩ chuyên khoa",
    description: "Bác sĩ chuyên khoa",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Phó Giám đốc",
    description: "Phó Giám đốc bệnh viện",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Giám đốc",
    description: "Giám đốc bệnh viện",
    status: "ACTIVE",
  },
];

const titlesData: Title[] = [
  {
    id: 1,
    name: "Bác sĩ",
    description: "Bác sĩ",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Thạc sĩ",
    description: "Thạc sĩ Y khoa",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Tiến sĩ",
    description: "Tiến sĩ Y khoa",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Phó Giáo sư",
    description: "Phó Giáo sư",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Giáo sư",
    description: "Giáo sư",
    status: "ACTIVE",
  },
];

// Mock data cho bác sĩ sử dụng interface Doctor
const doctorsData: (Doctor & {
  slug: string;
  rating: number;
  specialties: Specialty[];
})[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    slug: "nguyen-van-an",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    introduction:
      "Bác sĩ chuyên khoa Tim mạch với hơn 15 năm kinh nghiệm trong điều trị các bệnh lý tim mạch phức tạp. Đã thực hiện thành công hơn 3,000 ca phẫu thuật tim và can thiệp tim mạch.",
    experience_years: "15",
    status: "ACTIVE",
    rating: 4.9,
    specialties: [
      {
        id: 1,
        name: "Phẫu thuật tim",
        description: "Phẫu thuật tim",
        status: "ACTIVE",
      },
      {
        id: 2,
        name: "Siêu âm tim",
        description: "Siêu âm tim",
        status: "ACTIVE",
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
    ],
    department: departmentsData[0], // Tim mạch
    position: positionsData[0], // Trưởng khoa
    title: titlesData[0], // Bác sĩ
    education: [
      {
        id: 1,
        degree: "Bác sĩ Đa khoa",
        institution: "Đại học Y Hà Nội",
        year: "1998",
        description: "Tốt nghiệp loại Giỏi",
      },
      {
        id: 2,
        degree: "Chuyên khoa I Tim mạch",
        institution: "Bệnh viện Bạch Mai",
        year: "2003",
        description: "Chuyên sâu về tim mạch can thiệp",
      },
    ],
    workExperience: [
      {
        id: 1,
        position: "Trưởng khoa Tim mạch",
        organization: "VitaCare Medical",
        startYear: "2020",
        description: "Quản lý và điều hành khoa Tim mạch",
      },
      {
        id: 2,
        position: "Phó trưởng khoa Tim mạch",
        organization: "Bệnh viện Bạch Mai",
        startYear: "2015",
        endYear: "2020",
        description: "Hỗ trợ quản lý và điều trị bệnh nhân",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Thầy thuốc trẻ xuất sắc",
        year: "2018",
        type: "AWARD",
        description: "Giải thưởng của Bộ Y tế",
      },
      {
        id: 2,
        title: "Chứng chỉ Can thiệp tim mạch",
        year: "2012",
        type: "CERTIFICATION",
        description: "Chứng chỉ quốc tế từ Hoa Kỳ",
      },
    ],
    workingHours: [
      {
        id: 1,
        dayOfWeek: "MONDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 2,
        dayOfWeek: "TUESDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 3,
        dayOfWeek: "WEDNESDAY",
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: 4,
        dayOfWeek: "THURSDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 5,
        dayOfWeek: "FRIDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 6,
        dayOfWeek: "SATURDAY",
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: 7,
        dayOfWeek: "SUNDAY",
        startTime: "",
        endTime: "",
        isAvailable: false,
      },
    ],
    languages: ["Tiếng Việt", "Tiếng Anh"],
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    slug: "tran-thi-binh",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    introduction:
      "Chuyên gia hàng đầu về nhi khoa với nhiều công trình nghiên cứu quốc tế. Có kinh nghiệm sâu rộng trong điều trị các bệnh lý nhi khoa phức tạp.",
    experience_years: "20",
    status: "ACTIVE",
    rating: 4.8,
    specialties: [
      {
        id: 1,
        name: "Nhi tim mạch",
        description: "Nhi tim mạch",
        status: "ACTIVE",
      },
      {
        id: 2,
        name: "Nhi hô hấp",
        description: "Nhi hô hấp",
        status: "ACTIVE",
      },
      {
        id: 3,
        name: "Dinh dưỡng trẻ em",
        description: "Dinh dưỡng trẻ em",
        status: "ACTIVE",
      },
      {
        id: 4,
        name: "Nhi thần kinh",
        description: "Nhi thần kinh",
        status: "ACTIVE",
      },
    ],
    department: departmentsData[1], // Nhi khoa
    position: positionsData[3], // Phó Giám đốc
    title: titlesData[3], // Phó Giáo sư
    education: [
      {
        id: 1,
        degree: "Đại học Y Dược TP.HCM",
        institution: "",
        year: "",
        description: "",
      },
    ],
    workExperience: [
      {
        id: 1,
        position: "",
        organization: "Bệnh viện Nhi Đồng 1",
        startYear: "",
        endYear: "",
        description: "",
      },
      {
        id: 2,
        position: "",
        organization: "Bệnh viện Nhi Trung Ương",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Công trình nghiên cứu quốc tế về nhi khoa",
        year: "",
        type: "AWARD",
        description: "",
      },
    ],
    workingHours: [
      {
        id: 1,
        dayOfWeek: "MONDAY",
        startTime: "8:00",
        endTime: "16:00",
        isAvailable: true,
      },
      {
        id: 2,
        dayOfWeek: "TUESDAY",
        startTime: "8:00",
        endTime: "16:00",
        isAvailable: true,
      },
      {
        id: 3,
        dayOfWeek: "WEDNESDAY",
        startTime: "8:00",
        endTime: "16:00",
        isAvailable: true,
      },
      {
        id: 4,
        dayOfWeek: "THURSDAY",
        startTime: "8:00",
        endTime: "16:00",
        isAvailable: true,
      },
      {
        id: 5,
        dayOfWeek: "FRIDAY",
        startTime: "8:00",
        endTime: "16:00",
        isAvailable: true,
      },
      {
        id: 6,
        dayOfWeek: "SATURDAY",
        startTime: "8:00",
        endTime: "16:00",
        isAvailable: true,
      },
      {
        id: 7,
        dayOfWeek: "SUNDAY",
        startTime: "",
        endTime: "",
        isAvailable: false,
      },
    ],
    languages: ["Tiếng Việt", "Tiếng Anh"],
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    slug: "le-minh-cuong",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    introduction:
      "Bác sĩ cấp cứu giàu kinh nghiệm trong xử lý các tình huống khẩn cấp. Chuyên về hồi sức cấp cứu và điều trị chấn thương.",
    experience_years: "8",
    status: "ACTIVE",
    rating: 4.7,
    specialties: [
      {
        id: 5,
        name: "Hồi sức cấp cứu",
        description: "Hồi sức cấp cứu",
        status: "ACTIVE",
      },
      {
        id: 6,
        name: "Chấn thương",
        description: "Chấn thương",
        status: "ACTIVE",
      },
      {
        id: 7,
        name: "Cấp cứu nhi",
        description: "Cấp cứu nhi",
        status: "ACTIVE",
      },
      {
        id: 8,
        name: "Độc chất học",
        description: "Độc chất học",
        status: "ACTIVE",
      },
    ],
    department: departmentsData[2], // Cấp cứu
    position: positionsData[2], // Bác sĩ chuyên khoa
    title: titlesData[0], // Bác sĩ
    education: [
      {
        id: 2,
        degree: "Đại học Y Dược Huế",
        institution: "",
        year: "",
        description: "",
      },
    ],
    workExperience: [
      {
        id: 3,
        organization: "Bệnh viện Trung Ương Huế",
        position: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    achievements: [
      {
        id: 2,
        title: "Bằng khen của Bộ Y tế",
        year: "",
        type: "AWARD",
        description: "",
      },
    ],
    workingHours: [
      {
        id: 1,
        dayOfWeek: "MONDAY",
        startTime: "7:00",
        endTime: "19:00",
        isAvailable: true,
      },
      {
        id: 2,
        dayOfWeek: "TUESDAY",
        startTime: "7:00",
        endTime: "19:00",
        isAvailable: true,
      },
      {
        id: 3,
        dayOfWeek: "WEDNESDAY",
        startTime: "7:00",
        endTime: "19:00",
        isAvailable: true,
      },
      {
        id: 4,
        dayOfWeek: "THURSDAY",
        startTime: "7:00",
        endTime: "19:00",
        isAvailable: true,
      },
      {
        id: 5,
        dayOfWeek: "FRIDAY",
        startTime: "7:00",
        endTime: "19:00",
        isAvailable: true,
      },
      {
        id: 6,
        dayOfWeek: "SATURDAY",
        startTime: "7:00",
        endTime: "19:00",
        isAvailable: true,
      },
      {
        id: 7,
        dayOfWeek: "SUNDAY",
        startTime: "7:00",
        endTime: "19:00",
        isAvailable: true,
      },
    ],
    languages: ["Tiếng Việt"],
  },
  {
    id: 4,
    name: "Phạm Văn Dũng",
    slug: "pham-van-dung",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    introduction:
      "Chuyên gia phẫu thuật hàng đầu với nhiều kỹ thuật tiên tiến. Đã thực hiện thành công hàng nghìn ca phẫu thuật phức tạp với tỷ lệ thành công cao.",
    experience_years: "25",
    status: "ACTIVE",
    rating: 5.0,
    specialties: [
      { id: 9, name: "Phẫu thuật nội soi", description: "", status: "ACTIVE" },
      { id: 10, name: "Phẫu thuật tái tạo", description: "", status: "ACTIVE" },
      { id: 11, name: "Phẫu thuật thẩm mỹ", description: "", status: "ACTIVE" },
      { id: 12, name: "Phẫu thuật robot", description: "", status: "ACTIVE" },
    ],
    department: departmentsData[3], // Phẫu thuật
    position: positionsData[4], // Giám đốc
    title: titlesData[4], // Giáo sư
    education: [
      {
        id: 3,
        degree: "Đại học Y Hà Nội",
        institution: "",
        year: "",
        description: "",
      },
    ],
    workExperience: [
      {
        id: 4,
        organization: "Bệnh viện Việt Đức",
        position: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    achievements: [
      {
        id: 3,
        title: "Giải thưởng phẫu thuật xuất sắc",
        year: "",
        type: "AWARD",
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
    languages: ["Tiếng Việt", "Tiếng Anh"],
  },
  {
    id: 5,
    name: "Hoàng Thị Lan",
    slug: "hoang-thi-lan",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    introduction:
      "Chuyên gia về các bệnh lý mắt và phẫu thuật mắt hiện đại. Có nhiều năm kinh nghiệm trong điều trị các bệnh lý mắt từ đơn giản đến phức tạp.",
    experience_years: "12",
    status: "ACTIVE",
    rating: 4.8,
    specialties: [
      { id: 13, name: "Phẫu thuật mắt", description: "", status: "ACTIVE" },
      {
        id: 14,
        name: "Điều trị tật khúc xạ",
        description: "",
        status: "ACTIVE",
      },
      { id: 15, name: "Bệnh võng mạc", description: "", status: "ACTIVE" },
      { id: 16, name: "Phẫu thuật Lasik", description: "", status: "ACTIVE" },
    ],
    department: departmentsData[4], // Mắt
    position: positionsData[0], // Trưởng khoa
    title: titlesData[1], // Thạc sĩ
    education: [
      {
        id: 4,
        degree: "Đại học Y Dược TP.HCM",
        institution: "",
        year: "",
        description: "",
      },
    ],
    workExperience: [
      {
        id: 5,
        organization: "Bệnh viện Mắt TP.HCM",
        position: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    achievements: [
      {
        id: 4,
        title: "Đề tài nghiên cứu về phẫu thuật Lasik",
        year: "",
        type: "RESEARCH",
        description: "",
      },
    ],
    workingHours: [
      {
        id: 1,
        dayOfWeek: "MONDAY",
        startTime: "9:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 2,
        dayOfWeek: "TUESDAY",
        startTime: "9:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 3,
        dayOfWeek: "WEDNESDAY",
        startTime: "9:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 4,
        dayOfWeek: "THURSDAY",
        startTime: "9:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 5,
        dayOfWeek: "FRIDAY",
        startTime: "9:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 6,
        dayOfWeek: "SATURDAY",
        startTime: "9:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 7,
        dayOfWeek: "SUNDAY",
        isAvailable: false,
        startTime: "",
        endTime: "",
      },
    ],
    languages: ["Tiếng Việt", "Tiếng Anh"],
  },
  {
    id: 6,
    name: "Vũ Thanh Hải",
    slug: "vu-thanh-hai",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    introduction:
      "Chuyên gia điều trị các bệnh lý xương khớp và chấn thương thể thao. Có kinh nghiệm phong phú trong phẫu thuật xương khớp và phục hồi chức năng.",
    experience_years: "10",
    status: "ACTIVE",
    rating: 4.6,
    specialties: [
      {
        id: 17,
        name: "Phẫu thuật xương khớp",
        description: "",
        status: "ACTIVE",
      },
      {
        id: 18,
        name: "Chấn thương thể thao",
        description: "",
        status: "ACTIVE",
      },
      { id: 19, name: "Nội soi khớp", description: "", status: "ACTIVE" },
      { id: 20, name: "Thay khớp nhân tạo", description: "", status: "ACTIVE" },
    ],
    department: departmentsData[5], // Xương khớp
    position: positionsData[1], // Phó trưởng khoa
    title: titlesData[2], // Tiến sĩ
    education: [
      {
        id: 5,
        degree: "Đại học Y Dược Cần Thơ",
        institution: "",
        year: "",
        description: "",
      },
    ],
    workExperience: [
      {
        id: 6,
        organization: "Bệnh viện Chấn thương Chỉnh hình TP.HCM",
        position: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    achievements: [
      {
        id: 5,
        title: "Giải thưởng bác sĩ trẻ tiêu biểu",
        year: "",
        type: "AWARD",
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
    languages: ["Tiếng Việt"],
  },
];

const departmentFilters = [
  { id: "all", name: "Tất cả chuyên khoa" },
  ...departmentsData.map((dept) => ({
    id: dept.id.toString(),
    name: dept.name,
  })),
];

export function DoctorsTeamPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialties.some((specialty) =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      doctor.introduction.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" ||
      doctor.department.id.toString() === selectedDepartment;

    return matchesSearch && matchesDepartment && doctor.status === "ACTIVE";
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
            <span className="text-gray-900 font-medium">Đội ngũ bác sĩ</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Đội Ngũ Bác Sĩ Chuyên Nghiệp
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Đội ngũ y bác sĩ giàu kinh nghiệm, tận tâm chăm sóc sức khỏe của
              bạn
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  {doctorsData.length}+ Bác sĩ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  {departmentsData.length}+ Chuyên khoa
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">4.8/5 Đánh giá</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Tìm kiếm bác sĩ, chuyên khoa, kỹ năng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                </div>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-full md:w-[250px] h-12">
                    <SelectValue placeholder="Chọn chuyên khoa" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentFilters.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        <div className="flex items-center gap-2">
                          {dept.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {departmentFilters.map((dept) => (
                <Button
                  key={dept.id}
                  variant={
                    selectedDepartment === dept.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedDepartment(dept.id)}
                  className="flex items-center gap-2"
                >
                  {dept.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {filteredDoctors.length} Bác sĩ được tìm thấy
            </h2>
            <p className="text-gray-600 text-lg">
              Chọn bác sĩ phù hợp với nhu cầu chăm sóc sức khỏe của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Link href={`/doi-ngu-bac-si/${doctor.slug}`} key={doctor.id}>
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden h-full cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                          <AvatarImage
                            src={doctor.avatarUrl || "/placeholder.svg"}
                            alt={doctor.name}
                          />
                          <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                            {doctor.name
                              .split(" ")
                              .slice(-2)
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white text-gray-700 shadow-md">
                          {doctor.department.name}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="font-semibold text-sm">
                            ★ {doctor.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {doctor.title.name} {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-2">
                        {doctor.position.name}
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          {doctor.experience_years} năm kinh nghiệm
                        </div>
                        <div className="flex items-center gap-1">
                          {doctor.department.name}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Chuyên môn:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {doctor.specialties
                            .slice(0, 2)
                            .map((specialty, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {specialty.name}
                              </Badge>
                            ))}
                          {doctor.specialties.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{doctor.specialties.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 line-clamp-2">
                        {doctor.introduction}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Xem chi tiết
                      </Button>
                      {/* <Button variant="outline" className="flex-1">
                        Đặt lịch
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không tìm thấy bác sĩ
              </h3>
              <p className="text-gray-500">
                Vui lòng thử lại với từ khóa hoặc chuyên khoa khác
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl mx-6 my-16 shadow-xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/medical-bg.svg')] bg-cover bg-center pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Cần tư vấn y tế?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Đội ngũ bác sĩ chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn
            24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 font-semibold text-lg shadow-md"
            >
              <PhoneCall className="mr-2 animate-pulse" size={20} />
              Gọi ngay: 1900-1234
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
