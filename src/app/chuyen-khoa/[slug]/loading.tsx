import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="h-16 w-16 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="h-12 bg-white/20 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded-lg w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </CardContent>
            </Card>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 text-center">
                    <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
