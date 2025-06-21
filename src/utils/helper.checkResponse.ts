import { ApiResponse } from "@/types";

export function check<T>(res: ApiResponse<T>): T {
  if (res.code !== 0) {
    throw new Error(res.message || "Lỗi không xác định từ server");
  }
  return res.result;
}
