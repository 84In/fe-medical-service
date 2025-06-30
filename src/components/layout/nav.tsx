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
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { toSlug } from "@/utils/slugify";
import { Department, ServiceType } from "@/types";
import {
  fetchDepartmentsWithSearch,
  fetchServiceTypesWithSearch,
} from "@/services/metadata.service";

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
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function MobileMenuItem({
  title,
  items,
  href,
  isActive,
  onClickCloseMenu,
}: {
  title: string;
  items?: Array<{ title: string; href: string }>;
  href?: string;
  isActive?: boolean;
  onClickCloseMenu?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items) {
    return (
      <Link
        href={href || "#"}
        onClick={onClickCloseMenu}
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
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function NavHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isCategoryActive = (items: Array<{ href: string }>) => {
    return items.some((item) => isActive(item.href));
  };

  useEffect(() => {
    fetchDepartmentsWithSearch("", "ACTIVE").then((data) =>
      setDepartments(data || [])
    );
    fetchServiceTypesWithSearch("", "ACTIVE").then((data) =>
      setServiceTypes(data || [])
    );
  }, []);

  const departmentLinks = departments.map((dept) => ({
    title: dept.name,
    href: `/chuyen-khoa/${toSlug(`${dept.name} ${dept.id}`)}`,
  }));

  const serviceTLinks = serviceTypes.map((st) => ({
    title: st.name,
    href: `/dich-vu/loai/${toSlug(`${st.name} ${st.id}`)}`,
  }));

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
                {/* <ul className="flex flex-col w-[300px] gap-2 p-4"> */}
                {/* Thêm một NavigationMenuLink */}

                {serviceTypes.map((service) => (
                  <ListItem
                    key={service.id}
                    title={service.name}
                    href={`/dich-vu/loai/${toSlug(
                      `${service.name} ${service.id}`
                    )}`}
                  >
                    {service.description}
                  </ListItem>
                ))}
                <div className="col-span-2">
                  <NavigationMenuLink
                    className="flex items-center justify-center w-full rounded-md bg-blue-50 p-2 text-blue-700 hover:bg-blue-100"
                    href="/dich-vu"
                  >
                    Xem tất cả dịch vụ
                  </NavigationMenuLink>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Chuyên khoa */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900",
                isActive("/chuyen-khoa") &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold data-[state=open]:bg-[#4DA9FF]/10 data-[state=open]:text-[#4DA9FF]"
              )}
            >
              Chuyên khoa
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {departments.map((department) => (
                  <ListItem
                    key={department.id}
                    title={department.name}
                    href={`/chuyen-khoa/${toSlug(
                      `${department.name} ${department.id}`
                    )}`}
                  >
                    <span
                      className="tiptap prose max-h-10 overflow-hidden text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: department.contentHtml,
                      }}
                    />
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
          {/* <NavigationMenuItem>
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
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/doi-ngu-bac-si"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                isActive("/doi-ngu-bac-si") &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold"
              )}
            >
              Đội ngũ bác sĩ
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* Tin tức */}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/tin-tuc"
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                isActive("/tin-tuc") &&
                  "bg-[#4DA9FF]/10 text-[#4DA9FF] font-semibold"
              )}
            >
              Tin tức
            </NavigationMenuLink>
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
                    items={serviceTLinks}
                    isActive={isCategoryActive(serviceTLinks)}
                    onClickCloseMenu={() => setMobileMenuOpen(false)}
                  />
                  <MobileMenuItem
                    title="Chuyên khoa"
                    items={departmentLinks}
                    isActive={isCategoryActive(departmentLinks)}
                    onClickCloseMenu={() => setMobileMenuOpen(false)}
                  />

                  {/* <MobileMenuItem
                    title="Bác sĩ"
                    items={doctors}
                    isActive={isCategoryActive(doctors)}
                  /> */}
                  <MobileMenuItem
                    title="Đội ngũ bác sĩ"
                    href="/doi-ngu-bac-si"
                    isActive={isActive("/doi-ngu-bac-si")}
                  />
                  {/* <MobileMenuItem
                    title="Tin tức"
                    items={news}
                    isActive={isCategoryActive(news)}
                  /> */}
                  <MobileMenuItem
                    title="Tin tức"
                    href="/tin-tuc"
                    isActive={isActive("/tin-tuc")}
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
