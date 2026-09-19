'use client';

import React from 'react';
import { Modal } from './ui/Modal';
import { BookingWizard } from './booking/BookingWizard';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialServiceId,
}: BookingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ĐẶT LỊCH BẢO DƯỠNG TRỰC TUYẾN"
      subtitle="Chủ động chọn khung giờ hẹn • Garage Tây Nam Bộ Cần Thơ"
      maxWidth="2xl"
    >
      <BookingWizard onSuccessClose={onClose} initialServiceId={initialServiceId} />
    </Modal>
  );
}
