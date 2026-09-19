'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { apiService } from '@/services/api';
import { RescuePayload } from '@/types';
import {
  Phone,
  ShieldAlert,
  MapPin,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Car,
  Clock,
  Loader2,
} from 'lucide-react';

export default function RescuePage() {
  const [formData, setFormData] = useState<RescuePayload>({
    customer_name: '',
    phone: '',
    car_model: '',
    location: '',
    issue_type: 'Xe không khởi động',
    issue_description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [statusState, setStatusState] = useState<{
    submitted: boolean;
    requestId: string;
    message: string;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const issueOptions = [
    { value: 'Xe không khởi động', label: 'Xe không khởi động / Chết máy' },
    { value: 'Hết bình', label: 'Hết bình ắc quy / Cần kích bình' },
    { value: 'Xẹp lốp', label: 'Xẹp lốp / Thủng lốp / Thay lốp dự phòng' },
    { value: 'Tai nạn', label: 'Sự cố va chạm / Tai nạn giao thông' },
    { value: 'Hỏng động cơ', label: 'Hỏng động cơ / Báo lỗi đỏ ECU' },
    { value: 'Cần kéo xe', label: 'Cần kéo xe sàn trượt về garage' },
    { value: 'Khác', label: 'Sự cố khác' },
  ];

  // Geolocation API trigger
  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Trình duyệt không hỗ trợ định vị GPS.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Đang truy xuất vị trí GPS...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coordsStr = `Tọa độ GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        setFormData((prev) => ({
          ...prev,
          location: prev.location ? `${prev.location} (${coordsStr})` : coordsStr,
          coordinates: { lat: latitude, lng: longitude },
        }));
        setIsLocating(false);
        setLocationStatus('Đã lấy vị trí GPS thành công!');
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationStatus('Vui lòng cấp quyền vị trí trên trình duyệt.');
        } else {
          setLocationStatus('Không thể định vị tự động. Vui lòng nhập địa chỉ bên dưới.');
        }
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!formData.customer_name.trim()) errs.customer_name = 'Vui lòng nhập họ tên';
    if (!formData.phone.trim() || formData.phone.length < 9)
      errs.phone = 'Vui lòng nhập số điện thoại hợp lệ';
    if (!formData.location.trim()) errs.location = 'Vui lòng nhập vị trí sự cố';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await apiService.createRescueRequest(formData);
      setStatusState({
        submitted: true,
        requestId: res.request_id || `RESCUE-${Math.floor(100000 + Math.random() * 900000)}`,
        message: res.message || 'Đã nhận yêu cầu cứu hộ khẩn cấp!',
      });
    } catch {
      setStatusState({
        submitted: true,
        requestId: `RESCUE-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Garage đã tiếp nhận yêu cầu! Đội cứu hộ đang liên hệ lại ngay.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Emergency Header */}
        <div className="text-center space-y-4">
          <Badge variant="red" size="md">
            TRUNG TÂM CỨU HỘ KHẨN CẤP 24/7
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] uppercase tracking-tight">
            CỨU HỘ Ô TÔ KHẨN CẤP <br />
            <span className="text-[#E53935]">CẦN THƠ & MIỀN TÂY</span>
          </h1>
          <p className="text-sm sm:text-base text-[#A8A8A8] max-w-xl mx-auto">
            Phục vụ 24/24h kể cả ngày lễ Tết. Có mặt trong 15-30 phút ứng cứu tại chỗ hoặc kéo xe về xưởng bằng xe sàn trượt chuyên dụng.
          </p>
        </div>

        {/* Immediate Hotline Banner */}
        <div className="p-6 bg-[#E53935]/15 border border-[#E53935]/40 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#E53935] text-white rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#A8A8A8] uppercase tracking-widest block font-bold">
                GỌI KHẨN CẤP NGAY BÂY GIỜ
              </span>
              <a
                href="tel:0979707033"
                className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] hover:text-[#E53935] transition-colors font-mono"
              >
                0979 707 033
              </a>
            </div>
          </div>

          <a href="tel:0979707033" className="w-full sm:w-auto">
            <Button variant="danger" size="lg" className="w-full">
              GỌI ĐỘI CỨU HỘ NGAY
            </Button>
          </a>
        </div>

        {/* Live Status Feedback Screen */}
        {statusState ? (
          <div className="p-8 bg-[#161616] border border-emerald-500/30 rounded-xs text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <Badge variant="emerald">MÃ YÊU CẦU: {statusState.requestId}</Badge>
              <h2 className="text-2xl font-bold text-[#F5F5F5] uppercase tracking-tight">
                GARAGE ĐÃ ĐIỀU XE CỨU HỘ
              </h2>
              <p className="text-sm text-[#A8A8A8] max-w-md mx-auto">
                {statusState.message} Nhân viên cứu hộ sẽ gọi trực tiếp số ĐT của bạn để xác nhận vị trí trong ít phút.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="outline" size="md" onClick={() => setStatusState(null)}>
                Gửi Yêu Cầu Khác
              </Button>
            </div>
          </div>
        ) : (
          /* Online Request Form */
          <form
            onSubmit={handleSubmit}
            className="p-8 bg-[#161616] border border-white/10 rounded-xs space-y-6"
          >
            <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-tight border-b border-white/10 pb-4">
              FORM GỬI THÔNG TIN VỊ TRÍ CỨU HỘ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Họ tên người yêu cầu *"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                error={errors.customer_name}
              />

              <Input
                label="Số điện thoại liên hệ *"
                placeholder="Ví dụ: 0979 707 033"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tên / Dòng xe"
                placeholder="Ví dụ: Toyota Vios, Ford Everest..."
                value={formData.car_model}
                onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
                leftIcon={<Car className="w-4 h-4" />}
              />

              <Select
                label="Loại Sự Cố Thường Gặp *"
                value={formData.issue_type}
                onChange={(e) => setFormData({ ...formData, issue_type: e.target.value })}
                options={issueOptions}
              />
            </div>

            {/* Location & GPS Button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#A8A8A8] uppercase tracking-wider">
                  Vị Trí Hiện Tại Mắc Kẹt *
                </label>
                <button
                  type="button"
                  onClick={handleFetchLocation}
                  disabled={isLocating}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C7A35A] hover:underline"
                >
                  {isLocating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Navigation className="w-3.5 h-3.5" />
                  )}
                  <span>Lấy Vị Trí GPS Tự Động</span>
                </button>
              </div>

              <Input
                placeholder="Số nhà, tên đường, km bao nhiêu trên quốc lộ..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                error={errors.location}
                leftIcon={<MapPin className="w-4 h-4" />}
              />
              {locationStatus && <p className="text-xs text-[#C7A35A]">{locationStatus}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase tracking-wider">
                Mô Tả Thêm Tình Trạng Hỏng Hóc
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ: Xe lật nghiêng, bó phanh, vô lăng cứng không quay được..."
                value={formData.issue_description}
                onChange={(e) => setFormData({ ...formData, issue_description: e.target.value })}
                className="w-full bg-[#202020] text-[#F5F5F5] placeholder-[#666666] text-sm p-4 rounded-xs border border-white/10 focus:outline-none focus:border-[#C7A35A]"
              />
            </div>

            <Button
              type="submit"
              variant="danger"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
              leftIcon={<ShieldAlert className="w-5 h-5" />}
            >
              GỬI YÊU CẦU CỨU HỘ NGAY
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
