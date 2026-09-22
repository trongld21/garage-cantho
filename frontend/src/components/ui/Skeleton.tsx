'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        clsx('animate-pulse bg-[var(--bg-surface)] rounded-xs', className)
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs overflow-hidden p-4 space-y-4">
      <Skeleton className="w-full h-48 rounded-xs" />
      <Skeleton className="w-1/3 h-4" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-12" />
    </div>
  );
}
