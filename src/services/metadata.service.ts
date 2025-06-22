import type {
  Department,
  Position,
  ServiceType,
  Specialty,
  Title,
} from "@/types";
import api from "@/utils/axios";
import { check } from "@/utils/helper.checkResponse";

async function fetchSearch<T>(
  url: string,
  page = 0,
  size = 100,
  keyword?: string,
  status?: string
): Promise<T[]> {
  const params: Record<string, any> = { page, size };
  if (keyword?.trim()) params.keyword = keyword.trim();
  if (status && status !== "ALL") params.status = status;

  const res = await api.get(url, { params });
  const result = check(res.data) as {
    items: T[];
  };
  return result.items as T[];
}

// Fetch danh sách khoa phòng
export async function fetchDepartments(): Promise<Department[]> {
  const res = await api.get("/departments");
  return check(res.data);
}

// Fetch danh sách chức vụ
export async function fetchPositions(): Promise<Position[]> {
  const res = await api.get("/positions");
  return check(res.data);
}

// Fetch danh sách học vị / học hàm
export async function fetchTitles(): Promise<Title[]> {
  const res = await api.get("/titles");
  return check(res.data);
}

export async function fetchSpecialties(): Promise<Specialty[]> {
  const res = await api.get("/specialties");
  return check(res.data);
}

export async function fetchServiceTypes(): Promise<ServiceType[]> {
  const res = await api.get("service-types");
  return check(res.data);
}

export async function fetchDepartmentsWithSearch(
  keyword?: string,
  status?: string
): Promise<Department[]> {
  return fetchSearch<Department>(
    "/departments/search",
    0,
    1000,
    keyword,
    status
  );
}
export async function fetchPositionsWithSearch(
  keyword?: string,
  status?: string
): Promise<Position[]> {
  return fetchSearch<Position>("/positions/search", 0, 1000, keyword, status);
}

export async function fetchTitlesWithSearch(
  keyword?: string,
  status?: string
): Promise<Title[]> {
  return fetchSearch<Title>("/titles/search", 0, 1000, keyword, status);
}

export async function fetchSpecialtiesWithSearch(
  keyword?: string,
  status?: string
): Promise<Specialty[]> {
  return fetchSearch<Specialty>(
    "/specialties/search",
    0,
    1000,
    keyword,
    status
  );
}

export async function fetchServiceTypesWithSearch(
  keyword?: string,
  status?: string
): Promise<ServiceType[]> {
  return fetchSearch<ServiceType>(
    "/service-types/search",
    0,
    1000,
    keyword,
    status
  );
}
