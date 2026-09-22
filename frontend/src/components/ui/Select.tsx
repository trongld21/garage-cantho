'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, className, children, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            className={twMerge(
              clsx(
                'w-full h-12 bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm px-4 pr-10 rounded-xs border border-[var(--border-subtle)] transition-colors focus:outline-none focus:border-[var(--accent-gold)] appearance-none cursor-pointer',
                error && 'border-[#E53935] focus:border-[#E53935]',
                className
              )
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-[var(--bg-surface)] text-[var(--text-muted)]">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                {opt.label}
              </option>
            ))}
            {children}
          </select>
          <div className="absolute right-3.5 text-[var(--text-secondary)] pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-[#E53935] font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
