'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Cpu, ShieldCheck, CheckCircle2, Clock, DollarSign, Wrench } from 'lucide-react';

export function WhyChooseUsSection() {
  const pillars = [
    {
      icon: <Cpu className="w-7 h-7 text-[#C7A35A]" />,
      title: 'Thiết Bị Chẩn Đoán Châu Âu',
      desc: 'Sử dụng máy đọc lỗi ECU thế hệ mới giúp quét mã lỗi chính xác 100%, tiết kiệm thời gian và chi phí.',
    },
    {
      icon: <Wrench className="w-7 h-7 text-[#C7A35A]" />,
      title: 'Kỹ Thuật Viên Lành Nghề',
      desc: 'Đội ngũ kỹ sư trên 10 năm kinh nghiệm trực tiếp am hiểu sâu về động cơ, hộp số và hệ thống điện ô tô.',
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#C7A35A]" />,
      title: 'Phụ Kiện Chính Hãng 100%',
      desc: 'Cam kết phụ tùng nhập khẩu trực tiếp từ các thương hiệu hàng đầu thế giới như Mobil 1, 3M, Bosch, Denso.',
    },
    {
      icon: <DollarSign className="w-7 h-7 text-[#C7A35A]" />,
      title: 'Báo Giá Minh Bạch',
      desc: 'Khách hàng luôn duyệt danh mục kiểm tra và báo giá chi tiết trước khi tiến hành thực hiện.',
    },
    {
      icon: <Clock className="w-7 h-7 text-[#C7A35A]" />,
      title: 'Quy Trình Nhanh Chóng',
      desc: 'Tối ưu thời gian chờ đợi với khu vực phòng chờ sang trọng, máy lạnh, wifi tốc độ cao và cà phê miễn phí.',
    },
    {
      icon: <CheckCircle2 className="w-7 h-7 text-[#C7A35A]" />,
      title: 'Bảo Hành Chu Đáo',
      desc: 'Chế độ bảo hành minh bạch từ 6 tháng đến 3 năm cùng hỗ trợ lắp đặt phụ kiện điện tử định kỳ.',
    },
  ];

  return (
    <section className="bg-[#0A0A0A] py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="TẠI SẠO CHỌN TÂY ĐÔ AUTO CAR"
          title="CAM KẾT CHẤT LƯỢNG TIÊU CHUẨN CAO CẤP"
          subtitle="Tư vấn và lắp đặt phụ kiện phù hợp, giúp bạn thêm tiện nghi trên mỗi chặng đường."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-8 bg-[#161616] border border-white/5 rounded-xs space-y-4 hover:border-[#C7A35A]/40 transition-colors group"
            >
              <div className="w-14 h-14 bg-[#202020] rounded-xs flex items-center justify-center group-hover:bg-[#C7A35A]/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[#A8A8A8] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
