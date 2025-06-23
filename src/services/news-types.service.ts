import { ApiResponse, NewsType, PaginatedResponse } from "@/types";
import api from "@/utils/axios";

export const getNewsTypes = async (
  page = 0,
  size = 10,
  keyword?: string,
  status?: string
): Promise<PaginatedResponse<NewsType>> => {
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

  const response = await api.get<ApiResponse<PaginatedResponse<NewsType>>>(
    "/news-types/search",
    { params }
  );

  console.log("getNewsTypes response", response.data.result);

  return response.data.result;
};

export const addNewsTypes = async (
  payload: Partial<NewsType>
): Promise<ApiResponse<NewsType>> => {
  const response = await api.post<ApiResponse<NewsType>>(
    "/news-types",
    payload
  );

  return response.data;
};
export const updateNewsTypes = async (
  id: number,
  payload: Partial<NewsType>
): Promise<ApiResponse<NewsType>> => {
  const response = await api.put<ApiResponse<NewsType>>(
    `/news-types/${id}`,
    payload
  );

  return response.data;
};

export const getNewsTypesByIdServer = async (
  id: number
): Promise<NewsType | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/news-types/${id}`,
      {
        cache: "no-store", // luôn lấy mới, không cache
      }
    );

    if (!res.ok) {
      console.error("Server error:", res.status);
      return null;
    }

    const data: ApiResponse<NewsType> = await res.json();

    if (data.code === 0 && data.result) {
      return data.result;
    }

    return null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
