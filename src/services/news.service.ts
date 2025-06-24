import { ApiResponse, News, PaginatedResponse } from "@/types";
import api from "@/utils/axios";

export const getNews = async (
  page = 0,
  size = 9,
  keyword?: string,
  status?: string,
  newsTypeId?: number
): Promise<PaginatedResponse<News>> => {
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

  if (newsTypeId && newsTypeId !== 0) {
    params.newsTypeId = newsTypeId;
  }
  const response = await api.get<ApiResponse<PaginatedResponse<News>>>(
    "/news/search",
    { params }
  );

  console.log("Get all news response", response.data.result);

  return response.data.result;
};

export const addNews = async (
  payload: Partial<News>
): Promise<ApiResponse<News>> => {
  const response = await api.post<ApiResponse<News>>("/news", payload);

  return response.data;
};
export const updateNews = async (
  id: number,
  payload: Partial<News>
): Promise<ApiResponse<News>> => {
  const response = await api.put<ApiResponse<News>>(`/news/${id}`, payload);

  return response.data;
};

export const getNewsBySlugServer = async (
  slug: string
): Promise<News | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/slug/${slug}`,
      {
        cache: "no-store", // không cache để luôn lấy dữ liệu mới
      }
    );

    if (!res.ok) {
      console.error("Server error:", res.status);
      return null;
    }

    const data: ApiResponse<News> = await res.json();

    if (data.code === 0 && data.result) {
      console.log("News response:", data.result);

      return data.result;
    }

    return null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

export const fetchNews = async (
  page = 0,
  size = 9,
  keyword?: string,
  status?: string,
  newsTypeId?: number
): Promise<PaginatedResponse<News>> => {
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

  if (newsTypeId && newsTypeId !== 0) {
    params.newsTypeId = newsTypeId;
  }

  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/search?${query}`,
    {
      cache: "no-store", // nếu không muốn cache ở server
      // next: { revalidate: 0 }, // hoặc dùng ISR với revalidate
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch news: ${res.status}`);
  }

  const data: ApiResponse<PaginatedResponse<News>> = await res.json();

  return data.result;
};
