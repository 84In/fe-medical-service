import { ApiResponse, PaginatedResponse } from "@/types";
import { Position } from "@/types/doctor";
import api from "@/utils/axios";

export const getPositions = async (
  page = 0,
  size = 9,
  keyword?: string,
  status?: string
): Promise<PaginatedResponse<Position>> => {
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
  const response = await api.get<ApiResponse<PaginatedResponse<Position>>>(
    "/positions/search",
    { params }
  );

  console.log("getDoctors response", response.data.result);

  return response.data.result;
};
export const addPosition = async (
  payload: Partial<Position>
): Promise<ApiResponse<Position>> => {
  const response = await api.post<ApiResponse<Position>>("/positions", payload);

  return response.data;
};
export const updatePosition = async (
  id: number,
  payload: Partial<Position>
): Promise<ApiResponse<Position>> => {
  const response = await api.put<ApiResponse<Position>>(
    `/positions/${id}`,
    payload
  );

  return response.data;
};
