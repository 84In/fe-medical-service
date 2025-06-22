"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Wifi,
  Search,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface ServiceErrorProps {
  error?: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function ServiceError({
  error,
  onRetry,
  isRetrying = false,
}: ServiceErrorProps) {
  const getErrorInfo = () => {
    if (!error) {
      return {
        title: "Đã xảy ra lỗi",
        description: "Không thể tải danh sách dịch vụ. Vui lòng thử lại.",
        icon: AlertTriangle,
        color: "text-red-500",
      };
    }

    const message = error.message.toLowerCase();

    if (message.includes("network") || message.includes("fetch")) {
      return {
        title: "Lỗi kết nối mạng",
        description:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.",
        icon: Wifi,
        color: "text-orange-500",
      };
    }

    if (message.includes("not found") || message.includes("404")) {
      return {
        title: "Không tìm thấy dữ liệu",
        description:
          "Danh sách dịch vụ hiện không khả dụng. Vui lòng thử lại sau.",
        icon: Search,
        color: "text-blue-500",
      };
    }

    return {
      title: "Đã xảy ra lỗi",
      description:
        error.message || "Không thể tải danh sách dịch vụ. Vui lòng thử lại.",
      icon: AlertTriangle,
      color: "text-red-500",
    };
  };

  const errorInfo = getErrorInfo();
  const IconComponent = errorInfo.icon;

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
        <span className="h-4 w-24 bg-gray-300 rounded animate-pulse"></span>
      </nav>

      {/* Error Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6`}
              >
                <IconComponent className={`h-10 w-10 ${errorInfo.color}`} />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {errorInfo.title}
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {errorInfo.description}
              </p>
            </div>

            {/* Error Details */}
            {error && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg text-left max-w-2xl mx-auto">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Chi tiết lỗi:
                </h3>
                <p className="text-sm text-gray-600 font-mono break-all">
                  {error.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  disabled={isRetrying}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 min-w-[140px]"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Đang thử lại...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Thử lại
                    </>
                  )}
                </Button>
              )}

              <Link href="/">
                <Button variant="outline" size="lg" className="min-w-[140px]">
                  <Home className="h-4 w-4 mr-2" />
                  Về trang chủ
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Cần hỗ trợ?</strong> Liên hệ hotline{" "}
                <span className="font-semibold">1900-1234</span> hoặc email{" "}
                <span className="font-semibold">support@vitacare.com</span> để
                được hỗ trợ.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
