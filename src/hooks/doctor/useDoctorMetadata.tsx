import { ToastAction } from "@/components/ui/toast";
import {
  fetchDepartments,
  fetchPositions,
  fetchSpecialties,
  fetchTitles,
} from "@/services/metadata.service";
import { Department, Position, Specialty, Title } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "../use-toast";

export function useDoctorMetadata() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeta = async () => {
    try {
      setLoading(true);
      const [depRes, posRes, titleRes, speRes] = await Promise.all([
        fetchDepartments(),
        fetchPositions(),
        fetchTitles(),
        fetchSpecialties(),
      ]);

      setDepartments(depRes || []);
      setPositions(posRes || []);
      setTitles(titleRes || []);
      setSpecialties(speRes || []);
    } catch (err: any) {
      toast({
        title: "Lỗi tải dữ liệu",
        description: "Không thể tải metadata",
        variant: "destructive",
        action: (
          <ToastAction altText="Thử lại" onClick={fetchMeta}>
            Thử lại
          </ToastAction>
        ),
      });

      console.error("Fetch metadata error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeta();
  }, []);

  return {
    departments,
    positions,
    titles,
    specialties,
    loading,
    refetch: fetchMeta,
  };
}
