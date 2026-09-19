'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'titanium' | 'emerald' | 'red' | 'dark';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({
  variant = 'gold',
  size = 'md',
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-semibold tracking-wider uppercase rounded-xs border';

  const variants = {
    gold: 'bg-[#C7A35A]/10 text-[#C7A35A] border-[#C7A35A]/30',
    titanium: 'bg-[#D6D6D6]/10 text-[#D6D6D6] border-[#D6D6D6]/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    red: 'bg-[#E53935]/10 text-[#E53935] border-[#E53935]/30',
    dark: 'bg-[#202020] text-[#A8A8A8] border-white/10',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </span>
  );
}
