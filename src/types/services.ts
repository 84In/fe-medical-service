export interface ServiceType {
  id: number;
  name: string;
  description: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  thumbnailUrl: string;
  descriptionShort: string;
  contentHtml: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
  serviceType: ServiceType;
}
