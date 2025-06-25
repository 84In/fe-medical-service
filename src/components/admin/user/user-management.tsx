"use client";

import type React from "react";

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
import { addUser, getUsers, updateUser } from "@/services/user.service";
import type { CreateUserRequest, User } from "@/types";
import { ROLES, ROLE_LABELS } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  User2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UserSkeleton } from "./user-skeleton";
import { UserError } from "./user-error";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockUser: User[] = [
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
    username: "User_user",
    phone: "0901234569",
    email: "User@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-17T08:00:00Z",
    updatedAt: "2024-01-17T08:00:00Z",
  },
  // Add more mock data for pagination testing
  {
    id: 4,
    username: "staff_01",
    phone: "0901234570",
    email: "staff01@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-18T08:00:00Z",
    updatedAt: "2024-01-18T08:00:00Z",
  },
  {
    id: 5,
    username: "staff_02",
    phone: "0901234571",
    email: "staff02@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-19T08:00:00Z",
    updatedAt: "2024-01-19T08:00:00Z",
  },
  {
    id: 6,
    username: "content_editor",
    phone: "0901234572",
    email: "editor@vitacaremedical.vn",
    role: { id: 2, name: "CONTENT_MANAGER" },
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z",
  },
  {
    id: 7,
    username: "staff_03",
    phone: "0901234573",
    email: "staff03@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-21T08:00:00Z",
    updatedAt: "2024-01-21T08:00:00Z",
  },
  {
    id: 8,
    username: "staff_04",
    phone: "0901234574",
    email: "staff04@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-22T08:00:00Z",
    updatedAt: "2024-01-22T08:00:00Z",
  },
  {
    id: 9,
    username: "staff_05",
    phone: "0901234575",
    email: "staff05@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-23T08:00:00Z",
    updatedAt: "2024-01-23T08:00:00Z",
  },
  {
    id: 10,
    username: "staff_06",
    phone: "0901234576",
    email: "staff06@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-24T08:00:00Z",
    updatedAt: "2024-01-24T08:00:00Z",
  },
  {
    id: 11,
    username: "staff_07",
    phone: "0901234577",
    email: "staff07@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-25T08:00:00Z",
    updatedAt: "2024-01-25T08:00:00Z",
  },
  {
    id: 12,
    username: "staff_08",
    phone: "0901234578",
    email: "staff08@vitacaremedical.vn",
    role: { id: 3, name: "User" },
    createdAt: "2024-01-26T08:00:00Z",
    updatedAt: "2024-01-26T08:00:00Z",
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [formData, setFormData] = useState<CreateUserRequest>({
    username: "",
    password: "",
    phone: "",
    email: "",
    roleId: 0,
  });

  // Filter users
  const filteredUser = users.filter((item) => {
    const matchesSearch =
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm);

    const matchesRole =
      selectedRole === "all" || item.role.name === selectedRole;

    console.log(selectedRole);

    return matchesSearch && matchesRole;
  });

  // Pagination calculations
  const totalItems = filteredUser.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredUser.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole, itemsPerPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers();

      setUsers(Array.isArray(data) ? data : []); // Fallback to empty array if not array
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
      setError(
        error instanceof Error
          ? error
          : new Error("Đã xảy ra lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers();
    }, 1500); // 1.5s delay to show skeleton

    return () => clearTimeout(handler);
  }, []);

  const handleRetry = () => {
    fetchUsers();
  };

  // Show loading skeleton
  if (loading) {
    return <UserSkeleton />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      try {
        const { code, message, result } = await updateUser(
          editingUser.id,
          formData
        );

        if (code === 0) {
          setUsers((prev) =>
            prev.map((st) => (st.id === result.id ? result : st))
          );
          toast({
            title: "Thành công!",
            description: " Cập nhật người dùng thành công!",
            variant: "success",
          });
        } else {
          throw new Error(message || "Cập nhật người dùng thất bại");
        }
      } catch (error: any) {
        console.error("Lỗi cập nhật người dùng:", error);
        toast({
          title: "Thất bại!",
          description: error ? error.message : "Cập nhật thất bại!",
          variant: "destructive",
        });
      }
    } else {
      try {
        const { code, message, result } = await addUser(formData);
        if (code === 0) {
          toast({
            title: "Thành công!",
            description: "Thêm người dùng thành công!",
            variant: "success",
          });
          setUsers((prev) => [...prev, result]);
        } else {
          throw new Error(message || "Thêm người dùng thất bại");
        }
      } catch (error: any) {
        console.error("Error adding service types:", error);
        let message = "Thêm người dùng thất bại!";
        toast({
          title: "Thất bại!",
          description: error ? error.message : message,
          variant: "destructive",
        });
      }
    }

    setIsDialogOpen(false);
    setEditingUser(null);
    setFormData({
      username: "",
      password: "",
      phone: "",
      email: "",
      roleId: 3,
    });
  };

  // Show error state
  if (error) {
    const errorType =
      error.message.includes("network") || error.message.includes("fetch")
        ? "network"
        : "general";

    return <UserError error={error} onRetry={handleRetry} type={errorType} />;
  }

  // Show not-found state
  if (!loading && !error && users.length === 0) {
    return (
      <>
        <UserError
          createNew={() => setIsDialogOpen(true)}
          error={new Error("No users found")}
          type="not-found"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
              </DialogTitle>
              <DialogDescription>
                {editingUser
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
                    Mật khẩu {editingUser && "(để trống nếu không thay đổi)"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required={!editingUser}
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
                      setFormData({
                        ...formData,
                        roleId: Number.parseInt(value),
                      })
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
                  {editingUser ? "Cập nhật" : "Tạo mới"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToPage = (page: number) => setCurrentPage(page);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

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
      case "User":
        return <Badge variant="secondary">Nhân viên</Badge>;
      default:
        return <Badge variant="outline">{roleName}</Badge>;
    }
  };

  const handleEdit = (UserMember: User) => {
    setEditingUser(UserMember);
    setFormData({
      username: UserMember.username,
      password: "",
      phone: UserMember.phone,
      email: UserMember.email,
      roleId: UserMember.role.id,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  const handleAddNew = () => {
    setEditingUser(null);
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
    const total = users.length;
    const adminCount = users.filter((s) => s.role.name === "ADMIN").length;
    const contentManagerCount = users.filter(
      (s) => s.role.name === "CONTENT_MANAGER"
    ).length;
    const UserCount = users.filter((s) => s.role.name === "User").length;

    return { total, adminCount, contentManagerCount, UserCount };
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
          Thêm nhân viên
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
            <User2 className="h-4 w-4 text-blue-600" />
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
            <User2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.UserCount}</div>
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

      {/* User Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách nhân viên ({totalItems})</CardTitle>
              <CardDescription>
                Quản lý thông tin và phân quyền cho nhân viên
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Hiển thị:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(Number(value))}
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageData.map((UserMember) => (
                <TableRow key={UserMember.id}>
                  <TableCell className="font-medium">
                    {UserMember.username}
                  </TableCell>
                  <TableCell>{UserMember.email}</TableCell>
                  <TableCell>{UserMember.phone}</TableCell>
                  <TableCell>{getRoleBadge(UserMember.role.name)}</TableCell>
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
                          onClick={() => handleEdit(UserMember)}
                        >
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(UserMember.id)}
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

          {/* Empty State */}
          {currentPageData.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">Không tìm thấy nhân viên nào</div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                Hiển thị {startIndex + 1}-{Math.min(endIndex, totalItems)} của{" "}
                {totalItems} nhân viên
              </div>

              <div className="flex items-center space-x-2">
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
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className="min-w-[32px]"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
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

              <div className="text-sm text-muted-foreground">
                Trang {currentPage} của {totalPages}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
            </DialogTitle>
            <DialogDescription>
              {editingUser
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
                  Mật khẩu {editingUser && "(để trống nếu không thay đổi)"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required={!editingUser}
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
                {editingUser ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
