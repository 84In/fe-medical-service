import { ApiResponse, PaginatedResponse } from "@/types";
import { Specialty } from "@/types/doctor";
import api from "@/utils/axios";

export const getSpecialties = async (
  page = 0,
  size = 9,
  keyword?: string,
  status?: string
): Promise<PaginatedResponse<Specialty>> => {
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
  const response = await api.get<ApiResponse<PaginatedResponse<Specialty>>>(
    "/specialties/search",
    { params }
  );

  console.log("getDoctors response", response.data.result);

  return response.data.result;
};
export const addSpecialty = async (
  payload: Partial<Specialty>
): Promise<ApiResponse<Specialty>> => {
  const response = await api.post<ApiResponse<Specialty>>(
    "/specialties",
    payload
  );

  return response.data;
};
export const updateSpecialty = async (
  id: number,
  payload: Partial<Specialty>
): Promise<ApiResponse<Specialty>> => {
  const response = await api.put<ApiResponse<Specialty>>(
    `/specialties/${id}`,
    payload
  );

  return response.data;
};
