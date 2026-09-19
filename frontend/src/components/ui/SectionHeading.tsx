'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = '',
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 ${
        centered ? 'text-center md:text-center items-center justify-center' : ''
      } ${className}`}
    >
      <div className={`space-y-3 ${centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2"
          >
            <span className="w-8 h-[2px] bg-[#C7A35A]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C7A35A]">
              {eyebrow}
            </span>
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F5F5F5] uppercase leading-tight"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A8A8A8] font-normal leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {action && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 md:mt-0 flex-shrink-0"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
