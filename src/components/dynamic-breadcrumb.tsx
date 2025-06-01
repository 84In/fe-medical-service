"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function capitalize(str: string) {
  return str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const segmentMap: Record<string, string> = {
  admin: "Quản trị",
  doctors: "Bác sĩ",
  departments: "Chuyên khoa",
  positions: "Chức vụ",
  titles: "Chức vụ",
  staff: "Nhân viên",
  services: "Dịch vụ",
  news: "Tin tức",
  edit: "Chỉnh sửa",
  "service-types": "Loại dịch vụ",
  "news-types": "Loại tin tức",
  // ...
};

function getSegmentName(segment: string) {
  return segmentMap[segment] || capitalize(segment);
}

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // loại bỏ phần rỗng

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <div key={href} className="flex items-center">
              {/* Hiển thị dấu phân cách nếu không phải phần đầu tiên */}
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold">
                    {capitalize(getSegmentName(segment))}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {capitalize(getSegmentName(segment))}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
