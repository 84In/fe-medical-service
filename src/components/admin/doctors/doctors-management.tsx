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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Phone,
  Mail,
  Star,
  Trash2,
} from "lucide-react";
import type {
  Doctor,
  Department,
  Position,
  Title,
  Education,
  Experience,
  Achievement,
  WorkingHour,
} from "@/types/doctor";
import { MultiSelect } from "@/components/ui/multi-select";

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
    phone: "0123-456-789",
    email: "sarah.johnson@hospital.com",
    specialties: [
      {
        id: 1,
        name: "Phẫu thuật tim",
        status: "ACTIVE",
        description: "Phẫu thuật tim",
      },
      {
        id: 2,
        name: "Siêu âm tim",
        status: "ACTIVE",
        description: "Siêu âm tim",
      },
    ],
    languages: ["Tiếng Việt", "English"],
    consultationFee: 500000,
    rating: 4.5,
    education: [
      {
        id: 1,
        degree: "Bác sĩ Đa khoa",
        institution: "Đại học Y Hà Nội",
        year: "1998",
        description: "Tốt nghiệp loại Giỏi",
      },
      {
        id: 2,
        degree: "Chuyên khoa I Tim mạch",
        institution: "Bệnh viện Bạch Mai",
        year: "2003",
        description: "Chuyên sâu về tim mạch can thiệp",
      },
    ],
    workExperience: [
      {
        id: 1,
        position: "Trưởng khoa Tim mạch",
        organization: "VitaCare Medical",
        startYear: "2020",
        description: "Quản lý và điều hành khoa Tim mạch",
      },
      {
        id: 2,
        position: "Phó trưởng khoa Tim mạch",
        organization: "Bệnh viện Bạch Mai",
        startYear: "2015",
        endYear: "2020",
        description: "Hỗ trợ quản lý và điều trị bệnh nhân",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Thầy thuốc trẻ xuất sắc",
        year: "2018",
        type: "AWARD",
        description: "Giải thưởng của Bộ Y tế",
      },
      {
        id: 2,
        title: "Chứng chỉ Can thiệp tim mạch",
        year: "2012",
        type: "CERTIFICATION",
        description: "Chứng chỉ quốc tế từ Hoa Kỳ",
      },
    ],
    workingHours: [
      {
        id: 1,
        dayOfWeek: "MONDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 2,
        dayOfWeek: "TUESDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 3,
        dayOfWeek: "WEDNESDAY",
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: 4,
        dayOfWeek: "THURSDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 5,
        dayOfWeek: "FRIDAY",
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
      {
        id: 6,
        dayOfWeek: "SATURDAY",
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: 7,
        dayOfWeek: "SUNDAY",
        startTime: "",
        endTime: "",
        isAvailable: false,
      },
    ],
  },
];

const specialtyOptions = [
  "Tim mạch can thiệp",
  "Phòng ngừa bệnh tim",
  "Nhi sơ sinh",
  "Cấp cứu nhi",
  "Cấp cứu chấn thương",
  "Hồi sức",
  "Phẫu thuật nội soi",
  "Phẫu thuật tái tạo",
  "Chẩn đoán hình ảnh",
  "Siêu âm",
  "Nội khoa tổng quát",
  "Quản lý bệnh mãn tính",
];

const dayOfWeekOptions = [
  { value: "MONDAY", label: "Thứ 2" },
  { value: "TUESDAY", label: "Thứ 3" },
  { value: "WEDNESDAY", label: "Thứ 4" },
  { value: "THURSDAY", label: "Thứ 5" },
  { value: "FRIDAY", label: "Thứ 6" },
  { value: "SATURDAY", label: "Thứ 7" },
  { value: "SUNDAY", label: "Chủ nhật" },
];

