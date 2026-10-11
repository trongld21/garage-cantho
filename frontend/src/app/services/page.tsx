'use client';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { PageStatus, useApiData } from '@/lib/use-static-data';
import { ServiceGrid } from '@/components/sections/ServiceGrid';

export default function ServicesPage() {
  const { data: services, loading, error } = useApiData(() => apiService.getServices(), []);
  return <div className="auto-home"><div className="auto-page-banner"><div className="auto-container"><p><Link href="/">Trang chủ</Link> / Dịch vụ nâng cấp</p><h1>NÂNG CẤP <em>KHÔNG GIỚI HẠN.</em></h1><p>Màn hình, đèn, âm thanh, camera và phụ kiện nội ngoại thất. Tư vấn giải pháp phù hợp với dòng xe, nhu cầu và ngân sách.</p></div></div><section className="auto-container auto-section"><PageStatus loading={loading} error={error}/><ServiceGrid services={services}/>{!loading && !error && services.length === 0 && <p className="auto-empty">Danh mục dịch vụ đang được cập nhật.</p>}</section></div>;
}
