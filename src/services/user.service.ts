import { ApiResponse, PaginatedResponse, User } from "@/types";
import api from "@/utils/axios";

export const getUsers = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>("/users");

  console.log("getDoctors response", response.data.result);

  return response.data.result;
};
export const addUser = async (
  payload: Partial<User>
): Promise<ApiResponse<User>> => {
  const response = await api.post<ApiResponse<User>>("/users", payload);

  return response.data;
};
export const updateUser = async (
  id: number,
  payload: Partial<User>
): Promise<ApiResponse<User>> => {
  const response = await api.put<ApiResponse<User>>(`/users/${id}`, payload);

  return response.data;
};
