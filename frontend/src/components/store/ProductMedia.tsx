'use client';
import { useState } from 'react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function ProductMedia({ name, image, gallery }: { name: string; image: string; gallery?: string[] }) {
  const images = [...new Set([image, ...(gallery || [])].filter(Boolean))];
  const [active, setActive] = useState(0);
  return <div><div className="auto-detail-image"><ImageWithFallback key={images[active]} src={images[active]} alt={name} fallbackType="product" fetchPriority="high"/></div>{images.length > 1 && <div className="auto-product-thumbnails">{images.map((src, index) => <button key={src} onClick={() => setActive(index)} aria-label={`Xem ảnh ${index + 1} của ${name}`} aria-pressed={active === index}><ImageWithFallback src={src} alt="" loading="lazy" fallbackType="product"/></button>)}</div>}</div>;
}
