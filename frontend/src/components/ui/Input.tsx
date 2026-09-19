'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-[#A8A8A8] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#A8A8A8] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              clsx(
                'w-full h-12 bg-[#202020] text-[#F5F5F5] placeholder-[#666666] text-sm px-4 rounded-xs border border-white/10 transition-colors focus:outline-none focus:border-[#C7A35A]',
                leftIcon && 'pl-10',
                error && 'border-[#E53935] focus:border-[#E53935]',
                className
              )
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-[#E53935] font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#666666]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
