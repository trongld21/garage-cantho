'use client';

import React from 'react';
import { Badge } from '../ui/Badge';
import { User, Bell, ShieldCheck } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="h-16 bg-[#161616] border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
          HỆ THỐNG QUẢN TRỊ DỮ LIỆU ĐỘNG • GARAGE TÂY NAM BỘ
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <Badge variant="emerald" size="sm">
          API & DATABASE ONLINE
        </Badge>

        <div className="flex items-center space-x-2 pl-4 border-l border-white/10 text-xs">
          <div className="w-7 h-7 bg-[#202020] text-[#C7A35A] rounded-full flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white font-bold block leading-tight">Quản Trị Viên</span>
            <span className="text-[10px] text-[#A8A8A8] block">admin@garagetaynambo.vn</span>
          </div>
        </div>
      </div>
    </header>
  );
}
