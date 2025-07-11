import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CONTACT_INFO } from "@/constants/information";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="VitaCare Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
                <div>
                  <h3 className="font-bold">VitaCare Medical</h3>
                  <p className="text-xs text-blue-200">Chăm sóc tận tâm</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm">
                Hệ thống y tế hiện đại với đội ngũ bác sĩ giàu kinh nghiệm và
                trang thiết bị tiên tiến.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">LIÊN HỆ NHANH</h4>
              <div className="space-y-2 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{CONTACT_INFO.quickContactPhone}</span>
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    CONTACT_INFO.googleMap
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 "
                >
                  <MapPin className="h-4 w-4" />
                  <span>{CONTACT_INFO.location}</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">GIỜ LÀM VIỆC</h4>
              <div className="space-y-2 text-blue-200 text-sm">
                <div>{CONTACT_INFO.workingHours}</div>
                <div className="text-yellow-300 font-semibold">
                  Hotline 24/7: {CONTACT_INFO.phone}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">THEO DÕI CHÚNG TÔI</h4>
              <div className="flex gap-3 mb-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <a href={CONTACT_INFO.facebook}>
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <a href={CONTACT_INFO.youtube}>
                    <Youtube className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <a href={CONTACT_INFO.instagram}>
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-blue-200 text-sm">
                Cập nhật tin tức y tế và chương trình khuyến mãi mới nhất.
              </p>
            </div>
          </div>

          <div className="border-t border-blue-700 mt-8 pt-8 text-center">
            <p className="text-blue-200 text-sm">
              © 2025 VitaCare Medical. Phát triển bởi VASD IT Team.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
