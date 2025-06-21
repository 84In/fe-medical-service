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
  UserCheck,
  Users,
  Activity,
  Clock,
  Trash2,
  Building2,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Specialty } from "@/types/doctor";
import { addSpecialty, getSpecialties, updateSpecialty } from "@/services";
import {
  SpecialtiesErrorFallback,
  SpecialtiesLoadingSkeleton,
} from "./specialty-skeleton";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockSpecialtys: Specialty[] = [
  {
    id: 1,
    name: "Phẫu thuật tim",
    description:
      "Có trách nhiệm thực hiện các ca phẫu thuật tim mạch, bao gồm phẫu thuật bắc cầu động mạch vành, thay van tim, và các thủ thuật khác liên quan đến tim mạch.",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Điện tâm đồ",
    description:
      "Chuyên môn trong việc thực hiện và phân tích điện tâm đồ (ECG) để chẩn đoán các vấn đề về nhịp tim và chức năng tim.",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Chuyên viên dinh dưỡng",
    description:
      "Chuyên gia tư vấn dinh dưỡng cho bệnh nhân, giúp họ xây dựng chế độ ăn uống hợp lý để hỗ trợ điều trị và phục hồi sức khỏe.",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Vật lý trị liệu",
    description:
      "Chuyên gia thực hiện các liệu pháp vật lý để giúp bệnh nhân phục hồi chức năng sau chấn thương hoặc phẫu thuật.",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Nội soi tiêu hóa",
    description:
      "Bác sĩ chuyên thực hiện các thủ thuật nội soi để chẩn đoán và điều trị các vấn đề liên quan đến hệ tiêu hóa.",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Xét nghiệm lâm sàng",
    description:
      "Chuyên gia thực hiện và phân tích các xét nghiệm lâm sàng để hỗ trợ chẩn đoán bệnh.",
    status: "ACTIVE",
  },
  {
    id: 7,
    name: "X-quang chẩn đoán",
    description:
      "Bác sĩ chuyên thực hiện các thủ thuật chụp X-quang để chẩn đoán các vấn đề về xương khớp và mô mềm.",
    status: "INACTIVE",
  },
];

