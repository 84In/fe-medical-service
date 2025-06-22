import { ApiResponse, PaginatedResponse, Service } from "@/types";
import api from "@/utils/axios";

export const getServices = async (
  page = 0,
  size = 10,
  keyword?: string,
  status?: string,
  serviceTypeId?: number
): Promise<PaginatedResponse<Service>> => {
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

  if (serviceTypeId && serviceTypeId !== 0) {
    params.serviceTypeId = serviceTypeId;
  }

  const response = await api.get<ApiResponse<PaginatedResponse<Service>>>(
    "/service/search",
    { params }
  );

  console.log("getService response", response.data.result);

  return response.data.result;
};

export const addService = async (
  payload: Partial<Service>
): Promise<ApiResponse<Service>> => {
  const response = await api.post<ApiResponse<Service>>("/service", payload);

  return response.data;
};
export const updateService = async (
  id: number,
  payload: Partial<Service>
): Promise<ApiResponse<Service>> => {
  const response = await api.put<ApiResponse<Service>>(
    `/service/${id}`,
    payload
  );

  return response.data;
};
export const getServiceByIdServer = async (
  id: number
): Promise<Service | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/service/${id}`,
      {
        cache: "no-store",
      }
    );

    const text = await res.text();

    let data: ApiResponse<Service> | null = null;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON response:", text);
    }

    if (!res.ok) {
      console.error("[ Server ] Server error:", res.status, text);

      if (data?.code === 322) {
        return null; // Not found
      }

      return null;
    }

    return data?.code === 0 ? data.result : null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

export const fetchServices = async (
  page = 0,
  size = 10,
  keyword?: string,
  status?: string,
  serviceTypeId?: number
): Promise<PaginatedResponse<Service>> => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("size", size.toString());

  if (keyword && keyword.trim()) {
    params.append("keyword", keyword.trim());
  }

  if (status && status !== "ALL") {
    params.append("status", status);
  }

  if (serviceTypeId && serviceTypeId !== 0) {
    params.append("serviceTypeId", serviceTypeId.toString());
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

  const res = await fetch(`${baseUrl}/service/search?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // hoặc "force-cache", tùy nhu cầu
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Lỗi khi gọi API:", errorText);
    throw new Error("Không thể tải danh sách dịch vụ.");
  }

  const data: ApiResponse<PaginatedResponse<Service>> = await res.json();
  return data.result;
};
