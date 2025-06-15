import { ApiResponse, PaginatedResponse } from "@/types";
import { Department } from "@/types/doctor";
import api from "@/utils/axios";

export const getDepartments = async (
  page = 0,
  size = 10,
  keyword?: string,
  status?: string
): Promise<PaginatedResponse<Department>> => {
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

  const response = await api.get<ApiResponse<PaginatedResponse<Department>>>(
    "/departments/search",
    { params }
  );

  console.log("getDepartment response", response.data.result);

  return response.data.result;
};
export const addDepartment = async (
  payload: Partial<Department>
): Promise<ApiResponse<Department>> => {
  const response = await api.post<ApiResponse<Department>>(
    "/departments",
    payload
  );

  return response.data;
};
export const updateDepartment = async (
  id: number,
  payload: Partial<Department>
): Promise<ApiResponse<Department>> => {
  const response = await api.put<ApiResponse<Department>>(
    `/departments/${id}`,
    payload
  );

  return response.data;
};
