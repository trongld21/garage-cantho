'use client';

import React, { useState, useEffect } from 'react';
import { apiService, apiError } from '@/services/api';
import { BookingItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Search, CalendarCheck, Phone, User, Car, FileText, Check, X, RefreshCw } from 'lucide-react';

export default function AdminBookingsPage() {
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getBookings();
      setBookings(data);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    apiService.getBookings().then(data => { if (active) setBookings(data); }).catch(err => { if (active) setError(apiError(err)); }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const handleUpdateStatus = async (id: number, status: BookingItem['status']) => {
    try {
    await apiService.updateBookingStatus(id, status);
    loadBookings();
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status });
    }
    } catch (err) { setError(apiError(err)); }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.car_model && b.car_model.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">{error && <p role="alert" className="text-red-400">{error}</p>}
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="gold">QUẢN LÝ LỊCH HẸN</Badge>
          <h1 className="text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-tight mt-1">
            DANH SÁCH ĐẶT LỊCH LẮP ĐẶT PHỤ KIỆN
          </h1>
          <p className="text-xs text-[#A8A8A8]">
            Duyệt lịch hẹn, theo dõi tiến độ lắp đặt và cập nhật thông tin khách hàng.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadBookings}
          isLoading={isLoading}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Làm Mới
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#161616] p-4 border border-white/10 rounded-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <Input
            placeholder="Tìm theo tên, SĐT, mã đặt lịch, dòng xe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xs transition-colors ${
                filterStatus === st
                  ? 'bg-[#C7A35A] text-[#0A0A0A]'
                  : 'bg-[#202020] text-[#A8A8A8] hover:text-white'
              }`}
            >
              {st === 'all'
                ? 'Tất Cả'
                : st === 'pending'
                ? 'Chờ Duyệt'
                : st === 'confirmed'
                ? 'Đã Xác Nhận'
                : st === 'in_progress'
                ? 'Đang Sửa'
                : st === 'completed'
                ? 'Hoàn Thành'
                : 'Đã Hủy'}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#161616] border border-white/10 rounded-xs overflow-x-auto">
        <table className="w-full text-left text-xs text-[#A8A8A8]">
          <thead className="bg-[#202020] text-[#F5F5F5] uppercase tracking-wider font-bold border-b border-white/10">
            <tr>
              <th className="p-4">Mã Đặt Lịch</th>
              <th className="p-4">Khách Hàng</th>
              <th className="p-4">Số Điện Thoại</th>
              <th className="p-4">Tên Dịch Vụ</th>
              <th className="p-4">Thông Tin Xe</th>
              <th className="p-4">Ngày / Giờ Hẹn</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-right">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-[#666666]">
                  Không tìm thấy lịch hẹn phù hợp.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#202020]/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#C7A35A]">{b.booking_id}</td>
                  <td className="p-4 font-bold text-white">{b.customer_name}</td>
                  <td className="p-4 font-mono">{b.phone}</td>
                  <td className="p-4 font-medium text-white">{b.service_name}</td>
                  <td className="p-4 text-xs">
                    {b.car_model || 'Chưa nhập'} ({b.car_year})
                  </td>
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
                        ? 'Đang Sửa'
                        : b.status === 'completed'
                        ? 'Hoàn Thành'
                        : 'Đã Hủy'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-2.5 py-1 bg-[#202020] text-white font-bold text-[10px] uppercase rounded-xs hover:bg-[#2A2A2A]"
                    >
                      Xem Chi Tiết
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <Modal
          isOpen={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
          title={`CHI TIẾT LỊCH HẸN ${selectedBooking.booking_id}`}
        >
          <div className="space-y-6 text-sm">
            <div className="grid grid-cols-2 gap-4 bg-[#202020] p-4 rounded-xs border border-white/10">
              <div>
                <span className="text-[#A8A8A8] text-xs uppercase block">Khách Hàng</span>
                <strong className="text-white">{selectedBooking.customer_name}</strong>
              </div>
              <div>
                <span className="text-[#A8A8A8] text-xs uppercase block">Số Điện Thoại</span>
                <strong className="text-[#C7A35A] font-mono">{selectedBooking.phone}</strong>
              </div>
              <div>
                <span className="text-[#A8A8A8] text-xs uppercase block">Email</span>
                <span className="text-white">{selectedBooking.email || 'Không có'}</span>
              </div>
              <div>
                <span className="text-[#A8A8A8] text-xs uppercase block">Biển Số Xe</span>
                <span className="text-white font-mono">{selectedBooking.license_plate || 'Chưa nhập'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-[#A8A8A8] uppercase font-bold tracking-wider">
                Dịch Vụ & Thời Gian
              </span>
              <div className="p-4 bg-[#202020] rounded-xs space-y-1">
                <p className="font-bold text-white text-base">{selectedBooking.service_name}</p>
                <p className="text-xs text-[#C7A35A] font-mono">
                  Lịch hẹn: {selectedBooking.booking_time} - Ngày {selectedBooking.booking_date}
                </p>
                <p className="text-xs text-[#A8A8A8]">Dòng xe: {selectedBooking.car_model} ({selectedBooking.car_year})</p>
              </div>
            </div>

            {selectedBooking.note && (
              <div className="space-y-1">
                <span className="text-xs text-[#A8A8A8] uppercase font-bold tracking-wider">Ghi Chú Của Khách</span>
                <p className="p-3 bg-[#202020] rounded-xs text-xs text-white italic">{selectedBooking.note}</p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#A8A8A8]">Cập Nhật Trạng Thái:</span>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'confirmed')}
                >
                  Xác Nhận
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                >
                  Hoàn Thành
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'cancelled')}
                >
                  Hủy Lịch
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
