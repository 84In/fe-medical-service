import type React from "react";

export const metadata = {
  title: "Quản lý tin tức",
  description: "Quản lý tin tức và thông báo",
  keyword: "news manager, quản lý, quản lý tin tức, thông báo, medical",
};

export default function NewsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="space-y-6">{children}</div>;
}
