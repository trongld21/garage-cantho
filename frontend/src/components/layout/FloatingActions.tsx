'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import BookingModal from '../BookingModal';

export default function FloatingActions() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-deep)]/95 backdrop-blur-lg border-t border-[var(--border-subtle)] p-2 grid grid-cols-3 gap-2">
        <a
          href="tel:0979707033"
          className="flex flex-col items-center justify-center py-2 bg-[var(--bg-graphite)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-xs active:bg-[var(--bg-surface)] transition-colors"
        >
          <Phone className="w-4 h-4 text-[var(--accent-gold)] mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Gọi Ngay</span>
        </a>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex flex-col items-center justify-center py-2 bg-[var(--accent-gold)] text-[var(--on-accent)] rounded-xs active:bg-[var(--accent-gold-hover)] transition-colors"
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Đặt Lịch</span>
        </button>

        <Link
          href="/contact"
          className="flex flex-col items-center justify-center py-2 bg-[#E53935] text-white rounded-xs active:bg-red-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Tư Vấn</span>
        </Link>
      </div>

      {/* Desktop Floating Action Widget */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col space-y-3">
        <Link
          href="/contact"
          className="w-12 h-12 bg-[#E53935] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group relative"
          title="Tư vấn phụ kiện ô tô"
        >
          <MessageCircle className="w-6 h-6 animate-pulse" />
          <span className="absolute right-14 bg-[var(--bg-graphite)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-bold px-3 py-1.5 rounded-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wider">
            Tư Vấn
          </span>
        </Link>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="w-12 h-12 bg-[var(--accent-gold)] text-[var(--on-accent)] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group relative"
          title="Đặt Lịch Lắp Đặt"
        >
          <Calendar className="w-6 h-6" />
          <span className="absolute right-14 bg-[var(--bg-graphite)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-bold px-3 py-1.5 rounded-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wider">
            Đặt Lịch Lắp Đặt
          </span>
        </button>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
