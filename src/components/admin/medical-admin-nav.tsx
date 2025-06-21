"use client";

import Image from "next/image";
import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  FileType2,
  Home,
  Hospital,
  Layers,
  LogOut,
  Menu,
  Newspaper,
  Search,
  Stethoscope,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: "Mô tả hệ thống quản trị",
    icon: <Home className="h-5 w-5" />,
    href: "/admin",
  },
  {
    title: "Quản lý bác sĩ",
    icon: <Users className="h-5 w-5" />,
    href: "/admin/doctors",
    children: [
      {
        title: "Tất cả bác sĩ",
        icon: <Users className="h-4 w-4" />,
        href: "/admin/doctors",
      },
      {
        title: "Chuyên khoa",
        icon: <Layers className="h-4 w-4" />,
        href: "/admin/doctors/departments",
      },
      {
        title: "Chuyên môn",
        icon: <Stethoscope className="h-4 w-4" />,
        href: "/admin/doctors/specialties",
      },
      {
        title: "Chức vụ",
        icon: <Building2 className="h-4 w-4" />,
        href: "/admin/doctors/positions",
      },
      {
        title: "Chức danh",
        icon: <UserCheck className="h-4 w-4" />,
        href: "/admin/doctors/titles",
      },
    ],
  },
  {
    title: "Quản lý dịch vụ",
    icon: <Hospital className="h-5 w-5" />,
    href: "/admin/services",
    children: [
      {
        title: "Tất cả dịch vụ",
        icon: <ClipboardList className="h-4 w-4" />,
        href: "/admin/services",
      },
      {
        title: "Loại dịch vụ",
        icon: <Activity className="h-4 w-4" />,
        href: "/admin/services/service-types",
      },
    ],
  },
  {
    title: "Quản lý tin tức",
    icon: <FileText className="h-5 w-5" />,
    href: "/admin/news",
    children: [
      {
        title: "Tất cả tin tức",
        icon: <Newspaper className="h-4 w-4" />,
        href: "/admin/news",
      },
      {
        title: "Danh mục tin tức",
        icon: <FileType2 className="h-4 w-4" />,
        href: "/admin/news/news-types",
      },
    ],
  },
  {
    title: "Nhân viên",
    icon: <UserCheck className="h-5 w-5" />,
    href: "/admin/staff",
  },
];

export function MedicalAdminNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const pathname = usePathname();
  const router = useRouter();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleItemClick = (title: string, href: string) => {
    setActiveItem(title);
    router.push(href);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const findActiveItem = (
      items: NavItem[]
    ): { active: string; parent?: string } | null => {
      for (const item of items) {
        if (item.href === pathname) {
          return { active: item.title };
        }
        if (item.children) {
          const childMatch = item.children.find(
            (child) => child.href === pathname
          );
          if (childMatch) {
            return { active: childMatch.title, parent: item.title };
          }
        }
      }
      return null;
    };

    const match = findActiveItem(navigationItems);
    if (match) {
      setActiveItem(match.active);
      if (typeof match.parent === "string") {
        setExpandedItems((prev) =>
          match.parent && prev.includes(match.parent)
            ? prev
            : [...prev, match.parent!]
        );
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    alert("Logout");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <div className="border border-gray-400 rounded-full">
                <Image
                  src="/logo.png"
                  alt="VitaCare Medical Logo"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-bold text-gray-900">VitaCare Medical</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold"
                >
                  DS
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Quản trị viên
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:z-auto flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <Link
          href={"/"}
          className="flex items-center gap-3 hover:cursor-pointer px-6 py-4 border-b border-gray-200 flex-shrink-0"
        >
          <div className="border border-gray-400 rounded-full">
            <Image
              src="/logo.png"
              alt="VitaCare Medical Logo"
              className="rounded-full"
              width={40}
              height={40}
            />
          </div>

          {/* <div className="bg-blue-600 p-2 rounded-lg">
            <Heart className="h-6 w-6 text-white" />
          </div> */}
          <div>
            <h1 className="font-bold text-gray-900">VitaCare Medical</h1>
            <p className="text-xs text-gray-500">Cổng thông tin quản trị</p>
          </div>
        </Link>

        {/* Search */}
        {/* <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 scroll-smooth">
          <div className="space-y-1 pb-4">
            {navigationItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <Collapsible
                    open={expandedItems.includes(item.title)}
                    onOpenChange={() => toggleExpanded(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-between text-left font-normal ${
                          activeItem === item.title
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Button
                          key={child.title}
                          variant="ghost"
                          className={`w-full justify-start text-left font-normal pl-12 ${
                            activeItem === child.title
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            handleItemClick(child.title, child.href)
                          }
                        >
                          <div className="flex items-center gap-3">
                            {child.icon}
                            <span className="text-sm">{child.title}</span>
                          </div>
                        </Button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left font-normal ${
                      activeItem === item.title
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleItemClick(item.title, item.href)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer - Profile Section */}
        <div className="flex border-t border-gray-200  p-4 flex-shrink-0 mt-auto">
          <div className="flex flex-col items-start w-full">
            <span className="text-lg font-medium text-gray-900">Admin</span>
            <span className="text-xs text-gray-500">Quản trị viên</span>
          </div>
          <div
            onClick={handleLogout}
            className="flex px-4 py-2 justify-center rounded-md border-none items-center hover:bg-gray-800 hover:text-gray-200 text-gray-700"
          >
            <LogOut className="mr-2 h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
