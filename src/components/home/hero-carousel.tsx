"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Shield,
  Users,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  backgroundColor: string;
  icon: React.ReactNode;
  stats?: {
    label: string;
    value: string;
  }[];
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Hệ thống quản lý y tế hiện đại",
    subtitle: "VitaCare Medical",
    description:
      "Cung cấp giải pháp quản lý toàn diện cho các cơ sở y tế, từ quản lý bệnh nhân đến điều phối nhân sự và tài chính.",
    primaryButton: {
      text: "Truy cập hệ thống",
      href: "/admin",
    },
    secondaryButton: {
      text: "Tìm hiểu thêm",
      href: "/about",
    },
    backgroundImage: "/placeholder.svg?height=600&width=1200",
    backgroundColor: "from-blue-600 to-blue-800",
    icon: <Heart className="h-12 w-12 text-white" />,
    stats: [
      { label: "Bệnh nhân", value: "1,247+" },
      { label: "Bác sĩ", value: "45+" },
      { label: "Chuyên khoa", value: "12+" },
    ],
  },
  {
    id: 2,
    title: "Chăm sóc sức khỏe chuyên nghiệp",
    subtitle: "Đội ngũ y bác sĩ giàu kinh nghiệm",
    description:
      "Với đội ngũ bác sĩ chuyên khoa hàng đầu và trang thiết bị y tế hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất.",
    primaryButton: {
      text: "Đặt lịch khám",
      href: "/appointment",
    },
    secondaryButton: {
      text: "Xem chuyên khoa",
      href: "/departments",
    },
    backgroundImage: "/placeholder.svg?height=600&width=1200",
    backgroundColor: "from-green-600 to-green-800",
    icon: <Stethoscope className="h-12 w-12 text-white" />,
    stats: [
      { label: "Năm kinh nghiệm", value: "15+" },
      { label: "Ca phẫu thuật", value: "2,500+" },
      { label: "Tỷ lệ thành công", value: "98.5%" },
    ],
  },
  {
    id: 3,
    title: "An toàn và bảo mật thông tin",
    subtitle: "Công nghệ tiên tiến",
    description:
      "Hệ thống được xây dựng với các tiêu chuẩn bảo mật cao nhất, đảm bảo thông tin bệnh nhân được bảo vệ tuyệt đối và tuân thủ các quy định y tế.",
    primaryButton: {
      text: "Tìm hiểu bảo mật",
      href: "/security",
    },
    secondaryButton: {
      text: "Liên hệ hỗ trợ",
      href: "/contact",
    },
    backgroundImage: "/placeholder.svg?height=600&width=1200",
    backgroundColor: "from-purple-600 to-purple-800",
    icon: <Shield className="h-12 w-12 text-white" />,
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Bảo mật SSL", value: "256-bit" },
      { label: "Backup", value: "24/7" },
    ],
  },
  {
    id: 4,
    title: "Cộng đồng y tế kết nối",
    subtitle: "Mạng lưới chăm sóc sức khỏe",
    description:
      "Kết nối bệnh nhân, bác sĩ và các cơ sở y tế trong một hệ sinh thái chăm sóc sức khỏe toàn diện, hiệu quả và tiện lợi.",
    primaryButton: {
      text: "Tham gia ngay",
      href: "/register",
    },
    secondaryButton: {
      text: "Xem mạng lưới",
      href: "/network",
    },
    backgroundImage: "/placeholder.svg?height=600&width=1200",
    backgroundColor: "from-orange-600 to-orange-800",
    icon: <Users className="h-12 w-12 text-white" />,
    stats: [
      { label: "Cơ sở y tế", value: "50+" },
      { label: "Thành viên", value: "10,000+" },
      { label: "Kết nối/ngày", value: "1,500+" },
    ],
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentSlide, isTransitioning]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div
      className="relative h-[70vh] md:h-[80vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background with gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-in-out",
          currentSlideData.backgroundColor
        )}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20" />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left content */}
            <div className="text-white space-y-6 lg:col-span-2">
              {/* Icon */}
              <div
                className={cn(
                  "transform transition-all duration-700 ease-out",
                  isTransitioning
                    ? "translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100"
                )}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  {currentSlideData.icon}
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-4">
                <div
                  className={cn(
                    "transform transition-all duration-700 ease-out delay-100",
                    isTransitioning
                      ? "translate-y-4 opacity-0"
                      : "translate-y-0 opacity-100"
                  )}
                >
                  <p className="text-lg font-medium text-white/90 mb-2">
                    {currentSlideData.subtitle}
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {currentSlideData.title}
                  </h1>
                </div>

                <div
                  className={cn(
                    "transform transition-all duration-700 ease-out delay-200",
                    isTransitioning
                      ? "translate-y-4 opacity-0"
                      : "translate-y-0 opacity-100"
                  )}
                >
                  <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
                    {currentSlideData.description}
                  </p>
                </div>

                {/* Buttons */}
                <div
                  className={cn(
                    "flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ease-out delay-300",
                    isTransitioning
                      ? "translate-y-4 opacity-0"
                      : "translate-y-0 opacity-100"
                  )}
                >
                  <Link href={currentSlideData.primaryButton.href}>
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-white/80 text-sm md:text-lg px-4 md:px-8 py-2 md:py-4 h-auto"
                    >
                      {currentSlideData.primaryButton.text}
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </Link>
                  <Link href={currentSlideData.secondaryButton.href}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-gray-900 hover:bg-white/10 hover:text-white text-sm md:text-lg px-4 md:px-8 py-2 md:py-4 h-auto backdrop-blur-sm"
                    >
                      {currentSlideData.secondaryButton.text}
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                {currentSlideData.stats && (
                  <div
                    className={cn(
                      "grid grid-cols-3 gap-8 pt-8 transform transition-all duration-700 ease-out delay-400",
                      isTransitioning
                        ? "translate-y-4 opacity-0"
                        : "translate-y-0 opacity-100"
                    )}
                  >
                    {currentSlideData.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/80">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right content - Visual element */}
            <div className="hidden lg:block lg:col-span-3">
              <div
                className={cn(
                  "transform transition-all duration-700 ease-out delay-500",
                  isTransitioning
                    ? "translate-x-8 opacity-0"
                    : "translate-x-0 opacity-100"
                )}
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

                  {/* Main visual */}
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 w-full max-w-3xl mx-auto">
                    <div className="grid grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm"
                        >
                          <div className="w-12 h-12 bg-white/30 rounded-xl mb-4" />
                          <div className="space-y-2">
                            <div className="h-3 bg-white/40 rounded w-3/4" />
                            <div className="h-3 bg-white/30 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2 md:p-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2 md:p-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed",
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Play/Pause indicator */}
      {/* <div className="absolute top-4 right-4 z-20">
        <div
          className={cn(
            "px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm",
            isPlaying ? "text-green-300" : "text-yellow-300"
          )}
        >
          {isPlaying ? "Auto-playing" : "Paused"}
        </div>
      </div> */}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: isPlaying
                ? `${((currentSlide + 1) / heroSlides.length) * 100}%`
                : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
