"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { toSlug } from "@/utils/slugify";
const services = [
  {
    title: "Khám sức khỏe tổng quát",
    href: "/dich-vu/loai/kham-tong-quat-1",
    description: "Khám sức khỏe định kỳ và tầm soát bệnh lý",
  },
  {
    title: "Tầm soát ung thư",
    href: "/dich-vu/loai/tam-soat-ung-thu-2",
    description: "Phát hiện sớm các dấu hiệu ung thư",
  },
  {
    title: "Chẩn đoán hình ảnh",
    href: "/dich-vu/loai/chan-doan-hinh-anh-3",
    description: "X-quang, CT, MRI, siêu âm",
  },
  {
    title: "Xét nghiệm",
    href: "/dich-vu/loai/xet-nghiem-4",
    description: "Xét nghiệm máu, nước tiểu, sinh hóa",
  },
  {
    title: "Khám chuyên khoa",
    href: "/dich-vu/loai/kham-chuyen-khoa-5",
    description: "Khám và điều trị các bệnh chuyên khoa",
  },
  {
    title: "Gói khám VIP",
    href: "/dich-vu/loai/goi-kham-vip-6",
    description: "Dịch vụ khám cao cấp với tiện ích đặc biệt",
  },
];

const specialties = [
  {
    title: "Tim mạch",
    href: "/chuyen-khoa/tim-mach-1",
    description: "Điều trị các bệnh lý về tim và mạch máu",
  },
  {
    title: "Nhi khoa",
    href: "/chuyen-khoa/nhi-khoa-2",
    description: "Chăm sóc sức khỏe trẻ em từ 0-16 tuổi",
  },
  {
    title: "Cơ xương khớp",
    href: "/chuyen-khoa/co-xuong-khop-3",
    description: "Điều trị các bệnh lý về xương khớp",
  },
  {
    title: "Chẩn đoán hình ảnh",
    href: "/chuyen-khoa/chan-doan-hinh-anh-4",
    description: "Chẩn đoán qua hình ảnh y học",
  },
  {
    title: "Tiêu hóa",
    href: "/chuyen-khoa/tieu-hoa-5",
    description: "Điều trị các bệnh lý đường tiêu hóa",
  },
  {
    title: "Da liễu",
    href: "/chuyen-khoa/da-lieu-6",
    description: "Điều trị các bệnh lý về da",
  },
];

const doctors = [
  {
    title: "Bác sĩ tim mạch",
    href: "/bac-si/tim-mach",
    description: "Đội ngũ bác sĩ chuyên khoa tim mạch",
  },
  {
    title: "Bác sĩ nhi khoa",
    href: "/bac-si/nhi-khoa",
    description: "Bác sĩ chuyên khoa nhi",
  },
  {
    title: "Bác sĩ cơ xương khớp",
    href: "/bac-si/co-xuong-khop",
    description: "Chuyên gia về xương khớp",
  },
  {
    title: "Bác sĩ chẩn đoán hình ảnh",
    href: "/bac-si/chan-doan-hinh-anh",
    description: "Chuyên gia đọc phim và chẩn đoán",
  },
  {
    title: "Tất cả bác sĩ",
    href: "/bac-si",
    description: "Xem danh sách đầy đủ đội ngũ bác sĩ",
  },
];

