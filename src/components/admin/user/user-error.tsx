"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Wifi, UserPlus, RotateCcw, Home } from "lucide-react";

interface UserErrorProps {
  error: Error;
  onRetry?: () => void;
  createNew?: () => void;
  type?: "network" | "not-found" | "general";
}

export function UserError({
  error,
  onRetry,
  createNew,
  type = "general",
}: UserErrorProps) {
  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: Wifi,
          title: "Lỗi kết nối mạng",
          description:
            "Không thể tải danh sách nhân viên. Vui lòng kiểm tra kết nối internet.",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "not-found":
        return {
          icon: UserPlus,
          title: "Chưa có nhân viên nào",
          description:
            "Hệ thống chưa có nhân viên nào. Hãy thêm nhân viên đầu tiên.",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
      default:
        return {
          icon: AlertTriangle,
          title: "Có lỗi xảy ra",
          description:
            "Không thể tải danh sách nhân viên. Vui lòng thử lại sau.",
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý nhân viên
          </h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản và phân quyền nhân viên
          </p>
        </div>
      </div>

      {/* Error Card */}
      <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className={`${config.color} mb-4`}>
            <Icon size={64} />
          </div>

          <h2 className={`text-2xl font-bold ${config.color} mb-2`}>
            {config.title}
          </h2>

          <p className="text-gray-600 text-center mb-6 max-w-md">
            {config.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {type === "not-found"
              ? createNew && (
                  <Button
                    onClick={createNew}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm nhân viên đầu tiên
                  </Button>
                )
              : onRetry && (
                  <Button
                    onClick={onRetry}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Thử lại
                  </Button>
                )}

            <Button variant="outline" onClick={() => window.location.reload()}>
              <Home className="h-4 w-4 mr-2" />
              Tải lại trang
            </Button>
          </div>

          {/* Error Details for Development */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-6 w-full max-w-2xl">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Chi tiết lỗi (Development)
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ:</p>
            <p className="font-medium">
              📧 support@vitacaremedical.vn | 📞 1900-xxxx
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
