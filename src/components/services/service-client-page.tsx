"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchServiceTypesWithSearch } from "@/services/metadata.service";
import { ServiceType } from "@/types";
import { toSlug } from "@/utils/slugify";
import { ChevronRight, Clock, Home, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ServiceListByType from "./services-by-type";
export function ServiceClientPage() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  useEffect(() => {
    fetchServiceTypesWithSearch("", "ACTIVE").then((data) =>
      setServiceTypes(data || [])
    );
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="text-gray-900 font-medium">Dịch vụ</span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800  overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center"></div>
        <div className="relative p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ y tế</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            VitaCare Medical cung cấp các dịch vụ y tế chất lượng cao với đội
            ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Phone className="h-4 w-4 mr-2" />
              Hotline: 1900-1234
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/20"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Tìm phòng khám
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for service types */}
      {/* Menu hiển thị tất cả các type service để chọn */}
      <Tabs defaultValue="all" className="mb-12 mx-auto py-4 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Danh mục dịch vụ</h2>
          <TabsList className="hidden md:flex">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            {serviceTypes.map((type) => (
              <TabsTrigger key={type.id} value={`type-${type.id}`}>
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* All services */}
        {/* Dùng để hiện thị type */}
        <TabsContent value="all">
          <div className="space-y-12">
            {serviceTypes.map((type) => (
              <div key={type.id}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                    {type.name}
                  </h3>
                  <Link href={`/dich-vu/loai/${toSlug(type.name)}-${type.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                {/* Tái sử dụng component hiển thị */}

                <ServiceListByType
                  service_type_id={type.id}
                  key={type.id}
                  limit={3}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Services by type */}
        {/* Cần tách thành 1 component riêng dùng để lấy service theo type để dễ phân trang */}
        {serviceTypes.map((type) => (
          <TabsContent key={type.id} value={`type-${type.id}`}>
            <div className="mb-6">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                {type.name}
              </h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
            <ServiceListByType
              service_type_id={type.id}
              key={type.id}
              limit={3}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Contact section */}
      <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-blue-800">
              Cần tư vấn về dịch vụ?
            </h2>
            <p className="text-gray-700">
              Đội ngũ tư vấn viên của VitaCare Medical luôn sẵn sàng hỗ trợ bạn
              24/7. Liên hệ ngay để được tư vấn chi tiết về các dịch vụ y tế.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-blue-700">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">1900-1234</span>
              </div>
              <div className="flex items-center text-blue-700">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
