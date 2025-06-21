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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Plus, Search, FileText, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  preview: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Templates mặc định cho các loại nội dung khác nhau
export const defaultTemplates: ContentTemplate[] = [
  // Templates cho Chuyên khoa
  {
    id: "basic-department",
    name: "Chuyên khoa cơ bản",
    description: "Mẫu đơn giản cho mô tả chuyên khoa",
    category: "Chuyên khoa",
    content: `<h2>Giới thiệu chung</h2>
<p>Mô tả ngắn gọn về chuyên khoa, tầm nhìn và sứ mệnh của khoa.</p>

<h3>Dịch vụ chính</h3>
<ul>
<li>Dịch vụ khám và tư vấn</li>
<li>Dịch vụ chẩn đoán</li>
<li>Dịch vụ điều trị</li>
</ul>

<h3>Đội ngũ chuyên gia</h3>
<p>Thông tin về đội ngũ bác sĩ và nhân viên y tế.</p>`,
    preview: "Mẫu cơ bản với giới thiệu, dịch vụ và đội ngũ",
    tags: ["cơ bản", "chuyên khoa", "y tế"],
  },
  {
    id: "detailed-department",
    name: "Chuyên khoa chi tiết",
    description: "Mẫu đầy đủ với nhiều thông tin chi tiết",
    category: "Chuyên khoa",
    content: `<h2>Khoa [Tên chuyên khoa] - Chăm sóc chuyên nghiệp</h2>
<p>Khoa [Tên chuyên khoa] của VitaCare Medical là một trong những khoa hàng đầu về [lĩnh vực chuyên môn]. Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất.</p>

<h3>Dịch vụ chuyên khoa</h3>
<ul>
<li><strong>Khám và tư vấn:</strong> Đánh giá tổng quát tình trạng sức khỏe</li>
<li><strong>Chẩn đoán hình ảnh:</strong> Sử dụng công nghệ hiện đại</li>
<li><strong>Điều trị chuyên sâu:</strong> Phương pháp điều trị tiên tiến</li>
<li><strong>Theo dõi và chăm sóc:</strong> Hỗ trợ sau điều trị</li>
</ul>

<h3>Đội ngũ chuyên gia</h3>
<p>Khoa có đội ngũ gồm <strong>[số lượng] bác sĩ chuyên khoa</strong> với nhiều năm kinh nghiệm, trong đó có [số lượng] giáo sư, [số lượng] phó giáo sư và các bác sĩ được đào tạo tại các trường đại học y khoa hàng đầu.</p>

<h3>Trang thiết bị hiện đại</h3>
<ul>
<li>Máy [tên thiết bị] thế hệ mới</li>
<li>Hệ thống [tên hệ thống] hiện đại</li>
<li>Phòng [tên phòng] được trang bị đầy đủ</li>
</ul>

<h3>Thời gian làm việc</h3>
<p><strong>Thứ 2 - Thứ 6:</strong> 7:00 - 17:00<br>
<strong>Thứ 7 - Chủ nhật:</strong> 8:00 - 16:00</p>

<p><em>Để đặt lịch khám hoặc tư vấn, vui lòng liên hệ hotline: <strong>1900-1234</strong></em></p>`,
    preview:
      "Mẫu đầy đủ với mô tả chi tiết, dịch vụ, đội ngũ, thiết bị và liên hệ",
    tags: ["chi tiết", "chuyên khoa", "đầy đủ"],
  },
  {
    id: "emergency-department",
    name: "Khoa cấp cứu",
    description: "Mẫu chuyên biệt cho khoa cấp cứu",
    category: "Chuyên khoa",
    content: `<h2>Khoa Cấp cứu - Sẵn sàng 24/7</h2>
<p>Khoa Cấp cứu của VitaCare Medical hoạt động 24/7, sẵn sàng tiếp nhận và xử lý các trường hợp cấp cứu, chấn thương và các tình huống y tế khẩn cấp với tốc độ nhanh nhất và chất lượng cao nhất.</p>

<h3>Dịch vụ cấp cứu</h3>
<ul>
<li><strong>Cấp cứu tim mạch:</strong> Xử lý đột quỵ, nhồi máu cơ tim</li>
<li><strong>Cấp cứu hô hấp:</strong> Khó thở, ngừng thở</li>
<li><strong>Xử lý chấn thương:</strong> Tai nạn giao thông, chấn thương</li>
<li><strong>Cấp cứu sản khoa:</strong> Sinh non, biến chứng thai sản</li>
<li><strong>Cấp cứu nhi khoa:</strong> Trẻ em cấp cứu</li>
</ul>

<h3>Trang thiết bị cấp cứu</h3>
<ul>
<li>Xe cấp cứu hiện đại với đầy đủ thiết bị</li>
<li>Phòng cấp cứu được trang bị máy thở, máy sốc tim</li>
<li>Hệ thống theo dõi bệnh nhân liên tục</li>
<li>Phòng mổ cấp cứu sẵn sàng 24/7</li>
</ul>

<div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 16px 0;">
<h3 style="color: #dc2626; margin-top: 0;">Liên hệ cấp cứu</h3>
<p style="margin-bottom: 0;"><strong style="font-size: 18px; color: #dc2626;">Hotline cấp cứu: 115</strong><br>
<strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM<br>
<strong>Thời gian:</strong> 24/7 - Tất cả các ngày trong tuần</p>
</div>`,
    preview: "Mẫu chuyên biệt cho khoa cấp cứu với thông tin liên hệ nổi bật",
    tags: ["cấp cứu", "24/7", "khẩn cấp"],
  },
  {
    id: "pediatric-department",
    name: "Khoa nhi",
    description: "Mẫu thân thiện cho khoa nhi khoa",
    category: "Chuyên khoa",
    content: `<h2>Khoa Nhi - Chăm sóc sức khỏe trẻ em toàn diện</h2>
<p>Khoa Nhi của VitaCare Medical chuyên cung cấp dịch vụ chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 16 tuổi. Với môi trường thân thiện, an toàn và đội ngũ y bác sĩ tận tâm, chúng tôi luôn đặt sức khỏe và sự thoải mái của các bé lên hàng đầu.</p>

<h3>Dịch vụ nhi khoa</h3>
<ul>
<li><strong>Khám sức khỏe định kỳ:</strong> Theo dõi phát triển của trẻ theo từng độ tuổi</li>
<li><strong>Tiêm chủng đầy đủ:</strong> Các loại vaccine theo lịch tiêm chủng quốc gia</li>
<li><strong>Điều trị bệnh lý nhi khoa:</strong> Cảm cúm, tiêu hóa, hô hấp, da liễu</li>
<li><strong>Tư vấn dinh dưỡng:</strong> Hướng dẫn chế độ ăn phù hợp từng độ tuổi</li>
<li><strong>Cấp cứu nhi:</strong> Xử lý các tình huống khẩn cấp ở trẻ em</li>
</ul>

<h3>Môi trường thân thiện</h3>
<p>Phòng khám được thiết kế với:</p>
<ul>
<li>Màu sắc tươi sáng, vui tươi phù hợp với trẻ em</li>
<li>Khu vực vui chơi với đồ chơi giáo dục an toàn</li>
<li>Phòng khám riêng biệt cho từng độ tuổi</li>
<li>Hệ thống âm thanh nhẹ nhàng, thư giãn</li>
</ul>

<h3>Lịch khám</h3>
<p><strong>Khám theo lịch hẹn:</strong> Thứ 2 - Thứ 6 (7:00 - 17:00)<br>
<strong>Khám cấp cứu:</strong> 24/7 tất cả các ngày<br>
<strong>Tiêm chủng:</strong> Thứ 2, 4, 6 (8:00 - 16:00)</p>

<p><em>Để đặt lịch khám cho bé, vui lòng liên hệ: <strong>1900-1234</strong></em></p>`,
    preview: "Mẫu thân thiện cho khoa nhi với môi trường vui tươi",
    tags: ["nhi khoa", "trẻ em", "thân thiện"],
  },

  // Templates cho Tin tức
  {
    id: "news-announcement",
    name: "Thông báo tin tức",
    description: "Mẫu cho thông báo và tin tức chung",
    category: "Tin tức",
    content: `<h2>[Tiêu đề tin tức]</h2>
<p><em>Ngày đăng: [Ngày/Tháng/Năm] | Tác giả: [Tên tác giả]</em></p>

<p><strong>Tóm tắt:</strong> Mô tả ngắn gọn về nội dung chính của tin tức...</p>

<h3>Nội dung chi tiết</h3>
<p>Nội dung chính của bài viết tin tức. Mô tả chi tiết về sự kiện, thông tin hoặc thông báo.</p>

<h3>Thông tin liên quan</h3>
<ul>
<li>Thông tin bổ sung 1</li>
<li>Thông tin bổ sung 2</li>
<li>Thông tin bổ sung 3</li>
</ul>

<p><strong>Liên hệ để biết thêm thông tin:</strong><br>
Hotline: 1900-1234<br>
Email: info@vitacare.com</p>`,
    preview: "Mẫu chuẩn cho tin tức và thông báo",
    tags: ["tin tức", "thông báo", "cơ bản"],
  },
  {
    id: "health-article",
    name: "Bài viết sức khỏe",
    description: "Mẫu cho bài viết về sức khỏe và y tế",
    category: "Tin tức",
    content: `<h2>[Tiêu đề bài viết về sức khỏe]</h2>
<p><em>Bác sĩ tư vấn: [Tên bác sĩ] | Chuyên khoa: [Tên chuyên khoa]</em></p>

<h3>Tổng quan</h3>
<p>Giới thiệu chung về chủ đề sức khỏe được đề cập trong bài viết...</p>

<h3>Nguyên nhân</h3>
<ul>
<li>Nguyên nhân 1</li>
<li>Nguyên nhân 2</li>
<li>Nguyên nhân 3</li>
</ul>

<h3>Triệu chứng</h3>
<ul>
<li>Triệu chứng 1</li>
<li>Triệu chứng 2</li>
<li>Triệu chứng 3</li>
</ul>

<h3>Cách phòng ngừa</h3>
<ol>
<li>Biện pháp phòng ngừa 1</li>
<li>Biện pháp phòng ngừa 2</li>
<li>Biện pháp phòng ngừa 3</li>
</ol>

<h3>Khi nào cần đến bác sĩ?</h3>
<p>Mô tả các tình huống cần tìm kiếm sự trợ giúp y tế...</p>

<div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px; margin: 16px 0;">
<p><strong>Lưu ý:</strong> Thông tin trong bài viết chỉ mang tính chất tham khảo. Để được tư vấn chính xác, vui lòng liên hệ với bác sĩ chuyên khoa.</p>
</div>`,
    preview: "Mẫu chuyên biệt cho bài viết y tế và sức khỏe",
    tags: ["sức khỏe", "y tế", "bài viết"],
  },

  // Templates cho Dịch vụ
  {
    id: "basic-service",
    name: "Dịch vụ cơ bản",
    description: "Mẫu mô tả dịch vụ y tế cơ bản",
    category: "Dịch vụ",
    content: `<h2>[Tên dịch vụ]</h2>
<p>Mô tả ngắn gọn về dịch vụ và lợi ích mang lại cho bệnh nhân.</p>

<h3>Đối tượng áp dụng</h3>
<ul>
<li>Đối tượng 1</li>
<li>Đối tượng 2</li>
<li>Đối tượng 3</li>
</ul>

<h3>Quy trình thực hiện</h3>
<ol>
<li>Bước 1: Mô tả chi tiết</li>
<li>Bước 2: Mô tả chi tiết</li>
<li>Bước 3: Mô tả chi tiết</li>
</ol>

<h3>Thời gian thực hiện</h3>
<p>Thời gian dự kiến: [X] phút/giờ</p>

<h3>Chuẩn bị trước khi thực hiện</h3>
<ul>
<li>Chuẩn bị 1</li>
<li>Chuẩn bị 2</li>
<li>Chuẩn bị 3</li>
</ul>

<h3>Chi phí dịch vụ</h3>
<p>Liên hệ để được tư vấn chi phí chi tiết: <strong>1900-1234</strong></p>`,
    preview: "Mẫu chuẩn cho mô tả dịch vụ y tế",
    tags: ["dịch vụ", "y tế", "cơ bản"],
  },
  {
    id: "comprehensive-health-checkup",
    name: "Khám sức khỏe tổng quát",
    description: "Mẫu chi tiết cho dịch vụ khám sức khỏe tổng quát",
    category: "Dịch vụ",
    content: `<h2>Khám sức khỏe tổng quát</h2>
<p>
  Gói khám sức khỏe tổng quát tại <strong>Bệnh viện VitaCare</strong> được xây dựng nhằm giúp khách hàng đánh giá toàn diện tình trạng sức khỏe hiện tại, phát hiện sớm các nguy cơ tiềm ẩn và có hướng điều trị kịp thời.
</p>

<p>
  <strong>Đối tượng phù hợp:</strong> Người từ 18 tuổi trở lên, người có tiền sử bệnh lý trong gia đình, hoặc làm việc trong môi trường áp lực, độc hại.<br/>
  <strong>Thời gian thực hiện:</strong> Khoảng 2–3 giờ<br/>
  <strong>Chi phí:</strong> Từ 1.500.000 VNĐ đến 3.000.000 VNĐ<br/>
  <strong>Địa điểm:</strong> Bệnh viện VitaCare – 123 Đường ABC, Quận 1, TP. Hồ Chí Minh.
</p>

<h3>Dịch vụ bao gồm:</h3>
<ul>
  <li>Khám lâm sàng toàn diện</li>
  <li>Xét nghiệm máu và sinh hoá cơ bản</li>
  <li>Phân tích nước tiểu</li>
  <li>Siêu âm ổ bụng tổng quát</li>
  <li>Đo điện tâm đồ (ECG)</li>
</ul>

<h3>Đội ngũ chuyên gia</h3>
<p>
  Được dẫn dắt bởi các bác sĩ đầu ngành giàu kinh nghiệm trong lĩnh vực tầm soát và phát hiện sớm bệnh lý.
</p>

<h3>Trang thiết bị hiện đại</h3>
<ul>
  <li>Máy siêu âm 4D độ phân giải cao</li>
  <li>Hệ thống xét nghiệm tự động</li>
  <li>Thiết bị đo điện tim, huyết áp tiên tiến</li>
</ul>

<p><em>Để được tư vấn hoặc đặt lịch khám, vui lòng liên hệ hotline: <strong>1900-1234</strong></em></p>`,
    preview: "Mẫu chi tiết cho dịch vụ khám sức khỏe tổng quát",
    tags: ["khám tổng quát", "sức khỏe", "tầm soát"],
  },
  {
    id: "diagnostic-imaging",
    name: "Chẩn đoán hình ảnh",
    description: "Mẫu cho các dịch vụ chẩn đoán hình ảnh",
    category: "Dịch vụ",
    content: `<h2>[Tên dịch vụ chẩn đoán hình ảnh]</h2>
<p>
  Dịch vụ chẩn đoán hình ảnh tại VitaCare Medical sử dụng công nghệ hiện đại nhất, giúp chẩn đoán chính xác các bệnh lý.
</p>

<h3>Các loại chẩn đoán</h3>
<ul>
  <li>Siêu âm tổng quát</li>
  <li>Chụp X-quang</li>
  <li>Chụp CT Scanner</li>
  <li>Chụp MRI</li>
  <li>Nội soi</li>
</ul>

<h3>Ưu điểm vượt trội</h3>
<ul>
  <li>Công nghệ hiện đại, hình ảnh rõ nét</li>
  <li>Thời gian thực hiện nhanh chóng</li>
  <li>Đội ngũ kỹ thuật viên chuyên nghiệp</li>
  <li>Kết quả chính xác, đáng tin cậy</li>
</ul>

<h3>Quy trình thực hiện</h3>
<ol>
  <li>Đăng ký và tư vấn</li>
  <li>Chuẩn bị theo hướng dẫn</li>
  <li>Thực hiện chẩn đoán</li>
  <li>Nhận kết quả và tư vấn</li>
</ol>

<p><em>Đặt lịch: <strong>1900-1234</strong></em></p>`,
    preview: "Mẫu cho các dịch vụ chẩn đoán hình ảnh",
    tags: ["chẩn đoán", "hình ảnh", "siêu âm", "CT", "MRI"],
  },
  {
    id: "laboratory-testing",
    name: "Xét nghiệm y tế",
    description: "Mẫu cho các dịch vụ xét nghiệm",
    category: "Dịch vụ",
    content: `<h2>Dịch vụ xét nghiệm y tế</h2>
<p>
  Phòng xét nghiệm VitaCare Medical được trang bị hệ thống máy móc hiện đại, đảm bảo kết quả chính xác và nhanh chóng.
</p>

<h3>Các loại xét nghiệm</h3>
<ul>
  <li><strong>Xét nghiệm máu:</strong> Công thức máu, sinh hóa máu, đông máu</li>
  <li><strong>Xét nghiệm nước tiểu:</strong> Tổng phân tích nước tiểu, vi khuẩn</li>
  <li><strong>Xét nghiệm phân:</strong> Ký sinh trùng, vi khuẩn</li>
  <li><strong>Xét nghiệm hormone:</strong> Tuyến giáp, sinh dục, stress</li>
  <li><strong>Xét nghiệm miễn dịch:</strong> Kháng thể, dị ứng</li>
</ul>

<h3>Thời gian có kết quả</h3>
<ul>
  <li>Xét nghiệm cơ bản: 2-4 giờ</li>
  <li>Xét nghiệm chuyên sâu: 1-3 ngày</li>
  <li>Xét nghiệm đặc biệt: 3-7 ngày</li>
</ul>

<h3>Hướng dẫn chuẩn bị</h3>
<ul>
  <li>Nhịn ăn 8-12 giờ (đối với một số xét nghiệm)</li>
  <li>Uống đủ nước trước khi xét nghiệm nước tiểu</li>
  <li>Thông báo các thuốc đang sử dụng</li>
</ul>

<p><em>Liên hệ tư vấn: <strong>1900-1234</strong></em></p>`,
    preview: "Mẫu cho các dịch vụ xét nghiệm y tế",
    tags: ["xét nghiệm", "máu", "nước tiểu", "hormone"],
  },
];

