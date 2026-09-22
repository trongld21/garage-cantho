'use client';
import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Modal } from '@/components/ui/Modal';
import type { ServiceItem } from '@/types';
import Link from 'next/link';

export function Gallery({ services }: { services: ServiceItem[] }) {
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const categories = ['all', ...new Set(services.map(service => service.category))];
  const visible = category === 'all' ? services : services.filter(service => service.category === category);
  const item = active === null ? null : visible[active];
  const move = useCallback((direction: number) => {
    if (visible.length) setActive(current => ((current ?? 0) + direction + visible.length) % visible.length);
  }, [visible.length]);
  useEffect(() => {
    if (active === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, move]);

  return <>
    <div className="auto-gallery-tabs" aria-label="Lọc thư viện ảnh">{categories.map(value => <button key={value} className={value === category ? 'active' : ''} aria-pressed={value === category} onClick={() => { setCategory(value); setActive(null); }}>{value === 'all' ? 'Tất cả hình ảnh' : value}</button>)}</div>
    <div className="auto-gallery">{visible.map((service, index) => <button key={service.id} className="auto-gallery-item" onClick={() => setActive(index)} aria-label={`Xem ảnh ${service.name}`}><ImageWithFallback src={service.image} alt={service.name} loading="lazy" fallbackType="service" /><span><small>KHÁM PHÁ DỊCH VỤ</small><strong>{service.name}</strong></span><ArrowUpRight className="auto-gallery-arrow" size={21} /></button>)}</div>
    {visible.length === 0 && <p className="auto-empty">Hình ảnh đang được cập nhật.</p>}
    <Modal isOpen={Boolean(item)} onClose={close} title={item?.name} maxWidth="4xl">{item && <div className="auto-gallery-preview"><ImageWithFallback src={item.image} alt={item.name} /><p>{item.summary}</p><div className="auto-gallery-pagination"><button aria-label="Ảnh trước" onClick={() => move(-1)}><ChevronLeft /></button><span aria-live="polite">{(active ?? 0) + 1} / {visible.length}</span><Link href={`/services/${item.slug}`} className="auto-button">Xem dịch vụ<ArrowUpRight size={16} /></Link><button aria-label="Ảnh tiếp theo" onClick={() => move(1)}><ChevronRight /></button></div></div>}</Modal>
  </>;
}
