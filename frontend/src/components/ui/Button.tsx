'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A35A] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider rounded-sm select-none';

    const variants = {
      primary:
        'bg-[#C7A35A] text-[#0A0A0A] hover:bg-[#D4B26A] shadow-md shadow-[#C7A35A]/10 active:scale-[0.99]',
      secondary:
        'bg-[#202020] text-[#F5F5F5] hover:bg-[#2A2A2A] border border-white/10 hover:border-white/20 active:scale-[0.99]',
      outline:
        'bg-transparent text-[#F5F5F5] border border-[#333333] hover:border-[#C7A35A] hover:text-[#C7A35A] active:scale-[0.99]',
      ghost:
        'bg-transparent text-[#A8A8A8] hover:text-white hover:bg-[#161616]',
      danger:
        'bg-[#E53935] text-white hover:bg-[#C62828] shadow-md shadow-[#E53935]/20 active:scale-[0.99]',
    };

    const sizes = {
      sm: 'h-10 px-4 text-xs space-x-1.5',
      md: 'h-12 px-6 text-sm space-x-2',
      lg: 'h-14 px-8 text-base space-x-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
