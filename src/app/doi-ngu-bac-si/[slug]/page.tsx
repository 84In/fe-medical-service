import { DoctorDetailPage } from "@/components/doctors/doctor-detail-page";

export default function DoctorDetail({ params }: { params: { slug: string } }) {
  return <DoctorDetailPage slug={params.slug} />;
}
