"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Plus,
  Phone,
  Wifi,
  Search,
  Building2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ServicesErrorProps {
  error?: Error | null;
  creatNew?: () => void;
  onRetry?: () => void;
  type?: "network" | "not-found" | "general";
}

export function ServicesError({
  error,
  creatNew,
  onRetry,
  type = "general",
}: ServicesErrorProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: Wifi,
          title: "Lỗi kết nối mạng",
          message:
            "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet của bạn.",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "not-found":
        return {
          icon: Search,
          title: "Không tìm thấy dữ liệu",
          message: "Không có dịch vụ nào được tìm thấy trong hệ thống.",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
      default:
        return {
          icon: AlertTriangle,
          title: "Đã xảy ra lỗi",
          message:
            error?.message ||
            "Có lỗi xảy ra khi tải danh sách dịch vụ. Vui lòng thử lại.",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
    }
  };

  const config = getErrorConfig();
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý dịch vụ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin dịch vụ y tế, thêm sửa xóa các dịch vụ trong hệ
            thống.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" disabled>
          <Plus className="h-4 w-4 mr-2" />
          Thêm dịch vụ
        </Button>
      </div>

      {/* Error Card */}
      <Card className={`${config.borderColor} ${config.bgColor}`}>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className={`${config.color} mb-4`}>
            <Icon className="h-16 w-16" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {config.title}
          </h3>

          <p className="text-gray-600 text-center max-w-md mb-6">
            {config.message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {onRetry && (
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-blue-600 hover:bg-blue-700"
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

            {type === "not-found" && (
              <Button onClick={creatNew} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Thêm dịch vụ đầu tiên
              </Button>
            )}

            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Tải lại trang
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>Cần hỗ trợ? Gọi: </span>
              <a
                href="tel:1900-1234"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                1900-1234
              </a>
            </div>
          </div>

          {/* Additional Actions for Empty State */}
          {type === "not-found" && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
              <Link
                href={"/admin/services/service-types"}
                className="text-center p-4 bg-white rounded-lg border hover:cursor-pointer"
              >
                <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Quản lý loại dịch vụ
                </p>
                <p className="text-xs text-gray-600">Tạo loại dịch vụ trước</p>
              </Link>
              <div
                onClick={creatNew}
                className="text-center p-4 bg-white rounded-lg border hover:cursor-pointer"
              >
                <Plus className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Thêm dịch vụ
                </p>
                <p className="text-xs text-gray-600">Tạo dịch vụ mới</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Import dữ liệu
                </p>
                <p className="text-xs text-gray-600">Nhập từ file Excel</p>
                <span>Đang phát triên!</span>
              </div>
            </div>
          )}

          {/* Error Details (for development) */}
          {error && process.env.NODE_ENV === "development" && (
            <details className="mt-4 w-full max-w-2xl">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                Chi tiết lỗi (Development)
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto">
                {error.stack || error.message}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
