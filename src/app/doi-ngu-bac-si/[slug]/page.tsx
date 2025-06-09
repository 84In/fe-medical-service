import { DoctorDetailPage } from "@/components/doctors/doctor-detail-page";

type DoctorDetailProps = {
  params: {
    slug: string;
  };
};

export default async function DoctorDetail({ params }: DoctorDetailProps) {
  // Nếu bạn cần fetch data async ở đây thì để async
  return <DoctorDetailPage slug={params.slug} />;
}
