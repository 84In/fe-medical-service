import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Achievement,
  Doctor,
  Education,
  Experience,
  WorkingHour,
} from "@/types";
import {
  addEducation,
  updateEducation,
  removeEducation,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addAchievement,
  updateAchievement,
  removeAchievement,
  updateWorkingHour,
} from "@/utils/doctorUtils";
import { Plus, Trash2 } from "lucide-react";
import {
  achievementTypes,
  dayOfWeekOptions,
  mockDepartments,
  mockPositions,
  mockTitles,
  specialtyOptions,
} from "./mockData";

interface DoctorFormProps {
  newDoctor: Partial<Doctor>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setNewDoctor: React.Dispatch<React.SetStateAction<Partial<Doctor>>>;
}

export default function DoctorForm({
  newDoctor,
  open,
  onOpenChange,
  setNewDoctor,
}: DoctorFormProps) {
  //handle adding a new doctor
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

    // setDoctors([...doctors, doctor]);
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            Nhập thông tin bác sĩ mới để thêm vào hệ thống. Các trường có dấu *
            là bắt buộc.
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
                    newDoctor.languages ? newDoctor.languages.join(", ") : ""
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
                        <SelectItem key={title.id} value={title.id.toString()}>
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
                        <SelectItem key={dept.id} value={dept.id.toString()}>
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
              <h3 className="text-lg font-medium">Thành tích & Giải thưởng</h3>
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
                        dayOfWeekOptions.find((d) => d.value === hour.dayOfWeek)
                          ?.label
                      }
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`available-${index}`}>Có làm việc</Label>
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
  );
}
