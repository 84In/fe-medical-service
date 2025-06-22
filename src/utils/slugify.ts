import { Service } from "@/types";

// utils/slugify.ts
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-");
}
export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getServiceSlug = (service: Service) => {
  return `${toSlug(service.name)}-${service.id}`;
};
