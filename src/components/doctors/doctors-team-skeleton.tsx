import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export function DoctorsTeamSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              href="/"
              className="flex items-center justify-center hover:text-blue-600"
            >
              <Home className="h-4 w-4 mr-1" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">Đội ngũ bác sĩ</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Đội Ngũ Bác Sĩ Chuyên Nghiệp
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Đội ngũ y bác sĩ giàu kinh nghiệm, tận tâm chăm sóc sức khỏe của
              bạn
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 bg-blue-500/30" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24 bg-blue-500/30" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 bg-blue-500/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <Skeleton className="h-12 w-full md:w-[250px] rounded-lg" />
              </div>
            </div>

            {/* Department Filter Pills Skeleton */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-26 rounded-full" />
              <Skeleton className="h-8 w-22 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid Skeleton */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Skeleton className="h-9 w-64" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-6 w-96" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <Card
                key={index}
                className="border-0 bg-white rounded-2xl overflow-hidden h-full animate-pulse"
              >
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full bg-gray-300 border-4 border-white shadow-lg" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Skeleton className="h-6 w-48 mx-auto mb-2" />
                    <Skeleton className="h-5 w-32 mx-auto mb-2" />
                    <div className="flex items-center justify-center gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>

            <Skeleton className="h-4 w-48" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl mx-6 my-16 shadow-xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white py-20">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Cần tư vấn y tế?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Đội ngũ bác sĩ chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn
            24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 font-semibold text-lg shadow-md"
            >
              Gọi ngay: 1900-1234
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
