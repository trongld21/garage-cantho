'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

export function BookingButton({ children = 'Đặt lịch tư vấn', className = 'auto-button' }: { children?: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return <><button className={className} onClick={() => setOpen(true)}>{children}<ArrowUpRight size={17} /></button><BookingModal isOpen={open} onClose={() => setOpen(false)} /></>;
}
