import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Building2,
  Activity,
  Clock,
  Users,
  MoreHorizontal,
} from "lucide-react";

export function NewsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </div>
        <Button disabled className="bg-gray-200">
          <Plus className="h-4 w-4 mr-2" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </Button>
      </div>

      {/* Filters Skeleton */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  disabled
                  placeholder="Tìm kiếm tin tức..."
                  className="pl-10 bg-gray-100"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select disabled>
                <SelectTrigger className="w-48 bg-gray-100">
                  <FileText className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo loại" />
                </SelectTrigger>
              </Select>
              <Select disabled>
                <SelectTrigger className="w-48 bg-gray-100">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-gray-400" />
              <div className="ml-4">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-gray-400" />
              <div className="ml-4">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-gray-400" />
              <div className="ml-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-gray-400" />
              <div className="ml-4">
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
          </CardTitle>
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
              {Array.from({ length: 5 }, (_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="w-16 h-12 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="max-w-[250px]">
                    <div className="space-y-2">
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
