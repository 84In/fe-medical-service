"use client";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavHeader from "./nav";

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
            "block select-none space-y-1 b rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium  leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex justify-between items-center py-2 lg:py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3">
            <div className="rounded-lg border border-gray-200 shadow-sm">
              <Image
                src="/logo.png"
                alt="VitaCare Medical Logo"
                width={50}
                height={50}
                className="lg:w-[60px] lg:h-[60px]"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
                VitaCare Medical
              </h1>
              <p className="text-xs lg:text-sm text-gray-600">
                Chăm sóc tận tâm – Sống khỏe mỗi ngày
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold text-gray-900">VitaCare</h1>
            </div>
          </Link>

          <NavHeader />
        </div>
      </div>
    </div>
  );
}
