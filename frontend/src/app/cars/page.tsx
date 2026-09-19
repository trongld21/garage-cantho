import React from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { CarCard } from '@/components/cars/CarCard';
import { Badge } from '@/components/ui/Badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showroom Mua Bán & Cho Thuê Xe Ô Tô | Tây Nam Bộ Garage',
  description:
    'Danh mục xe ô tô 4-7 chỗ đã kiểm định 176 hạng mục kỹ thuật cần bán và cho thuê tự lái / có tài tại Cần Thơ.',
};

export const revalidate = 60;

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: 'sale' | 'rent' }>;
}) {
  const { type } = await searchParams;
  const cars = await apiService.getCars(type);

  return (
    <div className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="gold">SHOWROOM XE ĐÃ KIỂM ĐỊNH</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-tight">
            MUA BÁN & CHO THUÊ XE <br />
            <span className="text-gold-gradient">TIÊU CHUẨN CAO CẤP</span>
          </h1>
          <p className="text-base text-[#A8A8A8]">
            Tất cả các dòng xe bán và cho thuê tại Garage Tây Nam Bộ đều được cam kết không đâm đụng, không ngập nước thủy kích và có hồ sơ bảo dưỡng rõ ràng.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
          <Link
            href="/cars"
            className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-xs transition-colors ${
              !type
                ? 'bg-[#C7A35A] text-[#0A0A0A]'
                : 'bg-[#161616] text-[#A8A8A8] hover:text-white'
            }`}
          >
            Tất Cả Xe
          </Link>
          <Link
            href="/cars?type=sale"
            className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-xs transition-colors ${
              type === 'sale'
                ? 'bg-[#C7A35A] text-[#0A0A0A]'
                : 'bg-[#161616] text-[#A8A8A8] hover:text-white'
            }`}
          >
            Xe Mua Bán
          </Link>
          <Link
            href="/cars?type=rent"
            className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-xs transition-colors ${
              type === 'rent'
                ? 'bg-[#C7A35A] text-[#0A0A0A]'
                : 'bg-[#161616] text-[#A8A8A8] hover:text-white'
            }`}
          >
            Xe Cho Thuê
          </Link>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
