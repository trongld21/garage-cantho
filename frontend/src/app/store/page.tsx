import React from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { ProductCard } from '@/components/store/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phụ Tùng & Đồ Chơi Xe Ô Tô Chính Hãng | Tây Đô Auto Car',
  description:
    'Cửa hàng phụ tùng ô tô chính hãng Mobil 1, 3M, Steelmate, màn hình Android OLEDPro, cảm biến áp suất lốp giá tốt tại Cần Thơ.',
};

export const revalidate = 60;

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const products = await apiService.getProducts(category, search);

  return (
    <div className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="gold">CỬA HÀNG PHỤ TÙNG & ĐỒ CHƠI</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-tight">
            PHỤ TÙNG CHÍNH HÃNG <br />
            <span className="text-gold-gradient">& THIẾT BỊ THÔNG MINH</span>
          </h1>
          <p className="text-base text-[#A8A8A8]">
            Cam kết 100% linh kiện chính hãng nhập khẩu, đầy đủ tem mác chứng nhận nguồn gốc và chế độ bảo hành chuẩn hãng.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#161616] p-6 border border-white/10 rounded-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <form className="w-full md:w-96" action="/store" method="GET">
            <Input
              name="search"
              placeholder="Tìm phụ tùng, thương hiệu (VD: Mobil 1, OLEDPro...)"
              defaultValue={search || ''}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </form>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Link href="/store" className="text-xs text-[#A8A8A8] hover:text-[#C7A35A] uppercase tracking-wider">
              Tất Cả
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/store?category=Phụ tùng" className="text-xs text-[#A8A8A8] hover:text-[#C7A35A] uppercase tracking-wider">
              Phụ Tùng
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/store?category=Đồ chơi xe" className="text-xs text-[#A8A8A8] hover:text-[#C7A35A] uppercase tracking-wider">
              Đồ Chơi Xe
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="p-16 text-center bg-[#161616] border border-white/5 rounded-xs space-y-3">
            <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-tight">
              KHÔNG TÌM THẤY SẢN PHẨM PHÙ HỢP
            </h3>
            <p className="text-xs text-[#A8A8A8]">
              Thử tìm kiếm với từ khóa khác hoặc liên hệ trực tiếp hotline 0979 707 033 để đặt hàng theo yêu cầu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
