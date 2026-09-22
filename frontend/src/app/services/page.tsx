import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { accessoryServices } from '@/lib/offerings';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phụ Kiện & Nâng Cấp Ô Tô | Tây Đô Auto Car Cần Thơ',
  description:
    'Màn hình Android, đèn ô tô, âm thanh xe hơi, camera và phụ kiện nội ngoại thất tại Cần Thơ.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = accessoryServices;

  return (
    <div className="bg-[var(--bg-deep)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="gold">DANH MỤC DỊCH VỤ</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] uppercase tracking-tight leading-tight">
            PHỤ KIỆN & ĐỒ CHƠI <br />
            <span className="text-gold-gradient">NÂNG CẤP Ô TÔ</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
            Tư vấn và lắp đặt màn hình, đèn, âm thanh, camera cùng phụ kiện nội ngoại thất. Lựa chọn giải pháp phù hợp với dòng xe, nhu cầu và ngân sách của bạn.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs overflow-hidden flex flex-col justify-between hover:border-[var(--accent-gold)]/40 transition-all duration-300 group"
            >
              <div>
                <div className="img-zoom-wrapper relative h-56 overflow-hidden bg-[var(--bg-surface)]">
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
                  <span className="text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest block">
                    0{index + 1} / DỊCH VỤ TIÊU CHUẨN
                  </span>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-gold)] transition-colors line-clamp-2">
                    {service.name}
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {service.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest block">Báo Giá</span>
                  <span className="text-sm font-bold text-[var(--accent-gold)]">{service.price_range}</span>
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
