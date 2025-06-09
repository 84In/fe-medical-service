import { DoctorDetailPage } from "@/components/doctors/doctor-detail-page";

export default async function DoctorDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Nếu bạn cần fetch data async ở đây thì để async
  return <DoctorDetailPage slug={(await params).slug} />;
}
