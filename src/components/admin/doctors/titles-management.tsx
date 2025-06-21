"use client";

import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
import {
  Plus,
  Search,
  Edit,
  Eye,
  MoreVertical,
  Award,
  Activity,
  Clock,
  Trash2,
  GraduationCap,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Title } from "@/types/doctor";
import { addTitle, getTitles, updateTitle } from "@/services/title.service";
import { TitlesErrorFallback, TitlesLoadingSkeleton } from "./titles-skeleton";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockTitles: Title[] = [
  {
    id: 1,
    name: "BS.",
    description: "Bác sĩ - Người có bằng tốt nghiệp đại học y khoa",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "ThS.BS.",
    description: "Thạc sĩ Bác sĩ - Bác sĩ có bằng thạc sĩ y khoa",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "TS.BS.",
    description: "Tiến sĩ Bác sĩ - Bác sĩ có bằng tiến sĩ y khoa",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "PGS.TS.",
    description: "Phó Giáo sư Tiến sĩ - Chức danh khoa học cao cấp",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "GS.TS.",
    description: "Giáo sư Tiến sĩ - Chức danh khoa học cao nhất",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "BSCK I",
    description:
      "Bác sĩ Chuyên khoa cấp I - Bác sĩ có chứng chỉ chuyên khoa cấp I",
    status: "ACTIVE",
  },
  {
    id: 7,
    name: "BSCK II",
    description:
      "Bác sĩ Chuyên khoa cấp II - Bác sĩ có chứng chỉ chuyên khoa cấp II",
    status: "ACTIVE",
  },
  {
    id: 8,
    name: "BSNT",
    description:
      "Bác sĩ Nội trú - Bác sĩ đang trong thời gian đào tạo chuyên khoa",
    status: "INACTIVE",
  },
];

