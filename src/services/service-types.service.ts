import { ApiResponse, PaginatedResponse, ServiceType } from "@/types";
import api from "@/utils/axios";

export const getserviceTypes = async (
  page = 0,
  size = 10,
  keyword?: string,
  status?: string
): Promise<PaginatedResponse<ServiceType>> => {
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

  const response = await api.get<ApiResponse<PaginatedResponse<ServiceType>>>(
    "/service-types/search",
    { params }
  );

  console.log("getServiceType response", response.data.result);

  return response.data.result;
};

export const addserviceType = async (
  payload: Partial<ServiceType>
): Promise<ApiResponse<ServiceType>> => {
  const response = await api.post<ApiResponse<ServiceType>>(
    "/service-types",
    payload
  );

  return response.data;
};
export const updateserviceType = async (
  id: number,
  payload: Partial<ServiceType>
): Promise<ApiResponse<ServiceType>> => {
  const response = await api.put<ApiResponse<ServiceType>>(
    `/service-types/${id}`,
    payload
  );

  return response.data;
};

export const getserviceTypeByIdServer = async (
  id: number
): Promise<ServiceType | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/service-types/${id}`,
      {
        cache: "no-store", // luôn lấy mới, không cache
      }
    );

    if (!res.ok) {
      console.error("Server error:", res.status);
      return null;
    }

    const data: ApiResponse<ServiceType> = await res.json();

    if (data.code === 0 && data.result) {
      return data.result;
    }

    return null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
