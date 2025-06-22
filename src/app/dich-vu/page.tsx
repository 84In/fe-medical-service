import { ServiceClientPage } from "@/components/services/service-client-page";
import type { Service, ServiceType } from "@/types/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dịch vụ y tế | VitaCare Medical",
  description: "Các dịch vụ y tế chất lượng cao tại VitaCare Medical",
};

export default function ServicesPage() {
  return <ServiceClientPage />;
}
