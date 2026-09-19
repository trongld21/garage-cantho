import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Phone, ArrowLeft, ShieldCheck, Check, Calendar, Car as CarIcon, MapPin, Gauge } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await apiService.getCarBySlug(slug);
  if (!car) return { title: 'Thông tin xe | Tây Đô Auto Car' };

  return {
    title: `${car.title} | Tây Đô Auto Car Showroom`,
    description: car.summary,
  };
}

export const revalidate = 60;

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await apiService.getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/cars"
          className="inline-flex items-center space-x-2 text-xs text-[#A8A8A8] hover:text-[#C7A35A] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Showroom Xe</span>
        </Link>

        {/* Vehicle Header & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#161616] border border-white/10 rounded-xs overflow-hidden h-96 sm:h-[480px]">
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Specs Summary Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant={car.listing_type === 'sale' ? 'gold' : 'titanium'}>
                  {car.listing_type === 'sale' ? 'Xe Cần Bán' : 'Cho Thuê'}
                </Badge>
                <Badge variant="emerald">Đã Kiểm Định 176 Hạng Mục</Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-tight">
                {car.title}
              </h1>
            </div>

            {/* Price Banner */}
            <div className="p-6 bg-[#161616] border border-white/10 rounded-xs space-y-1">
              <span className="text-[10px] text-[#A8A8A8] uppercase tracking-widest block">
                Giá {car.listing_type === 'sale' ? 'Niêm Yết' : 'Thuê Theo Ngày'}
              </span>
              <span className="text-3xl font-extrabold text-[#C7A35A] font-mono">
                {car.price.toLocaleString('vi-VN')} đ
                {car.listing_type === 'rent' && <span className="text-sm text-[#A8A8A8] font-normal">/ngày</span>}
              </span>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#161616] p-4 rounded-xs border border-white/5">
              <div>
                <span className="text-[#A8A8A8] block">Năm Sản Xuất:</span>
                <strong className="text-white font-bold">{car.year}</strong>
              </div>
              <div>
                <span className="text-[#A8A8A8] block">Nhiên Liệu:</span>
                <strong className="text-white font-bold">{car.fuel_type}</strong>
              </div>
              <div>
                <span className="text-[#A8A8A8] block">Hộp Số:</span>
                <strong className="text-white font-bold">{car.transmission}</strong>
              </div>
              <div>
                <span className="text-[#A8A8A8] block">Số KM Đã Đi:</span>
                <strong className="text-white font-bold">{car.mileage}</strong>
              </div>
              <div>
                <span className="text-[#A8A8A8] block">Màu Sắc:</span>
                <strong className="text-white font-bold">{car.color}</strong>
              </div>
              <div>
                <span className="text-[#A8A8A8] block">Địa Điểm Xem Xe:</span>
                <strong className="text-white font-bold">{car.location}</strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3">
              <a href="tel:0979707033" className="block w-full">
                <Button variant="primary" size="lg" leftIcon={<Phone className="w-5 h-5" />} className="w-full">
                  {car.listing_type === 'sale' ? 'Đăng Ký Lái Thử / Xem Xe' : 'Liên Hệ Đặt Thuê Xe'}
                </Button>
              </a>

              <Link href="/contact" className="block w-full">
                <Button variant="outline" size="lg" className="w-full">
                  Gặp Tư Vấn Viên Xe
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/10">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight">
              MÔ TẢ CHI TIẾT VÀ TÌNH TRẠNG XE
            </h3>
            <p className="text-sm text-[#A8A8A8] leading-relaxed whitespace-pre-line">
              {car.description}
            </p>

            {car.history_report && (
              <div className="p-6 bg-[#161616] border border-[#C7A35A]/30 rounded-xs space-y-2">
                <h4 className="text-xs font-bold text-[#C7A35A] uppercase tracking-widest flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CAM KẾT CHẤT LƯỢNG GARAGE</span>
                </h4>
                <p className="text-xs text-[#F5F5F5] leading-relaxed">{car.history_report}</p>
              </div>
            )}
          </div>

          {/* Features Checklist */}
          {car.features && (
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight">
                TRANG BỊ & TÍNH NĂNG NỔI BẬT
              </h3>

              <div className="bg-[#161616] border border-white/5 p-6 rounded-xs space-y-3">
                {car.features.map((f) => (
                  <div key={f} className="flex items-start space-x-2 text-xs text-[#F5F5F5]">
                    <Check className="w-4 h-4 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
