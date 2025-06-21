"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImageToServer } from "@/services";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  maxSize?: number; // MB
  accept?: string;
  className?: string;
  folder?: string; // Not used in this component, but can be added for future use
  initialImage?: string;
}

export function ImageUpload({
  onImageSelect,
  maxSize = 5,
  accept = "image/*",
  initialImage,
  folder,
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setPreview(initialImage || null);
  }, [initialImage]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Kích thước file không được vượt quá ${maxSize}MB`);
      return;
    }

    console.log("File selected:", file.name, file.type, file.size); // Debug log
    setUploading(true);

    try {
      if (!folder) {
        throw new Error("Thiếu folder upload");
      }

      const { url } = await uploadImageToServer(file, folder);

      console.log("Uploaded image URL:", url); // Debug log
      setPreview(url);
      onImageSelect(url);
      toast({
        title: "Tải ảnh thành công",
        description: "Ảnh đã được tải lên thành công.",
        variant: "success",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Lỗi tải ảnh",
        description: error.message || "Đã xảy ra lỗi khi tải ảnh lên.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {!preview ? (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer",
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          )}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-600">Đang tải ảnh...</p>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-400 mb-4" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Kéo thả ảnh vào đây hoặc click để chọn
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF tối đa {maxSize}MB
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="relative w-full h-40">
          <img
            src={
              preview.replace("/upload/", "/upload/w_200,h_200,c_thumb/") ||
              "/placeholder.svg"
            }
            alt="Preview"
            className="w-1/3 h-full object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