const achievementTypes = [
  { value: "AWARD", label: "Giải thưởng" },
  { value: "CERTIFICATION", label: "Chứng chỉ" },
  { value: "PUBLICATION", label: "Xuất bản" },
  { value: "RESEARCH", label: "Nghiên cứu" },
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
    phone: "",
    email: "",
    specialties: [],
    languages: [],
    consultationFee: 0,
    rating: 0,
    education: [],
    workExperience: [],
    achievements: [],
    workingHours: dayOfWeekOptions.map((day, index) => ({
      id: index + 1,
      dayOfWeek: day.value as WorkingHour["dayOfWeek"],
      startTime: day.value === "SUNDAY" ? "" : "08:00",
      endTime: day.value === "SUNDAY" ? "" : "17:00",
      isAvailable: day.value !== "SUNDAY",
    })),
  });

  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.specialties &&
        doctor.specialties.some((specialty) =>
          specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
      (doctor.languages &&
        doctor.languages.some((language) =>
          language.toLowerCase().includes(searchTerm.toLowerCase())
        ));
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-3 w-3 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />);
    }

    return stars;
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
      phone: newDoctor.phone || "",
      email: newDoctor.email || "",
      specialties: newDoctor.specialties || [],
      languages: newDoctor.languages || [],
      consultationFee: newDoctor.consultationFee || 0,
      rating: newDoctor.rating || 0,
      education: newDoctor.education || [],
      workExperience: newDoctor.workExperience || [],
      achievements: newDoctor.achievements || [],
      workingHours: newDoctor.workingHours || [],
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
      phone: "",
      email: "",
      specialties: [],
      languages: [],
      consultationFee: 0,
      rating: 0,
      education: [],
      workExperience: [],
      achievements: [],
      workingHours: dayOfWeekOptions.map((day, index) => ({
        id: index + 1,
        dayOfWeek: day.value as WorkingHour["dayOfWeek"],
        startTime: day.value === "SUNDAY" ? "" : "08:00",
        endTime: day.value === "SUNDAY" ? "" : "17:00",
        isAvailable: day.value !== "SUNDAY",
      })),
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

  // Helper functions for managing arrays
  const addEducation = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void
  ) => {
    const newEducation: Education = {
      id: Date.now(),
      degree: "",
      institution: "",
      year: "",
      description: "",
    };
    setDoctor({
      ...doctor,
      education: [...(doctor.education || []), newEducation],
    });
  };

  const updateEducation = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void,
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = [...(doctor.education || [])];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setDoctor({ ...doctor, education: updatedEducation });
  };

  const removeEducation = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void,
    index: number
  ) => {
    const updatedEducation = [...(doctor.education || [])];
    updatedEducation.splice(index, 1);
    setDoctor({ ...doctor, education: updatedEducation });
  };

  const addWorkExperience = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void
  ) => {
    const newExperience: Experience = {
      id: Date.now(),
      position: "",
      organization: "",
      startYear: "",
      endYear: "",
      description: "",
    };
    setDoctor({
      ...doctor,
      workExperience: [...(doctor.workExperience || []), newExperience],
    });
  };

  const updateWorkExperience = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void,
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperience = [...(doctor.workExperience || [])];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setDoctor({ ...doctor, workExperience: updatedExperience });
  };

  const removeWorkExperience = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void,
    index: number
  ) => {
    const updatedExperience = [...(doctor.workExperience || [])];
    updatedExperience.splice(index, 1);
    setDoctor({ ...doctor, workExperience: updatedExperience });
  };

  const addAchievement = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void
  ) => {
    const newAchievement: Achievement = {
      id: Date.now(),
      title: "",
      year: "",
      type: "AWARD",
      description: "",
    };
    setDoctor({
      ...doctor,
      achievements: [...(doctor.achievements || []), newAchievement],
    });
  };

  const updateAchievement = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void,
    index: number,
    field: keyof Achievement,
    value: string | Achievement["type"]
  ) => {
    const updatedAchievements = [...(doctor.achievements || [])];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value,
    };
    setDoctor({ ...doctor, achievements: updatedAchievements });
  };

  const removeAchievement = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void,
    index: number
  ) => {
    const updatedAchievements = [...(doctor.achievements || [])];
    updatedAchievements.splice(index, 1);
    setDoctor({ ...doctor, achievements: updatedAchievements });
  };

  const updateWorkingHour = (
    doctor: Partial<Doctor> | Doctor,
    setDoctor: (doctor: any) => void,
    index: number,
    field: keyof WorkingHour,
    value: string | boolean
  ) => {
    const updatedHours = [...(doctor.workingHours || [])];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setDoctor({ ...doctor, workingHours: updatedHours });
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
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm mới bác sĩ</DialogTitle>
              <DialogDescription>
                Nhập thông tin bác sĩ mới để thêm vào hệ thống. Các trường có
                dấu * là bắt buộc.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                <TabsTrigger value="education">Học vấn</TabsTrigger>
                <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                <TabsTrigger value="achievements">Thành tích</TabsTrigger>
                <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
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
                        setNewDoctor({
                          ...newDoctor,
                          avatarUrl: e.target.value,
                        })
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
                        setNewDoctor({
                          ...newDoctor,
                          introduction: e.target.value,
                        })
                      }
                      placeholder="Nhập mô tả về bác sĩ"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="grid gap-2">
                      <Label htmlFor="rating">Đánh giá (1-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={newDoctor.rating || 0}
                        onChange={(e) =>
                          setNewDoctor({
                            ...newDoctor,
                            rating: Number.parseFloat(e.target.value),
                          })
                        }
                        placeholder="4.5"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        value={newDoctor.phone || ""}
                        onChange={(e) =>
                          setNewDoctor({ ...newDoctor, phone: e.target.value })
                        }
                        placeholder="0123-456-789"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newDoctor.email || ""}
                        onChange={(e) =>
                          setNewDoctor({ ...newDoctor, email: e.target.value })
                        }
                        placeholder="doctor@hospital.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="consultationFee">Phí khám (VNĐ)</Label>
                    <Input
                      id="consultationFee"
                      type="number"
                      value={newDoctor.consultationFee || 0}
                      onChange={(e) =>
                        setNewDoctor({
                          ...newDoctor,
                          consultationFee: Number.parseInt(e.target.value),
                        })
                      }
                      placeholder="500000"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specialties">Chuyên môn</Label>
                    <MultiSelect
                      options={specialtyOptions}
                      value={(newDoctor.specialties || []).map((s) =>
                        typeof s === "string" ? s : s.name
                      )}
                      onChange={(value) =>
                        setNewDoctor({
                          ...newDoctor,
                          specialties: value.map((name) => ({
                            id: Date.now() + Math.random(),
                            name,
                            status: "ACTIVE",
                            description: name,
                          })),
                        })
                      }
                      placeholder="Chọn chuyên môn"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="languages">Ngôn ngữ</Label>
                    <Input
                      id="languages"
                      value={
                        newDoctor.languages
                          ? newDoctor.languages.join(", ")
                          : ""
                      }
                      onChange={(e) =>
                        setNewDoctor({
                          ...newDoctor,
                          languages: e.target.value
                            .split(",")
                            .map((l) => l.trim())
                            .filter((l) => l),
                        })
                      }
                      placeholder="Tiếng Việt, English, 中文"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
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
                            <SelectItem
                              key={title.id}
                              value={title.id.toString()}
                            >
                              {title.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Chuyên khoa *</Label>
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
                          <SelectValue placeholder="Chọn chuyên khoa" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDepartments.map((dept) => (
                            <SelectItem
                              key={dept.id}
                              value={dept.id.toString()}
                            >
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Học vấn</h3>
                  <Button
                    type="button"
                    onClick={() => addEducation(newDoctor, setNewDoctor)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm học vấn
                  </Button>
                </div>
                {newDoctor.education?.map((edu, index) => (
                  <Card key={edu.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Học vấn {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeEducation(newDoctor, setNewDoctor, index)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Bằng cấp</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                            placeholder="Bác sĩ Đa khoa"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Trường học</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducation(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "institution",
                                e.target.value
                              )
                            }
                            placeholder="Đại học Y Hà Nội"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Năm tốt nghiệp</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) =>
                            updateEducation(
                              newDoctor,
                              setNewDoctor,
                              index,
                              "year",
                              e.target.value
                            )
                          }
                          placeholder="2020"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Mô tả</Label>
                        <Textarea
                          value={edu.description}
                          onChange={(e) =>
                            updateEducation(
                              newDoctor,
                              setNewDoctor,
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Tốt nghiệp loại Giỏi"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Kinh nghiệm làm việc</h3>
                  <Button
                    type="button"
                    onClick={() => addWorkExperience(newDoctor, setNewDoctor)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm kinh nghiệm
                  </Button>
                </div>
                {newDoctor.workExperience?.map((exp, index) => (
                  <Card key={exp.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Kinh nghiệm {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeWorkExperience(newDoctor, setNewDoctor, index)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Chức vụ</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) =>
                              updateWorkExperience(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "position",
                                e.target.value
                              )
                            }
                            placeholder="Trưởng khoa Tim mạch"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Tổ chức</Label>
                          <Input
                            value={exp.organization}
                            onChange={(e) =>
                              updateWorkExperience(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            placeholder="Bệnh viện ABC"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Năm bắt đầu</Label>
                          <Input
                            value={exp.startYear}
                            onChange={(e) =>
                              updateWorkExperience(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "startYear",
                                e.target.value
                              )
                            }
                            placeholder="2020"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Năm kết thúc</Label>
                          <Input
                            value={exp.endYear || ""}
                            onChange={(e) =>
                              updateWorkExperience(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "endYear",
                                e.target.value
                              )
                            }
                            placeholder="2023 (để trống nếu hiện tại)"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Mô tả</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) =>
                            updateWorkExperience(
                              newDoctor,
                              setNewDoctor,
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Mô tả công việc và trách nhiệm"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Thành tích & Giải thưởng
                  </h3>
                  <Button
                    type="button"
                    onClick={() => addAchievement(newDoctor, setNewDoctor)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm thành tích
                  </Button>
                </div>
                {newDoctor.achievements?.map((achievement, index) => (
                  <Card key={achievement.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Thành tích {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeAchievement(newDoctor, setNewDoctor, index)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Tiêu đề</Label>
                          <Input
                            value={achievement.title}
                            onChange={(e) =>
                              updateAchievement(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Thầy thuốc trẻ xuất sắc"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Năm</Label>
                          <Input
                            value={achievement.year}
                            onChange={(e) =>
                              updateAchievement(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "year",
                                e.target.value
                              )
                            }
                            placeholder="2023"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Loại</Label>
                        <Select
                          value={achievement.type}
                          onValueChange={(value) =>
                            updateAchievement(
                              newDoctor,
                              setNewDoctor,
                              index,
                              "type",
                              value as Achievement["type"]
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {achievementTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Mô tả</Label>
                        <Textarea
                          value={achievement.description}
                          onChange={(e) =>
                            updateAchievement(
                              newDoctor,
                              setNewDoctor,
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Mô tả chi tiết về thành tích"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <h3 className="text-lg font-medium">Lịch làm việc</h3>
                {newDoctor.workingHours?.map((hour, index) => (
                  <Card key={hour.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          {
                            dayOfWeekOptions.find(
                              (d) => d.value === hour.dayOfWeek
                            )?.label
                          }
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`available-${index}`}>
                            Có làm việc
                          </Label>
                          <input
                            id={`available-${index}`}
                            type="checkbox"
                            checked={hour.isAvailable}
                            onChange={(e) =>
                              updateWorkingHour(
                                newDoctor,
                                setNewDoctor,
                                index,
                                "isAvailable",
                                e.target.checked
                              )
                            }
                          />
                        </div>
                      </div>
                      {hour.isAvailable && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Giờ bắt đầu</Label>
                            <Input
                              type="time"
                              value={hour.startTime}
                              onChange={(e) =>
                                updateWorkingHour(
                                  newDoctor,
                                  setNewDoctor,
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Giờ kết thúc</Label>
                            <Input
                              type="time"
                              value={hour.endTime}
                              onChange={(e) =>
                                updateWorkingHour(
                                  newDoctor,
                                  setNewDoctor,
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
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
                  placeholder="Tìm kiếm bác sĩ, chuyên khoa, chuyên môn, ngôn ngữ..."
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
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Lọc theo chuyên khoa" />
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

      {/* Stats */}
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
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=100&width=100";
                      }}
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
                        ? "Hoạt động"
                        : doctor.status === "INACTIVE"
                        ? "Ngừng hoạt động"
                        : doctor.status === "HIDDEN"
                        ? "Ẩn"
                        : "Đã xóa"}
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
                      Xóa
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
                {doctor.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {doctor.phone}
                  </div>
                )}
                {doctor.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {doctor.email}
                  </div>
                )}
                {doctor.specialties && doctor.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doctor.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty.name}
                      </Badge>
                    ))}
                    {doctor.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
                {doctor.rating && doctor.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {renderRatingStars(doctor.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({doctor.rating})
                    </span>
                  </div>
                )}
                {doctor.consultationFee && doctor.consultationFee > 0 && (
                  <div className="text-sm font-medium text-green-600">
                    Phí khám: {formatCurrency(doctor.consultationFee)}
                  </div>
                )}
                <p className="text-sm text-gray-700 line-clamp-2">
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
                  Xem chi tiết
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
              thay đổi từ khóa hoặc bộ lọc.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog - Similar structure with tabs */}
      {editingDoctor && (
        <Dialog
          open={!!editingDoctor}
          onOpenChange={() => setEditingDoctor(null)}
        >
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin bác sĩ</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin bác sĩ để lưu thay đổi vào hệ thống.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                <TabsTrigger value="education">Học vấn</TabsTrigger>
                <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                <TabsTrigger value="achievements">Thành tích</TabsTrigger>
                <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Họ và tên</Label>
                    <Input
                      id="edit-name"
                      value={editingDoctor.name}
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-avatarUrl">Ảnh đại diện</Label>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-experience">
                        Số năm kinh nghiệm
                      </Label>
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
                    <div className="grid gap-2">
                      <Label htmlFor="edit-rating">Đánh giá (1-5)</Label>
                      <Input
                        id="edit-rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={editingDoctor.rating}
                        onChange={(e) =>
                          setEditingDoctor({
                            ...editingDoctor,
                            rating: Number.parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-phone">Số điện thoại</Label>
                      <Input
                        id="edit-phone"
                        value={editingDoctor.phone}
                        onChange={(e) =>
                          setEditingDoctor({
                            ...editingDoctor,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editingDoctor.email}
                        onChange={(e) =>
                          setEditingDoctor({
                            ...editingDoctor,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-consultationFee">Phí khám (VNĐ)</Label>
                    <Input
                      id="edit-consultationFee"
                      type="number"
                      value={editingDoctor.consultationFee}
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          consultationFee: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-specialties">Chuyên môn</Label>
                    <MultiSelect
                      options={specialtyOptions}
                      value={(editingDoctor.specialties || []).map((s) =>
                        typeof s === "string" ? s : s.name
                      )}
                      onChange={(value) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          specialties: value.map((name) => ({
                            id: Date.now() + Math.random(),
                            name,
                            status: "ACTIVE",
                            description: name,
                          })),
                        })
                      }
                      placeholder="Chọn chuyên môn"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-languages">Ngôn ngữ</Label>
                    <Input
                      id="edit-languages"
                      value={
                        editingDoctor.languages
                          ? editingDoctor.languages.join(", ")
                          : ""
                      }
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          languages: e.target.value
                            .split(",")
                            .map((l) => l.trim())
                            .filter((l) => l),
                        })
                      }
                      placeholder="Tiếng Việt, English, 中文"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-title">Chức danh</Label>
                      <Select
                        value={editingDoctor.title.id.toString()}
                        onValueChange={(value) => {
                          const title = mockTitles.find(
                            (t) => t.id.toString() === value
                          );
                          if (title)
                            setEditingDoctor({ ...editingDoctor, title });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTitles.map((title) => (
                            <SelectItem
                              key={title.id}
                              value={title.id.toString()}
                            >
                              {title.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-department">Chuyên khoa</Label>
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
                            <SelectItem
                              key={dept.id}
                              value={dept.id.toString()}
                            >
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Học vấn</h3>
                  <Button
                    type="button"
                    onClick={() =>
                      addEducation(editingDoctor, setEditingDoctor)
                    }
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm học vấn
                  </Button>
                </div>
                {editingDoctor.education?.map((edu, index) => (
                  <Card key={edu.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Học vấn {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeEducation(
                              editingDoctor,
                              setEditingDoctor,
                              index
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Bằng cấp</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                            placeholder="Bác sĩ Đa khoa"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Trường học</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducation(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "institution",
                                e.target.value
                              )
                            }
                            placeholder="Đại học Y Hà Nội"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Năm tốt nghiệp</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) =>
                            updateEducation(
                              editingDoctor,
                              setEditingDoctor,
                              index,
                              "year",
                              e.target.value
                            )
                          }
                          placeholder="2020"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Mô tả</Label>
                        <Textarea
                          value={edu.description}
                          onChange={(e) =>
                            updateEducation(
                              editingDoctor,
                              setEditingDoctor,
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Tốt nghiệp loại Giỏi"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Kinh nghiệm làm việc</h3>
                  <Button
                    type="button"
                    onClick={() =>
                      addWorkExperience(editingDoctor, setEditingDoctor)
                    }
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm kinh nghiệm
                  </Button>
                </div>
                {editingDoctor.workExperience?.map((exp, index) => (
                  <Card key={exp.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Kinh nghiệm {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeWorkExperience(
                              editingDoctor,
                              setEditingDoctor,
                              index
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Chức vụ</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) =>
                              updateWorkExperience(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "position",
                                e.target.value
                              )
                            }
                            placeholder="Trưởng khoa Tim mạch"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Tổ chức</Label>
                          <Input
                            value={exp.organization}
                            onChange={(e) =>
                              updateWorkExperience(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "organization",
                                e.target.value
                              )
                            }
                            placeholder="Bệnh viện ABC"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Năm bắt đầu</Label>
                          <Input
                            value={exp.startYear}
                            onChange={(e) =>
                              updateWorkExperience(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "startYear",
                                e.target.value
                              )
                            }
                            placeholder="2020"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Năm kết thúc</Label>
                          <Input
                            value={exp.endYear || ""}
                            onChange={(e) =>
                              updateWorkExperience(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "endYear",
                                e.target.value
                              )
                            }
                            placeholder="2023 (để trống nếu hiện tại)"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Mô tả</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) =>
                            updateWorkExperience(
                              editingDoctor,
                              setEditingDoctor,
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Mô tả công việc và trách nhiệm"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Thành tích & Giải thưởng
                  </h3>
                  <Button
                    type="button"
                    onClick={() =>
                      addAchievement(editingDoctor, setEditingDoctor)
                    }
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm thành tích
                  </Button>
                </div>
                {editingDoctor.achievements?.map((achievement, index) => (
                  <Card key={achievement.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Thành tích {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeAchievement(
                              editingDoctor,
                              setEditingDoctor,
                              index
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Tiêu đề</Label>
                          <Input
                            value={achievement.title}
                            onChange={(e) =>
                              updateAchievement(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Thầy thuốc trẻ xuất sắc"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Năm</Label>
                          <Input
                            value={achievement.year}
                            onChange={(e) =>
                              updateAchievement(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "year",
                                e.target.value
                              )
                            }
                            placeholder="2023"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Loại</Label>
                        <Select
                          value={achievement.type}
                          onValueChange={(value) =>
                            updateAchievement(
                              editingDoctor,
                              setEditingDoctor,
                              index,
                              "type",
                              value as Achievement["type"]
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {achievementTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Mô tả</Label>
                        <Textarea
                          value={achievement.description}
                          onChange={(e) =>
                            updateAchievement(
                              editingDoctor,
                              setEditingDoctor,
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Mô tả chi tiết về thành tích"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <h3 className="text-lg font-medium">Lịch làm việc</h3>
                {editingDoctor.workingHours?.map((hour, index) => (
                  <Card key={hour.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          {
                            dayOfWeekOptions.find(
                              (d) => d.value === hour.dayOfWeek
                            )?.label
                          }
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`edit-available-${index}`}>
                            Có làm việc
                          </Label>
                          <input
                            id={`edit-available-${index}`}
                            type="checkbox"
                            checked={hour.isAvailable}
                            onChange={(e) =>
                              updateWorkingHour(
                                editingDoctor,
                                setEditingDoctor,
                                index,
                                "isAvailable",
                                e.target.checked
                              )
                            }
                          />
                        </div>
                      </div>
                      {hour.isAvailable && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Giờ bắt đầu</Label>
                            <Input
                              type="time"
                              value={hour.startTime}
                              onChange={(e) =>
                                updateWorkingHour(
                                  editingDoctor,
                                  setEditingDoctor,
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Giờ kết thúc</Label>
                            <Input
                              type="time"
                              value={hour.endTime}
                              onChange={(e) =>
                                updateWorkingHour(
                                  editingDoctor,
                                  setEditingDoctor,
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button onClick={handleUpdateDoctor}>Cập nhật bác sĩ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
