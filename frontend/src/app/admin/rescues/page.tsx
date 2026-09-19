'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { RescueItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, Phone, MapPin, Navigation, CheckCircle2, Clock, RefreshCw } from 'lucide-react';

export default function AdminRescuesPage() {
  const [rescues, setRescues] = useState<RescueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRescues = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getRescueRequests();
      setRescues(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRescues();
  }, []);

  const handleUpdateStatus = async (id: number, status: RescueItem['status']) => {
    await apiService.updateRescueStatus(id, status);
    loadRescues();
  };

  return (
    <div className="space-y-6">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="red">CỨU HỘ KHẨN CẤP 24/7</Badge>
          <h1 className="text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-tight mt-1">
            DANH SÁCH YÊU CẦU CỨU HỘ ĐIỀU XE
          </h1>
          <p className="text-xs text-[#A8A8A8]">
            Quản lý yêu cầu sự cố khẩn cấp, tọa độ GPS & điều động xe sàn trượt ứng cứu.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadRescues}
          isLoading={isLoading}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Làm Mới
        </Button>
      </div>

      {/* Rescues Alert Feed */}
      <div className="space-y-4">
        {rescues.length === 0 ? (
          <div className="p-12 text-center bg-[#161616] border border-white/10 rounded-xs text-[#666666]">
            Hiện tại không có yêu cầu cứu hộ mới nào.
          </div>
        ) : (
          rescues.map((rescue) => (
            <div
              key={rescue.id}
              className="p-6 bg-[#161616] border border-[#E53935]/40 rounded-xs space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="red">{rescue.request_id}</Badge>
                  <span className="text-xs text-[#A8A8A8]">
                    Yêu cầu lúc: {new Date(rescue.created_at).toLocaleTimeString('vi-VN')}
                  </span>
                </div>

                <Badge
                  variant={
                    rescue.status === 'resolved'
                      ? 'emerald'
                      : rescue.status === 'dispatched'
                      ? 'gold'
                      : 'red'
                  }
                >
                  {rescue.status === 'received'
                    ? 'Mới Tiếp Nhận'
                    : rescue.status === 'dispatched'
                    ? 'Đã Điều Xe Sàn Trượt'
                    : rescue.status === 'resolved'
                    ? 'Hoàn Thành Cứu Hộ'
                    : 'Đã Hủy'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-[#A8A8A8] uppercase block">Khách Hàng:</span>
                    <strong className="text-white text-base">{rescue.customer_name}</strong>
                  </div>

                  <div>
                    <span className="text-xs text-[#A8A8A8] uppercase block">Số Điện Thoại Gọi Ngay:</span>
                    <a
                      href={`tel:${rescue.phone}`}
                      className="text-[#E53935] font-extrabold font-mono text-lg hover:underline flex items-center space-x-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{rescue.phone}</span>
                    </a>
                  </div>

                  <div>
                    <span className="text-xs text-[#A8A8A8] uppercase block">Dòng Xe & Sự Cố:</span>
                    <p className="text-white font-semibold">
                      {rescue.car_model || 'Xe chưa rõ'} - <span className="text-[#C7A35A]">{rescue.issue_type}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2 bg-[#202020] p-4 rounded-xs border border-white/5">
                  <span className="text-xs text-[#A8A8A8] uppercase font-bold tracking-wider flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-[#C7A35A]" />
                    <span>Vị Trí Mắc Kẹt & GPS:</span>
                  </span>
                  <p className="text-xs text-white leading-relaxed">{rescue.location}</p>
                  {rescue.issue_description && (
                    <p className="text-xs text-[#A8A8A8] italic border-t border-white/10 pt-2 mt-2">
                      Mô tả thêm: "{rescue.issue_description}"
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                {rescue.status === 'received' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleUpdateStatus(rescue.id, 'dispatched')}
                  >
                    Xác Nhận & Điều Xe Sàn Trượt
                  </Button>
                )}
                {rescue.status === 'dispatched' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(rescue.id, 'resolved')}
                  >
                    Đã Xử Lý Cứu Hộ Xong
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