interface ContentTemplatesProps {
  onSelectTemplate: (content: string) => void;
  categories?: string[];
  showCategories?: string[];
  className?: string;
}

export function ContentTemplates({
  onSelectTemplate,
  categories,
  showCategories,
  className,
}: ContentTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedTemplate, setSelectedTemplate] =
    useState<ContentTemplate | null>(null);

  // Lọc templates theo categories được chỉ định
  const availableTemplates = defaultTemplates.filter((template) => {
    if (showCategories && showCategories.length > 0) {
      return showCategories.includes(template.category);
    }
    return true;
  });

  // Lấy danh sách categories
  const availableCategories = Array.from(
    new Set(availableTemplates.map((t) => t.category))
  );

  // Lọc templates
  const filteredTemplates = availableTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "ALL" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: ContentTemplate) => {
    onSelectTemplate(template.content);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Đã sao chép nội dung",
      description: "Nội dung đã được sao chép vào clipboard.",
      variant: "info",
    });
    // Có thể thêm toast notification ở đây
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Thư viện mẫu nội dung
        </h3>
        <p className="text-sm text-gray-600">
          Chọn mẫu phù hợp để bắt đầu tạo nội dung nhanh chóng
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm mẫu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả danh mục</SelectItem>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="space-y-6">
        {availableCategories.map((category) => {
          const categoryTemplates = filteredTemplates.filter(
            (t) => t.category === category
          );

          if (categoryTemplates.length === 0) return null;

          return (
            <div key={category}>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {category}
                <Badge variant="secondary" className="ml-2">
                  {categoryTemplates.length}
                </Badge>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            {template.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {template.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-gray-500 mb-3">
                        {template.preview}
                      </p>

                      {/* Tags */}
                      {template.tags && template.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTemplate(template)}
                              className="flex-1"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Xem trước
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                {template.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {template.category}
                                </Badge>
                                {template.tags?.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="prose prose-sm max-w-none border rounded-lg p-4 bg-gray-50">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: template.content,
                                  }}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleUseTemplate(template)}
                                  className="flex-1"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Sử dụng mẫu này
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(template.content)
                                  }
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Sao chép
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          onClick={() => handleUseTemplate(template)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Sử dụng
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* No results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy mẫu phù hợp
          </h3>
          <p className="text-gray-600">
            Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
          </p>
        </div>
      )}
    </div>
  );
}

// Hook để sử dụng templates
export function useContentTemplates() {
  const getTemplatesByCategory = (category: string) => {
    return defaultTemplates.filter(
      (template) => template.category === category
    );
  };

  const getTemplateById = (id: string) => {
    return defaultTemplates.find((template) => template.id === id);
  };

  const searchTemplates = (query: string) => {
    return defaultTemplates.filter(
      (template) =>
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.description.toLowerCase().includes(query.toLowerCase()) ||
        template.tags?.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
    );
  };

  return {
    templates: defaultTemplates,
    getTemplatesByCategory,
    getTemplateById,
    searchTemplates,
  };
}
