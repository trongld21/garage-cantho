'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, ShieldAlert, ArrowUp, Wrench } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-[#A8A8A8] text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-[#C7A35A] text-[#0A0A0A] flex items-center justify-center font-extrabold rounded-xs">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[#F5F5F5] block leading-tight uppercase">
                  TÂY ĐÔ <span className="text-[#C7A35A]">AUTO CAR</span>
                </span>
                <span className="text-[9px] text-[#A8A8A8] uppercase tracking-[0.2em] block font-medium">
                  European Precision Standard
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#A8A8A8] leading-relaxed">
              Trung tâm chăm sóc, bảo dưỡng và dịch vụ ô tô cao cấp tại Cần Thơ. Cam kết kỹ thuật chuẩn xác, linh kiện chính hãng và bảo hành minh bạch.
            </p>

            <div className="pt-2">
              <a
                href="tel:0979707033"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#E53935]/10 border border-[#E53935]/30 text-[#E53935] font-bold text-xs uppercase rounded-xs hover:bg-[#E53935] hover:text-white transition-colors"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Hotline Cứu Hộ 24/7: 0979 707 033</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#F5F5F5]">
              Danh Mục Trực Tuyến
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#C7A35A] transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C7A35A] transition-colors">
                  Dịch Vụ Garage Chuyên Nghiệp
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-[#C7A35A] transition-colors">
                  Phụ Tùng & Đồ Chơi Ô Tô
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-[#C7A35A] transition-colors">
                  Mua Bán & Cho Thuê Xe
                </Link>
              </li>
              <li>
                <Link href="/rescue" className="hover:text-[#C7A35A] transition-colors">
                  Cứu Hộ Khẩn Cấp 24/7
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#C7A35A] transition-colors">
                  Tin Tức & Kiến Thức Ô Tô
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C7A35A] transition-colors">
                  Liên Hệ & Chỉ Đường
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#F5F5F5]">
              Dịch Vụ Trọng Tâm
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/sua-chua-bao-duong-tong-hop" className="hover:text-[#C7A35A] transition-colors">
                  Sửa Chữa & Bảo Dưỡng Tổng Hợp
                </Link>
              </li>
              <li>
                <Link href="/services/ve-sinh-khoang-dong-co" className="hover:text-[#C7A35A] transition-colors">
                  Rửa Khoang Máy Hơi Nước Nóng
                </Link>
              </li>
              <li>
                <Link href="/services/dong-son-phuc-hoi-than-xe" className="hover:text-[#C7A35A] transition-colors">
                  Đồng Sơn & Phục Hồi Thân Xe
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C7A35A] transition-colors">
                  Chăm Sóc & Bọc Da Nội Thất
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C7A35A] transition-colors">
                  Nâng Cấp Đồ Chơi Xe Cao Cấp
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C7A35A] transition-colors">
                  Bảo Hiểm Thân Xe & Kiểm Định
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Operating Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#F5F5F5]">
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                <span>1–2 Nguyễn Văn Lưu, Khu TĐC Văn Hóa Tây Đô, Cái Răng, Cần Thơ</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#C7A35A] flex-shrink-0" />
                <a href="tel:0979707033" className="hover:text-white font-semibold">
                  0979 707 033
                </a>
                <span>/</span>
                <a href="tel:0923112399" className="hover:text-white font-semibold">
                  0923 112 399
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#C7A35A] flex-shrink-0" />
                <span>08:00 - 20:00 (Hàng ngày)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Tây Đô Auto Car Cần Thơ. Precision. Performance. Trust.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[#A8A8A8] hover:text-[#C7A35A] transition-colors"
          >
            <span>Về Đầu Trang</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
