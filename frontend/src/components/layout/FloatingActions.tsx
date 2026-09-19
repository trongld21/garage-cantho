'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, ShieldAlert } from 'lucide-react';
import BookingModal from '../BookingModal';

export default function FloatingActions() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/10 p-2 grid grid-cols-3 gap-2">
        <a
          href="tel:0979707033"
          className="flex flex-col items-center justify-center py-2 bg-[#161616] text-[#F5F5F5] border border-white/10 rounded-xs active:bg-[#202020] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#C7A35A] mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Gọi Ngay</span>
        </a>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex flex-col items-center justify-center py-2 bg-[#C7A35A] text-[#0A0A0A] rounded-xs active:bg-[#D4B26A] transition-colors"
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Đặt Lịch</span>
        </button>

        <Link
          href="/rescue"
          className="flex flex-col items-center justify-center py-2 bg-[#E53935] text-white rounded-xs active:bg-red-700 transition-colors"
        >
          <ShieldAlert className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Cứu Hộ 24/7</span>
        </Link>
      </div>

      {/* Desktop Floating Action Widget */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col space-y-3">
        <Link
          href="/rescue"
          className="w-12 h-12 bg-[#E53935] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group relative"
          title="Cứu Hộ Khẩn Cấp 24/7"
        >
          <ShieldAlert className="w-6 h-6 animate-pulse" />
          <span className="absolute right-14 bg-[#161616] text-[#F5F5F5] border border-white/10 text-xs font-bold px-3 py-1.5 rounded-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wider">
            Cứu Hộ 24/7
          </span>
        </Link>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="w-12 h-12 bg-[#C7A35A] text-[#0A0A0A] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group relative"
          title="Đặt Lịch Bảo Dưỡng"
        >
          <Calendar className="w-6 h-6" />
          <span className="absolute right-14 bg-[#161616] text-[#F5F5F5] border border-white/10 text-xs font-bold px-3 py-1.5 rounded-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wider">
            Đặt Lịch Bảo Dưỡng
          </span>
        </button>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
