import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Achievement, Doctor } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import {
  addEducation,
  updateEducation,
  removeEducation,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  updateAchievement,
  removeAchievement,
  updateWorkingHour,
  addAchievement,
} from "@/utils/doctorUtils";
import { MultiSelect } from "@/components/ui/multi-select";
import { ImageUpload } from "@/components/image-upload";
import { useCallback } from "react";
import { useDoctorMetadata } from "@/hooks/doctor/use-doctor-metadata";
import { achievementTypes, dayOfWeekOptions } from "./mockData";
interface DoctorFormProps {
  editingDoctor: Doctor;
  setEditingDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
  updateDoctor: () => void;
}
export function EditDoctorForm({
  editingDoctor,
  setEditingDoctor,
  updateDoctor,
}: DoctorFormProps) {
  const { departments, positions, titles, specialties, loading, refetch } =
    useDoctorMetadata();

  const editImage = useCallback(
    (url: string) => {
      if (!editingDoctor) return;
      setEditingDoctor({
        ...editingDoctor,
        avatarUrl: url,
      });
    },
    [editingDoctor]
  );
  return (
    <Dialog open={!!editingDoctor} onOpenChange={() => setEditingDoctor(null)}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin bác sĩ</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin bác sĩ để lưu thay đổi vào hệ thống.
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
                <ImageUpload
                  onImageSelect={editImage}
                  initialImage={editingDoctor.avatarUrl}
                  folder={"doctors"}
                  maxSize={5}
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
                <Label htmlFor="edit-specialties">Chuyên môn</Label>
                <MultiSelect
                  disabled={loading}
                  options={specialties.map((s) => s.name)}
                  value={(editingDoctor.specialties || []).map((s) =>
                    typeof s === "string" ? s : s.name
                  )}
                  onChange={(selectedNames) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      specialties: specialties.filter((s) =>
                        selectedNames.includes(s.name)
                      ),
                    })
                  }
                  placeholder="Chọn chuyên môn"
                />
              </div>
              <div className="grid gap-2  lg:grid-cols-2 lg:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-experience">Số năm kinh nghiệm</Label>
                  <Input
                    id="edit-experience"
                    value={editingDoctor.experienceYears}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        experienceYears: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Trạng thái</Label>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2 lg:grid-cols-2 lg:gap-4">
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

              <div className="grid gap-2 lg:grid-cols-3 lg:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Chức danh</Label>
                  <Select
                    disabled={loading}
                    value={editingDoctor.title.id.toString()}
                    onValueChange={(value) => {
                      const title = titles.find(
                        (t) => t.id.toString() === value
                      );
                      if (title) {
                        setEditingDoctor({ ...editingDoctor, title });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label htmlFor="edit-department">Chuyên khoa</Label>
                  <Select
                    value={editingDoctor.department.id.toString()}
                    onValueChange={(value) => {
                      const department = departments.find(
                        (d) => d.id.toString() === value
                      );
                      if (department) {
                        setEditingDoctor({ ...editingDoctor, department });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label htmlFor="edit-position">Chức vụ</Label>
                  <Select
                    value={editingDoctor.position.id.toString()}
                    onValueChange={(value) => {
                      const position = positions.find(
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
                onClick={() => addEducation(editingDoctor, setEditingDoctor)}
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
                        removeEducation(editingDoctor, setEditingDoctor, index)
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

          <TabsContent
            value="experience"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
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

          <TabsContent
            value="achievements"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Thành tích & Giải thưởng</h3>
              <Button
                type="button"
                onClick={() => addAchievement(editingDoctor, setEditingDoctor)}
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

          <TabsContent
            value="schedule"
            className="space-y-4 p-4 border rounded-xl bg-white shadow"
          >
            <h3 className="text-lg font-medium">Lịch làm việc</h3>
            {editingDoctor.workingHours?.map((hour, index) => (
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
          <Button onClick={updateDoctor}>Cập nhật bác sĩ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
