'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Check } from 'lucide-react';

export function WorkshopExperience() {
  const highlights = [
    'Hệ thống cầu nâng cắt kéo & cầu nâng 2 trụ tiêu chuẩn ISO',
    'Phòng sơn hấp sấy sơn khép kín công nghệ pha màu vi tính 3M',
    'Máy rửa khoang máy hơi nước nóng bão hòa Optima Steamer Hàn Quốc',
    'Khu vực phòng chờ VIP máy lạnh, đồ uống miễn phí & tầm nhìn trực tiếp xưởng',
  ];

  return (
    <section className="bg-[#161616] border-y border-white/10 py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Left */}
          <div className="space-y-6">
            <SectionHeading
              eyebrow="CƠ SỞ VẬT CHẤT & THIẾT BỊ"
              title="XƯỞNG DỊCH VỤ HIỆN ĐẠI BẬC NHẤT CẦN THƠ"
              subtitle="Tây Nam Bộ Garage đầu tư đồng bộ trang thiết bị chẩn đoán & sửa chữa nhập khẩu trực tiếp từ Châu Âu và Hàn Quốc."
            />

            <div className="space-y-4 pt-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-[#C7A35A]/10 border border-[#C7A35A]/30 rounded-xs flex items-center justify-center text-[#C7A35A] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#F5F5F5]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Images Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="img-zoom-wrapper rounded-xs border border-white/10 overflow-hidden h-56">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
                  alt="Garage Bay"
                  fallbackType="service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="img-zoom-wrapper rounded-xs border border-white/10 overflow-hidden h-40">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
                  alt="Diagnostic Tool"
                  fallbackType="service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="img-zoom-wrapper rounded-xs border border-white/10 overflow-hidden h-40">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                  alt="Paint Booth"
                  fallbackType="service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="img-zoom-wrapper rounded-xs border border-white/10 overflow-hidden h-56">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
                  alt="Vehicle Service"
                  fallbackType="car"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
