"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Filter,
  Building2,
  Activity,
  Clock,
  Users,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import type { NewsType } from "@/types/news";
import {
  addNewsTypes,
  getNewsTypes,
  updateNewsTypes,
} from "@/services/news-types.service";
import { getStatusColor, getStatusText } from "@/utils/status-css";
import { NewsTypesSkeleton } from "./news-types-skeleton";
import { NewsTypesError } from "./news-types-error";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockNewsTypes: NewsType[] = [
  {
    id: 1,
    name: "Tin tức y khoa",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Thông báo",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Sự kiện",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Khuyến mãi",
    status: "INACTIVE",
  },
  {
    id: 5,
    name: "Tin tức chung",
    status: "ACTIVE",
  },
];

export function NewsTypesManagement() {
  const [newsTypes, setNewsTypes] = useState<NewsType[]>(mockNewsTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedNewsType, setSelectedNewsType] = useState<NewsType | null>(
    null
  );

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [totalPages, setTotalPages] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    name: "",
    status: "ACTIVE" as NewsType["status"],
  });

  const fetchNewsTypes = async () => {
    try {
      const data = await getNewsTypes(
        currentPage - 1,
        itemsPerPage,
        searchTerm,
        statusFilter
      );
      console.log("Fetched NewsTypes:", data);

      setNewsTypes(data.items || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Lỗi khi tải danh sách dịch vụ:", error);
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
      fetchNewsTypes();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    fetchNewsTypes();
  };

  const handleCreate = async () => {
    const newNewsType: Partial<NewsType> = {
      name: formData.name,
      status: formData.status,
    };

    try {
      const { code, message, result } = await addNewsTypes(newNewsType);
      if (code === 0) {
        toast({
          title: "Thành công!",
          description: "Thêm loại tin tức thành công!",
          variant: "success",
        });
        setNewsTypes((prev) => [...prev, result]);
      } else {
        throw new Error(message || "Thêm loại tin tức thất bại");
      }
    } catch (error) {
      console.error("Error adding news types:", error);
      let message = "Thêm loại tin tức thất bại!";

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
    resetForm();
    setIsCreateDialogOpen(false);
  };

  const handleEdit = async () => {
    if (!selectedNewsType) return;
    try {
      const { code, message, result } = await updateNewsTypes(
        selectedNewsType.id,
        formData
      );

      if (code === 0) {
        setNewsTypes((prev) =>
          prev.map((nt) => (nt.id === result.id ? result : nt))
        );
        toast({
          title: "Thành công!",
          description: " Cập nhật loại tin tức thành công!",
          variant: "success",
        });
      } else {
        throw new Error(message || "Cập nhật loại tin tức thất bại");
      }
    } catch (error) {
      console.error("Lỗi cập nhật loại tin tức:", error);
      toast({
        title: "Thất bại!",
        description:
          error instanceof Error ? error.message : "Cập nhật thất bại!",
        variant: "destructive",
      });
    } finally {
      setSelectedNewsType(null);
      setIsEditDialogOpen(false);
      resetForm();
    }
  };

  const handleDelete = (id: number) => {
    setNewsTypes(
      newsTypes.map((newsType) =>
        newsType.id === id ? { ...newsType, status: "DELETED" } : newsType
      )
    );
  };

  const resetForm = () => {
    setFormData({
      name: "",
      status: "ACTIVE",
    });
    setSelectedNewsType(null);
  };

  const openEditDialog = (newsType: NewsType) => {
    setSelectedNewsType(newsType);
    setFormData({
      name: newsType.name,
      status: newsType.status,
    });
    setIsEditDialogOpen(true);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  if (loading) return <NewsTypesSkeleton />;
  // Show error if there's an error
  if (error) {
    const errorType = error.message.includes("network") ? "network" : "general";
    return (
      <NewsTypesError type={errorType} error={error} onRetry={handleRetry} />
    );
  }

  // Show not found if no data
  if (newsTypes.length === 0) {
    return (
      <>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => resetForm()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm loại tin tức
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm loại tin tức mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên loại tin tức</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nhập tên loại tin tức"
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: NewsType["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                    <SelectItem value="HIDDEN">Ẩn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={handleCreate} disabled={!formData.name.trim()}>
                  Tạo loại tin tức
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <NewsTypesError
          type="not-found"
          creatNew={() => setIsCreateDialogOpen(true)}
          onRetry={handleRetry}
        />
      </>
    );
  }

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
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => resetForm()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm loại tin tức
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm loại tin tức mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên loại tin tức</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nhập tên loại tin tức"
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: NewsType["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                    <SelectItem value="HIDDEN">Ẩn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={handleCreate} disabled={!formData.name.trim()}>
                  Tạo loại tin tức
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm loại tin tức..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                  <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                  <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                  <SelectItem value="HIDDEN">Ẩn</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                  Tổng dịch vụ
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {newsTypes.length}
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
                  {newsTypes.filter((d) => d.status === "ACTIVE").length}
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
                  {newsTypes.filter((d) => d.status === "INACTIVE").length}
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
                  {newsTypes.filter((d) => d.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách loại tin tức ({newsTypes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên loại tin tức</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsTypes.map((newsType) => (
                <TableRow key={newsType.id}>
                  <TableCell className="font-medium">#{newsType.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{newsType.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(newsType.status)}>
                      {getStatusText(newsType.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditDialog(newsType)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(newsType.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {newsTypes.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">
                Không tìm thấy loại tin tức nào
              </div>
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
            {Math.min(currentPage * itemsPerPage, newsTypes.length)} trong tổng
            số {totalItems} loại tin tức
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa loại tin tức</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Tên loại tin tức</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nhập tên loại tin tức"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value: NewsType["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                  <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                  <SelectItem value="HIDDEN">Ẩn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleEdit} disabled={!formData.name.trim()}>
                Cập nhật
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
