import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiService } from '@/services/api';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, Calendar, HelpCircle, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await apiService.getServiceBySlug(slug);
  if (!service) return { title: 'Dịch vụ ô tô | Garage Tây Nam Bộ' };

  return {
    title: `${service.name} | Tây Nam Bộ Garage Cần Thơ`,
    description: service.summary,
  };
}

export const revalidate = 60;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await apiService.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-[#0A0A0A] pb-24">
      {/* Service Detail Hero */}
      <section className="relative py-20 md:py-28 bg-[#161616] border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs text-[#A8A8A8] hover:text-[#C7A35A] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay Lại Danh Mục Dịch Vụ</span>
          </Link>

          <div className="space-y-3 max-w-4xl">
            <Badge variant="gold">{service.category}</Badge>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-tight">
              {service.name}
            </h1>
            <p className="text-base sm:text-lg text-[#A8A8A8] font-normal leading-relaxed">
              {service.summary}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="p-4 bg-[#202020] border border-white/10 rounded-xs">
              <span className="text-[10px] text-[#A8A8A8] uppercase tracking-widest block">Chi Phí Ước Tính</span>
              <span className="text-xl font-extrabold text-[#C7A35A]">{service.price_range}</span>
            </div>

            <Link href="/services">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                Đặt Lịch Dịch Vụ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Description & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] uppercase tracking-tight">
              GIỚI THIỆU TỔNG QUAN DỊCH VỤ
            </h2>
            <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed whitespace-pre-line">
              {service.description}
            </p>

            {service.benefits && service.benefits.length > 0 && (
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-[#C7A35A] uppercase tracking-wider">
                  LỢI ÍCH KHI THỰC HIỆN TẠI GARAGE:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-start space-x-2 text-xs text-[#F5F5F5]">
                      <Check className="w-4 h-4 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 img-zoom-wrapper rounded-xs border border-white/10 overflow-hidden h-80 sm:h-[400px]">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Workflow Process Steps */}
        {service.process_steps && service.process_steps.length > 0 && (
          <div className="space-y-12">
            <SectionHeading
              eyebrow="QUY TRÌNH THỰC HIỆN"
              title="5 BƯỚC THỰC HIỆN THEO TIÊU CHUẨN XƯỞNG DỊCH VỤ"
              subtitle="Mỗi bước đều có biên bản kiểm tra và sự giám sát trực tiếp của Kỹ sư trưởng."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {service.process_steps.map((step) => (
                <div
                  key={step.step}
                  className="bg-[#161616] border border-white/5 p-6 rounded-xs space-y-3 hover:border-[#C7A35A]/40 transition-colors"
                >
                  <span className="w-8 h-8 bg-[#C7A35A] text-[#0A0A0A] font-extrabold flex items-center justify-center text-sm rounded-xs font-mono">
                    0{step.step}
                  </span>
                  <h4 className="text-base font-bold text-[#F5F5F5] uppercase tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#A8A8A8] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Table */}
        {service.pricing_table && service.pricing_table.length > 0 && (
          <div className="bg-[#161616] border border-white/10 p-8 rounded-xs space-y-6">
            <h3 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight">
              BẢNG GIÁ THAM KHẢO DỊCH VỤ
            </h3>
            <div className="divide-y divide-white/10">
              {service.pricing_table.map((row) => (
                <div key={row.name} className="py-4 flex items-center justify-between text-sm">
                  <span className="text-[#F5F5F5] font-semibold">{row.name}</span>
                  <span className="text-[#C7A35A] font-bold font-mono">{row.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#C7A35A]" />
              <span>CÂU HỎI THƯỜNG GẶP</span>
            </h3>
            <div className="space-y-4">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="p-6 bg-[#161616] border border-white/5 rounded-xs space-y-2">
                  <h4 className="text-base font-bold text-[#F5F5F5]">{faq.q}</h4>
                  <p className="text-xs text-[#A8A8A8] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
