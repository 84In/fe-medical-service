"use client";
import { Card, CardContent } from "@/components/ui/card";
import { fetchServiceTypes } from "@/services/service-types.service";
import { toSlug } from "@/utils/slugify";
import { Avatar } from "@radix-ui/react-avatar";
import { Stethoscope } from "lucide-react";
import Link from "next/link";
import { AvatarFallback } from "../ui/avatar";
import { useEffect, useState } from "react";
import { ServiceType } from "@/types";

export function MedicalServices() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const fetchLimitServiceTypes = async () => {
    try {
      const data = await fetchServiceTypes(0, 6, "", "ACTIVE");
      setServices(data.items || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách dịch vụ:", error as Error);
    }
  };
  useEffect(() => {
    fetchLimitServiceTypes();
  }, []);
  return (
    <div className="h-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Stethoscope className="h-6 w-6 text-blue-600 mr-3" />
          Dịch vụ y tế
        </h3>
        <p className="text-gray-600">
          Các dịch vụ chăm sóc sức khỏe chuyên nghiệp
        </p>
      </div>

      <div className="space-y-4 mb-6 flex flex-col gap-2">
        {services.length > 0 &&
          services.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/dich-vu/loai/${toSlug(`${item.name} ${item.id}`)}`}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                          {item.name
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .trim()
                            .split(" ")
                            .filter(Boolean)
                            .map((n) => n[0]?.toUpperCase())
                            .slice(0, 3)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}

        {/* <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Chuyên khoa tim mạch
                </h4>
                <p className="text-gray-600 text-sm">
                  Điều trị các bệnh lý về tim và mạch máu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Nhi khoa</h4>
                <p className="text-gray-600 text-sm">
                  Chăm sóc sức khỏe trẻ em từ sơ sinh đến 16 tuổi
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Cấp cứu 24/7
                </h4>
                <p className="text-gray-600 text-sm">
                  Dịch vụ cấp cứu và chăm sóc khẩn cấp
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      <Link href={"/dich-vu"} passHref>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
          Xem tất cả dịch vụ
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
