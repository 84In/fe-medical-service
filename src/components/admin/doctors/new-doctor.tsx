import { ImageUpload } from "@/components/image-upload";
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
import { useDoctorMetadata } from "@/hooks/doctor/use-doctor-metadata";
import { toast } from "@/hooks/use-toast";
import { addDoctor } from "@/services";
import { Achievement, Doctor, WorkingHour } from "@/types";
import {
  addAchievement,
  addEducation,
  addWorkExperience,
  removeAchievement,
  removeEducation,
  removeWorkExperience,
  updateAchievement,
  updateEducation,
  updateWorkExperience,
  updateWorkingHour,
} from "@/utils/doctorUtils";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { achievementTypes, dayOfWeekOptions } from "./mockData";

interface DoctorFormProps {
  newDoctor: Partial<Doctor>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setNewDoctor: React.Dispatch<React.SetStateAction<Partial<Doctor>>>;
  setDoctors?: React.Dispatch<React.SetStateAction<Doctor[]>>;
}

export default function DoctorForm({
  newDoctor,
  open,
  onOpenChange,
  setNewDoctor,
  setDoctors = () => {}, // Default to a no-op function if not provided
}: DoctorFormProps) {
  const { departments, positions, titles, specialties, loading, refetch } =
    useDoctorMetadata();
  //handle adding a new doctor
  const handleAddDoctor = async () => {
    if (
      !newDoctor.name ||
      !newDoctor.department ||
      !newDoctor.position ||
      !newDoctor.title
    )
      return;

    const doctor: any = {
      name: newDoctor.name,
      avatarUrl: newDoctor.avatarUrl || "/placeholder.svg?height=100&width=100",
      introduction: newDoctor.introduction || "",
      experienceYears: newDoctor.experienceYears || "0",
      status: (newDoctor.status as Doctor["status"]) || "ACTIVE",
      phone: newDoctor.phone || "",
      email: newDoctor.email || "",
      departmentId: newDoctor.department?.id,
      positionId: newDoctor.position?.id,
      titleId: newDoctor.title?.id,
      specialtyIds: (newDoctor.specialties || []).map((s) => s.id),
      education: (newDoctor.education || []).map(({ id, ...rest }) => rest),
      workExperience: (newDoctor.workExperience || []).map(
        ({ id, ...rest }) => rest
      ),
      achievements: (newDoctor.achievements || []).map(
        ({ id, ...rest }) => rest
      ),
      workingHours: (newDoctor.workingHours || []).map(
        ({ id, startTime, endTime, isAvailable, ...rest }) => ({
          ...rest,
          startTime: isAvailable ? startTime : null,
          endTime: isAvailable ? endTime : null,
          isAvailable,
        })
      ),
    };

    // setDoctors([...doctors, doctor]);
    try {
      const { code, message, result } = await addDoctor(doctor);
      if (code === 0) {
        toast({
          title: "Thành công!",
          description: "Thêm bác sĩ thành công!",
          variant: "success",
        });
        setDoctors((prev) => [...prev, result]);
      } else {
        throw new Error(message || "Thêm bác sĩ thất bại");
      }
    } catch (error) {
      console.error("Error adding department:", error);
      let message = "Thêm bác sĩ thất bại!";

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

    // Reset the form after adding
    setNewDoctor({
      name: "",
      avatarUrl: "",
      introduction: "",
      experienceYears: "",
      status: "ACTIVE",
      department: undefined,
      position: undefined,
      title: undefined,
      phone: "",
      email: "",
      specialties: [],
      education: [],
      workExperience: [],
      achievements: [],
      workingHours: dayOfWeekOptions.map((day, idx) => ({
        id: idx + 1,
        dayOfWeek: day.value as WorkingHour["dayOfWeek"],
        startTime: day.value === "SUNDAY" ? "" : "08:00",
        endTime: day.value === "SUNDAY" ? "" : "17:00",
        isAvailable: day.value !== "SUNDAY",
      })),
    });
    onOpenChange(false);
  };

  const addImage = useCallback(
    (url: string) => {
      setNewDoctor((prev) => ({
        ...prev,
        avatarUrl: url,
      }));
    },
    [setNewDoctor]
  );

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
        <Tabs
          defaultValue="basic"
          className="w-full flex flex-col gap-20 lg:gap-4"
        >
          <TabsList className="grid w-full gap-2 grid-cols-[repeat(auto-fit,minmax(120px,1fr))] ">
            <TabsTrigger value="basic">Cơ bản</TabsTrigger>
            <TabsTrigger value="education">Học vấn</TabsTrigger>
            <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
            <TabsTrigger value="achievements">Thành tích</TabsTrigger>
            <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
          </TabsList>
          <TabsContent
            value="basic"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
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
                <ImageUpload
                  onImageSelect={addImage}
                  folder={"doctors"}
                  maxSize={5}
                  initialImage={newDoctor.avatarUrl}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="introduction">Mô tả *</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="specialties">Chuyên môn *</Label>
                <MultiSelect
                  disabled={loading}
                  options={specialties.map((s) => s.name)}
                  value={(newDoctor.specialties || []).map((s) =>
                    typeof s === "string" ? s : s.name
                  )}
                  onChange={(selectedNames) =>
                    setNewDoctor({
                      ...newDoctor,
                      specialties: specialties.filter((s) =>
                        selectedNames.includes(s.name)
                      ),
                    })
                  }
                  placeholder={
                    loading ? "Đang tải chuyên môn..." : "Chọn chuyên môn"
                  }
                />
              </div>
              <div className="grid gap-2  lg:grid-cols-2 lg:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="experience">Số năm kinh nghiệm *</Label>
                  <Input
                    id="experience"
                    value={newDoctor.experienceYears || ""}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        experienceYears: e.target.value,
                      })
                    }
                    placeholder="e.g., 10"
                  />
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
              <div className="grid gap-2 lg:grid-cols-2 lg:gap-4">
                {" "}
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
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
                  <Label htmlFor="email">Email *</Label>
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

              <div className="grid gap-2  lg:grid-cols-3 lg:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Chức danh *</Label>
                  <Select
                    disabled={loading}
                    value={newDoctor.title?.id.toString()}
                    onValueChange={(value) => {
                      const title = titles.find(
                        (t) => t.id.toString() === value
                      );
                      setNewDoctor({ ...newDoctor, title });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !loading ? "Chọn chức danh" : "Đang tải chức danh..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {titles.map((title) => (
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
                    disabled={loading}
                    value={newDoctor.department?.id.toString()}
                    onValueChange={(value) => {
                      const department = departments.find(
                        (d) => d.id.toString() === value
                      );
                      setNewDoctor({ ...newDoctor, department });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loading ? "Đang tải chuyên khoa" : "Chọn chuyên khoa"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
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
                    disabled={loading}
                    value={newDoctor.position?.id.toString()}
                    onValueChange={(value) => {
                      const position = positions.find(
                        (p) => p.id.toString() === value
                      );
                      setNewDoctor({ ...newDoctor, position });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loading ? "Đang tải chức vụ" : "Chọn chức vụ"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
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

          <TabsContent
            value="education"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
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

          <TabsContent
            value="experience"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
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

          <TabsContent
            value="achievements"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
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

          <TabsContent
            value="schedule"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
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
