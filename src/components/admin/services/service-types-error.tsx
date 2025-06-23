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
} from "lucide-react";
import { useState } from "react";

interface ServiceTypesErrorProps {
  error?: Error | null;
  onRetry?: () => void;
  createNew?: () => void;
  type?: "network" | "not-found" | "general";
}

export function ServiceTypesError({
  error,
  onRetry,
  createNew,
  type = "general",
}: ServiceTypesErrorProps) {
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
          message: "Không có loại dịch vụ nào được tìm thấy trong hệ thống.",
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
            "Có lỗi xảy ra khi tải danh sách loại dịch vụ. Vui lòng thử lại.",
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
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý loại dịch vụ
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý các loại dịch vụ y tế trong hệ thống.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" disabled>
          <Plus className="h-4 w-4 mr-2" />
          Thêm loại dịch vụ
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
              <Button variant="outline" onClick={createNew}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm loại dịch vụ đầu tiên
              </Button>
            )}
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

          {/* Error Details (for development) */}
          {error && process.env.NODE_ENV === "development" && (
            <details className="mt-4 w-full max-w-md">
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
