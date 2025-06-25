import { ToastAction } from "@/components/ui/toast";
import { fetchServiceTypes } from "@/services/metadata.service";
import { ServiceType } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "../use-toast";

export function useServiceMetadata() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeta = async () => {
    try {
      setLoading(true);
      const [stRes] = await Promise.all([fetchServiceTypes()]);
      setServiceTypes(stRes || []);
    } catch (err: any) {
      // toast({
      //   title: "Lỗi tải dữ liệu",
      //   description: "Không thể tải metadata",
      //   variant: "destructive",
      //   action: (
      //     <ToastAction altText="Thử lại" onClick={fetchMeta}>
      //       Thử lại
      //     </ToastAction>
      //   ),
      // });

      console.error("Fetch metadata error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeta();
  }, []);

  return {
    serviceTypes,
    loading,
    refetch: fetchMeta,
  };
}
