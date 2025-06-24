"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  FileText,
  ExternalLink,
  Activity,
  Building2,
  Clock,
  Users,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { TiptapEditor } from "../tiptap-editor";
import { ImageUpload } from "../../image-upload";
import type { News, NewsType } from "@/types";
import { useNewsMetadata } from "@/hooks/news/use-news-metadata";
import { generateSlug } from "@/utils/slugify";
import { getStatusColor, getStatusText } from "@/utils/status-css";
import { addNews, getNews, updateNews } from "@/services/news.service";
import { NewsSkeleton } from "./news-skeleton";
import { NewsError } from "./news-error";
import { formatDate } from "@/utils/format-utils";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockNewsTypes: NewsType[] = [
  { id: 1, name: "Tin tức y khoa", status: "ACTIVE" },
  { id: 2, name: "Thông báo", status: "ACTIVE" },
  { id: 3, name: "Sự kiện", status: "ACTIVE" },
  { id: 4, name: "Khuyến mãi", status: "ACTIVE" },
];

const mockNews: News[] = [
  {
    id: 1,
    slug: "hanh-trinh-7-nam-tan-tam-trao-suc-khoe-vang",
    name: "Hành trình 7 năm tận tâm trao sức khỏe vàng",
    thumbnailUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cnsSYC5O9sbipR6j5DQJLLA3GygJsA.png",
    descriptionShort:
      "VitaCare Medical kỷ niệm 7 năm thành lập với những thành tựu đáng tự hào trong việc chăm sóc sức khỏe cộng đồng.",
    contentHtml: `<h2>Hành trình 7 năm phát triển</h2>
<p>Từ những ngày đầu thành lập, VitaCare Medical đã không ngừng nỗ lực để trở thành một trong những hệ thống y tế hàng đầu tại Việt Nam.</p>
<h3>Những thành tựu nổi bật</h3>
<ul>
<li>Phục vụ hơn 500.000 lượt khách hàng</li>
<li>Đội ngũ 200+ bác sĩ chuyên khoa</li>
<li>Hệ thống 15 phòng khám trên toàn quốc</li>
</ul>`,
    status: "ACTIVE",
    newsType: mockNewsTypes[2],
    createdAt: "2025-03-05T10:00:00Z",
    updatedAt: "2025-03-05T10:00:00Z",
  },
  {
    id: 2,
    slug: "dich-vu-kham-suc-khoe-tong-quat-moi",
    name: "Ra mắt dịch vụ khám sức khỏe tổng quát mới",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    descriptionShort:
      "Gói khám sức khỏe tổng quát với công nghệ hiện đại và chi phí hợp lý.",
    contentHtml: `<h2>Dịch vụ khám sức khỏe tổng quát</h2>
<p>VitaCare Medical giới thiệu gói khám sức khỏe tổng quát mới với nhiều ưu đãi hấp dẫn.</p>`,
    status: "ACTIVE",
    newsType: mockNewsTypes[0],
    createdAt: "2025-03-04T09:00:00Z",
    updatedAt: "2025-03-04T09:00:00Z",
  },
  {
    id: 3,
    slug: "thong-bao-lich-nghi-tet-2025",
    name: "Thông báo lịch nghỉ Tết Nguyên đán 2025",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    descriptionShort:
      "Thông báo lịch nghỉ và lịch trực cấp cứu trong dịp Tết Nguyên đán 2025.",
    contentHtml: `<h2>Lịch nghỉ Tết 2025</h2>
<p>VitaCare Medical thông báo lịch nghỉ và trực cấp cứu trong dịp Tết Nguyên đán.</p>`,
    status: "ACTIVE",
    newsType: mockNewsTypes[1],
    createdAt: "2025-03-03T08:00:00Z",
    updatedAt: "2025-03-03T08:00:00Z",
  },
];

