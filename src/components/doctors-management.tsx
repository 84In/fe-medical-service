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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Edit,
  Eye,
  MoreVertical,
  Stethoscope,
  MapPin,
  Calendar,
  Award,
  Users,
  Clock,
} from "lucide-react";

// Types
interface Department {
  id: number;
  name: string;
  contentHtml: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

interface Position {
  id: number;
  name: string;
  description: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

interface Title {
  id: number;
  name: string;
  description: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

interface Doctor {
  id: number;
  name: string;
  avatarUrl: string;
  introduction: string;
  experience_years: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
  department: Department;
  position: Position;
  title: Title;
}

// Mock data
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: "<p>Tim và chăm sóc tim mạch</p>",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: "<p>Chăm sóc sức khỏe trẻ em</p>",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: "<p>Chăm sóc y tế khẩn cấp</p>",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Phẫu thuật",
    contentHtml: "<p>Cung cấp y khoa phẫu thuật</p>",
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "X quang",
    contentHtml: "<p>Chẩn đoán hình ảnh</p>",
    status: "ACTIVE",
  },
];

const mockPositions: Position[] = [
  {
    id: 1,
    name: "Giám đốc",
    description: "Giám đốc bệnh viện",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Phó giám đốc",
    description: "Phó giám đốc bệnh viện",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Bác sĩ chuyên khoa",
    description: "Bác sĩ chuyên khoa",
    status: "ACTIVE",
  },
  { id: 4, name: "Trưởng khoa", description: "Trường khoa", status: "ACTIVE" },
];

const mockTitles: Title[] = [
  { id: 1, name: "BS.", description: "Bác sĩ", status: "ACTIVE" },
  { id: 2, name: "GS.", description: "Giáo sư", status: "ACTIVE" },
  {
    id: 3,
    name: "PGS.",
    description: "Phó giáo sư",
    status: "ACTIVE",
  },
];

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    introduction:
      "Bác sĩ tim mạch giàu kinh nghiệm, chuyên về tim mạch can thiệp và phòng ngừa bệnh tim.",
    experience_years: "15",
    status: "ACTIVE",
    department: mockDepartments[0],
    position: mockPositions[0],
    title: mockTitles[1],
  },
  {
    id: 2,
    name: "Michael Chen",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    introduction:
      "Chuyên gia nhi khoa có chuyên môn về phát triển trẻ em và chăm sóc cấp cứu nhi khoa.",
    experience_years: "12",
    status: "ACTIVE",
    department: mockDepartments[1],
    position: mockPositions[2],
    title: mockTitles[0],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    introduction:
      "Bác sĩ cấp cứu với kinh nghiệm phong phú trong chăm sóc chấn thương và hồi sức cấp cứu.",
    experience_years: "8",
    status: "ACTIVE",
    department: mockDepartments[2],
    position: mockPositions[1],
    title: mockTitles[0],
  },
  {
    id: 4,
    name: "David Kim",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    introduction:
      "Chuyên gia phẫu thuật với chuyên môn trong phẫu thuật nội soi và phẫu thuật tái tạo.",
    experience_years: "20",
    status: "ACTIVE",
    department: mockDepartments[3],
    position: mockPositions[3],
    title: mockTitles[1],
  },
  {
    id: 5,
    name: "Lisa Thompson",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    introduction:
      "Chuyên gia chẩn đoán hình ảnh với chuyên môn trong X quang và siêu âm.",
    experience_years: "10",
    status: "INACTIVE",
    department: mockDepartments[4],
    position: mockPositions[0],
    title: mockTitles[0],
  },
  {
    id: 6,
    name: "James Wilson",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    introduction: "Bác sĩ nội khoa với chuyên môn trong quản lý bệnh",
    experience_years: "18",
    status: "ACTIVE",
    department: mockDepartments[0],
    position: mockPositions[2],
    title: mockTitles[2],
  },
];

