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

// New types for doctors
export interface Specialty {
  id: number;
  name: string;
  description: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Experience {
  id: number;
  position: string;
  organization: string;
  startYear: string;
  endYear?: string;
  description?: string;
}

export interface Achievement {
  id: number;
  title: string;
  year: string;
  description?: string;
  type: "AWARD" | "CERTIFICATION" | "PUBLICATION" | "RESEARCH";
}

export interface WorkingHour {
  id: number;
  dayOfWeek:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  startTime: string;
  endTime: string;
  isAvailable: boolean;
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
  // New fields
  phone?: string;
  email?: string;
  specialties: Specialty[];
  education: Education[];
  workExperience: Experience[];
  achievements: Achievement[];
  workingHours: WorkingHour[];
  consultationFee?: number;
  languages: string[];
  rating?: number;
  totalReviews?: number;
}
