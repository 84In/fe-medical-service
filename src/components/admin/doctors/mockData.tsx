import { Department, Position, Title } from "@/types";

export const mockDepartments: Department[] = [
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

export const mockPositions: Position[] = [
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

export const mockTitles: Title[] = [
  { id: 1, name: "BS.", description: "Bác sĩ", status: "ACTIVE" },
  { id: 2, name: "GS.", description: "Giáo sư", status: "ACTIVE" },
  {
    id: 3,
    name: "PGS.",
    description: "Phó giáo sư",
    status: "ACTIVE",
  },
];

export const specialtyOptions = [
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
  "Chăm sóc sức khỏe người cao tuổi",
  "Chăm sóc sức khỏe phụ nữ",
  "Chăm sóc sức khỏe trẻ em",
  "Chăm sóc sức khỏe tâm thần",
];

export const dayOfWeekOptions = [
  { value: "MONDAY", label: "Thứ 2" },
  { value: "TUESDAY", label: "Thứ 3" },
  { value: "WEDNESDAY", label: "Thứ 4" },
  { value: "THURSDAY", label: "Thứ 5" },
  { value: "FRIDAY", label: "Thứ 6" },
  { value: "SATURDAY", label: "Thứ 7" },
  { value: "SUNDAY", label: "Chủ nhật" },
];
export const achievementTypes = [
  { value: "AWARD", label: "Giải thưởng" },
  { value: "CERTIFICATION", label: "Chứng chỉ" },
  { value: "PUBLICATION", label: "Xuất bản" },
  { value: "RESEARCH", label: "Nghiên cứu" },
];
