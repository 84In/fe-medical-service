"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDepartments } from "@/services";
import type { Department } from "@/types";
import {
  ArrowRight,
  Building2,
  Calendar,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Home,
  MapPin,
  Phone,
  Search,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChuyenKhoaSkeleton } from "./chuyen-khoa-skeleton";
import { ChuyenKhoaError } from "./chuyen-khoa-error";

// Function to create slug from name and id
const createSlug = (name: string, id: number): string => {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
  return `${slug}-${id}`;
};

export default function ChuyenKhoaClientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const departmentStats = {
    totalDepartments: totalItems,
    totalDoctors: 85,
    totalPatients: 12500,
    emergencyAvailable: true,
  };

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getDepartments(
        currentPage - 1,
        itemsPerPage,
        searchTerm
      );

      console.log("Fetched departments:", data);
      setDepartments(data.items || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Lỗi khi tải danh sách chuyên khoa:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchDepartments();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm]);

  const handleRetry = () => {
    fetchDepartments();
  };

  function formatNumberWithDot(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  // Show skeleton while loading
  if (loading) {
    return <ChuyenKhoaSkeleton />;
  }

  // Show error if there's an error
  if (error) {
    return <ChuyenKhoaError error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="text-gray-900 font-medium">Chuyên khoa</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Các chuyên khoa tại VitaCare Medical
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Đội ngũ bác sĩ chuyên môn cao, trang thiết bị hiện đại, cam kết
              mang đến dịch vụ y tế chất lượng cao nhất
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {formatNumberWithDot(departmentStats.totalDepartments)}+
                </div>
                <div className="text-blue-200">Chuyên khoa</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {departmentStats.totalDoctors}+
                </div>
                <div className="text-blue-200">Bác sĩ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {departmentStats.totalPatients.toLocaleString()}+
                </div>
                <div className="text-blue-200">Bệnh nhân/năm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200">Cấp cứu</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm chuyên khoa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Cấp cứu 24/7</h3>
                <p className="text-red-700">
                  Luôn sẵn sàng phục vụ trong các tình huống khẩn cấp
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">115</div>
                <div className="text-sm text-red-700">Hotline cấp cứu</div>
              </div>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Gọi ngay
              </Button>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department) => {
            const slug = createSlug(department.name, department.id);

            return (
              <Card
                key={department.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {department.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={
                        department.status === "ACTIVE"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {department.status === "ACTIVE"
                        ? "Hoạt động"
                        : "Tạm ngừng"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {department.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 line-clamp-6">
                    {stripHtml(department.contentHtml)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Link href={`/chuyen-khoa/${slug}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Xem chi tiết
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No results */}
        {departments.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Không tìm thấy chuyên khoa
            </h3>
            <p className="text-gray-600 mb-6">
              Không có chuyên khoa nào phù hợp với tiêu chí tìm kiếm của bạn.
            </p>
            <Button onClick={() => setSearchTerm("")}>Xóa bộ lọc</Button>
          </div>
        )}

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
              {Math.min(currentPage * itemsPerPage, departments.length)} trong
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
                    variant={currentPage === pageNumber ? "default" : "outline"}
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

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cần tư vấn hoặc đặt lịch khám?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đội ngũ tư vấn viên của chúng tôi sẵn sàng hỗ trợ bạn 24/7. Liên
              hệ ngay để được tư vấn miễn phí và đặt lịch khám.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Hotline tư vấn
              </h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">1900-1234</p>
              <p className="text-sm text-gray-600">24/7 - Miễn phí</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
              <p className="text-gray-700 mb-1">123 Đường ABC</p>
              <p className="text-sm text-gray-600">Quận 1, TP.HCM</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Đặt lịch online
              </h3>
              <Link href="/dat-lich">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Đặt lịch ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
