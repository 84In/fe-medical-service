import { ToastAction } from "@/components/ui/toast";
import { fetchNewsTypes } from "@/services/metadata.service";
import { NewsType } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "../use-toast";

export function useNewsMetadata() {
  const [newsTypes, setNewsTypes] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeta = async () => {
    try {
      setLoading(true);
      const [ntRes] = await Promise.all([fetchNewsTypes()]);
      setNewsTypes(ntRes || []);
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
    newsTypes,
    loading,
    refetch: fetchMeta,
  };
}
