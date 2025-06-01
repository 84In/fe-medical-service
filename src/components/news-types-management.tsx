"use client";

import { useState } from "react";
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
} from "lucide-react";
import type { NewsType } from "@/types/news";

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
  const [formData, setFormData] = useState({
    name: "",
    status: "ACTIVE" as NewsType["status"],
  });

  // Filter news types
  const filteredNewsTypes = newsTypes.filter((newsType) => {
    const matchesSearch = newsType.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || newsType.status === statusFilter;
    return matchesSearch && matchesStatus && newsType.status !== "DELETED";
  });

  const handleCreate = () => {
    const newNewsType: NewsType = {
      id: Math.max(...newsTypes.map((nt) => nt.id)) + 1,
      name: formData.name,
      status: formData.status,
    };
    setNewsTypes([...newsTypes, newNewsType]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedNewsType) return;
    setNewsTypes(
      newsTypes.map((newsType) =>
        newsType.id === selectedNewsType.id
          ? { ...newsType, name: formData.name, status: formData.status }
          : newsType
      )
    );
    setIsEditDialogOpen(false);
    resetForm();
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
          <CardTitle>
            Danh sách loại tin tức ({filteredNewsTypes.length})
          </CardTitle>
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
              {filteredNewsTypes.map((newsType) => (
                <TableRow key={newsType.id}>
                  <TableCell className="font-medium">#{newsType.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{newsType.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(formData.status)}>
                      {getStatusText(formData.status)}
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

          {filteredNewsTypes.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">
                Không tìm thấy loại tin tức nào
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
