"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit,
  Eye,
  MoreVertical,
  Building2,
  Users,
  Activity,
  Clock,
  Trash2,
  FileText,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import type { ServiceType } from "@/types";
import { ServiceTypesSkeleton } from "./service-types-skeleton";
import { ServiceTypesError } from "./service-types-error";
import {
  addserviceType,
  getserviceTypes,
  updateserviceType,
} from "@/services/service-types.service";
import { toast } from "@/hooks/use-toast";
import { getStatusColor, getStatusText } from "@/utils/status-css";

// Mock data
const mockServiceTypes: ServiceType[] = [
  {
    id: 1,
    name: "Khám tổng quát",
    description:
      "Dịch vụ khám sức khỏe tổng quát, bao gồm khám lâm sàng và các xét nghiệm cơ bản",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Tầm soát ung thư",
    description: "Dịch vụ tầm soát và phát hiện sớm các loại ung thư",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Chẩn đoán hình ảnh",
    description: "Dịch vụ chẩn đoán hình ảnh bao gồm siêu âm, CT, MRI, X-quang",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Xét nghiệm",
    description:
      "Dịch vụ xét nghiệm máu, nước tiểu và các xét nghiệm chuyên khoa",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Phẫu thuật",
    description: "Dịch vụ phẫu thuật các chuyên khoa",
    status: "INACTIVE",
  },
];

