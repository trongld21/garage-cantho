'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { accessoryServices } from '@/lib/offerings';
import { apiService } from '@/services/api';
import { BookingPayload } from '@/types';
import {
  Wrench,
  Car,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
} from 'lucide-react';

export interface BookingWizardProps {
  onSuccessClose?: () => void;
  initialServiceId?: number;
}

export function BookingWizard({ onSuccessClose }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingResult, setBookingResult] = useState<{
    booking_id: string;
    message: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState<BookingPayload>({
    service_name: accessoryServices[0].name,
    car_model: '',
    car_year: '2022',
    license_plate: '',
    booking_date: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }),
    booking_time: '09:00',
    customer_name: '',
    phone: '',
    email: '',
    note: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const servicesList = accessoryServices.map(service => service.name);

  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:30',
    '14:30',
    '15:30',
    '16:30',
    '17:30',
  ];

  const handleNext = () => {
    const errs: Record<string, string> = {};

    if (currentStep === 2) {
      if (!formData.car_model?.trim()) {
        errs.car_model = 'Vui lòng nhập hãng và dòng xe (Ví dụ: Toyota Fortuner)';
      }
    }

    if (currentStep === 5) {
      if (!formData.customer_name?.trim()) {
        errs.customer_name = 'Vui lòng nhập họ và tên';
      }
      if (!formData.phone?.trim() || formData.phone.length < 9) {
        errs.phone = 'Vui lòng nhập số điện thoại hợp lệ';
      }
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (new Date(`${formData.booking_date}T${formData.booking_time}:00+07:00`).getTime() <= Date.now()) {
      setErrors({ submit: 'Vui lòng chọn ngày và giờ hẹn trong tương lai.' });
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const res = await apiService.createBooking(formData);
      setBookingResult({
        booking_id: res.booking_id || `TNB-${Math.floor(100000 + Math.random() * 900000)}`,
        message: res.message || 'Đặt lịch thành công!',
      });
      setCurrentStep(7); // Success Step
    } catch {
      setErrors({ submit: 'Chưa gửi được yêu cầu. Vui lòng thử lại hoặc gọi 0979 707 033 để được hỗ trợ.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsHeader = [
    { num: 1, title: 'Dịch vụ' },
    { num: 2, title: 'Thông tin xe' },
    { num: 3, title: 'Chọn ngày' },
    { num: 4, title: 'Chọn giờ' },
    { num: 5, title: 'Khách hàng' },
    { num: 6, title: 'Xác nhận' },
  ];

  return (
    <div className="w-full space-y-6">
      {errors.submit && <p role="alert" className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errors.submit}</p>}
      {/* Step Indicators Header */}
      {currentStep <= 6 && (
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center justify-between no-scrollbar overflow-x-auto gap-2">
            {stepsHeader.map((st) => (
              <div
                key={st.num}
                className={`flex items-center space-x-1.5 flex-shrink-0 text-xs font-semibold uppercase tracking-wider ${
                  currentStep === st.num
                    ? 'text-[var(--accent-gold)]'
                    : currentStep > st.num
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-xs flex items-center justify-center font-mono text-[11px] ${
                    currentStep === st.num
                      ? 'bg-[var(--accent-gold)] text-[var(--bg-deep)] font-bold'
                      : currentStep > st.num
                      ? 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
                      : 'bg-[var(--bg-graphite)] text-[var(--text-muted)]'
                  }`}
                >
                  {currentStep > st.num ? <Check className="w-3.5 h-3.5" /> : st.num}
                </span>
                <span className="hidden sm:inline">{st.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Contents */}
      <AnimatePresence mode="wait">
        {/* STEP 1: Select Service */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight">
              BƯỚC 1: CHỌN DỊCH VỤ CẦN BẢO DƯỠNG
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {servicesList.map((srv) => {
                const isSelected = formData.service_name === srv;
                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setFormData({ ...formData, service_name: srv })}
                    className={`p-4 text-left border rounded-xs transition-colors flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-[var(--accent-gold)]/10 border-[var(--accent-gold)] text-[var(--text-primary)]'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-subtle)]'
                    }`}
                  >
                    <Wrench className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'}`} />
                    <div>
                      <span className="text-sm font-bold block text-[var(--text-primary)]">{srv}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Vehicle Info */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight">
              BƯỚC 2: THÔNG TIN CHIẾC XE CỦA BẠN
            </h3>

            <div className="space-y-4">
              <Input
                label="Hãng xe & Dòng xe *"
                placeholder="Ví dụ: Toyota Fortuner, Mercedes C200..."
                value={formData.car_model}
                onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
                error={errors.car_model}
                leftIcon={<Car className="w-4 h-4" />}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Năm Sản Xuất"
                  value={formData.car_year}
                  onChange={(e) => setFormData({ ...formData, car_year: e.target.value })}
                  options={[
                    { value: '2024', label: '2024' },
                    { value: '2023', label: '2023' },
                    { value: '2022', label: '2022' },
                    { value: '2021', label: '2021' },
                    { value: '2020', label: '2020' },
                    { value: 'Truoc2020', label: 'Trước 2020' },
                  ]}
                />

                <Input
                  label="Biển Số Xe (Không bắt buộc)"
                  placeholder="Ví dụ: 65A-123.45"
                  value={formData.license_plate}
                  onChange={(e) => setFormData({ ...formData, license_plate: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Select Date */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight">
              BƯỚC 3: CHỌN NGÀY BẢO DƯỠNG
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Ngày Hẹn Đến Garage
              </label>
              <input
                type="date"
                min={new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' })}
                value={formData.booking_date}
                onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                className="w-full h-14 bg-[var(--bg-surface)] text-[var(--text-primary)] px-4 rounded-xs border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)] font-mono text-base"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 4: Select Time Slot */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight">
              BƯỚC 4: CHỌN KHUNG GIỜ HẸN
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => {
                const isSelected = formData.booking_time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, booking_time: slot })}
                    className={`py-3.5 px-3 border rounded-xs font-mono font-bold text-sm text-center transition-colors ${
                      isSelected
                        ? 'bg-[var(--accent-gold)] text-[var(--bg-deep)] border-[var(--accent-gold)]'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-subtle)]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 5: Customer Info */}
        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight">
              BƯỚC 5: THÔNG TIN LIÊN HỆ KHÁCH HÀNG
            </h3>

            <div className="space-y-4">
              <Input
                label="Họ và Tên *"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                error={errors.customer_name}
                leftIcon={<User className="w-4 h-4" />}
              />

              <Input
                label="Số Điện Thoại *"
                placeholder="Ví dụ: 0912 345 678"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
              />

              <Input
                label="Email (Không bắt buộc)"
                placeholder="email@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Ghi Chú Yêu Cầu Riêng
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả hiện trạng xe hoặc yêu cầu tư vấn cụ thể..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm p-4 rounded-xs border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 6: Confirmation Summary */}
        {currentStep === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight">
              BƯỚC 6: XÁC NHẬN THÔNG TIN ĐẶT LỊCH
            </h3>

            <div className="bg-[var(--bg-surface)] p-6 border border-[var(--border-subtle)] rounded-xs space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="text-[var(--text-secondary)]">Dịch Vụ Chọn:</span>
                <strong className="text-[var(--accent-gold)] font-bold">{formData.service_name}</strong>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="text-[var(--text-secondary)]">Thông Tin Xe:</span>
                <strong className="text-[var(--text-primary)] font-bold">{formData.car_model || 'Chưa nhập'} ({formData.car_year})</strong>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="text-[var(--text-secondary)]">Thời Gian Hẹn:</span>
                <strong className="text-[var(--text-primary)] font-bold font-mono">{formData.booking_time} - Ngày {formData.booking_date}</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Khách Hàng:</span>
                <strong className="text-[var(--text-primary)] font-bold">{formData.customer_name} ({formData.phone})</strong>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 7: Success Modal Screen */}
        {currentStep === 7 && bookingResult && (
          <motion.div
            key="step7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <Badge variant="gold">MÃ ĐẶT LỊCH: {bookingResult.booking_id}</Badge>
              <h3 className="text-2xl font-extrabold text-[var(--text-primary)] uppercase tracking-tight">
                ĐẶT LỊCH THÀNH CÔNG!
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                {bookingResult.message}
              </p>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  if (onSuccessClose) onSuccessClose();
                }}
              >
                Hoàn Tất
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      {currentStep <= 6 && (
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Quay Lại
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Tiếp Theo
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              onClick={handleSubmit}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            >
              Xác Nhận Đặt Lịch
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
