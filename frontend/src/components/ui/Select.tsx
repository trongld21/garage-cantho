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
          <label className="block text-xs font-semibold text-[#A8A8A8] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            className={twMerge(
              clsx(
                'w-full h-12 bg-[#202020] text-[#F5F5F5] text-sm px-4 pr-10 rounded-xs border border-white/10 transition-colors focus:outline-none focus:border-[#C7A35A] appearance-none cursor-pointer',
                error && 'border-[#E53935] focus:border-[#E53935]',
                className
              )
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-[#202020] text-[#666666]">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#202020] text-[#F5F5F5]">
                {opt.label}
              </option>
            ))}
            {children}
          </select>
          <div className="absolute right-3.5 text-[#A8A8A8] pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-[#E53935] font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