export function TitlesManagement() {
  const [titles, setTitles] = useState<Title[]>(mockTitles);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState<Title | null>(null);
  const [deletingTitle, setDeletingTitle] = useState<Title | null>(null);
  const [viewingTitle, setViewingTitle] = useState<Title | null>(null);
  const [newTitle, setNewTitle] = useState<Partial<Title>>({
    name: "",
    description: "",
    status: "ACTIVE",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200";
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "HIDDEN":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "DELETED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Hoạt động";
      case "INACTIVE":
        return "Ngừng hoạt động";
      case "HIDDEN":
        return "Ẩn";
      case "DELETED":
        return "Đã xóa";
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const data = await getTitles(
          currentPage - 1,
          itemsPerPage,
          searchTerm,
          statusFilter
        );
        console.log("Fetched titles:", data);

        setTitles(data.items || []);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error("Lỗi khi tải danh sách chức danh:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchTitles();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  if (loading) return <TitlesLoadingSkeleton />;
  if (error) return <TitlesErrorFallback />;

  const handleAddTitle = async () => {
    if (!newTitle.name || !newTitle.description) return;

    const title: Partial<Title> = {
      id: Date.now(),
      name: newTitle.name,
      description: newTitle.description,
      status: (newTitle.status as Title["status"]) || "ACTIVE",
    };

    try {
      const { code, message, result } = await addTitle(title);
      if (code === 0) {
        toast({
          title: "Thành công!",
          description: "Thêm chức danh thành công!",
          variant: "success",
        });
        setTitles((prev) => [...prev, result]);
      } else {
        throw new Error(message || "Thêm chức danh thất bại");
      }
    } catch (error) {
      console.error("Error adding Titles:", error);
      let message = "Thêm chức danh thất bại!";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response !== null &&
        "data" in (error as any).response &&
        typeof (error as any).response.data === "object" &&
        (error as any).response.data !== null &&
        "message" in (error as any).response.data
      ) {
        message = (error as any).response.data.message;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      toast({
        title: "Thất bại!",
        description: message,
        variant: "destructive",
      });
    }

    setNewTitle({
      name: "",
      description: "",
      status: "ACTIVE",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditTitle = (title: Title) => {
    setEditingTitle(title);
  };

  const handleUpdateTitle = async () => {
    if (!editingTitle) return;

    try {
      const { code, message, result } = await updateTitle(
        editingTitle.id,
        editingTitle
      );

      if (code === 0) {
        setTitles((prev) =>
          prev.map((dept) => (dept.id === result.id ? result : dept))
        );
        toast({
          title: "Thành công!",
          description: "Cập nhật chuyên môn thành công!",
          variant: "success",
        });
      } else {
        throw new Error(message || "Cập nhật chuyên môn thất bại");
      }
    } catch (error) {
      console.error("Lỗi cập nhật chuyên môn:", error);
      let message = "Cập nhật chuyên môn thất bại!";
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response !== null &&
        "data" in (error as any).response &&
        typeof (error as any).response.data === "object" &&
        (error as any).response.data !== null &&
        "message" in (error as any).response.data
      ) {
        message = (error as any).response.data.message;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }
      toast({
        title: "Thất bại!",
        description: message,
        variant: "destructive",
      });
    } finally {
      setEditingTitle(null);
    }

    setTitles(
      titles.map((title) =>
        title.id === editingTitle.id ? editingTitle : title
      )
    );
    setEditingTitle(null);
  };

  const handleDeleteTitle = () => {
    if (!deletingTitle) return;

    setTitles(
      titles.map((title) =>
        title.id === deletingTitle.id
          ? { ...title, status: "DELETED" as const }
          : title
      )
    );
    setDeletingTitle(null);
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý chức danh
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý các chức danh khoa học và nghề nghiệp trong hệ thống. Thêm,
            chỉnh sửa hoặc xóa chức danh.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm chức danh
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm chức danh mới</DialogTitle>
              <DialogDescription>
                Tạo chức danh mới trong hệ thống. Các trường có dấu * là bắt
                buộc.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên chức danh *</Label>
                <Input
                  id="name"
                  value={newTitle.name || ""}
                  onChange={(e) =>
                    setNewTitle({ ...newTitle, name: e.target.value })
                  }
                  placeholder="Ví dụ: BS., PGS.TS., GS.TS..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Textarea
                  id="description"
                  value={newTitle.description || ""}
                  onChange={(e) =>
                    setNewTitle({ ...newTitle, description: e.target.value })
                  }
                  placeholder="Mô tả chi tiết về chức danh và ý nghĩa"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={newTitle.status}
                  onValueChange={(value) =>
                    setNewTitle({
                      ...newTitle,
                      status: value as Title["status"],
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
                onClick={handleAddTitle}
                disabled={!newTitle.name || !newTitle.description}
              >
                Thêm chức danh
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
                  placeholder="Tìm kiếm theo tên chức danh hoặc mô tả..."
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
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng chức danh
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {titles.length}
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
                  {titles.filter((t) => t.status === "ACTIVE").length}
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
                  {titles.filter((t) => t.status === "INACTIVE").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ẩn</p>
                <p className="text-2xl font-bold text-gray-900">
                  {titles.filter((t) => t.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Titles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách chức danh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên chức danh</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {titles.map((title) => (
                  <TableRow key={title.id}>
                    <TableCell className="font-medium">{title.name}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {title.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(title.status)}>
                        {getStatusText(title.status)}
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
                            onClick={() => setViewingTitle(title)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditTitle(title)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingTitle(title)}
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
          {titles.length === 0 && (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy chức danh
              </h3>
              <p className="text-gray-600">
                Không có chức danh nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      {viewingTitle && (
        <Dialog
          open={!!viewingTitle}
          onOpenChange={() => setViewingTitle(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {viewingTitle.name}
              </DialogTitle>
              <DialogDescription>
                Chi tiết thông tin chức danh
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Tên chức danh
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {viewingTitle.name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Mô tả
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {viewingTitle.description}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Trạng thái
                </Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(viewingTitle.status)}>
                    {getStatusText(viewingTitle.status)}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

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
            {Math.min(currentPage * itemsPerPage, titles.length)} trong tổng số{" "}
            {totalItems} chức danh
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
      {editingTitle && (
        <Dialog
          open={!!editingTitle}
          onOpenChange={() => setEditingTitle(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa chức danh</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin chức danh
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tên chức danh</Label>
                <Input
                  id="edit-name"
                  value={editingTitle.name}
                  onChange={(e) =>
                    setEditingTitle({ ...editingTitle, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={editingTitle.description}
                  onChange={(e) =>
                    setEditingTitle({
                      ...editingTitle,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select
                  value={editingTitle.status}
                  onValueChange={(value) =>
                    setEditingTitle({
                      ...editingTitle,
                      status: value as Title["status"],
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
              <Button onClick={handleUpdateTitle}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingTitle}
        onOpenChange={() => setDeletingTitle(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa chức danh</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa chức danh "{deletingTitle?.name}"? Hành
              động này sẽ đánh dấu chức danh là đã xóa và không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTitle}
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
