'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Phone, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import BookingModal from '../BookingModal';

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] py-16 lg:py-24">
      {/* Background Photography & Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=85"
          alt="European Premium Automotive Care"
          fallbackType="service"
          className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="max-w-3xl space-y-6">
          {/* Top Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#161616]/90 border border-[#C7A35A]/40 text-[#C7A35A] text-xs font-bold uppercase tracking-[0.2em] rounded-xs"
          >
            <Award className="w-4 h-4 text-[#C7A35A]" />
            <span>TÂY NAM BỘ GARAGE • STANDARD EUROPEAN CARE</span>
          </motion.div>

          {/* Refined European Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-[1.12]"
          >
            CHĂM SÓC CHIẾC XE <br />
            <span className="text-gold-gradient">NHƯ CÁCH BẠN TRÂN TRỌNG HÀNH TRÌNH</span>
          </motion.h1>

          {/* Elegant Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#A8A8A8] font-normal leading-relaxed max-w-xl"
          >
            Quy trình kiểm định 30 hạng mục nghiêm ngặt, linh kiện nhập khẩu chính hãng, phòng sơn sấy vi tính 3M và đội xe ứng cứu khẩn cấp 24/7 tại Cần Thơ.
          </motion.p>

          {/* Hero Action Buttons & Hotline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Đặt Lịch Bảo Dưỡng
            </Button>

            <Link href="/services">
              <Button
                variant="outline"
                size="md"
                rightIcon={<ChevronRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Khám Phá Dịch Vụ
              </Button>
            </Link>

            {/* Quick Hotline Badge */}
            <div className="pt-3 sm:pt-0 sm:pl-4 sm:border-l border-white/10 flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#E53935]/10 border border-[#E53935]/30 rounded-xs flex items-center justify-center text-[#E53935]">
                <Phone className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-[#A8A8A8] uppercase tracking-widest block font-medium">
                  CỨU HỘ KHẨN CẤP 24/7
                </span>
                <a
                  href="tel:0936007840"
                  className="text-sm font-extrabold text-[#F5F5F5] hover:text-[#C7A35A] transition-colors font-mono"
                >
                  0936 007 840
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bottom Highlights Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs text-[#A8A8A8]"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C7A35A]" />
              <span>Phụ Tùng Chính Hãng</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#C7A35A]" />
              <span>Phòng Sơn Vi Tính 3M</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
              <Award className="w-4 h-4 text-[#C7A35A]" />
              <span>Bảo Hành Minh Bạch</span>
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}
