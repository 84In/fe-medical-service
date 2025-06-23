"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Wifi,
  Search,
  Plus,
  Home,
  Phone,
} from "lucide-react";

interface NewsTypesErrorProps {
  error?: Error | null;
  creatNew?: () => void;
  onRetry?: () => void;
  type?: "network" | "not-found" | "general";
}

export function NewsTypesError({
  error,
  creatNew,
  onRetry,
  type = "general",
}: NewsTypesErrorProps) {
  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: Wifi,
          title: "Không thể kết nối",
          message:
            "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-600",
        };
      case "not-found":
        return {
          icon: Search,
          title: "Không có dữ liệu",
          message: "Không có loại tin tức nào được tìm thấy trong hệ thống.",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          iconColor: "text-gray-600",
        };
      default:
        return {
          icon: AlertTriangle,
          title: "Đã xảy ra lỗi",
          message:
            error?.message ||
            "Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý loại tin tức
          </h1>
          <p className="text-gray-600">
            Quản lý các loại tin tức trong hệ thống
          </p>
        </div>
        <Button disabled className="bg-gray-200">
          <Plus className="h-4 w-4 mr-2" />
          Thêm loại tin tức
        </Button>
      </div>

      {/* Error Display */}
      <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
        <CardContent className="p-12">
          <div className="text-center">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${config.bgColor}`}
            >
              <IconComponent className={`h-8 w-8 ${config.iconColor}`} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {config.title}
            </h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              {config.message}
            </p>

            {/* Error Details for Development */}
            {error && process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Chi tiết lỗi (Development)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto text-red-600">
                  {error.stack || error.message}
                </pre>
              </details>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              {onRetry && (
                <Button onClick={onRetry} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Thử lại
                </Button>
              )}

              {type === "not-found" && (
                <Button
                  variant="outline"
                  onClick={creatNew}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Thêm loại tin tức đầu tiên
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Tải lại trang
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2">Cần hỗ trợ?</h4>
            <p className="text-gray-600 text-sm mb-4">
              Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với đội ngũ hỗ trợ kỹ
              thuật.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Hotline: 1900-1234
              </Button>
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
