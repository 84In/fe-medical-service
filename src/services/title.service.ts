import { ApiResponse, PaginatedResponse } from "@/types";
import { Title } from "@/types/doctor";
import api from "@/utils/axios";

export const getTitles = async (
  page = 0,
  size = 9,
  keyword?: string,
  status?: string
): Promise<PaginatedResponse<Title>> => {
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
  const response = await api.get<ApiResponse<PaginatedResponse<Title>>>(
    "/titles/search",
    { params }
  );

  console.log("getDoctors response", response.data.result);

  return response.data.result;
};
export const addTitle = async (
  payload: Partial<Title>
): Promise<ApiResponse<Title>> => {
  const response = await api.post<ApiResponse<Title>>("/titles", payload);

  return response.data;
};
export const updateTitle = async (
  id: number,
  payload: Partial<Title>
): Promise<ApiResponse<Title>> => {
  const response = await api.put<ApiResponse<Title>>(`/titles/${id}`, payload);

  return response.data;
};
