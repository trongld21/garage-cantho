'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { BookingItem, RescueItem, DashboardStats } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  CalendarCheck,
  ShieldAlert,
  Wrench,
  ShoppingBag,
  Car,
  DollarSign,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [rescues, setRescues] = useState<RescueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [s, b, r] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getBookings(),
        apiService.getRescueRequests(),
      ]);
      setStats(s);
      setBookings(b);
      setRescues(r);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateBookingStatus = async (id: number, newStatus: BookingItem['status']) => {
    await apiService.updateBookingStatus(id, newStatus);
    loadData();
  };

  const handleUpdateRescueStatus = async (id: number, newStatus: RescueItem['status']) => {
    await apiService.updateRescueStatus(id, newStatus);
    loadData();
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Refresh Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="gold">ADMIN PORTAL</Badge>
          <h1 className="text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-tight mt-1">
            BẢNG ĐIỀU KHIỂN TỔNG QUAN
          </h1>
          <p className="text-xs text-[#A8A8A8]">
            Theo dõi trạng thái lịch hẹn, cứu hộ khẩn cấp và hoạt động kinh doanh theo thời gian thực.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadData}
          isLoading={isLoading}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Làm Mới Dữ Liệu
        </Button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#161616] p-6 border border-white/10 rounded-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A8A8]">
              Lịch Hẹn Bảo Dưỡng
            </span>
            <div className="w-9 h-9 bg-[#C7A35A]/10 text-[#C7A35A] rounded-xs flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-extrabold text-[#F5F5F5] font-mono">
              {stats?.total_bookings || 0}
            </span>
            <Badge variant="gold" size="sm">
              {stats?.pending_bookings || 0} Chờ Duyệt
            </Badge>
          </div>
        </div>

        <div className="bg-[#161616] p-6 border border-[#E53935]/30 rounded-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
              Yêu Cầu Cứu Hộ 24/7
            </span>
            <div className="w-9 h-9 bg-[#E53935]/10 text-[#E53935] rounded-xs flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-extrabold text-[#F5F5F5] font-mono">
              {stats?.active_rescues || 0}
            </span>
            <Badge variant="red" size="sm">
              Ứng Cứu Khẩn Cấp
            </Badge>
          </div>
        </div>

        <div className="bg-[#161616] p-6 border border-white/10 rounded-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A8A8]">
              Xe Trong Showroom
            </span>
            <div className="w-9 h-9 bg-[#202020] text-white rounded-xs flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-[#F5F5F5] font-mono block">
            {stats?.total_cars || 0}
          </span>
        </div>

        <div className="bg-[#161616] p-6 border border-white/10 rounded-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A8A8]">
              Ước Tính Doanh Thu
            </span>
            <div className="w-9 h-9 bg-[#C7A35A]/10 text-[#C7A35A] rounded-xs flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-[#C7A35A] font-mono block">
            {stats?.estimated_revenue?.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      {/* Emergency Rescue Dispatch Alert Feed */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-[#E53935] animate-pulse" />
          <h2 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight">
            YÊU CẦU CỨU HỘ KHẨN CẤP 24/7 MỚI NHẤT
          </h2>
        </div>

        <div className="space-y-3">
          {rescues.map((rescue) => (
            <div
              key={rescue.id}
              className="p-5 bg-[#161616] border border-[#E53935]/30 rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Badge variant="red">{rescue.request_id}</Badge>
                  <strong className="text-base text-white">{rescue.customer_name}</strong>
                  <a
                    href={`tel:${rescue.phone}`}
                    className="text-xs font-bold text-[#E53935] hover:underline flex items-center space-x-1 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{rescue.phone}</span>
                  </a>
                </div>

                <p className="text-xs text-[#F5F5F5] font-semibold">
                  Sự cố: <span className="text-[#C7A35A]">{rescue.issue_type}</span> ({rescue.car_model || 'Chưa rõ loại xe'})
                </p>

                <p className="text-xs text-[#A8A8A8] flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C7A35A] flex-shrink-0" />
                  <span>{rescue.location}</span>
                </p>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                {rescue.status === 'received' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleUpdateRescueStatus(rescue.id, 'dispatched')}
                  >
                    Điều Xe Sàn Trượt
                  </Button>
                )}
                {rescue.status === 'dispatched' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateRescueStatus(rescue.id, 'resolved')}
                  >
                    Đã Xử Lý Xong
                  </Button>
                )}
                {rescue.status === 'resolved' && (
                  <Badge variant="emerald" size="md">
                    Hoàn Tất Cứu Hộ
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight flex items-center space-x-2">
            <CalendarCheck className="w-5 h-5 text-[#C7A35A]" />
            <span>DANH SÁCH LỊCH HẸN BẢO DƯỠNG MỚI</span>
          </h2>

          <a href="/admin/bookings" className="text-xs text-[#C7A35A] hover:underline uppercase tracking-wider font-bold">
            Xem Tất Cả Lịch Hẹn &rarr;
          </a>
        </div>

        <div className="bg-[#161616] border border-white/10 rounded-xs overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A8A8A8]">
            <thead className="bg-[#202020] text-[#F5F5F5] uppercase tracking-wider font-bold border-b border-white/10">
              <tr>
                <th className="p-4">Mã Hẹn</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Số Điện Thoại</th>
                <th className="p-4">Tên Dịch Vụ</th>
                <th className="p-4">Ngày / Giờ Hẹn</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#202020]/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#C7A35A]">{b.booking_id}</td>
                  <td className="p-4 font-bold text-white">{b.customer_name}</td>
                  <td className="p-4 font-mono">{b.phone}</td>
                  <td className="p-4 font-medium text-white">{b.service_name}</td>
                  <td className="p-4 font-mono">
                    {b.booking_time} - {b.booking_date}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        b.status === 'completed'
                          ? 'emerald'
                          : b.status === 'confirmed' || b.status === 'in_progress'
                          ? 'gold'
                          : b.status === 'cancelled'
                          ? 'red'
                          : 'dark'
                      }
                    >
                      {b.status === 'pending'
                        ? 'Chờ Duyệt'
                        : b.status === 'confirmed'
                        ? 'Đã Xác Nhận'
                        : b.status === 'in_progress'
                        ? 'Đang Sửa Chữa'
                        : b.status === 'completed'
                        ? 'Hoàn Tất'
                        : 'Đã Hủy'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {b.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                        className="px-2.5 py-1 bg-[#C7A35A] text-[#0A0A0A] font-bold text-[10px] uppercase rounded-xs hover:bg-[#D4B26A]"
                      >
                        Xác Nhận
                      </button>
                    )}
                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                        className="px-2.5 py-1 bg-emerald-500 text-white font-bold text-[10px] uppercase rounded-xs hover:bg-emerald-600"
                      >
                        Hoàn Thành
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
