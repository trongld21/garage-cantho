import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Garage Ô Tô Tây Nam Bộ Cần Thơ',
  description: 'Hệ thống quản trị dữ liệu động Garage Ô Tô Tây Nam Bộ',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
