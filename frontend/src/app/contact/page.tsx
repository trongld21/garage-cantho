'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Vui lòng nhập họ tên';
    if (!formData.phone.trim() || formData.phone.length < 9)
      errs.phone = 'Vui lòng nhập số điện thoại hợp lệ';
    if (!formData.message.trim()) errs.message = 'Vui lòng nhập nội dung cần tư vấn';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="gold">THÔNG TIN LIÊN HỆ</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-tight">
            GHÉ THĂM GARAGE <br />
            <span className="text-gold-gradient">& GỬI YÊU CẦU TƯ VẤN</span>
          </h1>
          <p className="text-base text-[#A8A8A8]">
            Đội ngũ chăm sóc khách hàng của Tây Đô Auto Car luôn sẵn sàng lắng nghe và tư vấn giải pháp tốt nhất cho chiếc xe của bạn.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold text-[#F5F5F5] uppercase tracking-tight">
              TÂY ĐÔ AUTO CAR
            </h2>

            <div className="space-y-4 text-sm text-[#A8A8A8]">
              <div className="flex items-start space-x-4 p-5 bg-[#161616] rounded-xs border border-white/5">
                <MapPin className="w-5 h-5 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Địa Chỉ Garage:</strong>
                  1–2 Nguyễn Văn Lưu, Khu TĐC Văn Hóa Tây Đô, Cái Răng, Cần Thơ
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-[#161616] rounded-xs border border-white/5">
                <Phone className="w-5 h-5 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Hotline Tổng Đài & Cứu Hộ:</strong>
                  <a href="tel:0979707033" className="text-[#C7A35A] font-bold text-base hover:underline">
                    0979 707 033 (24/7)
                  </a>
                  <a href="tel:0923112399" className="block text-[#C7A35A] font-bold text-base hover:underline">
                    0923 112 399
                  </a>
                </div>
              </div>


              <div className="flex items-start space-x-4 p-5 bg-[#161616] rounded-xs border border-white/5">
                <Clock className="w-5 h-5 text-[#C7A35A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Thời Gian Hoạt Động:</strong>
                  08:00 - 20:00 (Tất cả các ngày trong tuần)
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#161616] p-8 border border-white/10 rounded-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#F5F5F5] uppercase tracking-tight">
                  GỬI THƯ THÀNH CÔNG!
                </h3>
                <p className="text-sm text-[#A8A8A8]">
                  Garage đã nhận được nội dung tin nhắn của bạn và sẽ gọi điện lại phản hồi trong thời gian sớm nhất.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Gửi Tin Nhắn Khác
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-[#F5F5F5] uppercase tracking-tight border-b border-white/10 pb-4">
                  GỬI TIN NHẮN TƯ VẤN
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Họ và Tên *"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                  />

                  <Input
                    label="Số Điện Thoại *"
                    placeholder="0912 345 678"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                  />
                </div>

                <Input
                  label="Email Liên Hệ"
                  placeholder="email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#A8A8A8] uppercase tracking-wider">
                    Nội Dung Cần Hỗ Trợ *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập chi tiết yêu cầu báo giá, câu hỏi về dịch vụ hoặc đặt mua phụ tùng..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#202020] text-[#F5F5F5] placeholder-[#666666] text-sm p-4 rounded-xs border border-white/10 focus:outline-none focus:border-[#C7A35A]"
                  />
                  {errors.message && <p className="text-xs text-[#E53935] font-medium">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  GỬI THÔNG TIN NGAY
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Map Frame */}
        <div className="h-96 rounded-xs overflow-hidden border border-white/10 bg-[#161616]">
          <iframe
            title="Garage Location Map"
            src="https://www.google.com/maps?q=1-2%20Nguy%E1%BB%85n%20V%C4%83n%20L%C6%B0u%2C%20Khu%20T%C4%90C%20V%C4%83n%20H%C3%B3a%20T%C3%A2y%20%C4%90%C3%B4%2C%20C%C3%A1i%20R%C4%83ng%2C%20C%E1%BA%A7n%20Th%C6%A1&amp;output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
            allowFullScreen={false}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
