'use client';

import React from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Phone, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { PageStatus, useSlugData } from '@/lib/use-static-data';

export default function CarDetailPage() {
  const { data: car, loading, error } = useSlugData('cars', slug => apiService.getCarBySlug(slug));
  if (loading || error || !car) return <PageStatus loading={loading} error={error} missing={!loading && !error && !car} />;

  return (
    <div className="bg-[var(--bg-deep)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/cars"
          className="inline-flex items-center space-x-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-gold)] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Showroom Xe</span>
        </Link>

        {/* Vehicle Header & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs overflow-hidden h-96 sm:h-[480px]">
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

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] uppercase tracking-tight leading-tight">
                {car.title}
              </h1>
            </div>

            {/* Price Banner */}
            <div className="p-6 bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs space-y-1">
              <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest block">
                Giá {car.listing_type === 'sale' ? 'Niêm Yết' : 'Thuê Theo Ngày'}
              </span>
              <span className="text-3xl font-extrabold text-[var(--accent-gold)] font-mono">
                {car.price.toLocaleString('vi-VN')} đ
                {car.listing_type === 'rent' && <span className="text-sm text-[var(--text-secondary)] font-normal">/ngày</span>}
              </span>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--bg-graphite)] p-4 rounded-xs border border-[var(--border-subtle)]">
              <div>
                <span className="text-[var(--text-secondary)] block">Năm Sản Xuất:</span>
                <strong className="text-[var(--text-primary)] font-bold">{car.year}</strong>
              </div>
              <div>
                <span className="text-[var(--text-secondary)] block">Nhiên Liệu:</span>
                <strong className="text-[var(--text-primary)] font-bold">{car.fuel_type}</strong>
              </div>
              <div>
                <span className="text-[var(--text-secondary)] block">Hộp Số:</span>
                <strong className="text-[var(--text-primary)] font-bold">{car.transmission}</strong>
              </div>
              <div>
                <span className="text-[var(--text-secondary)] block">Số KM Đã Đi:</span>
                <strong className="text-[var(--text-primary)] font-bold">{car.mileage}</strong>
              </div>
              <div>
                <span className="text-[var(--text-secondary)] block">Màu Sắc:</span>
                <strong className="text-[var(--text-primary)] font-bold">{car.color}</strong>
              </div>
              <div>
                <span className="text-[var(--text-secondary)] block">Địa Điểm Xem Xe:</span>
                <strong className="text-[var(--text-primary)] font-bold">{car.location}</strong>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-[var(--border-subtle)]">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight">
              MÔ TẢ CHI TIẾT VÀ TÌNH TRẠNG XE
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
              {car.description}
            </p>

            {car.history_report && (
              <div className="p-6 bg-[var(--bg-graphite)] border border-[var(--accent-gold)]/30 rounded-xs space-y-2">
                <h4 className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-widest flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CAM KẾT CHẤT LƯỢNG GARAGE</span>
                </h4>
                <p className="text-xs text-[var(--text-primary)] leading-relaxed">{car.history_report}</p>
              </div>
            )}
          </div>

          {/* Features Checklist */}
          {car.features && (
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight">
                TRANG BỊ & TÍNH NĂNG NỔI BẬT
              </h3>

              <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] p-6 rounded-xs space-y-3">
                {car.features.map((f) => (
                  <div key={f} className="flex items-start space-x-2 text-xs text-[var(--text-primary)]">
                    <Check className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
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
