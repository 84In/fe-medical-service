"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Stethoscope,
  Clock,
  Award,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Edit,
  Eye,
} from "lucide-react";

export function DoctorsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
                <Skeleton className="h-10 w-full pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-[180px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="relative w-full sm:w-[180px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-gray-300" />
              <div className="ml-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-gray-300" />
              <div className="ml-4">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-gray-300" />
              <div className="ml-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-gray-300" />
              <div className="ml-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items per page selector */}
      <div className="flex justify-end items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-20" />
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
                <MoreVertical className="h-4 w-4 text-gray-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-300" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-300" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-300" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-300" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="flex-1 flex items-center justify-center h-8 border rounded-md">
                  <Edit className="h-4 w-4 mr-1 text-gray-300" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex-1 flex items-center justify-center h-8 border rounded-md">
                  <Eye className="h-4 w-4 mr-1 text-gray-300" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Skeleton className="h-4 w-48" />
            <div className="flex items-center gap-2">
              <ChevronsLeft className="h-4 w-4 text-gray-300" />
              <ChevronLeft className="h-4 w-4 text-gray-300" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="w-8 h-8" />
                ))}
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <ChevronsRight className="h-4 w-4 text-gray-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DoctorsErrorFallback({
  error,
  onRetry,
}: {
  error?: Error;
  onRetry?: () => void;
}) {
  const getErrorType = () => {
    if (!error) return "general";

    const message = error.message.toLowerCase();
    if (message.includes("network") || message.includes("fetch")) {
      return "network";
    }
    if (message.includes("not found") || message.includes("404")) {
      return "notFound";
    }
    return "general";
  };

  const errorType = getErrorType();

  const errorConfig = {
    network: {
      icon: "🌐",
      title: "Lỗi kết nối mạng",
      description:
        "Không thể tải danh sách bác sĩ. Vui lòng kiểm tra kết nối internet của bạn.",
      color: "blue",
    },
    notFound: {
      icon: "👨‍⚕️",
      title: "Không tìm thấy bác sĩ",
      description: "Hiện tại chưa có bác sĩ nào trong hệ thống.",
      color: "gray",
    },
    general: {
      icon: "⚠️",
      title: "Đã xảy ra lỗi",
      description: "Không thể tải danh sách bác sĩ. Vui lòng thử lại sau.",
      color: "red",
    },
  };

  const config = errorConfig[errorType];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bác sĩ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin bác sĩ, chuyên khoa và vị trí làm việc.
          </p>
        </div>
      </div>

      {/* Error Content */}
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">{config.icon}</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {config.title}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {config.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <button
                onClick={onRetry}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-${config.color}-600 hover:bg-${config.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${config.color}-500`}
              >
                🔄 Thử lại
              </button>
            )}

            {errorType === "notFound" && (
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                ➕ Thêm bác sĩ đầu tiên
              </button>
            )}

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🔄 Tải lại trang
            </button>
          </div>

          {/* Development Error Details */}
          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Chi tiết lỗi (Development)
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto text-red-600">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="mt-8 text-sm text-gray-500">
            <p>
              Cần hỗ trợ? Liên hệ:
              <a
                href="mailto:support@vitacare.com"
                className="text-blue-600 hover:text-blue-500 ml-1"
              >
                support@vitacare.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
