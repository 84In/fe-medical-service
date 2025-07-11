import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Activity,
  Clock,
  Users,
  Search,
  Plus,
  FileText,
} from "lucide-react";

export function ServicesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="h-9 bg-gray-200 rounded-lg w-48 animate-pulse mb-2" />
          <div className="h-5 bg-gray-200 rounded w-96 animate-pulse" />
        </div>
        <div className="flex items-center gap-2 bg-blue-100 rounded-lg px-4 py-2 animate-pulse">
          <Plus className="h-4 w-4 text-blue-400" />
          <div className="h-4 bg-blue-200 rounded w-24" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
                <div className="h-10 bg-gray-100 rounded-md pl-10 animate-pulse" />
              </div>
            </div>
            <div className="w-full sm:w-[180px]">
              <div className="h-10 bg-gray-100 rounded-md animate-pulse" />
            </div>
            <div className="w-full sm:w-[180px]">
              <div className="h-10 bg-gray-100 rounded-md animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-300" />
              <div className="ml-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-2" />
                <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-300" />
              <div className="ml-4">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mb-2" />
                <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-300" />
              <div className="ml-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-2" />
                <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-300" />
              <div className="ml-4">
                <div className="h-4 bg-gray-200 rounded w-8 animate-pulse mb-2" />
                <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-8 gap-4 pb-4 border-b">
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse ml-auto" />
              </div>

              {/* Table Rows */}
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-8 gap-4 py-4 border-b border-gray-100"
                >
                  {/* Image */}
                  <div className="w-16 h-12 bg-gray-200 rounded animate-pulse flex items-center justify-center">
                    <FileText className="h-4 w-4 text-gray-300" />
                  </div>
                  {/* Name */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  </div>
                  {/* Slug */}
                  <div>
                    <div className="h-6 bg-gray-100 rounded w-20 animate-pulse" />
                  </div>
                  {/* Service Type */}
                  <div>
                    <div className="h-6 bg-blue-100 rounded-full w-16 animate-pulse" />
                  </div>
                  {/* Description */}
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                  </div>
                  {/* Status */}
                  <div>
                    <div className="h-6 bg-green-100 rounded-full w-16 animate-pulse" />
                  </div>
                  {/* Updated */}
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                  </div>
                  {/* Actions */}
                  <div className="flex justify-end">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
              <div className="h-10 w-20 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
            </div>

            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />

            <div className="flex items-center gap-2">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 bg-gray-100 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
