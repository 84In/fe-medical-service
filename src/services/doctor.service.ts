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

export const addDoctor = async (
  payload: Partial<Doctor>
): Promise<ApiResponse<Doctor>> => {
  const response = await api.post<ApiResponse<Doctor>>("/doctors", payload);

  return response.data;
};
export const updateDoctor = async (
  id: number,
  payload: Partial<Doctor>
): Promise<ApiResponse<Doctor>> => {
  const response = await api.put<ApiResponse<Doctor>>(
    `/doctors/${id}`,
    payload
  );

  return response.data;
};

export const getDoctorByIdServer = async (
  id: number
): Promise<Doctor | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/${id}`,
      {
        cache: "no-store", // không cache để luôn lấy dữ liệu mới
      }
    );

    if (!res.ok) {
      console.error("Server error:", res.status);
      return null;
    }

    const data: ApiResponse<Doctor> = await res.json();

    if (data.code === 0 && data.result) {
      console.log("Doctor response:", data.result);

      return data.result;
    }

    return null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
