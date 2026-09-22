import { apiService } from '@/services/api';
import { CarCatalog } from '@/components/home/Catalog';
import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Mua Bán & Cho Thuê Xe Ô Tô | Tây Đô Auto Car' };
export const revalidate = 60;
export default async function CarsPage({ searchParams }: { searchParams: Promise<{ type?: string; brand?: string }> }) {
  const { type, brand } = await searchParams;
  const cars = await apiService.getCars();
  return <div className="auto-home"><div className="auto-page-banner"><div className="auto-container"><p><Link href="/">Trang chủ</Link> / Hãng xe</p><h1>MUA BÁN & CHO THUÊ XE</h1><p>Khám phá các dòng xe tại Tây Đô Auto Car Cần Thơ.</p></div></div><div className="auto-container auto-section"><CarCatalog key={`${brand}-${type}`} cars={cars} initialBrand={brand} initialType={type} /></div></div>;
}