const news = [
  {
    title: "Tin tức y khoa",
    href: "/tin-tuc/y-khoa",
    description: "Cập nhật kiến thức y học mới nhất",
  },
  {
    title: "Sức khỏe cộng đồng",
    href: "/tin-tuc/suc-khoe-cong-dong",
    description: "Thông tin sức khỏe cho cộng đồng",
  },
  {
    title: "Khuyến mãi",
    href: "/tin-tuc/khuyen-mai",
    description: "Các chương trình ưu đãi đặc biệt",
  },
  {
    title: "Sự kiện",
    href: "/tin-tuc/su-kien",
    description: "Các sự kiện và hoạt động của bệnh viện",
  },
  {
    title: "Tất cả tin tức",
    href: "/tin-tuc",
    description: "Xem tất cả tin tức và bài viết",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
// Mobile Menu Item Component
function MobileMenuItem({
  title,
  items,
  href,
  isActive,
}: {
  title: string;
  items?: Array<{ title: string; href: string; description: string }>;
  href?: string;
  isActive?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items) {
    return (
      <Link
        href={href || "#"}
        className={cn(
          "block px-4 py-3 text-base font-medium border-b border-gray-100 transition-colors",
          isActive
            ? "text-[#4DA9FF] bg-[#4DA9FF]/10 border-[#4DA9FF]/20 font-semibold"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        {title}
      </Link>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 text-base font-medium border-b border-gray-100 transition-colors",
          isActive
            ? "text-[#4DA9FF] bg-[#4DA9FF]/10 border-[#4DA9FF]/20 font-semibold"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        {title}
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-gray-50">
        <Link
          href={`/${toSlug(title)}`}
          className="block px-8 py-3 text-sm text-gray-600 hover:bg-white hover:text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors"
        >
          <div className="font-medium">Tất cả {title.toLowerCase()}</div>
          <div className="text-xs text-gray-500 mt-1">
            Danh sách tất cả {title.toLowerCase()}
          </div>
        </Link>
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block px-8 py-3 text-sm text-gray-600 hover:bg-white hover:text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors"
          >
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function NavHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Helper function to check if any item in a category is active
  const isCategoryActive = (items: Array<{ href: string }>) => {
    return items.some((item) => isActive(item.href));
  };

  return (
    <>
      {/* Desktop Navigation Menu */}
      <NavigationMenu className="hidden xl:flex">
        <NavigationMenuList>
          {/* Trang chủ */}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                isActive("/") && "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold"
              )}
            >
              Trang chủ
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Dịch vụ */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900",
                isActive("/dich-vu") &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold data-[state=open]:bg-[#4DA9FF]/10 data-[state=open]:text-[#4DA9FF]"
              )}
            >
              Dịch vụ
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {/* Thêm một NavigationMenuLink */}

                {services.map((service) => (
                  <ListItem
                    key={service.title}
                    title={service.title}
                    href={service.href}
                  >
                    {service.description}
                  </ListItem>
                ))}
                <li className="col-span-2">
                  <NavigationMenuLink
                    className="flex items-center justify-center w-full rounded-md bg-blue-50 p-2 text-blue-700 hover:bg-blue-100"
                    href="/dich-vu"
                  >
                    Xem tất cả dịch vụ
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Chuyên khoa */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900",
                isCategoryActive(specialties) &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold data-[state=open]:bg-[#4DA9FF]/10 data-[state=open]:text-[#4DA9FF]"
              )}
            >
              Chuyên khoa
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {specialties.map((specialty) => (
                  <ListItem
                    key={specialty.title}
                    title={specialty.title}
                    href={specialty.href}
                  >
                    {specialty.description}
                  </ListItem>
                ))}
                <li className="col-span-2">
                  <NavigationMenuLink
                    className="flex items-center justify-center w-full rounded-md bg-blue-50 p-2 text-blue-700 hover:bg-blue-100"
                    href="/chuyen-khoa"
                  >
                    Xem tất cả chuyên khoa
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Bác sĩ */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900",
                isCategoryActive(doctors) &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold data-[state=open]:bg-[#4DA9FF]/10 data-[state=open]:text-[#4DA9FF]"
              )}
            >
              Bác sĩ
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {doctors.map((doctor) => (
                  <ListItem
                    key={doctor.title}
                    title={doctor.title}
                    href={doctor.href}
                  >
                    {doctor.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Tin tức */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900",
                isCategoryActive(news) &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold data-[state=open]:bg-[#4DA9FF]/10 data-[state=open]:text-[#4DA9FF]"
              )}
            >
              Tin tức
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {news.map((newsItem) => (
                  <ListItem
                    key={newsItem.title}
                    title={newsItem.title}
                    href={newsItem.href}
                  >
                    {newsItem.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Liên hệ */}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/lien-he"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                isActive("/lien-he") &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold"
              )}
            >
              Liên hệ
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side buttons */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden hover:bg-gray-100 hover:text-gray-900"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="VitaCare"
                    width={40}
                    height={40}
                  />
                  <span className="font-bold text-gray-900">VitaCare</span>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-2">
                  <MobileMenuItem
                    title="Trang chủ"
                    href="/"
                    isActive={isActive("/")}
                  />
                  <MobileMenuItem
                    title="Dịch vụ"
                    items={services}
                    isActive={isCategoryActive(services)}
                  />
                  <MobileMenuItem
                    title="Chuyên khoa"
                    items={specialties}
                    isActive={isCategoryActive(specialties)}
                  />
                  <MobileMenuItem
                    title="Bác sĩ"
                    items={doctors}
                    isActive={isCategoryActive(doctors)}
                  />
                  <MobileMenuItem
                    title="Tin tức"
                    items={news}
                    isActive={isCategoryActive(news)}
                  />
                  <MobileMenuItem
                    title="Liên hệ"
                    href="/lien-he"
                    isActive={isActive("/lien-he")}
                  />
                </nav>
              </div>

              {/* Mobile Footer */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
