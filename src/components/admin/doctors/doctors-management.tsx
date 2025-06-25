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
import { useDoctorMetadata } from "@/hooks/doctor/use-doctor-metadata";
import { toast } from "@/hooks/use-toast";
import { getDoctors, updateDoctor } from "@/services";
import type { Doctor, WorkingHour } from "@/types/doctor";
import { getStatusColor } from "@/utils/status-css";
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
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [departmentFilter, setDepartmentFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const { departments } = useDoctorMetadata();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: "",
    avatarUrl: "",
    introduction: "",
    experienceYears: "",
    status: "ACTIVE",
    department: undefined,
    position: undefined,
    title: undefined,
    phone: "",
    email: "",
    specialties: [],
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
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDoctors(
        currentPage - 1,
        itemsPerPage,
        searchTerm,
        statusFilter,
        departmentFilter !== "ALL" ? +departmentFilter : undefined
      );
      console.log("Fetched doctors:", data);

      setDoctors(data.items || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Lỗi khi tải danh sách bác sĩ:", error);
      setError(
        error instanceof Error
          ? error
          : new Error("Đã xảy ra lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchDoctors();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm, statusFilter, departmentFilter]);
  const handleRetry = () => {
    fetchDoctors();
  };
  if (loading) return <DoctorsLoadingSkeleton />;
  if (error)
    return <DoctorsErrorFallback error={error} onRetry={handleRetry} />;

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

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
  function normalizeDoctorPayload(editingDoctor: any) {
    return {
      id: editingDoctor.id,
      name: editingDoctor.name,
      avatarUrl: editingDoctor.avatarUrl,
      introduction: editingDoctor.introduction,
      experienceYears: editingDoctor.experienceYears,
      departmentId: editingDoctor.department?.id ?? null,
      positionId: editingDoctor.position?.id ?? null,
      titleId: editingDoctor.title?.id ?? null,
      status: editingDoctor.status,
      phone: editingDoctor.phone,
      email: editingDoctor.email,
      specialtyIds: editingDoctor.specialties?.map((s: any) => s.id) ?? [],
      education: (editingDoctor.education ?? []).map((e: any) => ({
        ...e,
        id:
          typeof e.id === "string" || e.id > Number.MAX_SAFE_INTEGER
            ? null
            : e.id,
      })),
      workExperience: (editingDoctor.workExperience ?? []).map((w: any) => ({
        ...w,
        id:
          typeof w.id === "string" || w.id > Number.MAX_SAFE_INTEGER
            ? null
            : w.id,
      })),
      achievements: (editingDoctor.achievements ?? []).map((a: any) => ({
        ...a,
        id:
          typeof a.id === "string" || a.id > Number.MAX_SAFE_INTEGER
            ? null
            : a.id,
      })),
      workingHours: (editingDoctor.workingHours ?? []).map((wh: any) => ({
        ...wh,
        id:
          typeof wh.id === "string" || wh.id > Number.MAX_SAFE_INTEGER
            ? null
            : wh.id,
      })),
    };
  }

  const handleUpdateDoctor = async () => {
    if (!editingDoctor) return;

    try {
      const normalizedPayload = normalizeDoctorPayload(editingDoctor);

      const { code, message, result } = await updateDoctor(
        editingDoctor.id,
        normalizedPayload
      );

      if (code === 0) {
        toast({
          title: "Thành công!",
          description: "Cập nhật bác sĩ thành công!",
          variant: "success",
        });
        setDoctors((prev) =>
          prev.map((d) => (d.id === result.id ? result : d))
        );
        setEditingDoctor(null);
      } else {
        throw new Error(message || "Cập nhật bác sĩ thất bại");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      let message = "Cập nhật bác sĩ thất bại!";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response !== null &&
        "data" in (error as any).response &&
        typeof (error as any).response.data === "object" &&
        (error as any).response.data !== null &&
        "message" in (error as any).response.data
      ) {
        message = (error as any).response.data.message;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      toast({
        title: "Thất bại!",
        description: message,
        variant: "destructive",
      });
    }
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
          setDoctors={setDoctors}
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
                {departments.map((dept) => (
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
                  {departments.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items per page selector */}
      {doctors.length > 0 && (
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
      )}

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
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
                  {doctor.experienceYears} năm kinh nghiệm
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
