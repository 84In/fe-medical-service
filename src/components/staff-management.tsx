"use client";

import type React from "react";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  User,
  Users,
} from "lucide-react";
import type { Staff, CreateStaffRequest } from "@/types";
import { ROLES, ROLE_LABELS } from "@/types";

// Mock data
const mockStaff: Staff[] = [
  {
    id: 1,
    username: "admin",
    phone: "0901234567",
    email: "admin@vitacaremedical.vn",
    role: { id: 1, name: "ADMIN" },
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: 2,
    username: "content_manager",
    phone: "0901234568",
    email: "content@vitacaremedical.vn",
    role: { id: 2, name: "CONTENT_MANAGER" },
    createdAt: "2024-01-16T08:00:00Z",
    updatedAt: "2024-01-16T08:00:00Z",
  },
  {
    id: 3,
    username: "staff_user",
    phone: "0901234569",
    email: "staff@vitacaremedical.vn",
    role: { id: 3, name: "STAFF" },
    createdAt: "2024-01-17T08:00:00Z",
    updatedAt: "2024-01-17T08:00:00Z",
  },
];

export function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<CreateStaffRequest>({
    username: "",
    password: "",
    phone: "",
    email: "",
    roleId: 3,
  });

  const filteredStaff = staff.filter((item) => {
    const matchesSearch =
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm);

    const matchesRole =
      selectedRole === "all" || item.role.name === selectedRole;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case "ADMIN":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Quản trị viên
          </Badge>
        );
      case "CONTENT_MANAGER":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Quản lý nội dung
          </Badge>
        );
      case "STAFF":
        return <Badge variant="secondary">Nhân viên</Badge>;
      default:
        return <Badge variant="outline">{roleName}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStaff) {
      // Update existing staff
      const updatedStaff = staff.map((item) =>
        item.id === editingStaff.id
          ? {
              ...item,
              username: formData.username,
              phone: formData.phone,
              email: formData.email,
              role: ROLES.find((r) => r.id === formData.roleId) || item.role,
              updatedAt: new Date().toISOString(),
            }
          : item
      );
      setStaff(updatedStaff);
    } else {
      // Create new staff
      const newStaff: Staff = {
        id: Math.max(...staff.map((s) => s.id)) + 1,
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        role: ROLES.find((r) => r.id === formData.roleId) || ROLES[2],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setStaff([...staff, newStaff]);
    }

    setIsDialogOpen(false);
    setEditingStaff(null);
    setFormData({
      username: "",
      password: "",
      phone: "",
      email: "",
      roleId: 3,
    });
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setFormData({
      username: staffMember.username,
      password: "",
      phone: staffMember.phone,
      email: staffMember.email,
      roleId: staffMember.role.id,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setStaff(staff.filter((item) => item.id !== id));
  };

  const handleAddNew = () => {
    setEditingStaff(null);
    setFormData({
      username: "",
      password: "",
      phone: "",
      email: "",
      roleId: 3,
    });
    setIsDialogOpen(true);
  };

  const getStatsData = () => {
    const total = staff.length;
    const adminCount = staff.filter((s) => s.role.name === "ADMIN").length;
    const contentManagerCount = staff.filter(
      (s) => s.role.name === "CONTENT_MANAGER"
    ).length;
    const staffCount = staff.filter((s) => s.role.name === "STAFF").length;

    return { total, adminCount, contentManagerCount, staffCount };
  };

  const stats = getStatsData();

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
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm loại tin tức
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng nhân viên
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản trị viên</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.adminCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quản lý nội dung
            </CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.contentManagerCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhân viên</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.staffCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="ADMIN">Quản trị viên</SelectItem>
                <SelectItem value="CONTENT_MANAGER">
                  Quản lý nội dung
                </SelectItem>
                <SelectItem value="STAFF">Nhân viên</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhân viên ({filteredStaff.length})</CardTitle>
          <CardDescription>
            Quản lý thông tin và phân quyền cho nhân viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell className="font-medium">
                    {staffMember.username}
                  </TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.phone}</TableCell>
                  <TableCell>{getRoleBadge(staffMember.role.name)}</TableCell>
                  <TableCell>
                    {staffMember.createdAt
                      ? new Date(staffMember.createdAt).toLocaleDateString(
                          "vi-VN"
                        )
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEdit(staffMember)}
                        >
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(staffMember.id)}
                          className="text-red-600"
                        >
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingStaff ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
            </DialogTitle>
            <DialogDescription>
              {editingStaff
                ? "Cập nhật thông tin nhân viên. Để trống mật khẩu nếu không muốn thay đổi."
                : "Nhập thông tin để tạo tài khoản nhân viên mới."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  Mật khẩu {editingStaff && "(để trống nếu không thay đổi)"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required={!editingStaff}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select
                  value={formData.roleId.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, roleId: Number.parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {ROLE_LABELS[role.name]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit">
                {editingStaff ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
