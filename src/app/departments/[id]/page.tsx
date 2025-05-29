import { DepartmentDetail } from "@/components/department-detail";
import { notFound } from "next/navigation";
import type { Department } from "@/types/doctor";

// Mock data - trong thực tế sẽ fetch từ API
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Tim mạch",
    contentHtml: `
      <h2>Khoa Tim mạch - Chăm sóc tim mạch chuyên nghiệp</h2>
      <p>Khoa Tim mạch của VitaCare Medical là một trong những khoa hàng đầu về điều trị các bệnh lý tim mạch tại Việt Nam. Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tim mạch tốt nhất.</p>
      
      <h3>Dịch vụ chuyên khoa</h3>
      <ul>
        <li><strong>Khám và tư vấn tim mạch:</strong> Đánh giá tổng quát sức khỏe tim mạch</li>
        <li><strong>Siêu âm tim:</strong> Chẩn đoán hình ảnh tim và van tim</li>
        <li><strong>Điện tâm đồ (ECG):</strong> Theo dõi nhịp tim và hoạt động điện của tim</li>
        <li><strong>Holter 24h:</strong> Theo dõi liên tục nhịp tim trong 24 giờ</li>
        <li><strong>Test gắng sức:</strong> Đánh giá khả năng hoạt động của tim</li>
      </ul>

      <img src="/placeholder.svg?height=300&width=600" alt="Phòng khám tim mạch hiện đại" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

      <h3>Đội ngũ chuyên gia</h3>
      <p>Khoa Tim mạch có đội ngũ gồm <strong>15 bác sĩ chuyên khoa</strong> với nhiều năm kinh nghiệm, trong đó có 3 giáo sư, 5 phó giáo sư và các bác sĩ được đào tạo tại các trường đại học y khoa hàng đầu.</p>

      <h3>Trang thiết bị hiện đại</h3>
      <ul>
        <li>Máy siêu âm tim 4D thế hệ mới</li>
        <li>Hệ thống điện tâm đồ 12 chuyển đạo</li>
        <li>Máy Holter 24h không dây</li>
        <li>Hệ thống cấp cứu tim mạch 24/7</li>
      </ul>

      <p><em>Để đặt lịch khám hoặc tư vấn, vui lòng liên hệ hotline: <strong>1900-1234</strong></em></p>
    `,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Nhi khoa",
    contentHtml: `
      <h2>Khoa Nhi - Chăm sóc sức khỏe trẻ em toàn diện</h2>
      <p>Khoa Nhi của VitaCare Medical chuyên cung cấp dịch vụ chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 16 tuổi. Với môi trường thân thiện, an toàn và đội ngũ y bác sĩ tận tâm, chúng tôi luôn đặt sức khỏe và sự thoải mái của các bé lên hàng đầu.</p>

      <img src="/placeholder.svg?height=250&width=500" alt="Phòng khám nhi khoa thân thiện" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

      <h3>Dịch vụ nhi khoa</h3>
      <ul>
        <li><strong>Khám sức khỏe định kỳ:</strong> Theo dõi phát triển của trẻ</li>
        <li><strong>Tiêm chủng:</strong> Đầy đủ các loại vaccine theo lịch</li>
        <li><strong>Điều trị bệnh lý nhi khoa:</strong> Cảm cúm, tiêu hóa, hô hấp</li>
        <li><strong>Tư vấn dinh dưỡng:</strong> Hướng dẫn chế độ ăn phù hợp</li>
        <li><strong>Cấp cứu nhi:</strong> Xử lý các tình huống khẩn cấp</li>
      </ul>

      <h3>Môi trường thân thiện</h3>
      <p>Phòng khám được thiết kế với màu sắc tươi sáng, đồ chơi giáo dục và không gian vui chơi giúp các bé cảm thấy thoải mái khi đến khám.</p>
    `,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cấp cứu",
    contentHtml: `
      <h2>Khoa Cấp cứu - Sẵn sàng 24/7</h2>
      <p>Khoa Cấp cứu của VitaCare Medical hoạt động 24/7, sẵn sàng tiếp nhận và xử lý các trường hợp cấp cứu, chấn thương và các tình huống y tế khẩn cấp.</p>

      <h3>Dịch vụ cấp cứu</h3>
      <ul>
        <li>Cấp cứu tim mạch</li>
        <li>Cấp cứu hô hấp</li>
        <li>Xử lý chấn thương</li>
        <li>Cấp cứu sản khoa</li>
        <li>Cấp cứu nhi khoa</li>
      </ul>

      <p><strong>Hotline cấp cứu: 115</strong></p>
    `,
    status: "ACTIVE",
  },
];

interface DepartmentPageProps {
  params: {
    id: string;
  };
}

export default function DepartmentPage({ params }: DepartmentPageProps) {
  const departmentId = Number.parseInt(params.id);
  const department = mockDepartments.find((d) => d.id === departmentId);

  if (!department) {
    notFound();
  }

  return <DepartmentDetail department={department} />;
}

export async function generateMetadata({ params }: DepartmentPageProps) {
  const departmentId = Number.parseInt(params.id);
  const department = mockDepartments.find((d) => d.id === departmentId);

  if (!department) {
    return {
      title: "Không tìm thấy chuyên khoa",
    };
  }

  return {
    title: `${department.name} - VitaCare Medical`,
    description: `Thông tin chi tiết về khoa ${department.name} tại VitaCare Medical. Dịch vụ chuyên nghiệp với đội ngũ bác sĩ giàu kinh nghiệm.`,
    keywords: `${department.name}, VitaCare Medical, bệnh viện, chuyên khoa, y tế`,
  };
}

// Generate static params for better performance
export async function generateStaticParams() {
  return mockDepartments.map((department) => ({
    id: department.id.toString(),
  }));
}
