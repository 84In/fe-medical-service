"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/services/services.service";
import type { Service } from "@/types/services";
import { ServiceCard } from "./service-card";

export default function ServiceListByType({
  service_type_id,
  limit = 3,
}: {
  service_type_id: number;
  limit?: number;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices(0, limit, "", "ACTIVE", service_type_id)
      .then((data) => setServices(data.items || []))
      .finally(() => setLoading(false));
  }, [service_type_id, limit]);

  if (loading) {
    return <div className="text-gray-400">Đang tải dịch vụ...</div>;
  }

  // 👉 Không có dịch vụ thì không hiển thị gì cả
  if (services.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
