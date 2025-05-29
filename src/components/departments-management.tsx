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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import type { Department } from "@/types/doctor";
import { TiptapEditor } from "./tiptap-editor";

// Mock data
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: `<h2>Khoa Tim mạch - Chăm sóc tim mạch chuyên nghiệp</h2>
<p>Khoa Tim mạch của VitaCare Medical là một trong những khoa hàng đầu về điều trị các bệnh lý tim mạch tại Việt Nam. Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tim mạch tốt nhất.</p>`,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: `<h2>Khoa Nhi - Chăm sóc sức khỏe trẻ em toàn diện</h2>
<p>Khoa Nhi của VitaCare Medical chuyên cung cấp dịch vụ chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 16 tuổi. Với môi trường thân thiện, an toàn và đội ngũ y bác sĩ tận tâm, chúng tôi luôn đặt sức khỏe và sự thoải mái của các bé lên hàng đầu.</p>`,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: `<h2>Khoa Cấp cứu - Sẵn sàng 24/7</h2>
<p>Khoa Cấp cứu của VitaCare Medical hoạt động 24/7, sẵn sàng tiếp nhận và xử lý các trường hợp cấp cứu, chấn thương và các tình huống y tế khẩn cấp.</p>`,
    status: "ACTIVE",
  },
];

export function DepartmentsManagement() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [deletingDepartment, setDeletingDepartment] =
    useState<Department | null>(null);
  const [viewingDepartment, setViewingDepartment] = useState<Department | null>(
    null
  );
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    name: "",
    contentHtml: "",
    status: "ACTIVE",
  });

  // Filter departments
  const filteredDepartments = departments.filter((department) => {
    const matchesSearch = department.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || department.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.contentHtml) return;

    const department: Department = {
      id: Date.now(),
      name: newDepartment.name,
      contentHtml: newDepartment.contentHtml,
      status: (newDepartment.status as Department["status"]) || "ACTIVE",
    };

    setDepartments([...departments, department]);
    setNewDepartment({
      name: "",
      contentHtml: "",
      status: "ACTIVE",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
  };

  const handleUpdateDepartment = () => {
    if (!editingDepartment) return;

    setDepartments(
      departments.map((department) =>
        department.id === editingDepartment.id ? editingDepartment : department
      )
    );
    setEditingDepartment(null);
  };

  const handleDeleteDepartment = () => {
    if (!deletingDepartment) return;

    setDepartments(
      departments.map((department) =>
        department.id === deletingDepartment.id
          ? { ...department, status: "DELETED" as const }
          : department
      )
    );
    setDeletingDepartment(null);
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý chuyên khoa
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin các khoa, chuyên môn và mô tả dịch vụ y tế.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm chuyên khoa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm chuyên khoa mới</DialogTitle>
              <DialogDescription>
                Tạo chuyên khoa mới với editor trực quan. Chọn mẫu có sẵn để bắt
                đầu nhanh!
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="content">Nội dung mô tả</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Tên chuyên khoa *</Label>
                    <Input
                      id="name"
                      value={newDepartment.name || ""}
                      onChange={(e) =>
                        setNewDepartment({
                          ...newDepartment,
                          name: e.target.value,
                        })
                      }
                      placeholder="Ví dụ: Tim mạch, Nhi khoa, Cấp cứu..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={newDepartment.status}
                      onValueChange={(value) =>
                        setNewDepartment({
                          ...newDepartment,
                          status: value as Department["status"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                        <SelectItem value="INACTIVE">
                          Ngừng hoạt động
                        </SelectItem>
                        <SelectItem value="HIDDEN">Ẩn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="content" className="space-y-4">
                <TiptapEditor
                  value={newDepartment.contentHtml || ""}
                  onChange={(content) =>
                    setNewDepartment({ ...newDepartment, contentHtml: content })
                  }
                  height={400}
                  placeholder="Bắt đầu viết mô tả về chuyên khoa..."
                  templateCategories={["Chuyên khoa"]} // Chỉ hiển thị templates cho chuyên khoa
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                onClick={handleAddDepartment}
                disabled={!newDepartment.name || !newDepartment.contentHtml}
              >
                Thêm chuyên khoa
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
                  placeholder="Tìm kiếm theo tên chuyên khoa..."
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
                  Tổng chuyên khoa
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {departments.length}
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
                  {departments.filter((d) => d.status === "ACTIVE").length}
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
                  {departments.filter((d) => d.status === "INACTIVE").length}
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
                  {departments.filter((d) => d.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách chuyên khoa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên chuyên khoa</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">
                      {department.name}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {stripHtml(department.contentHtml)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(department.status)}>
                        {getStatusText(department.status)}
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
                            onClick={() => setViewingDepartment(department)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditDepartment(department)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingDepartment(department)}
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
          {filteredDepartments.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy chuyên khoa
              </h3>
              <p className="text-gray-600">
                Không có chuyên khoa nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      {viewingDepartment && (
        <Dialog
          open={!!viewingDepartment}
          onOpenChange={() => setViewingDepartment(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {viewingDepartment.name}
              </DialogTitle>
              <DialogDescription>
                Chi tiết thông tin chuyên khoa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Trạng thái
                </Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(viewingDepartment.status)}>
                    {getStatusText(viewingDepartment.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Mô tả chi tiết
                </Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg prose prose-sm max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: viewingDepartment.contentHtml,
                    }}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editingDepartment && (
        <Dialog
          open={!!editingDepartment}
          onOpenChange={() => setEditingDepartment(null)}
        >
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa chuyên khoa</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin chuyên khoa
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="content">Nội dung mô tả</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Tên chuyên khoa</Label>
                    <Input
                      id="edit-name"
                      value={editingDepartment.name}
                      onChange={(e) =>
                        setEditingDepartment({
                          ...editingDepartment,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Trạng thái</Label>
                    <Select
                      value={editingDepartment.status}
                      onValueChange={(value) =>
                        setEditingDepartment({
                          ...editingDepartment,
                          status: value as Department["status"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                        <SelectItem value="INACTIVE">
                          Ngừng hoạt động
                        </SelectItem>
                        <SelectItem value="HIDDEN">Ẩn</SelectItem>
                        <SelectItem value="DELETED">Đã xóa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="content" className="space-y-4">
                <TiptapEditor
                  value={editingDepartment.contentHtml}
                  onChange={(content) =>
                    setEditingDepartment({
                      ...editingDepartment,
                      contentHtml: content,
                    })
                  }
                  height={400}
                  placeholder="Chỉnh sửa mô tả chuyên khoa..."
                  templateCategories={["Chuyên khoa"]} // Chỉ hiển thị templates cho chuyên khoa
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button onClick={handleUpdateDepartment}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingDepartment}
        onOpenChange={() => setDeletingDepartment(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa chuyên khoa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa chuyên khoa "{deletingDepartment?.name}
              "? Hành động này sẽ đánh dấu chuyên khoa là đã xóa và không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDepartment}
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
