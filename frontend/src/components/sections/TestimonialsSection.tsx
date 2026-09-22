'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const reviews = [
    {
      name: 'Anh Trần Quốc Bảo',
      car: 'Chủ xe Porsche Macan GTS',
      rating: 5,
      comment:
        'Dịch vụ nâng cấp nội thất và lắp đặt phụ kiện ở đây rất tỉ mỉ. Kỹ thuật viên giải thích rõ ràng, rất hài lòng!',
    },
    {
      name: 'Chị Nguyễn Thùy Linh',
      car: 'Chủ xe Mercedes-Benz GLC 300',
      rating: 5,
      comment:
        'Mình lắp camera hành trình và cảm biến áp suất lốp tại Tây Đô Auto Car. Đội ngũ tư vấn rõ ràng, lắp đặt gọn gàng và hướng dẫn sử dụng rất dễ hiểu.',
    },
    {
      name: 'Anh Lê Hoàng Nam',
      car: 'Chủ xe Ford Everest 2023',
      rating: 5,
      comment:
        'Vệ sinh khoang máy hơi nước nóng ở đây tuyệt vời. Máy sạch bong mảng bám mỡ mà giắc điện được bọc cực kỳ cẩn thận. Báo giá minh bạch, phòng chờ sang trọng.',
    },
  ];

  return (
    <section className="bg-[#0A0A0A] py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ĐÁNH GIÁ KHÁCH HÀNG"
          title="SỰ HÀI LÒNG CỦA KHÁCH HÀNG LÀ THƯỚC ĐO THÀNH CÔNG"
          subtitle="Hơn 5.000+ chủ xe tại Cần Thơ & Miền Tây đã tin tưởng lựa chọn Tây Đô Auto Car làm điểm đến chăm sóc xế cưng."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-8 bg-[#161616] border border-white/5 rounded-xs space-y-6 flex flex-col justify-between hover:border-[#C7A35A]/30 transition-colors relative"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-[#C7A35A]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#A8A8A8] italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wide">
                    {rev.name}
                  </h4>
                  <span className="text-xs text-[#C7A35A] font-medium">{rev.car}</span>
                </div>
                <Quote className="w-8 h-8 text-white/5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
