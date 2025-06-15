"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDoctors } from "@/services";
import type {
  Department,
  Doctor,
  Position,
  Title,
  WorkingHour,
} from "@/types/doctor";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Edit,
  Eye,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Search,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DoctorsErrorFallback,
  DoctorsLoadingSkeleton,
} from "./doctors-skeleton";
import { EditDoctorForm } from "./edit-doctor";
import DoctorForm from "./new-doctor";

// Mock data
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: "<p>Tim và chăm sóc tim mạch</p>",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: "<p>Chăm sóc sức khỏe trẻ em</p>",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: "<p>Chăm sóc y tế khẩn cấp</p>",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Phẫu thuật",
    contentHtml: "<p>Cung cấp y khoa phẫu thuật</p>",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "X quang",
    contentHtml: "<p>Chẩn đoán hình ảnh</p>",
    status: "ACTIVE",
  },
];

const mockPositions: Position[] = [
  {
    id: 1,
    name: "Giám đốc",
    description: "Giám đốc bệnh viện",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Phó giám đốc",
    description: "Phó giám đốc bệnh viện",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Bác sĩ chuyên khoa",
    description: "Bác sĩ chuyên khoa",
    status: "ACTIVE",
  },
  { id: 4, name: "Trưởng khoa", description: "Trường khoa", status: "ACTIVE" },
];

const mockTitles: Title[] = [
  { id: 1, name: "BS.", description: "Bác sĩ", status: "ACTIVE" },
  { id: 2, name: "GS.", description: "Giáo sư", status: "ACTIVE" },
  {
    id: 3,
    name: "PGS.",
    description: "Phó giáo sư",
    status: "ACTIVE",
  },
];

// Generate more mock doctors for pagination testing
const generateMockDoctors = (count: number): Doctor[] => {
  const baseMockDoctor = {
    id: 1,
    name: "Sarah Johnson",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    introduction:
      "Bác sĩ tim mạch giàu kinh nghiệm, chuyên về tim mạch can thiệp và phòng ngừa bệnh tim.",
    experience_years: "15",
    status: "ACTIVE",
    department: mockDepartments[0],
    position: mockPositions[0],
    title: mockTitles[1],
    phone: "0123-456-789",
    email: "sarah.johnson@hospital.com",
    specialties: [
      {
        id: 1,
        name: "Phẫu thuật tim",
        status: "ACTIVE" as const,
        description: "Phẫu thuật tim",
      },
      {
        id: 2,
        name: "Siêu âm tim",
        status: "ACTIVE" as const,
        description: "Siêu âm tim",
      },
    ],
    languages: ["Tiếng Việt", "English"],
    consultationFee: 500000,
    rating: 4.5,
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
        type: "AWARD" as const,
        description: "Giải thưởng của Bộ Y tế",
      },
      {
        id: 2,
        title: "Chứng chỉ Can thiệp tim mạch",
        year: "2012",
        type: "CERTIFICATION" as const,
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
  };

  // Vietnamese names for doctors
  const vietnameseNames = [
    "Nguyễn Văn An",
    "Trần Thị Bình",
    "Lê Minh Cường",
    "Phạm Thanh Dung",
    "Hoàng Văn Em",
    "Vũ Thị Phương",
    "Đặng Minh Giang",
    "Bùi Thị Hoa",
    "Đỗ Văn Hùng",
    "Ngô Thị Lan",
    "Dương Văn Minh",
    "Lý Thị Ngọc",
    "Hồ Văn Phong",
    "Mai Thị Quỳnh",
    "Trịnh Văn Sơn",
    "Võ Thị Tâm",
    "Đinh Văn Uy",
    "Lương Thị Vân",
    "Phan Văn Xuân",
    "Tạ Thị Yến",
  ];

  // Generate doctors
  return Array.from({ length: count }).map((_, index) => {
    const departmentIndex = index % mockDepartments.length;
    const positionIndex = index % mockPositions.length;
    const titleIndex = index % mockTitles.length;
    const nameIndex = index % vietnameseNames.length;
    const rating = Math.min(5, Math.max(3, 3.5 + Math.random() * 1.5));
    const experience = Math.floor(5 + Math.random() * 20).toString();
    const fee = Math.floor(300000 + Math.random() * 700000);

    return {
      ...baseMockDoctor,
      id: index + 1,
      name: vietnameseNames[nameIndex],
      department: mockDepartments[departmentIndex],
      position: mockPositions[positionIndex],
      title: mockTitles[titleIndex],
      experience_years: experience,
      rating: Number.parseFloat(rating.toFixed(1)),
      consultationFee: fee,
      email: `doctor${index + 1}@hospital.com`,
      phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
      status:
        index % 10 === 0
          ? ("INACTIVE" as const)
          : index % 15 === 0
          ? ("HIDDEN" as const)
          : ("ACTIVE" as const),
      specialties: [
        {
          id: 1,
          name: "Phẫu thuật tim",
          status: "ACTIVE" as const,
          description: "Phẫu thuật tim",
        },
        {
          id: 2,
          name: "Siêu âm tim",
          status: "ACTIVE" as const,
          description: "Siêu âm tim",
        },
      ],
      achievements: baseMockDoctor.achievements.map((a) => ({
        ...a,
        type: a.type as "AWARD" | "CERTIFICATION" | "PUBLICATION" | "RESEARCH",
      })),
      workingHours: baseMockDoctor.workingHours.map((wh) => ({
        ...wh,
        dayOfWeek: wh.dayOfWeek as WorkingHour["dayOfWeek"],
      })),
    };
  });
};

const mockDoctors: Doctor[] = generateMockDoctors(50); // Generate 50 doctors for testing

