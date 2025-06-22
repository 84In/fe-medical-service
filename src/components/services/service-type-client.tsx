"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Home,
  Phone,
} from "lucide-react";
import { fetchServiceTypesWithSearch } from "@/services/metadata.service";
import { toSlug } from "@/utils/slugify";
import type { Service, ServiceType } from "@/types/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { getServices } from "@/services/services.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ServiceTypeDetailSkeleton } from "./service-type-detail-skeleton";
import { ServiceError } from "./service-detail-error";
import { ServiceCard } from "./service-card";

/**
 * Displays a paginated list of services for a given service type, including pagination controls,
 * items-per-page selection, and a section for other available service types.
 *
 * @param serviceType - The currently selected service type whose services will be listed.
 *
 * Fetches and displays services of the specified type, handles loading and error states,
 * and provides navigation to other service types. Also includes UI for pagination and
 * items-per-page selection.
 */
export default function ClientServiceList({
  serviceType,
}: {
  serviceType: ServiceType;
}) {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices(
        currentPage - 1,
        itemsPerPage,
        "",
        "ACTIVE",
        serviceType.id
      );
      console.log("Fetched services:", data);

      setServices(data.items || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Lỗi khi tải danh sách dịch vụ:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchServices();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage]);

  const handleRetry = () => {
    fetchServices();
  };

  useEffect(() => {
    fetchServiceTypesWithSearch("", "ACTIVE").then((data) =>
      setServiceTypes(data || [])
    );
  }, []);

  //Loading skeleton
  if (loading) return <ServiceTypeDetailSkeleton />;
  if (error) return <ServiceError error={error} onRetry={handleRetry} />;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm bg-white py-2 px-2 rounded-md text-gray-500">
        <Link href="/" className="flex items-center hover:text-blue-600">
          <Home className="h-4 w-4 mr-1" />
          <span>Trang chủ</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/dich-vu" className="hover:text-blue-600">
          Dịch vụ
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 font-medium">{serviceType.name}</span>
      </nav>

      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center"></div>
        <div className="relative p-4 md:p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Dịch vụ {serviceType.name}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            {serviceType.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Phone className="h-4 w-4 mr-2" />
              Hotline: 1900-1234
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-12 mx-auto py-4 px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-6">
          Danh sách dịch vụ {serviceType.name.toLowerCase()}
        </h2>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
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
                  {Math.min(currentPage * itemsPerPage, services.length)} trong
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
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không có dịch vụ
            </h3>
            <p className="text-gray-600 mb-6">
              Hiện tại không có dịch vụ nào thuộc loại {serviceType.name}
            </p>
            <Link href="/dich-vu">
              <Button>Xem tất cả dịch vụ</Button>
            </Link>
          </div>
        )}

        {/* Loại dịch vụ khác */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Các loại dịch vụ khác</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTypes
              .filter(
                (type) => type.id !== serviceType.id && type.status === "ACTIVE"
              )
              .map((type) => (
                <Link
                  key={type.id}
                  href={`/dich-vu/loai/${toSlug(type.name)}-${type.id}`}
                >
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>{type.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full text-blue-600 hover:text-blue-700"
                      >
                        Xem dịch vụ <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
