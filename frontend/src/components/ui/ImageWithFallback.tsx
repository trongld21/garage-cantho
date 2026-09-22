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
  const [hasError, setHasError] = useState(false);

  // Reliable High-Res Automotive Fallbacks
  const fallbackImages = {
    car: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    service: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    product: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    rescue: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
  };

  const icons = {
    car: <Car className="w-8 h-8 text-[var(--accent-gold)]" />,
    service: <Wrench className="w-8 h-8 text-[var(--accent-gold)]" />,
    product: <Package className="w-8 h-8 text-[var(--accent-gold)]" />,
    rescue: <ShieldAlert className="w-8 h-8 text-[#E53935]" />,
  };

  if (hasError) {
    return (
      <div className={`w-full h-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col items-center justify-center p-4 text-center space-y-2 ${className}`}>
        {icons[fallbackType]}
        <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">
          TÂY ĐÔ AUTO CAR AUTOMOTIVE
        </span>
      </div>
    );
  }

  return (
    <img
      src={src || fallbackImages[fallbackType]}
      alt={alt || 'European Automotive Care'}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
}