const dayOfWeekOptions = [
  { value: "MONDAY", label: "Thứ 2" },
  { value: "TUESDAY", label: "Thứ 3" },
  { value: "WEDNESDAY", label: "Thứ 4" },
  { value: "THURSDAY", label: "Thứ 5" },
  { value: "FRIDAY", label: "Thứ 6" },
  { value: "SATURDAY", label: "Thứ 7" },
  { value: "SUNDAY", label: "Chủ nhật" },
];

export function DoctorsManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [currentDoctors, setCurrentDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [departmentFilter, setDepartmentFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: "",
    avatarUrl: "",
    introduction: "",
    experience_years: "",
    status: "ACTIVE",
    department: undefined,
    position: undefined,
    title: undefined,
    phone: "",
    email: "",
    specialties: [],
    languages: [],
    consultationFee: 0,
    rating: 0,
    education: [],
    workExperience: [],
    achievements: [],
    workingHours: dayOfWeekOptions.map((day, index) => ({
      id: index + 1,
      dayOfWeek: day.value as WorkingHour["dayOfWeek"],
      startTime: day.value === "SUNDAY" ? "" : "08:00",
      endTime: day.value === "SUNDAY" ? "" : "17:00",
      isAvailable: day.value !== "SUNDAY",
    })),
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors(
          currentPage - 1,
          itemsPerPage,
          searchTerm,
          statusFilter,
          departmentFilter !== "ALL" ? +departmentFilter : undefined
        );
        console.log("Fetched doctors:", data);

        setDoctors(data.items || []);
        setCurrentDoctors(data.items || []);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error("Lỗi khi tải danh sách bác sĩ:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [currentPage, itemsPerPage]);

  if (loading) return <DoctorsLoadingSkeleton />;
  if (error) return <DoctorsErrorFallback />;

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200";
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "HIDDEN":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "DELETED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-3 w-3 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />);
    }

    return stars;
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === id ? { ...doctor, status: "DELETED" as const } : doctor
      )
    );
  };

  const handleUpdateDoctor = () => {
    if (!editingDoctor) return;

    setDoctors(
      doctors.map((doctor) =>
        doctor.id === editingDoctor.id ? editingDoctor : doctor
      )
    );
    setEditingDoctor(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bác sĩ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin bác sĩ, chuyên khoa và vị trí làm việc. Thêm, sửa
            hoặc xóa bác sĩ trong hệ thống.
          </p>
        </div>
        <DoctorForm
          newDoctor={newDoctor}
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          setNewDoctor={setNewDoctor}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tìm kiếm & Lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm bác sĩ, chuyên khoa, chuyên môn, ngôn ngữ..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                <SelectItem value="INACTIVE">Ngừng hoạt động</SelectItem>
                <SelectItem value="HIDDEN">Ẩn</SelectItem>
                <SelectItem value="DELETED">Đã xóa</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={departmentFilter}
              onValueChange={(value) => {
                setDepartmentFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Lọc theo chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả chuyên khoa</SelectItem>
                {mockDepartments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng số bác sĩ
                </p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctors.filter((d) => d.status === "ACTIVE").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Ngừng hoạt động
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctors.filter((d) => d.status === "INACTIVE").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chuyên khoa</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockDepartments.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items per page selector */}
      <div className="flex justify-end items-center gap-2">
        <span className="text-sm text-gray-600">Hiển thị:</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number.parseInt(value));
            setCurrentPage(1); // Reset to first page when changing items per page
          }}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={doctor.avatarUrl || "/placeholder.svg"}
                      alt={doctor.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=100&width=100";
                      }}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {doctor.title.name} {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {doctor.position.name}
                    </p>
                    <Badge className={`mt-1 ${getStatusColor(doctor.status)}`}>
                      {doctor.status === "ACTIVE"
                        ? "Hoạt động"
                        : doctor.status === "INACTIVE"
                        ? "Ngừng hoạt động"
                        : doctor.status === "HIDDEN"
                        ? "Ẩn"
                        : "Đã xóa"}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditDoctor(doctor)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="text-red-600"
                    >
                      <MoreVertical className="mr-2 h-4 w-4" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.department.name}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {doctor.experience_years} năm kinh nghiệm
                </div>
                {doctor.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {doctor.phone}
                  </div>
                )}
                {doctor.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {doctor.email}
                  </div>
                )}
                {doctor.specialties && doctor.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doctor.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty.name}
                      </Badge>
                    ))}
                    {doctor.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
                {doctor.rating && doctor.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {renderRatingStars(doctor.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({doctor.rating})
                    </span>
                  </div>
                )}
                {doctor.consultationFee && doctor.consultationFee > 0 && (
                  <div className="text-sm font-medium text-green-600">
                    Phí khám: {formatCurrency(doctor.consultationFee)}
                  </div>
                )}
                <p className="text-sm text-gray-700 line-clamp-2">
                  {doctor.introduction}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEditDoctor(doctor)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Hiển thị {currentPage * itemsPerPage - itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, doctors.length)} trong
                tổng số {totalItems} bác sĩ
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={
                          currentPage === pageNumber ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => paginate(pageNumber)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No results */}
      {doctors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy bác sĩ
            </h3>
            <p className="text-gray-600">
              Không có bác sĩ nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử
              thay đổi từ khóa hoặc bộ lọc.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog - Similar structure with tabs */}
      {editingDoctor && (
        <EditDoctorForm
          editingDoctor={editingDoctor}
          setEditingDoctor={setEditingDoctor}
          updateDoctor={handleUpdateDoctor}
        />
      )}
    </div>
  );
}
