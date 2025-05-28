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
import { Eye, Plus } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  preview: string;
}

const templates: Template[] = [
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
  },
  {
    id: "emergency-department",
    name: "Khoa cấp cứu",
    description: "Mẫu chuyên biệt cho khoa cấp cứu",
    category: "Cấp cứu",
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
  },
  {
    id: "pediatric-department",
    name: "Khoa nhi",
    description: "Mẫu thân thiện cho khoa nhi khoa",
    category: "Nhi khoa",
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
  },
];

interface TemplateSelectorProps {
  onSelectTemplate: (content: string) => void;
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Chọn mẫu có sẵn
        </h3>
        <p className="text-sm text-gray-600">
          Bắt đầu nhanh với các mẫu được thiết kế sẵn
        </p>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates
              .filter((template) => template.category === category)
              .map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {template.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {template.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {template.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-500 mb-3">
                      {template.preview}
                    </p>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Xem trước
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                          </DialogHeader>
                          <div className="prose prose-sm max-w-none">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: template.content,
                              }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() => onSelectTemplate(template.content)}
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
      ))}
    </div>
  );
}