export default function ServiceTypesManagement() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingServiceType, setEditingServiceType] =
    useState<ServiceType | null>(null);
  const [deletingServiceType, setDeletingServiceType] =
    useState<ServiceType | null>(null);
  const [viewingServiceType, setViewingServiceType] =
    useState<ServiceType | null>(null);
  const [newServiceType, setNewServiceType] = useState<Partial<ServiceType>>({
    name: "",
    description: "",
    status: "ACTIVE",
  });

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [totalPages, setTotalPages] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchServiceTypes = async () => {
    try {
      const data = await getserviceTypes(
        currentPage - 1,
        itemsPerPage,
        searchTerm,
        statusFilter
      );
      console.log("Fetched doctors:", data);

      setServiceTypes(data.items || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Lỗi khi tải danh sách loại dịch vụ:", error);
      setError(
        error instanceof Error
          ? error
          : new Error("Đã xảy ra lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  // Simulate API call
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchServiceTypes();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    fetchServiceTypes();
  };

  // Show skeleton while loading
  if (loading) {
    return <ServiceTypesSkeleton />;
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const handleAddServiceType = async () => {
    if (!newServiceType.name || !newServiceType.description) return;

    const serviceType: Partial<ServiceType> = {
      name: newServiceType.name,
      description: newServiceType.description,
      status: (newServiceType.status as ServiceType["status"]) || "ACTIVE",
    };

    try {
      const { code, message, result } = await addserviceType(serviceType);
      if (code === 0) {
        toast({
          title: "Thành công!",
          description: "Thêm loại dịch vụ thành công!",
          variant: "success",
        });
        setServiceTypes((prev) => [...prev, result]);
      } else {
        throw new Error(message || "Thêm loại dịch vụ thất bại");
      }
    } catch (error) {
      console.error("Error adding service types:", error);
      let message = "Thêm loại dịch vụ thất bại!";

      setError(
        error instanceof Error
          ? error
          : new Error("Đã xảy ra lỗi không xác định")
      );
      toast({
        title: "Thất bại!",
        description: message,
        variant: "destructive",
      });
    }
    setNewServiceType({
      name: "",
      description: "",
      status: "ACTIVE",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditServiceType = (serviceType: ServiceType) => {
    setEditingServiceType(serviceType);
  };

  const handleUpdateServiceType = async () => {
    if (!editingServiceType) return;

    try {
      const { code, message, result } = await updateserviceType(
        editingServiceType.id,
        editingServiceType
      );

      if (code === 0) {
        setServiceTypes((prev) =>
          prev.map((st) => (st.id === result.id ? result : st))
        );
        toast({
          title: "Thành công!",
          description: " Cập nhật loại dịch vụ thành công!",
          variant: "success",
        });
      } else {
        throw new Error(message || "Cập nhật loại dịch vụ thất bại");
      }
    } catch (error) {
      console.error("Lỗi cập nhật loại dịch vụ:", error);
      toast({
        title: "Thất bại!",
        description:
          error instanceof Error ? error.message : "Cập nhật thất bại!",
        variant: "destructive",
      });
    } finally {
      setEditingServiceType(null);
    }
  };

  const handleDeleteServiceType = () => {
    if (!deletingServiceType) return;

    setServiceTypes(
      serviceTypes.map((serviceType) =>
        serviceType.id === deletingServiceType.id
          ? { ...serviceType, status: "DELETED" as const }
          : serviceType
      )
    );
    setDeletingServiceType(null);
  };

  if (error) {
    const errorType = error.message.includes("network") ? "network" : "general";
    return (
      <ServiceTypesError type={errorType} error={error} onRetry={handleRetry} />
    );
  }

  // Show not found if no data
  if (serviceTypes.length === 0) {
    return (
      <>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm loại dịch vụ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm loại dịch vụ mới</DialogTitle>
              <DialogDescription>
                Tạo loại dịch vụ mới để phân loại các dịch vụ y tế.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên loại dịch vụ *</Label>
                <Input
                  id="name"
                  value={newServiceType.name || ""}
                  onChange={(e) =>
                    setNewServiceType({
                      ...newServiceType,
                      name: e.target.value,
                    })
                  }
                  placeholder="Ví dụ: Khám tổng quát, Tầm soát ung thư, v.v."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Textarea
                  id="description"
                  value={newServiceType.description || ""}
                  onChange={(e) =>
                    setNewServiceType({
                      ...newServiceType,
                      description: e.target.value,
                    })
                  }
                  placeholder="Mô tả chi tiết về loại dịch vụ này..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={newServiceType.status}
                  onValueChange={(value) =>
                    setNewServiceType({
                      ...newServiceType,
                      status: value as ServiceType["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Ngừng hoạt động</SelectItem>
                    <SelectItem value="HIDDEN">Ẩn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddServiceType}
                disabled={!newServiceType.name || !newServiceType.description}
              >
                Thêm loại dịch vụ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ServiceTypesError
          type="not-found"
          createNew={() => setIsAddDialogOpen(true)}
          onRetry={handleRetry}
        />
      </>
    );
  }

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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm loại dịch vụ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm loại dịch vụ mới</DialogTitle>
              <DialogDescription>
                Tạo loại dịch vụ mới để phân loại các dịch vụ y tế.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên loại dịch vụ *</Label>
                <Input
                  id="name"
                  value={newServiceType.name || ""}
                  onChange={(e) =>
                    setNewServiceType({
                      ...newServiceType,
                      name: e.target.value,
                    })
                  }
                  placeholder="Ví dụ: Khám tổng quát, Tầm soát ung thư, v.v."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Textarea
                  id="description"
                  value={newServiceType.description || ""}
                  onChange={(e) =>
                    setNewServiceType({
                      ...newServiceType,
                      description: e.target.value,
                    })
                  }
                  placeholder="Mô tả chi tiết về loại dịch vụ này..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={newServiceType.status}
                  onValueChange={(value) =>
                    setNewServiceType({
                      ...newServiceType,
                      status: value as ServiceType["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Ngừng hoạt động</SelectItem>
                    <SelectItem value="HIDDEN">Ẩn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddServiceType}
                disabled={!newServiceType.name || !newServiceType.description}
              >
                Thêm loại dịch vụ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tìm kiếm & Lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                <SelectItem value="INACTIVE">Ngừng hoạt động</SelectItem>
                <SelectItem value="HIDDEN">Ẩn</SelectItem>
                <SelectItem value="DELETED">Đã xóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng loại dịch vụ
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {serviceTypes.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">
                  {serviceTypes.filter((d) => d.status === "ACTIVE").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Ngừng hoạt động
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {serviceTypes.filter((d) => d.status === "INACTIVE").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ẩn</p>
                <p className="text-2xl font-bold text-gray-900">
                  {serviceTypes.filter((d) => d.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Types Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách loại dịch vụ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên loại dịch vụ</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceTypes.map((serviceType) => (
                  <TableRow key={serviceType.id}>
                    <TableCell className="font-medium">
                      {serviceType.name}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {serviceType.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(serviceType.status)}>
                        {getStatusText(serviceType.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setViewingServiceType(serviceType)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditServiceType(serviceType)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingServiceType(serviceType)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* No results */}
          {serviceTypes.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy loại dịch vụ
              </h3>
              <p className="text-gray-600">
                Không có loại dịch vụ nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

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
            {Math.min(currentPage * itemsPerPage, serviceTypes.length)} trong
            tổng số {totalItems} loại dịch vụ
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

      {/* View Dialog */}
      {viewingServiceType && (
        <Dialog
          open={!!viewingServiceType}
          onOpenChange={() => setViewingServiceType(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {viewingServiceType.name}
              </DialogTitle>
              <DialogDescription>
                Chi tiết thông tin loại dịch vụ
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Trạng thái
                </Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(viewingServiceType.status)}>
                    {getStatusText(viewingServiceType.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Mô tả
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {viewingServiceType.description}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editingServiceType && (
        <Dialog
          open={!!editingServiceType}
          onOpenChange={() => setEditingServiceType(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa loại dịch vụ</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin loại dịch vụ
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tên loại dịch vụ</Label>
                <Input
                  id="edit-name"
                  value={editingServiceType.name}
                  onChange={(e) =>
                    setEditingServiceType({
                      ...editingServiceType,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={editingServiceType.description}
                  onChange={(e) =>
                    setEditingServiceType({
                      ...editingServiceType,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select
                  value={editingServiceType.status}
                  onValueChange={(value) =>
                    setEditingServiceType({
                      ...editingServiceType,
                      status: value as ServiceType["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Ngừng hoạt động</SelectItem>
                    <SelectItem value="HIDDEN">Ẩn</SelectItem>
                    <SelectItem value="DELETED">Đã xóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateServiceType}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingServiceType}
        onOpenChange={() => setDeletingServiceType(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa loại dịch vụ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa loại dịch vụ "
              {deletingServiceType?.name}
              "? Hành động này sẽ đánh dấu loại dịch vụ là đã xóa và không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteServiceType}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