export function NewsManagement() {
  const [news, setNews] = useState<News[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [totalPages, setTotalPages] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { newsTypes, loading: newsTypeLoading, refetch } = useNewsMetadata();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    thumbnailUrl: "",
    descriptionShort: "",
    contentHtml: "",
    status: "ACTIVE" as News["status"],
    newsTypeId: "",
  });

  const fetchNews = async () => {
    try {
      const data = await getNews(
        currentPage - 1,
        itemsPerPage,
        searchTerm,
        statusFilter,
        typeFilter !== "ALL" ? +typeFilter : undefined
      );
      console.log("Fetched News:", data);

      setNews(data.items || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Lỗi khi tải danh sách tin tức:", error);
      setError(
        error instanceof Error
          ? error
          : new Error("Đã xảy ra lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  // Simulate API call
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchNews();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, itemsPerPage, searchTerm, statusFilter, typeFilter]);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    fetchNews();
  };

  const handleCreate = async () => {
    const selectedNewsType = newsTypes.find(
      (nt) => nt.id.toString() === formData.newsTypeId
    );
    if (!selectedNewsType) return;

    try {
      const { code, message, result } = await addNews(formData);
      if (code === 0) {
        toast({
          title: "Thành công!",
          description: "Thêm tin tức thành công!",
          variant: "success",
        });
        setNews((prev) => [...prev, result]);
      } else {
        throw new Error(message || "Thêmtin tức thất bại");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      let message = "Thêm tin tức thất bại!";

      setError(
        error instanceof Error
          ? error
          : new Error("Đã xảy ra lỗi không xác định")
      );
      toast({
        title: "Thất bại!",
        description: message,
        variant: "destructive",
      });
    }
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = async () => {
    if (!selectedNews) return;
    const selectedNewsType = newsTypes.find(
      (nt) => nt.id.toString() === formData.newsTypeId
    );
    if (!selectedNewsType) return;

    try {
      const { code, message, result } = await updateNews(
        selectedNewsType.id,
        formData
      );

      if (code === 0) {
        setNews((prev) =>
          prev.map((nt) => (nt.id === result.id ? result : nt))
        );
        toast({
          title: "Thành công!",
          description: " Cập nhật tin tức thành công!",
          variant: "success",
        });
      } else {
        throw new Error(message || "Cập nhật tin tức thất bại");
      }
    } catch (error) {
      console.error("Lỗi cập nhật loại tin tức:", error);
      toast({
        title: "Thất bại!",
        description:
          error instanceof Error ? error.message : "Cập nhật thất bại!",
        variant: "destructive",
      });
    } finally {
      setSelectedNews(null);
      setIsEditDialogOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { code, message, result } = await updateNews(id, {
        status: "DELETED",
      });

      if (code === 0) {
        setNews((prev) =>
          prev.map((nt) => (nt.id === result.id ? result : nt))
        );
        toast({
          title: "Thành công!",
          description: "Tin tức đã được chuyển sang trạng thái đã xoá.",
          variant: "success",
        });
      } else {
        throw new Error(message || "Xoá tin tức thất bại");
      }
    } catch (error) {
      console.error("Lỗi xoá tin tức:", error);
      toast({
        title: "Thất bại!",
        description:
          error instanceof Error ? error.message : "Cập nhật thất bại!",
        variant: "destructive",
      });
    } finally {
      setSelectedNews(null);
      setIsEditDialogOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      thumbnailUrl: "",
      descriptionShort: "",
      contentHtml: "",
      status: "ACTIVE",
      newsTypeId: "",
    });
    setSelectedNews(null);
  };

  const openEditDialog = (newsItem: News) => {
    setSelectedNews(newsItem);
    setFormData({
      name: newsItem.name,
      slug: newsItem.slug,
      thumbnailUrl: newsItem.thumbnailUrl,
      descriptionShort: newsItem.descriptionShort,
      contentHtml: newsItem.contentHtml,
      status: newsItem.status,
      newsTypeId: newsItem.newsType.id.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsViewDialogOpen(true);
  };

  if (loading) return <NewsSkeleton />;
  // Show error if there's an error
  if (error) {
    const errorType = error.message.includes("network") ? "network" : "general";
    return <NewsError type={errorType} error={error} onRetry={handleRetry} />;
  }

  if (news.length === 0) {
    return (
      <>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm tin tức mới</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="content">Nội dung</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tiêu đề tin tức *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setFormData({
                          ...formData,
                          name,
                          slug: generateSlug(name),
                        });
                      }}
                      placeholder="Nhập tiêu đề tin tức"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="duong-dan-url"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="newsType">Loại tin tức *</Label>
                  <Select
                    value={formData.newsTypeId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, newsTypeId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại tin tức" />
                    </SelectTrigger>
                    <SelectContent>
                      {newsTypes
                        .filter((nt) => nt.status === "ACTIVE")
                        .map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="descriptionShort">Mô tả ngắn *</Label>
                  <Textarea
                    id="descriptionShort"
                    value={formData.descriptionShort}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionShort: e.target.value,
                      })
                    }
                    placeholder="Nhập mô tả ngắn cho tin tức"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Ảnh thumbnail</Label>
                  <div className="mt-2">
                    <ImageUpload
                      onImageSelect={(url) =>
                        setFormData({ ...formData, thumbnailUrl: url })
                      }
                      folder="news"
                      initialImage={formData.thumbnailUrl}
                      maxSize={5}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label>Nội dung chi tiết</Label>
                  <div className="mt-2">
                    <TiptapEditor
                      value={formData.contentHtml}
                      onChange={(content) =>
                        setFormData({ ...formData, contentHtml: content })
                      }
                      height={500}
                      placeholder="Nhập nội dung chi tiết của tin tức..."
                      templateCategories={["Tin tức"]}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: News["status"]) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                      <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                      <SelectItem value="HIDDEN">Ẩn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Hướng dẫn SEO
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Tiêu đề nên từ 50-60 ký tự</li>
                    <li>• Mô tả ngắn nên từ 150-160 ký tự</li>
                    <li>• Slug nên ngắn gọn và có từ khóa</li>
                    <li>• Ảnh thumbnail kích thước khuyến nghị: 1200x630px</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleCreate}
                disabled={
                  !formData.name.trim() ||
                  !formData.descriptionShort.trim() ||
                  !formData.newsTypeId
                }
              >
                Tạo tin tức
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <NewsError
          type="not-found"
          creatNew={() => setIsCreateDialogOpen(true)}
          onRetry={handleRetry}
        />
      </>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý tin tức</h1>
          <p className="text-gray-600">
            Quản lý tin tức, thông báo và bài viết của hệ thống
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => resetForm()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm tin tức
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm tin tức mới</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="content">Nội dung</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tiêu đề tin tức *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setFormData({
                          ...formData,
                          name,
                          slug: generateSlug(name),
                        });
                      }}
                      placeholder="Nhập tiêu đề tin tức"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="duong-dan-url"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="newsType">Loại tin tức *</Label>
                  <Select
                    value={formData.newsTypeId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, newsTypeId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại tin tức" />
                    </SelectTrigger>
                    <SelectContent>
                      {newsTypes
                        .filter((nt) => nt.status === "ACTIVE")
                        .map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="descriptionShort">Mô tả ngắn *</Label>
                  <Textarea
                    id="descriptionShort"
                    value={formData.descriptionShort}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionShort: e.target.value,
                      })
                    }
                    placeholder="Nhập mô tả ngắn cho tin tức"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Ảnh thumbnail</Label>
                  <div className="mt-2">
                    <ImageUpload
                      onImageSelect={(url) =>
                        setFormData({ ...formData, thumbnailUrl: url })
                      }
                      folder="news"
                      initialImage={formData.thumbnailUrl}
                      maxSize={5}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label>Nội dung chi tiết</Label>
                  <div className="mt-2">
                    <TiptapEditor
                      value={formData.contentHtml}
                      onChange={(content) =>
                        setFormData({ ...formData, contentHtml: content })
                      }
                      height={500}
                      placeholder="Nhập nội dung chi tiết của tin tức..."
                      templateCategories={["Tin tức"]}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: News["status"]) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                      <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                      <SelectItem value="HIDDEN">Ẩn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Hướng dẫn SEO
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Tiêu đề nên từ 50-60 ký tự</li>
                    <li>• Mô tả ngắn nên từ 150-160 ký tự</li>
                    <li>• Slug nên ngắn gọn và có từ khóa</li>
                    <li>• Ảnh thumbnail kích thước khuyến nghị: 1200x630px</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleCreate}
                disabled={
                  !formData.name.trim() ||
                  !formData.descriptionShort.trim() ||
                  !formData.newsTypeId
                }
              >
                Tạo tin tức
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm tin tức..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <FileText className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả loại</SelectItem>
                  {newsTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                  <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                  <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                  <SelectItem value="HIDDEN">Ẩn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng tin tức
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {news.length}
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
                  {news.filter((d) => d.status === "ACTIVE").length}
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
                  {news.filter((d) => d.status === "INACTIVE").length}
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
                  {news.filter((d) => d.status === "HIDDEN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tin tức ({news.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Hình ảnh</TableHead>
                <TableHead>Tin tức</TableHead>
                <TableHead>Đường dẫn</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((newsItem) => (
                <TableRow key={newsItem.id}>
                  <TableCell>
                    <img
                      src={newsItem.thumbnailUrl || "/placeholder.svg"}
                      alt={newsItem.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-[250px]">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {newsItem.name}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {newsItem.descriptionShort}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-[150px]">
                    <div className="truncate font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {newsItem.slug}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{newsItem.newsType.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(newsItem.status)}>
                      {getStatusText(newsItem.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(newsItem.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openViewDialog(newsItem)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(`/tin-tuc/${newsItem.slug}`, "_blank")
                          }
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Xem trang công khai
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditDialog(newsItem)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(newsItem.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {news.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">Không tìm thấy tin tức nào</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number.parseInt(value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">mục mỗi trang</span>
          </div>

          <div className="text-sm text-gray-600">
            Hiển thị {currentPage * itemsPerPage - itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, news.length)} trong tổng số{" "}
            {totalItems} loại tin tức
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Trước
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => paginate(pageNumber)}
                  className="w-8 h-8 p-0"
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tin tức</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="content">Nội dung</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Tiêu đề tin tức *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Nhập tiêu đề tin tức"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-slug">Slug</Label>
                  <Input
                    id="edit-slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="duong-dan-url"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-newsType">Loại tin tức *</Label>
                <Select
                  value={formData.newsTypeId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, newsTypeId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại tin tức" />
                  </SelectTrigger>
                  <SelectContent>
                    {newsTypes
                      .filter((nt) => nt.status === "ACTIVE")
                      .map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-descriptionShort">Mô tả ngắn *</Label>
                <Textarea
                  id="edit-descriptionShort"
                  value={formData.descriptionShort}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      descriptionShort: e.target.value,
                    })
                  }
                  placeholder="Nhập mô tả ngắn cho tin tức"
                  rows={3}
                />
              </div>

              <div>
                <Label>Ảnh thumbnail</Label>
                <div className="mt-2">
                  <ImageUpload
                    onImageSelect={(url) =>
                      setFormData({ ...formData, thumbnailUrl: url })
                    }
                    folder="news"
                    initialImage={formData.thumbnailUrl}
                    maxSize={5}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label>Nội dung chi tiết</Label>
                <div className="mt-2">
                  <TiptapEditor
                    value={formData.contentHtml}
                    onChange={(content) =>
                      setFormData({ ...formData, contentHtml: content })
                    }
                    height={500}
                    placeholder="Nhập nội dung chi tiết của tin tức..."
                    templateCategories={["Tin tức"]}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div>
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: News["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                    <SelectItem value="HIDDEN">Ẩn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={handleEdit}
              disabled={
                !formData.name.trim() ||
                !formData.descriptionShort.trim() ||
                !formData.newsTypeId
              }
            >
              Cập nhật
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Chi tiết tin tức
            </DialogTitle>
          </DialogHeader>
          {selectedNews && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Tiêu đề
                  </Label>
                  <div className="mt-1 text-sm">{selectedNews.name}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Slug
                  </Label>
                  <div className="mt-1 text-sm font-mono">
                    /{selectedNews.slug}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Loại tin tức
                  </Label>
                  <div className="mt-1">
                    <Badge variant="outline">
                      {selectedNews.newsType.name}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(formData.status)}>
                      {getStatusText(formData.status)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Ngày tạo
                  </Label>
                  <div className="mt-1 text-sm">
                    {formatDate(selectedNews.createdAt)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Ngày cập nhật
                  </Label>
                  <div className="mt-1 text-sm">
                    {formatDate(selectedNews.updatedAt)}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Mô tả ngắn
                </Label>
                <div className="mt-1 text-sm">
                  {selectedNews.descriptionShort}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Ảnh thumbnail
                </Label>
                <div className="mt-2">
                  <img
                    src={selectedNews.thumbnailUrl || "/placeholder.svg"}
                    alt={selectedNews.name}
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Nội dung chi tiết
                </Label>
                <div className="mt-2 prose prose-sm max-w-none border rounded-lg p-4 bg-gray-50">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedNews.contentHtml,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
