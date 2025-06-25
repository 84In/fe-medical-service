"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DepartmentsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Filter skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-40" />
          </div>
        </CardContent>
      </Card>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded" />
                <div className="ml-4 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table row skeleton */}
      <Card>
        <CardContent className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center gap-4 border-b pb-3"
            >
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full col-span-2" />
              <div className="flex justify-end">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function DepartmentsErrorFallback({
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
        "Không thể tải danh sách chuyên khoa. Vui lòng kiểm tra kết nối internet của bạn.",
      color: "blue",
    },
    notFound: {
      icon: "👨‍⚕️",
      title: "Không tìm thấy chuyên khoa",
      description: "Hiện tại chưa có chuyên khoa nào trong hệ thống.",
      color: "gray",
    },
    general: {
      icon: "⚠️",
      title: "Đã xảy ra lỗi",
      description: "Không thể tải danh sách chuyên khoa. Vui lòng thử lại sau.",
      color: "red",
    },
  };

  const config = errorConfig[errorType];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý chuyên khoa
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin các khoa, chuyên môn và mô tả dịch vụ y tế.
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
                ➕ Thêm chuyên khoa đầu tiên
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
