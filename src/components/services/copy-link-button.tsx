"use client";

import { toast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyLinkButton() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "📋 Đã sao chép liên kết!",
        description: "Bạn có thể chia sẻ liên kết này ở bất kỳ đâu.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "❌ Không thể sao chép",
        description: "Trình duyệt không hỗ trợ hoặc xảy ra lỗi.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleCopyLink}
      variant="ghost"
      size="icon"
      className="ml-auto"
    >
      <Share2 className="h-5 w-5" />
    </Button>
  );
}
