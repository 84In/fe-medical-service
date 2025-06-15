import api from "@/utils/axios";
import { Doctor } from "@/types/doctor";
import { ApiResponse, PaginatedResponse } from "@/types";

export const getDoctors = async (
  page = 0,
  size = 9,
  keyword?: string,
  status?: string,
  departmentId?: number
): Promise<PaginatedResponse<Doctor>> => {
  const params: Record<string, any> = {
    page,
    size,
  };

  if (keyword && keyword.trim()) {
    params.keyword = keyword.trim();
  }

  if (status && status !== "ALL") {
    params.status = status;
  }

  if (departmentId && departmentId !== 0) {
    params.departmentId = departmentId;
  }
  const response = await api.get<ApiResponse<PaginatedResponse<Doctor>>>(
    "/doctors/search",
    { params }
  );

  console.log("getDoctors response", response.data.result);

  return response.data.result;
};