export function DoctorsManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [departmentFilter, setDepartmentFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: "",
    avatarUrl: "",
    introduction: "",
    experience_years: "",
    status: "ACTIVE",
    department: undefined,
    position: undefined,
    title: undefined,
  });

  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.position.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || doctor.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "ALL" ||
      doctor.department.id.toString() === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
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

  const handleAddDoctor = () => {
    if (
      !newDoctor.name ||
      !newDoctor.department ||
      !newDoctor.position ||
      !newDoctor.title
    )
      return;

    const doctor: Doctor = {
      id: Date.now(),
      name: newDoctor.name,
      avatarUrl: newDoctor.avatarUrl || "/placeholder.svg?height=100&width=100",
      introduction: newDoctor.introduction || "",
      experience_years: newDoctor.experience_years || "0",
      status: (newDoctor.status as Doctor["status"]) || "ACTIVE",
      department: newDoctor.department,
      position: newDoctor.position,
      title: newDoctor.title,
    };

    setDoctors([...doctors, doctor]);
    setNewDoctor({
      name: "",
      avatarUrl: "",
      introduction: "",
      experience_years: "",
      status: "ACTIVE",
      department: undefined,
      position: undefined,
      title: undefined,
    });
    setIsAddDialogOpen(false);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
  };

  const handleUpdateDoctor = () => {
    if (!editingDoctor) return;

    setDoctors(
      doctors.map((doctor) =>
        doctor.id === editingDoctor.id ? editingDoctor : doctor
      )
    );
    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === id ? { ...doctor, status: "DELETED" as const } : doctor
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bác sĩ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin bác sĩ, chuyên khoa và vị trí làm việc. Thêm, sửa
            hoặc xóa bác sĩ trong hệ thống.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm mới bác sĩ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm mới bác sĩ</DialogTitle>
              <DialogDescription>
                Nhập thông tin bác sĩ mới để thêm vào hệ thống. Các trường có
                dấu * là bắt buộc.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  value={newDoctor.name || ""}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
                  }
                  placeholder="Nhập họ và tên bác sĩ"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatarUrl">Ảnh đại diện</Label>
                <Input
                  id="avatarUrl"
                  value={newDoctor.avatarUrl || ""}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, avatarUrl: e.target.value })
                  }
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="introduction">Mô tả</Label>
                <Textarea
                  id="introduction"
                  value={newDoctor.introduction || ""}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, introduction: e.target.value })
                  }
                  placeholder="Nhập mô tả về bác sĩ"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">Số năm kinh nghiệm</Label>
                <Input
                  id="experience"
                  value={newDoctor.experience_years || ""}
                  onChange={(e) =>
                    setNewDoctor({
                      ...newDoctor,
                      experience_years: e.target.value,
                    })
                  }
                  placeholder="e.g., 10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Chức danh *</Label>
                  <Select
                    value={newDoctor.title?.id.toString()}
                    onValueChange={(value) => {
                      const title = mockTitles.find(
                        (t) => t.id.toString() === value
                      );
                      setNewDoctor({ ...newDoctor, title });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chức danh" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTitles.map((title) => (
                        <SelectItem key={title.id} value={title.id.toString()}>
                          {title.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Chuyên môn *</Label>
                  <Select
                    value={newDoctor.department?.id.toString()}
                    onValueChange={(value) => {
                      const department = mockDepartments.find(
                        (d) => d.id.toString() === value
                      );
                      setNewDoctor({ ...newDoctor, department });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chuyên môn" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="position">Chức vụ *</Label>
                  <Select
                    value={newDoctor.position?.id.toString()}
                    onValueChange={(value) => {
                      const position = mockPositions.find(
                        (p) => p.id.toString() === value
                      );
                      setNewDoctor({ ...newDoctor, position });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chức vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPositions.map((pos) => (
                        <SelectItem key={pos.id} value={pos.id.toString()}>
                          {pos.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={newDoctor.status}
                    onValueChange={(value) =>
                      setNewDoctor({
                        ...newDoctor,
                        status: value as Doctor["status"],
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
            </div>
            <DialogFooter>
              <Button onClick={handleAddDoctor}>Thêm bác sĩ</Button>
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
                  placeholder="Tìm kiếm bác sĩ, chuyên khoa, chức danh, chức vụ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                <SelectItem value="INACTIVE">Ngừng hoạt động</SelectItem>
                <SelectItem value="HIDDEN">Ẩn</SelectItem>
                <SelectItem value="DELETED">Xoá</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả chuyên khoa</SelectItem>
                {mockDepartments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng số bác sĩ
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctors.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctors.filter((d) => d.status === "ACTIVE").length}
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
                  {doctors.filter((d) => d.status === "INACTIVE").length}
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
                <p className="text-sm font-medium text-gray-600">Chuyên khoa</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockDepartments.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={doctor.avatarUrl || "/placeholder.svg"}
                      alt={doctor.name}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {doctor.title.name} {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {doctor.position.name}
                    </p>
                    <Badge className={`mt-1 ${getStatusColor(doctor.status)}`}>
                      {doctor.status === "ACTIVE"
                        ? " Hoạt động"
                        : doctor.status === "INACTIVE"
                        ? "Ngừng hoạt động"
                        : doctor.status === "HIDDEN"
                        ? "Ẩn"
                        : "Đã xoá"}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditDoctor(doctor)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="text-red-600"
                    >
                      <MoreVertical className="mr-2 h-4 w-4" />
                      Xoá
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.department.name}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {doctor.experience_years} năm kinh nghiệm
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {doctor.introduction}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEditDoctor(doctor)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Xem hiển thị
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy bác sĩ
            </h3>
            <p className="text-gray-600">
              Không có bác sĩ nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử
              thay đổi từ khoá hoặc bộ lọc.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      {editingDoctor && (
        <Dialog
          open={!!editingDoctor}
          onOpenChange={() => setEditingDoctor(null)}
        >
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin bác sĩ để lưu thay đổi vào hệ thống.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Họ và tên</Label>
                <Input
                  id="edit-name"
                  value={editingDoctor.name}
                  onChange={(e) =>
                    setEditingDoctor({ ...editingDoctor, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-avatarUrl">Cập nhật ảnh đại diện</Label>
                <Input
                  id="edit-avatarUrl"
                  value={editingDoctor.avatarUrl}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      avatarUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-introduction">Mô tả</Label>
                <Textarea
                  id="edit-introduction"
                  value={editingDoctor.introduction}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      introduction: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-experience">Số năm kinh nghiệm</Label>
                <Input
                  id="edit-experience"
                  value={editingDoctor.experience_years}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      experience_years: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Chức danh</Label>
                  <Select
                    value={editingDoctor.title.id.toString()}
                    onValueChange={(value) => {
                      const title = mockTitles.find(
                        (t) => t.id.toString() === value
                      );
                      if (title) setEditingDoctor({ ...editingDoctor, title });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTitles.map((title) => (
                        <SelectItem key={title.id} value={title.id.toString()}>
                          {title.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Chuyên môn</Label>
                  <Select
                    value={editingDoctor.department.id.toString()}
                    onValueChange={(value) => {
                      const department = mockDepartments.find(
                        (d) => d.id.toString() === value
                      );
                      if (department)
                        setEditingDoctor({ ...editingDoctor, department });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-position">Chức vụ</Label>
                  <Select
                    value={editingDoctor.position.id.toString()}
                    onValueChange={(value) => {
                      const position = mockPositions.find(
                        (p) => p.id.toString() === value
                      );
                      if (position)
                        setEditingDoctor({ ...editingDoctor, position });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPositions.map((pos) => (
                        <SelectItem key={pos.id} value={pos.id.toString()}>
                          {pos.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Trạng thái</Label>
                  <Select
                    value={editingDoctor.status}
                    onValueChange={(value) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        status: value as Doctor["status"],
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
                      <SelectItem value="DELETED">Xoá</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateDoctor}>Cập nhật bác sĩ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
