import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChevronRight, Home } from "lucide-react";

export function ServiceTypeDetailSkeleton() {
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
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <ChevronRight className="h-4 w-4 mx-2" />
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center"></div>
        <div className="relative p-4 md:p-8 text-white">
          <div className="h-12 bg-blue-500 rounded-lg mb-4 max-w-lg animate-pulse"></div>
          <div className="space-y-3 mb-6">
            <div className="h-5 bg-blue-400 rounded w-3/4 animate-pulse"></div>
            <div className="h-5 bg-blue-400 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="w-40 h-10 bg-white/30 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Services List Skeleton */}
      <div className="mb-12 mx-auto py-4 px-4 md:px-6">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video w-full bg-gray-200"></div>
              <CardHeader className="pb-2">
                <div className="h-5 w-24 bg-blue-100 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 w-full bg-gray-300 rounded"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Service Types Skeleton */}
      <div className="mb-12">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-full animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
