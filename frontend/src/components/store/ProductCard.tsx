'use client';

import React from 'react';
import Link from 'next/link';
import { ProductItem } from '@/types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ImageWithFallback } from '../ui/ImageWithFallback';

export interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-[#161616] border border-white/5 rounded-xs p-5 flex flex-col justify-between hover:border-[#C7A35A]/40 transition-colors group">
      <div className="space-y-4">
        <div className="img-zoom-wrapper relative h-52 rounded-xs overflow-hidden bg-[#202020]">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            fallbackType="product"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <Badge variant="titanium">{product.brand}</Badge>
            {product.sale_price && <Badge variant="red">Giảm Giá</Badge>}
          </div>
        </div>

        <div>
          <span className="text-[10px] text-[#C7A35A] uppercase font-bold tracking-widest block mb-1">
            {product.category}
          </span>
          <h3 className="text-base font-bold text-[#F5F5F5] group-hover:text-[#C7A35A] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-xs text-[#A8A8A8] line-clamp-2 leading-relaxed">
          {product.summary}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
        <div>
          <span className="text-base font-extrabold text-[#F5F5F5] font-mono">
            {product.sale_price ? product.sale_price.toLocaleString('vi-VN') : product.price.toLocaleString('vi-VN')} đ
          </span>
          {product.sale_price && (
            <span className="text-xs text-[#666666] line-through block font-mono">
              {product.price.toLocaleString('vi-VN')} đ
            </span>
          )}
        </div>

        <Link href={`/store/${product.slug}`}>
          <Button variant="secondary" size="sm">
            Chi Tiết
          </Button>
        </Link>
      </div>
    </div>
  );
}
