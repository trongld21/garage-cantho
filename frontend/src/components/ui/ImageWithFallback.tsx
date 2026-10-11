'use client';

import React, { useState } from 'react';
import { Car, Wrench, ShieldAlert, Package } from 'lucide-react';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'car' | 'service' | 'product' | 'rescue';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackType = 'car',
  ...props
}: ImageWithFallbackProps) {
  const [failedSrc, setFailedSrc] = useState<ImageWithFallbackProps['src']>();

  const icons = {
    car: <Car className="w-8 h-8 text-[var(--accent-gold)]" />,
    service: <Wrench className="w-8 h-8 text-[var(--accent-gold)]" />,
    product: <Package className="w-8 h-8 text-[var(--accent-gold)]" />,
    rescue: <ShieldAlert className="w-8 h-8 text-[#E53935]" />,
  };

  if ((failedSrc && failedSrc === src) || !src) {
    return (
      <div className={`w-full h-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center p-4 text-center space-y-2 ${className}`}>
        {icons[fallbackType]}
        <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">
          Hình ảnh đang cập nhật
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Tây Đô Auto Car'}
      onError={() => setFailedSrc(src)}
      className={className}
      {...props}
    />
  );
}
