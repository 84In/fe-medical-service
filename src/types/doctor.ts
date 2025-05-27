// types/doctor.ts

export interface Department {
  id: number;
  name: string;
  contentHtml: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

export interface Position {
  id: number;
  name: string;
  description: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

export interface Title {
  id: number;
  name: string;
  description: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

export interface Doctor {
  id: number;
  name: string;
  avatarUrl: string;
  introduction: string;
  experience_years: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
  department: Department;
  position: Position;
  title: Title;
}
