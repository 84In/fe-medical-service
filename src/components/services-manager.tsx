"use client";

import { useCallback, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Edit,
  Eye,
  MoreVertical,
  Building2,
  Users,
  Activity,
  Clock,
  Trash2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { TiptapEditor } from "./tiptap-editor";
import type { Service, ServiceType } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "./image-upload";

// Mock data
const serviceTypesMock: ServiceType[] = [
  {
    id: 1,
    name: "Khám tổng quát",
    description: "Dịch vụ khám sức khỏe tổng quát",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Tầm soát ung thư",
    description: "Dịch vụ tầm soát ung thư",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Chẩn đoán hình ảnh",
    description: "Dịch vụ chẩn đoán hình ảnh",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Xét nghiệm",
    description: "Dịch vụ xét nghiệm y tế",
    status: "ACTIVE",
  },
];

const mockServices: Service[] = [
  {
    id: 1,
    slug: "kham-suc-khoe-tong-quat",
    name: "Khám sức khỏe tổng quát",
    thumbnailUrl:
      "https://umcclinic.com.vn/Data/Sites/1/media/dich-vu/ca-nhan/kham-suc-khoe-tong-quat-va-tam-soat-ung-thu/h1.jpg",
    descriptionShort:
      "Gói khám sức khỏe tổng quát giúp phát hiện sớm các vấn đề sức khỏe.",
    contentHtml: `
      <h2>Khám sức khoẻ tổng quát</h2>
<p>
  Gói khám sức khỏe tổng quát tại <strong>Bệnh viện VitaCare</strong> được xây dựng nhằm giúp khách hàng đánh giá toàn diện tình trạng sức khỏe hiện tại, phát hiện sớm các nguy cơ tiềm ẩn và có hướng điều trị kịp thời. Gói dịch vụ bao gồm các xét nghiệm từ cơ bản đến chuyên sâu, phù hợp với nhu cầu của nhiều đối tượng khác nhau.
</p>
<p>
  <strong>Đối tượng phù hợp:</strong> Người từ 18 tuổi trở lên, người có tiền sử bệnh lý trong gia đình, hoặc làm việc trong môi trường áp lực, độc hại.<br/>
  <strong>Thời gian thực hiện:</strong> Khoảng 2–3 giờ, bao gồm khám tổng quát, thực hiện xét nghiệm, siêu âm và tư vấn kết quả.<br/>
  <strong>Chi phí:</strong> Dao động từ 1.500.000 VNĐ đến 3.000.000 VNĐ tuỳ theo gói dịch vụ.<br/>
  <strong>Địa điểm:</strong> Bệnh viện VitaCare – 123 Đường ABC, Quận 1, TP. Hồ Chí Minh.
</p>

<h3>Dịch vụ tổng quát bao gồm:</h3>
<ul>
  <li>Khám lâm sàng toàn diện</li>
  <li>Xét nghiệm máu và sinh hoá cơ bản</li>
  <li>Phân tích nước tiểu</li>
  <li>Siêu âm ổ bụng tổng quát</li>
  <li>Đo điện tâm đồ (ECG)</li>
</ul>

<img src="https://umcclinic.com.vn/Data/Sites/1/media/dich-vu/ca-nhan/kham-suc-khoe-tong-quat-va-tam-soat-ung-thu/h1.jpg" alt="Phòng khám tim mạch hiện đại" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

<h3>Đội ngũ chuyên gia</h3>
<p>
  Được dẫn dắt bởi các bác sĩ đầu ngành giàu kinh nghiệm trong lĩnh vực tầm soát và phát hiện sớm bệnh lý, đội ngũ chuyên gia tại VitaCare luôn tận tâm mang đến kết quả chính xác và lời khuyên y khoa kịp thời cho từng khách hàng.
</p>

<h3>Trang thiết bị hiện đại</h3>
<ul>
  <li>Máy siêu âm 4D độ phân giải cao</li>
  <li>Hệ thống xét nghiệm tự động</li>
  <li>Thiết bị đo điện tim, huyết áp và chỉ số sinh tồn tiên tiến</li>
</ul>

<p><em>Để được tư vấn hoặc đặt lịch khám, vui lòng liên hệ hotline: <strong>1900-1234</strong></em></p>

    `,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[0],
  },
  {
    id: 2,
    slug: "tam-soat-ung-thu",
    name: "Tầm soát ung thư",
    thumbnailUrl: "",
    descriptionShort:
      "Gói tầm soát ung thư giúp phát hiện sớm các dấu hiệu ung thư.",
    contentHtml: `<h2>Tầm soát ung thư</h2>
<p>
  Gói tầm soát ung thư tại <strong>Bệnh viện VitaCare</strong> được thiết kế nhằm phát hiện sớm các dấu hiệu bất thường có thể dẫn đến ung thư, từ đó giúp tăng hiệu quả điều trị và cải thiện tiên lượng bệnh. Gói dịch vụ được cá nhân hóa theo độ tuổi, giới tính và yếu tố nguy cơ của từng khách hàng.
</p>

<p>
  <strong>Đối tượng nên thực hiện:</strong> Người trên 30 tuổi, có tiền sử gia đình mắc ung thư, hút thuốc lá, uống rượu, tiếp xúc với hóa chất độc hại hoặc có dấu hiệu bất thường kéo dài không rõ nguyên nhân.<br/>
  <strong>Thời gian thực hiện:</strong> Khoảng 3–4 giờ, bao gồm khám lâm sàng, thực hiện các xét nghiệm chuyên sâu, chẩn đoán hình ảnh và tư vấn kết quả.<br/>
  <strong>Chi phí:</strong> Từ 2.500.000 VNĐ đến 6.000.000 VNĐ tùy theo gói và giới tính.<br/>
  <strong>Địa điểm:</strong> Bệnh viện VitaCare – 123 Đường ABC, Quận 1, TP. Hồ Chí Minh.
</p>

<h3>Các hạng mục tầm soát tiêu biểu:</h3>
<ul>
  <li>Xét nghiệm máu tầm soát ung thư (CEA, AFP, CA-125, CA 19-9,...)</li>
  <li>Nội soi dạ dày – đại tràng</li>
  <li>Siêu âm tuyến giáp, ổ bụng, vú (đối với nữ)</li>
  <li>Chụp X-quang, CT ngực, hoặc MRI (theo chỉ định)</li>
  <li>Tư vấn kết quả và hướng theo dõi, điều trị</li>
</ul>

<img src="https://umcclinic.com.vn/Data/Sites/1/media/dich-vu/ca-nhan/kham-suc-khoe-tong-quat-va-tam-soat-ung-thu/h1.jpg" alt="Máy chụp CT hiện đại tại Bệnh viện VitaCare" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />

<h3>Ưu điểm vượt trội</h3>
<ul>
  <li>Phát hiện sớm ung thư ngay cả khi chưa có triệu chứng</li>
  <li>Công nghệ chẩn đoán hình ảnh và xét nghiệm tiên tiến</li>
  <li>Đội ngũ bác sĩ chuyên môn cao trong lĩnh vực ung bướu</li>
  <li>Tư vấn cá nhân hóa theo hồ sơ sức khoẻ</li>
</ul>

<p><em>Liên hệ <strong>1900-1234</strong> để được tư vấn miễn phí và đặt lịch tầm soát kịp thời.</em></p>
`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[1],
  },
  {
    id: 3,
    slug: "sieu-am-tong-quat",
    name: "Siêu âm tổng quát",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    descriptionShort:
      "Dịch vụ siêu âm tổng quát với công nghệ hiện đại, chẩn đoán chính xác.",
    contentHtml: `<h2>Siêu âm tổng quát</h2>
<p>Dịch vụ siêu âm tổng quát tại VitaCare Medical sử dụng công nghệ siêu âm 4D hiện đại nhất, giúp chẩn đoán chính xác các bệnh lý về nội tạng.</p>

<h3>Các loại siêu âm</h3>
<ul>
  <li>Siêu âm ổ bụng tổng quát</li>
  <li>Siêu âm tim</li>
  <li>Siêu âm tuyến giáp</li>
  <li>Siêu âm vú</li>
  <li>Siêu âm thai</li>
</ul>

<p><em>Đặt lịch: <strong>1900-1234</strong></em></p>`,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serviceType: serviceTypesMock[2],
  },
];

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>("ALL");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    slug: "",
    thumbnailUrl: "",
    descriptionShort: "",
    contentHtml: "",
    status: "ACTIVE",
    serviceType: undefined,
  });

  // Filter Services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descriptionShort
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || service.status === statusFilter;
    const matchesServiceType =
      serviceTypeFilter === "ALL" ||
      service.serviceType.id.toString() === serviceTypeFilter;

    return matchesSearch && matchesStatus && matchesServiceType;
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Hoạt động";
      case "INACTIVE":
        return "Ngừng hoạt động";
      case "HIDDEN":
        return "Ẩn";
      case "DELETED":
        return "Đã xóa";
      default:
        return status;
    }
  };

  const addImage = useCallback(
    (url: string) => {
      setNewService((prev) => ({
        ...prev,
        thumbnailUrl: url,
      }));
    },
    [setNewService]
  );

  const editImage = useCallback(
    (url: string) => {
      if (!editingService) return;
      setEditingService({
        ...editingService,
        thumbnailUrl: url,
      });
    },
    [editingService]
  );

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleAddService = () => {
    if (!newService.name || !newService.contentHtml || !newService.serviceType)
      return;

    const service: Service = {
      id: Date.now(),
      slug: newService.slug || generateSlug(newService.name),
      name: newService.name,
      thumbnailUrl: newService.thumbnailUrl || "",
      descriptionShort:
        newService.descriptionShort ||
        stripHtml(newService.contentHtml).slice(0, 120),
      contentHtml: newService.contentHtml,
      status: (newService.status as Service["status"]) || "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      serviceType: newService.serviceType,
    };

    setServices([...services, service]);
    setNewService({
      name: "",
      slug: "",
      thumbnailUrl: "",
      descriptionShort: "",
      contentHtml: "",
      status: "ACTIVE",
      serviceType: undefined,
    });
    setIsAddDialogOpen(false);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    const updatedService = {
      ...editingService,
      updatedAt: new Date().toISOString(),
      descriptionShort:
        editingService.descriptionShort ||
        stripHtml(editingService.contentHtml).slice(0, 120),
    };

    setServices(
      services.map((service) =>
        service.id === editingService.id ? updatedService : service
      )
    );
    setEditingService(null);
  };

  const handleDeleteService = () => {
    if (!deletingService) return;

    setServices(
      services.map((service) =>
        service.id === deletingService.id
          ? { ...service, status: "DELETED" as const }
          : service
      )
    );
    setDeletingService(null);
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý dịch vụ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin dịch vụ y tế, thêm sửa xóa các dịch vụ trong hệ
            thống.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm dịch vụ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm dịch vụ mới</DialogTitle>
              <DialogDescription>
                Tạo dịch vụ mới với editor trực quan. Chọn mẫu có sẵn để bắt đầu
                nhanh!
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="content">Nội dung mô tả</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Tên dịch vụ *</Label>
                    <Input
                      id="name"
                      value={newService.name || ""}
                      onChange={(e) => {
                        const name = e.target.value;
                        setNewService({
                          ...newService,
                          name,
                          slug: generateSlug(name),
                        });
                      }}
                      placeholder="Ví dụ: Khám sức khỏe tổng quát, Tầm soát ung thư, v.v."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">Đường dẫn rút gọn *</Label>
                    <Input
                      id="slug"
                      value={newService.slug || ""}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          slug: e.target.value,
                        })
                      }
                      placeholder="Ví dụ: kham-suc-khoe-tong-quat, tam-soat-ung-thu, v.v."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="serviceType">Loại dịch vụ *</Label>
                    <Select
                      value={newService.serviceType?.id.toString()}
                      onValueChange={(value) => {
                        const serviceType = serviceTypesMock.find(
                          (st) => st.id.toString() === value
                        );
                        setNewService({ ...newService, serviceType });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại dịch vụ" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypesMock.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="descriptionShort">Mô tả ngắn</Label>
                    <Input
                      id="descriptionShort"
                      value={newService.descriptionShort || ""}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          descriptionShort: e.target.value,
                        })
                      }
                      placeholder="Mô tả ngắn gọn về dịch vụ (tối đa 120 ký tự)"
                      maxLength={120}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="thumbnail">Ảnh thu nhỏ</Label>
                    <ImageUpload onImageSelect={addImage} maxSize={5} />
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-xs text-blue-800">
                          <p className="font-medium mb-1">Hướng dẫn sử dụng:</p>
                          <ul className="space-y-1">
                            <li>
                              • <strong>Hình ảnh</strong> cần căn chỉnh kích
                              thước trước khi tải lên (hình ảnh tải lên sẽ giữ
                              nguyên kích thước)
                            </li>
                            <li>
                              • <strong>Ảnh thu nhỏ</strong> nên có kích thước
                              dưới 5MB
                            </li>
                            <li>
                              • <strong>Định dạng</strong> hỗ trợ: JPG, PNG, GIF
                              (không hỗ trợ ảnh động)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={newService.status}
                      onValueChange={(value) =>
                        setNewService({
                          ...newService,
                          status: value as Service["status"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                        <SelectItem value="INACTIVE">
                          Ngừng hoạt động
                        </SelectItem>
                        <SelectItem value="HIDDEN">Ẩn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="content" className="space-y-4">
                <TiptapEditor
                  value={newService.contentHtml || ""}
                  onChange={(content) =>
                    setNewService({ ...newService, contentHtml: content })
                  }
                  height={400}
                  placeholder="Bắt đầu viết mô tả về dịch vụ..."
                  templateCategories={["Dịch vụ"]}
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                onClick={handleAddService}
                disabled={
                  !newService.name ||
                  !newService.contentHtml ||
                  !newService.serviceType
                }
              >
                Thêm dịch vụ
              </Button>
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
                  placeholder="Tìm kiếm theo tên dịch vụ, mô tả hoặc slug..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={serviceTypeFilter}
              onValueChange={setServiceTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Lọc theo loại dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả loại dịch vụ</SelectItem>
                {serviceTypesMock.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng dịch vụ
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.filter((d) => d.status === "ACTIVE").length}
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
                  {services.filter((d) => d.status === "INACTIVE").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ẩn</p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.filter((d) => d.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách dịch vụ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ảnh</TableHead>
                  <TableHead>Tên dịch vụ</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Loại dịch vụ</TableHead>
                  <TableHead>Mô tả ngắn</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Cập nhật</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      {service.thumbnailUrl ? (
                        <img
                          src={service.thumbnailUrl || "/placeholder.svg"}
                          alt={service.name}
                          className="w-16 h-12 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded border flex items-center justify-center">
                          <FileText className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="truncate" title={service.name}>
                        {service.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-[150px]">
                      <div className="truncate font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {service.slug}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {service.serviceType.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {service.descriptionShort ||
                          stripHtml(service.contentHtml).slice(0, 100)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusText(service.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {formatDate(service.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setViewingService(service)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(`/services/${service.slug}`, "_blank")
                            }
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Xem trang công khai
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditService(service)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingService(service)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* No results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy dịch vụ
              </h3>
              <p className="text-gray-600">
                Không có dịch vụ nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      {viewingService && (
        <Dialog
          open={!!viewingService}
          onOpenChange={() => setViewingService(null)}
        >
          <DialogContent className="w-full max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {viewingService.name}
              </DialogTitle>
              <DialogDescription>Chi tiết thông tin dịch vụ</DialogDescription>
            </DialogHeader>
            <ScrollArea className="rounded-md max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Slug
                    </Label>
                    <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                      {viewingService.slug}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Loại dịch vụ
                    </Label>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingService.serviceType.name}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Trạng thái
                  </Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(viewingService.status)}>
                      {getStatusText(viewingService.status)}
                    </Badge>
                  </div>
                </div>
                {viewingService.descriptionShort && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Mô tả ngắn
                    </Label>
                    <p className="mt-1 text-sm text-gray-900">
                      {viewingService.descriptionShort}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Mô tả chi tiết
                  </Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg prose prose-sm max-w-none overflow-x-auto">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: viewingService.contentHtml,
                      }}
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editingService && (
        <Dialog
          open={!!editingService}
          onOpenChange={() => setEditingService(null)}
        >
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
              <DialogDescription>Cập nhật thông tin dịch vụ</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="content">Nội dung mô tả</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Tên dịch vụ</Label>
                    <Input
                      id="edit-name"
                      value={editingService.name}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-slug">Đường dẫn rút gọn</Label>
                    <Input
                      id="edit-slug"
                      value={editingService.slug}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          slug: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-serviceType">Loại dịch vụ</Label>
                    <Select
                      value={editingService.serviceType.id.toString()}
                      onValueChange={(value) => {
                        const serviceType = serviceTypesMock.find(
                          (st) => st.id.toString() === value
                        );
                        if (serviceType) {
                          setEditingService({ ...editingService, serviceType });
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypesMock.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-descriptionShort">Mô tả ngắn</Label>
                    <Input
                      id="edit-descriptionShort"
                      value={editingService.descriptionShort}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          descriptionShort: e.target.value,
                        })
                      }
                      placeholder="Mô tả ngắn gọn về dịch vụ (tối đa 120 ký tự)"
                      maxLength={120}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-thumbnail">Ảnh thu nhỏ</Label>
                    <ImageUpload
                      onImageSelect={editImage}
                      initialImage={editingService.thumbnailUrl}
                      maxSize={5}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Trạng thái</Label>
                    <Select
                      value={editingService.status}
                      onValueChange={(value) =>
                        setEditingService({
                          ...editingService,
                          status: value as Service["status"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                        <SelectItem value="INACTIVE">
                          Ngừng hoạt động
                        </SelectItem>
                        <SelectItem value="HIDDEN">Ẩn</SelectItem>
                        <SelectItem value="DELETED">Đã xóa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="content" className="space-y-4">
                <TiptapEditor
                  value={editingService.contentHtml}
                  onChange={(content) =>
                    setEditingService({
                      ...editingService,
                      contentHtml: content,
                    })
                  }
                  height={400}
                  placeholder="Chỉnh sửa mô tả dịch vụ..."
                  templateCategories={["Dịch vụ"]}
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button onClick={handleUpdateService}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingService}
        onOpenChange={() => setDeletingService(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa dịch vụ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa dịch vụ "{deletingService?.name}
              "? Hành động này sẽ đánh dấu dịch vụ là đã xóa và không thể hoàn
              tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
