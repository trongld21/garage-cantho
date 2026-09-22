import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Phone, ArrowLeft, Check, Package, Car } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await apiService.getProductBySlug(slug);
  if (!product) return { title: 'Sản phẩm phụ tùng | Tây Đô Auto Car' };

  return {
    title: `${product.name} | Phụ Kiện Tây Đô Auto Car`,
    description: product.summary,
  };
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await apiService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[var(--bg-deep)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/store"
          className="inline-flex items-center space-x-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-gold)] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Cửa Hàng Phụ Kiện</span>
        </Link>

        {/* Product Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Product Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs overflow-hidden h-96 sm:h-[450px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Product Details & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="gold">{product.brand}</Badge>
                <Badge variant="titanium">{product.category}</Badge>
                <Badge variant="emerald">Còn Hàng trong kho ({product.stock})</Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-6 bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs space-y-2">
              <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest block">Giá Khuyến Mãi</span>
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-extrabold text-[var(--accent-gold)] font-mono">
                  {product.sale_price
                    ? product.sale_price.toLocaleString('vi-VN')
                    : product.price.toLocaleString('vi-VN')}{' '}
                  đ
                </span>
                {product.sale_price && (
                  <span className="text-sm text-[var(--text-muted)] line-through font-mono">
                    {product.price.toLocaleString('vi-VN')} đ
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
              <a href="tel:0979707033" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" leftIcon={<Phone className="w-5 h-5" />} className="w-full">
                  Gọi 0979 707 033 Đặt Giữ Hàng
                </Button>
              </a>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Nhận Tư Vấn Kỹ Thuật
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications & Fitment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-[var(--border-subtle)]">
          {/* Specifications */}
          {product.specifications && (
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight flex items-center space-x-2">
                <Package className="w-5 h-5 text-[var(--accent-gold)]" />
                <span>THÔNG SỐ KỸ THUẬT SẢN PHẨM</span>
              </h3>

              <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] divide-y divide-white/5 rounded-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="p-4 flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-medium">{key}</span>
                    <strong className="text-[var(--text-primary)]">{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compatible Vehicles */}
          {product.compatible_vehicles && (
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight flex items-center space-x-2">
                <Car className="w-5 h-5 text-[var(--accent-gold)]" />
                <span>CÁC DÒNG XE TƯƠNG THÍCH</span>
              </h3>

              <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] p-6 rounded-xs space-y-3">
                {product.compatible_vehicles.map((v) => (
                  <div key={v} className="flex items-center space-x-2 text-xs text-[var(--text-primary)]">
                    <Check className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>{v}</span>
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
