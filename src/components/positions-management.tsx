"use client";

import { useState } from "react";
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
} from "lucide-react";
import type { Position } from "@/types/doctor";

// Mock data
const mockPositions: Position[] = [
  {
    id: 1,
    name: "Giám đốc",
    description:
      "Giám đốc bệnh viện, chịu trách nhiệm quản lý toàn bộ hoạt động của bệnh viện",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Phó giám đốc",
    description:
      "Phó giám đốc bệnh viện, hỗ trợ giám đốc trong công tác quản lý",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Bác sĩ chuyên khoa",
    description: "Bác sĩ có chuyên môn sâu trong một lĩnh vực y tế cụ thể",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Trưởng khoa",
    description: "Trưởng khoa chuyên môn, quản lý hoạt động của khoa",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Phó trưởng khoa",
    description: "Phó trưởng khoa, hỗ trợ trưởng khoa trong công tác quản lý",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Bác sĩ điều trị",
    description: "Bác sĩ thực hiện công tác khám và điều trị bệnh nhân",
    status: "ACTIVE",
  },
  {
    id: 7,
    name: "Bác sĩ nội trú",
    description: "Bác sĩ mới tốt nghiệp, đang trong thời gian thực tập",
    status: "INACTIVE",
  },
];

export function PositionsManagement() {
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [deletingPosition, setDeletingPosition] = useState<Position | null>(
    null
  );
  const [viewingPosition, setViewingPosition] = useState<Position | null>(null);
  const [newPosition, setNewPosition] = useState<Partial<Position>>({
    name: "",
    description: "",
    status: "ACTIVE",
  });

  // Filter positions
  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || position.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const handleAddPosition = () => {
    if (!newPosition.name || !newPosition.description) return;

    const position: Position = {
      id: Date.now(),
      name: newPosition.name,
      description: newPosition.description,
      status: (newPosition.status as Position["status"]) || "ACTIVE",
    };

    setPositions([...positions, position]);
    setNewPosition({
      name: "",
      description: "",
      status: "ACTIVE",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditPosition = (position: Position) => {
    setEditingPosition(position);
  };

  const handleUpdatePosition = () => {
    if (!editingPosition) return;

    setPositions(
      positions.map((position) =>
        position.id === editingPosition.id ? editingPosition : position
      )
    );
    setEditingPosition(null);
  };

  const handleDeletePosition = () => {
    if (!deletingPosition) return;

    setPositions(
      positions.map((position) =>
        position.id === deletingPosition.id
          ? { ...position, status: "DELETED" as const }
          : position
      )
    );
    setDeletingPosition(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý chức vụ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý các chức vụ trong hệ thống bệnh viện. Thêm, chỉnh sửa hoặc
            xóa chức vụ.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm chức vụ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm chức vụ mới</DialogTitle>
              <DialogDescription>
                Tạo chức vụ mới trong hệ thống. Các trường có dấu * là bắt buộc.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên chức vụ *</Label>
                <Input
                  id="name"
                  value={newPosition.name || ""}
                  onChange={(e) =>
                    setNewPosition({ ...newPosition, name: e.target.value })
                  }
                  placeholder="Ví dụ: Giám đốc, Trưởng khoa..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Textarea
                  id="description"
                  value={newPosition.description || ""}
                  onChange={(e) =>
                    setNewPosition({
                      ...newPosition,
                      description: e.target.value,
                    })
                  }
                  placeholder="Mô tả chi tiết về chức vụ và trách nhiệm"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={newPosition.status}
                  onValueChange={(value) =>
                    setNewPosition({
                      ...newPosition,
                      status: value as Position["status"],
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
                onClick={handleAddPosition}
                disabled={!newPosition.name || !newPosition.description}
              >
                Thêm chức vụ
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
                  placeholder="Tìm kiếm theo tên chức vụ hoặc mô tả..."
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
                  Tổng chức vụ
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {positions.length}
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
                  {positions.filter((p) => p.status === "ACTIVE").length}
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
                  {positions.filter((p) => p.status === "INACTIVE").length}
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
                  {positions.filter((p) => p.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách chức vụ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên chức vụ</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell className="font-medium">
                      {position.name}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {position.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(position.status)}>
                        {getStatusText(position.status)}
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
                            onClick={() => setViewingPosition(position)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditPosition(position)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingPosition(position)}
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
          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy chức vụ
              </h3>
              <p className="text-gray-600">
                Không có chức vụ nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      {viewingPosition && (
        <Dialog
          open={!!viewingPosition}
          onOpenChange={() => setViewingPosition(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                {viewingPosition.name}
              </DialogTitle>
              <DialogDescription>Chi tiết thông tin chức vụ</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Tên chức vụ
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {viewingPosition.name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Mô tả
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {viewingPosition.description}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Trạng thái
                </Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(viewingPosition.status)}>
                    {getStatusText(viewingPosition.status)}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editingPosition && (
        <Dialog
          open={!!editingPosition}
          onOpenChange={() => setEditingPosition(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa chức vụ</DialogTitle>
              <DialogDescription>Cập nhật thông tin chức vụ</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tên chức vụ</Label>
                <Input
                  id="edit-name"
                  value={editingPosition.name}
                  onChange={(e) =>
                    setEditingPosition({
                      ...editingPosition,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={editingPosition.description}
                  onChange={(e) =>
                    setEditingPosition({
                      ...editingPosition,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select
                  value={editingPosition.status}
                  onValueChange={(value) =>
                    setEditingPosition({
                      ...editingPosition,
                      status: value as Position["status"],
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
              <Button onClick={handleUpdatePosition}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingPosition}
        onOpenChange={() => setDeletingPosition(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa chức vụ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa chức vụ "{deletingPosition?.name}"? Hành
              động này sẽ đánh dấu chức vụ là đã xóa và không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePosition}
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
