import type React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
