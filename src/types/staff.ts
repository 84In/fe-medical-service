export interface Role {
  id: number;
  name: string;
}

export interface Staff {
  id: number;
  username: string;
  password?: string;
  phone: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStaffRequest {
  username: string;
  password: string;
  phone: string;
  email: string;
  roleId: number;
}

export interface UpdateStaffRequest {
  username: string;
  password?: string;
  phone: string;
  email: string;
  roleId: number;
}

export const ROLES: Role[] = [
  { id: 1, name: "ADMIN" },
  { id: 2, name: "CONTENT_MANAGER" },
  { id: 3, name: "STAFF" },
];

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Quản trị viên",
  CONTENT_MANAGER: "Quản lý nội dung",
  STAFF: "Nhân viên",
};
