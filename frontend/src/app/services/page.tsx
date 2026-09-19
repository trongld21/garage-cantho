import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { apiService } from '@/services/api';
import { ArrowRight, Wrench, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dịch Vụ Garage Ô Tô Chuyên Nghiệp | Tây Nam Bộ Garage Cần Thơ',
  description:
    'Danh mục dịch vụ bảo dưỡng, sửa chữa ô tô tổng hợp, rửa khoang máy hơi nước nóng, đồng sơn 3M, nâng cấp phụ kiện theo tiêu chuẩn Châu Âu tại Cần Thơ.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await apiService.getServices();

  return (
    <div className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="gold">DANH MỤC DỊCH VỤ</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-tight">
            TIÊU CHUẨN DỊCH VỤ <br />
            <span className="text-gold-gradient">AUTOMOTIVE CHÂU ÂU</span>
          </h1>
          <p className="text-base sm:text-lg text-[#A8A8A8] font-normal leading-relaxed">
            Mọi quy trình từ chẩn đoán, bảo dưỡng đến phục hồi thân xe tại Garage Tây Nam Bộ đều được thực hiện bởi đội ngũ kỹ sư giàu kinh nghiệm với trang thiết bị chuyên dụng hiện đại.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#161616] border border-white/5 rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#C7A35A]/40 transition-all duration-300 group"
            >
              <div>
                <div className="img-zoom-wrapper relative h-56 overflow-hidden bg-[#202020]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold">{service.category}</Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <span className="text-xs font-mono text-[#C7A35A] uppercase tracking-widest block">
                    0{index + 1} / DỊCH VỤ TIÊU CHUẨN
                  </span>
                  <h2 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight group-hover:text-[#C7A35A] transition-colors line-clamp-2">
                    {service.name}
                  </h2>
                  <p className="text-xs text-[#A8A8A8] line-clamp-3 leading-relaxed">
                    {service.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#A8A8A8] uppercase tracking-widest block">Báo Giá</span>
                  <span className="text-sm font-bold text-[#C7A35A]">{service.price_range}</span>
                </div>

                <Link href={`/services/${service.slug}`}>
                  <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Chi Tiết
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
