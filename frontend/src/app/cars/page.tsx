'use client';

import { apiService } from '@/services/api';
import { CarCatalog } from '@/components/home/Catalog';
import Link from 'next/link';
import { PageStatus, useApiData } from '@/lib/use-static-data';

export default function CarsPage() {
  const { data: cars, loading, error } = useApiData(() => apiService.getCars(), []);
  const query = typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search);
  const type = query.get('type') || undefined;
  const brand = query.get('brand') || undefined;
  if (loading || error) return <PageStatus loading={loading} error={error} />;
  return <div className="auto-home"><div className="auto-page-banner"><div className="auto-container"><p><Link href="/">Trang chủ</Link> / Hãng xe</p><h1>MUA BÁN & CHO THUÊ XE</h1><p>Khám phá các dòng xe tại Tây Đô Auto Car Cần Thơ.</p></div></div><div className="auto-container auto-section"><CarCatalog key={`${brand}-${type}`} cars={cars} initialBrand={brand} initialType={type} /></div></div>;
}
