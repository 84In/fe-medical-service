export interface NewsType {
  id: number;
  name: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
}

export interface News {
  id: number;
  slug: string;
  name: string;
  thumbnailUrl: string;
  descriptionShort: string;
  contentHtml: string;
  status: "INACTIVE" | "ACTIVE" | "DELETED" | "HIDDEN";
  newsType: NewsType;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
}
