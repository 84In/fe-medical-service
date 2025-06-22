import ClientServiceList from "@/components/services/service-type-client";
import { getserviceTypeByIdServer } from "@/services/service-types.service";
import type { ServiceType } from "@/types/services"; // 👈 mới thêm
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceType = await getServiceTypeBySlug(slug);

  if (!serviceType) {
    return {
      title: "Loại dịch vụ không tồn tại | VitaCare Medical",
      description: "Loại dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `Dịch vụ ${serviceType.name} | VitaCare Medical`,
    description: serviceType.description,
  };
}

const getServiceTypeBySlug = async (
  slug: string
): Promise<ServiceType | null> => {
  const parts = slug.split("-");
  const id = Number.parseInt(parts[parts.length - 1]);
  return await getserviceTypeByIdServer(id);
};

export default async function ServiceTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceType = await getServiceTypeBySlug(slug);

  if (!serviceType) notFound();

  return (
    <>
      <ClientServiceList serviceType={serviceType} />
    </>
  );
}
