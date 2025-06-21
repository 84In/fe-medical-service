"use client";

import { useEffect, useState } from "react";
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
import { Department, type Doctor } from "@/types/doctor";
import {
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Home,
  PhoneCall,
} from "lucide-react";
import { getDoctors } from "@/services";
import { useDoctorMetadata } from "@/hooks/doctor/useDoctorMetadata";
import { toSlug } from "@/utils/slugify";
import { DoctorsTeamSkeleton } from "./doctors-team-skeleton";
import { fetchDepartments } from "@/services/metadata.service";

export function DoctorsTeamPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string>("ALL");
  const [departmentsError, setDepartmentsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const data = await getDoctors(
          currentPage - 1,
          itemsPerPage,
          searchTerm,
          "ACTIVE",
          departmentFilter !== "ALL" ? +departmentFilter : undefined
        );
        console.log("Fetched doctors:", data);

        setDoctors(data.items || []);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error("Lỗi khi tải danh sách bác sĩ:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    const handler = setTimeout(() => {
      fetchDoctors();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm, departmentFilter]);
  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const fetchAllDepartments = async () => {
    try {
      const response = await fetchDepartments();
      if (response && response.length > 0) {
        setDepartments(response);
        setDepartmentsError(false);
      } else {
        setDepartments([]);
        setDepartmentsError(true);
      }
    } catch (error) {
      console.error("Không thể tải departments:", error);
      setDepartmentsError(true);
    }
  };

  const retryDepartments = () => {
    setDepartmentsError(false);
    fetchAllDepartments();
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  // Show skeleton while loading
  if (loading) {
    return <DoctorsTeamSkeleton />;
  }

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
                  {doctors.length}+ Bác sĩ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  {departments.length}+ Chuyên khoa
                </span>
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
                {departmentsError && (
                  <div className="mb-6 p-2 rounded-xl border border-red-300 bg-red-50 text-red-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span>
                      Không thể tải danh sách chuyên khoa. Vui lòng thử lại sau.
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-700 hover:bg-red-100"
                      onClick={retryDepartments}
                    >
                      Thử lại
                    </Button>
                  </div>
                )}
                {/* <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-full md:w-[250px] h-12">
                    <SelectValue placeholder="Chọn chuyên khoa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">
                      <div className="flex items-center gap-2">
                        Tất cả chuyên khoa
                      </div>
                    </SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        <div className="flex items-center gap-2">
                          {dept.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                {departments.length > 0 && (
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="w-full md:w-[250px] h-12">
                      <SelectValue placeholder="Chọn chuyên khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">
                        <div className="flex items-center gap-2">
                          Tất cả chuyên khoa
                        </div>
                      </SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          <div className="flex items-center gap-2">
                            {dept.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Department Filter Pills */}
            {departments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                <Button
                  key={"ALL"}
                  variant={departmentFilter === "ALL" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDepartmentFilter("ALL")}
                  className="flex items-center gap-2"
                >
                  Tất cả chuyên khoa
                </Button>
                {departments.map((dept) => (
                  <Button
                    key={dept.id}
                    variant={
                      departmentFilter === dept.id.toString()
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => setDepartmentFilter(dept.id.toString())}
                    className="flex items-center gap-2"
                  >
                    {dept.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {doctors.length} Bác sĩ được tìm thấy
            </h2>
            <p className="text-gray-600 text-lg">
              Chọn bác sĩ phù hợp với nhu cầu chăm sóc sức khỏe của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Link
                href={`/doi-ngu-bac-si/${toSlug(
                  `${doctor.name} ${doctor.id}`
                )}`}
                key={doctor.id}
              >
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
                          {doctor.experienceYears} năm kinh nghiệm
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Hiển thị</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number.parseInt(value));
                    setCurrentPage(1); // Reset to first page when changing items per page
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">mục mỗi trang</span>
              </div>

              <div className="text-sm text-gray-600">
                Hiển thị {currentPage * itemsPerPage - itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, doctors.length)} trong
                tổng số {totalItems} chuyên khoa
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
                  Trước
                </Button>

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

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Sau
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
          )}

          {doctors.length === 0 && (
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