export function SpecialtysManagement() {
  const [specialties, setSpecialties] = useState<Specialty[]>(mockSpecialtys);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
    null
  );
  const [deletingSpecialty, setDeletingSpecialty] = useState<Specialty | null>(
    null
  );
  const [viewingSpecialty, setViewingSpecialty] = useState<Specialty | null>(
    null
  );
  const [newSpecialty, setNewSpecialty] = useState<Partial<Specialty>>({
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
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-800 hover:text-green-100";
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-800 hover:text-yellow-100";
      case "HIDDEN":
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-800 hover:text-gray-100";
      case "DELETED":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-800 hover:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-800 hover:text-gray-100";
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
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties(
          currentPage - 1,
          itemsPerPage,
          searchTerm,
          statusFilter
        );
        console.log("Fetched doctors:", data);

        setSpecialties(data.items || []);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error("Lỗi khi tải danh sách chuyên môn:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchSpecialties();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  if (loading) return <SpecialtiesLoadingSkeleton />;
  if (error) return <SpecialtiesErrorFallback />;

  const handleAddSpecialty = async () => {
    if (!newSpecialty.name || !newSpecialty.description) return;

    const specialty: Partial<Specialty> = {
      name: newSpecialty.name,
      description: newSpecialty.description,
      status: (newSpecialty.status as Specialty["status"]) || "ACTIVE",
    };

    try {
      const { code, message, result } = await addSpecialty(specialty);
      if (code === 0) {
        toast({
          title: "Thành công!",
          description: "Thêm chuyên môn thành công!",
          variant: "success",
        });
        setSpecialties((prev) => [...prev, result]);
      } else {
        throw new Error(message || "Thêm chuyên môn thất bại");
      }
    } catch (error) {
      console.error("Error adding specialty:", error);
      let message = "Thêm chuyên môn thất bại!";

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
    setNewSpecialty({
      name: "",
      description: "",
      status: "ACTIVE",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSpecialty = (Specialty: Specialty) => {
    setEditingSpecialty(Specialty);
  };

  const handleUpdateSpecialty = async () => {
    if (!editingSpecialty) return;

    try {
      const { code, message, result } = await updateSpecialty(
        editingSpecialty.id,
        editingSpecialty
      );

      if (code === 0) {
        setSpecialties((prev) =>
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
      setEditingSpecialty(null);
    }
  };

  const handleDeleteSpecialty = () => {
    if (!deletingSpecialty) return;

    setSpecialties(
      specialties.map((specialty) =>
        specialty.id === deletingSpecialty.id
          ? { ...specialty, status: "DELETED" as const }
          : specialty
      )
    );
    setDeletingSpecialty(null);
  };

  // Pagination handlers
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
            Quản lý chuyên môn
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý các chuyên môn trong hệ thống bệnh viện. Thêm, chỉnh sửa
            hoặc xóa chuyên môn.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm chuyên môn
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm chuyên môn mới</DialogTitle>
              <DialogDescription>
                Tạo chuyên môn mới trong hệ thống. Các trường có dấu * là bắt
                buộc.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên chuyên môn *</Label>
                <Input
                  id="name"
                  value={newSpecialty.name || ""}
                  onChange={(e) =>
                    setNewSpecialty({ ...newSpecialty, name: e.target.value })
                  }
                  placeholder="Ví dụ: Giám đốc, Trưởng khoa..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Textarea
                  id="description"
                  value={newSpecialty.description || ""}
                  onChange={(e) =>
                    setNewSpecialty({
                      ...newSpecialty,
                      description: e.target.value,
                    })
                  }
                  placeholder="Mô tả chi tiết về chuyên môn và trách nhiệm"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={newSpecialty.status}
                  onValueChange={(value) =>
                    setNewSpecialty({
                      ...newSpecialty,
                      status: value as Specialty["status"],
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
                onClick={handleAddSpecialty}
                disabled={!newSpecialty.name || !newSpecialty.description}
              >
                Thêm chuyên môn
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
                  placeholder="Tìm kiếm theo tên chuyên môn hoặc mô tả..."
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
                  Tổng chuyên môn hiển thị
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {specialties.length}
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
                  {specialties.filter((p) => p.status === "ACTIVE").length}
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
                  {specialties.filter((p) => p.status === "INACTIVE").length}
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
                  {specialties.filter((p) => p.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialtys Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách chuyên môn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên chuyên môn</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialties.map((specialty) => (
                  <TableRow key={specialty.id}>
                    <TableCell className="font-medium">
                      {specialty.name}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {specialty.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(specialty.status)}>
                        {getStatusText(specialty.status)}
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
                            onClick={() => setViewingSpecialty(specialty)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditSpecialty(specialty)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingSpecialty(specialty)}
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
          {specialties.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy chuyên môn
              </h3>
              <p className="text-gray-600">
                Không có chuyên môn nào phù hợp với tiêu chí tìm kiếm của bạn.
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
            {Math.min(currentPage * itemsPerPage, specialties.length)} trong
            tổng số {totalItems} chuyên môn
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
      {viewingSpecialty && (
        <Dialog
          open={!!viewingSpecialty}
          onOpenChange={() => setViewingSpecialty(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                {viewingSpecialty.name}
              </DialogTitle>
              <DialogDescription>
                Chi tiết thông tin chuyên môn
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Tên chuyên môn
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {viewingSpecialty.name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Mô tả
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {viewingSpecialty.description}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Trạng thái
                </Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(viewingSpecialty.status)}>
                    {getStatusText(viewingSpecialty.status)}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editingSpecialty && (
        <Dialog
          open={!!editingSpecialty}
          onOpenChange={() => setEditingSpecialty(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa chuyên môn</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin chuyên môn
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tên chuyên môn</Label>
                <Input
                  id="edit-name"
                  value={editingSpecialty.name}
                  onChange={(e) =>
                    setEditingSpecialty({
                      ...editingSpecialty,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={editingSpecialty.description}
                  onChange={(e) =>
                    setEditingSpecialty({
                      ...editingSpecialty,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select
                  value={editingSpecialty.status}
                  onValueChange={(value) =>
                    setEditingSpecialty({
                      ...editingSpecialty,
                      status: value as Specialty["status"],
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
              <Button onClick={handleUpdateSpecialty}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingSpecialty}
        onOpenChange={() => setDeletingSpecialty(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa chuyên môn</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa chuyên môn "{deletingSpecialty?.name}"?
              Hành động này sẽ đánh dấu chuyên môn là đã xóa và không thể hoàn
              tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSpecialty}
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
