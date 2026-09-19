'use client';

import React from 'react';
import Link from 'next/link';
import { CarItem } from '@/types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ImageWithFallback } from '../ui/ImageWithFallback';

export interface CarCardProps {
  car: CarItem;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-[#161616] border border-white/5 rounded-xs overflow-hidden hover:border-[#C7A35A]/40 transition-all flex flex-col justify-between group">
      <div>
        <div className="img-zoom-wrapper relative h-60 overflow-hidden bg-[#202020]">
          <ImageWithFallback
            src={car.image}
            alt={car.title}
            fallbackType="car"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <Badge variant={car.listing_type === 'sale' ? 'gold' : 'titanium'}>
              {car.listing_type === 'sale' ? 'Xe Cần Bán' : 'Cho Thuê'}
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-tight group-hover:text-[#C7A35A] transition-colors line-clamp-2">
            {car.title}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs text-[#A8A8A8] border-y border-white/5 py-3 font-sans">
            <div>
              Năm SX: <strong className="text-white">{car.year}</strong>
            </div>
            <div>
              Nhiên liệu: <strong className="text-white">{car.fuel_type}</strong>
            </div>
            <div>
              Hộp số: <strong className="text-white">{car.transmission}</strong>
            </div>
            <div>
              Số KM: <strong className="text-white">{car.mileage}</strong>
            </div>
          </div>

          <p className="text-xs text-[#A8A8A8] line-clamp-2 leading-relaxed">
            {car.summary}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#A8A8A8] uppercase tracking-widest block">Giá {car.listing_type === 'sale' ? 'Bán' : 'Thuê'}</span>
          <span className="text-lg font-extrabold text-[#C7A35A] font-mono">
            {car.price.toLocaleString('vi-VN')} đ
            {car.listing_type === 'rent' && <span className="text-xs text-[#A8A8A8] font-normal">/ngày</span>}
          </span>
        </div>

        <Link href={`/cars/${car.slug}`}>
          <Button variant="secondary" size="sm">
            Xem Chi Tiết
          </Button>
        </Link>
      </div>
    </div>
  );
}
