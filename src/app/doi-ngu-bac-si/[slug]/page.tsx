import { DoctorDetailPage } from "@/components/doctors/doctor-detail-page";
import { getDoctorByIdServer } from "@/services";
import { Doctor } from "@/types";

const extractIdFromSlug = (slug: string): number | null => {
  const parts = slug.split("-");
  const last = parts[parts.length - 1];
  const id = parseInt(last, 10);
  if (isNaN(id) || id <= 0) {
    console.warn("Invalid doctor ID from slug:", slug);
    return null;
  }
  return id;
};

const getDoctorBySlugServer = async (slug: string): Promise<Doctor | null> => {
  const id = extractIdFromSlug(slug);
  console.log("id", id);

  if (!id) return null;

  return await getDoctorByIdServer(id);
};

export default async function DoctorDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctorBySlugServer(slug);

  console.log("doctor", doctor);

  // Nếu bạn cần fetch data async ở đây thì để async
  return <DoctorDetailPage doctor={doctor} />;
}
