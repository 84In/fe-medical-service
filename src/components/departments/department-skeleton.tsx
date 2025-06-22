import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Zap, Home, ChevronRight } from "lucide-react";

export function ChuyenKhoaSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <ChevronRight className="h-4 w-4 mx-2" />
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Title Skeleton */}
            <div className="h-12 bg-blue-500 rounded-lg mb-6 max-w-4xl mx-auto animate-pulse"></div>

            {/* Description Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-6 bg-blue-400 rounded max-w-3xl mx-auto animate-pulse"></div>
              <div className="h-6 bg-blue-400 rounded max-w-2xl mx-auto animate-pulse"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-8 bg-blue-400 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-blue-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Skeleton */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <div className="h-12 bg-gray-200 rounded-md pl-10 animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Notice Skeleton */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-red-600" />
              <div className="space-y-2">
                <div className="h-5 bg-red-200 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-red-100 rounded w-64 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right space-y-1">
                <div className="h-8 bg-red-200 rounded w-12 animate-pulse"></div>
                <div className="h-3 bg-red-100 rounded w-20 animate-pulse"></div>
              </div>
              <div className="h-10 bg-red-100 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Departments Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-200 rounded-lg">
                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>

                {/* Button skeleton */}
                <div className="pt-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>

          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Contact Section Skeleton */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded max-w-md mx-auto mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded max-w-2xl mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded max-w-xl mx-auto animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-24 mx-auto mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-20 mx-auto mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
