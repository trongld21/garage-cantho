'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  ShieldAlert,
  Wrench,
  ShoppingBag,
  Car,
  Newspaper,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Tổng Quan Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="w-4 h-4" />,
      exact: true,
    },
    {
      name: 'Đặt Lịch Bảo Dưỡng',
      href: '/admin/bookings',
      icon: <CalendarCheck className="w-4 h-4" />,
      badge: 'Lịch Mới',
    },
    {
      name: 'Cứu Hộ Khẩn Cấp 24/7',
      href: '/admin/rescues',
      icon: <ShieldAlert className="w-4 h-4 text-[#E53935]" />,
      badge: 'Khẩn Cấp',
      isDanger: true,
    },
    {
      name: 'Dịch Vụ Garage',
      href: '/admin/services',
      icon: <Wrench className="w-4 h-4" />,
    },
    {
      name: 'Cửa Hàng Phụ Tùng',
      href: '/admin/store',
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      name: 'Showroom Xe',
      href: '/admin/cars',
      icon: <Car className="w-4 h-4" />,
    },
    {
      name: 'Tin Tức & Bài Viết',
      href: '/admin/posts',
      icon: <Newspaper className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-[#161616] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 z-30">
      {/* Top Header */}
      <div>
        <div className="p-6 border-b border-white/10 flex items-center space-x-3">
          <div className="w-9 h-9 bg-[#C7A35A] text-[#0A0A0A] rounded-xs flex items-center justify-center font-extrabold text-sm">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-[#F5F5F5] uppercase tracking-tight block leading-tight">
              TÂY ĐÔ <span className="text-[#C7A35A]">ADMIN</span>
            </span>
            <span className="text-[9px] text-[#A8A8A8] uppercase tracking-widest block font-medium">
              Automotive Management
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  isActive
                    ? 'bg-[#C7A35A] text-[#0A0A0A]'
                    : item.isDanger
                    ? 'text-[#E53935] hover:bg-[#E53935]/10'
                    : 'text-[#A8A8A8] hover:text-[#F5F5F5] hover:bg-[#202020]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={isActive ? 'dark' : item.isDanger ? 'red' : 'gold'}
                    size="sm"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-2 px-3.5 py-2.5 text-xs text-[#A8A8A8] hover:text-[#C7A35A] hover:bg-[#202020] rounded-xs transition-colors font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Website User</span>
        </Link>
      </div>
    </aside>
  );
}
