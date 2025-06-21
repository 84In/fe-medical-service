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

export const getDepartmentByIdServer = async (
  id: number
): Promise<Department | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments/${id}`,
      {
        cache: "no-store", // luôn lấy mới, không cache
      }
    );

    if (!res.ok) {
      console.error("Server error:", res.status);
      return null;
    }

    const data: ApiResponse<Department> = await res.json();

    if (data.code === 0 && data.result) {
      return data.result;
    }

    return null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
