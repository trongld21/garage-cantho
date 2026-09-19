'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, PackageCheck, ShieldAlert, FileText } from 'lucide-react';

export function TrustSection() {
  const uspList = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C7A35A]" />,
      count: '10+',
      label: 'Năm Kinh Nghiệm',
      desc: 'Phục vụ hàng ngàn khách hàng tại Cần Thơ & Miền Tây',
    },
    {
      icon: <Wrench className="w-8 h-8 text-[#C7A35A]" />,
      count: '100%',
      label: 'Kỹ Thuật Viên Chuyên Nghiệp',
      desc: 'Đào tạo bài bản theo quy trình hãng xe Châu Âu',
    },
    {
      icon: <PackageCheck className="w-8 h-8 text-[#C7A35A]" />,
      count: '100%',
      label: 'Phụ Tùng Chính Hãng',
      desc: 'Nguồn gốc xuất xứ rõ ràng, tem nhãn đầy đủ',
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-[#E53935]" />,
      count: '24/7',
      label: 'Cứu Hộ Khẩn Cấp',
      desc: 'Đội xe ứng cứu lưu động có mặt trong 15-30 phút',
    },
    {
      icon: <FileText className="w-8 h-8 text-[#C7A35A]" />,
      count: '100%',
      label: 'Bảo Hành Minh Bạch',
      desc: 'Hóa đơn & phiếu bảo hành điện tử chính xác',
    },
  ];

  return (
    <section className="bg-[#161616] border-y border-white/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {uspList.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-5 bg-[#202020]/50 border border-white/5 rounded-xs space-y-3 hover:border-[#C7A35A]/30 transition-colors"
            >
              <div>{item.icon}</div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] block font-mono">
                  {item.count}
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C7A35A] mt-1">
                  {item.label}
                </h3>
              </div>
              <p className="text-[11px] text-[#A8A8A8] leading-normal">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
