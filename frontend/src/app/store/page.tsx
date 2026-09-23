'use client';

import { apiService } from '@/services/api';
import { ProductCatalog } from '@/components/home/Catalog';
import Link from 'next/link';
import { PageStatus, useApiData } from '@/lib/use-static-data';

export default function StorePage() {
  const { data: products, loading, error } = useApiData(() => apiService.getProducts(), []);
  const query = typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search);
  const category = query.get('category') || undefined;
  const search = query.get('search') || undefined;
  if (loading || error) return <PageStatus loading={loading} error={error} />;
  return <div className="auto-home"><div className="auto-page-banner"><div className="auto-container"><p><Link href="/">Trang chủ</Link> / Phụ kiện ô tô</p><h1>PHỤ KIỆN & ĐỒ CHƠI Ô TÔ</h1><p>Chọn phụ kiện phù hợp, nâng cấp trải nghiệm trên mỗi hành trình.</p></div></div><div className="auto-container auto-section"><ProductCatalog key={`${category}-${search}`} products={products} collections searchable initialCategory={category} initialSearch={search} /></div></div>;
}
