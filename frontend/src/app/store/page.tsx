import { apiService } from '@/services/api';
import { ProductCatalog } from '@/components/home/Catalog';
import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Phụ Kiện & Đồ Chơi Ô Tô | Tây Đô Auto Car' };
export const revalidate = 60;
export default async function StorePage({ searchParams }: { searchParams: Promise<{ category?: string; search?: string }> }) {
  const { category, search } = await searchParams;
  const products = await apiService.getProducts();
  return <div className="auto-home"><div className="auto-page-banner"><div className="auto-container"><p><Link href="/">Trang chủ</Link> / Phụ kiện ô tô</p><h1>PHỤ KIỆN & ĐỒ CHƠI Ô TÔ</h1><p>Chọn phụ kiện phù hợp, nâng cấp trải nghiệm trên mỗi hành trình.</p></div></div><div className="auto-container auto-section"><ProductCatalog key={`${category}-${search}`} products={products} collections searchable initialCategory={category} initialSearch={search} /></div></div>;
}
