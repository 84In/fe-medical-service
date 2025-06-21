import { ApiResponse } from "@/types";
import api from "@/utils/axios";

/**
 * Upload ảnh lên Cloudinary qua backend api `/api/upload/{folder}`
 * @param file Ảnh cần upload
 * @param folder Tên folder, ví dụ: "news", "service", hoặc "temp"
 * @returns URL ảnh đã upload
 */
export async function uploadImageToServer(
  file: File,
  folder: string
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post<ApiResponse<{ url: string }>>(
      `/upload/${folder}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { code, message, result } = res.data;

    if (code !== 0 || !result) {
      throw new Error(message || "Upload thất bại");
    }

    return result;
  } catch (err: any) {
    console.error("Upload error:", err);
    throw new Error(
      err?.response?.data?.message || "Lỗi không xác định khi upload ảnh"
    );
  }
}
