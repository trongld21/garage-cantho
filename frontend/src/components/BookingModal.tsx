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
      title="ĐẶT LỊCH TƯ VẤN & LẮP ĐẶT"
      subtitle="Chủ động chọn khung giờ hẹn • Tây Đô Auto Car Cần Thơ"
      maxWidth="2xl"
    >
      <BookingWizard onSuccessClose={onClose} initialServiceId={initialServiceId} />
    </Modal>
  );
}
