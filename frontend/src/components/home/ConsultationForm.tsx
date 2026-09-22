'use client';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useServices } from '@/lib/use-services';
import { apiService } from '@/services/api';

export function ConsultationForm() {
  const accessoryServices = useServices();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState('');
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' });
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const phone = String(form.get('phone')).replace(/[\s.-]/g, '');
    if (!/^(0\d{9}|\+84\d{9})$/.test(phone)) { setError('Vui lòng nhập số điện thoại Việt Nam hợp lệ.'); return; }
    const name = String(form.get('name')).trim();
    const date = String(form.get('date'));
    const time = String(form.get('time'));
    if (!name) { setError('Vui lòng nhập họ tên.'); return; }
    if (new Date(`${date}T${time}:00+07:00`).getTime() <= Date.now()) { setError('Vui lòng chọn lịch hẹn trong tương lai.'); return; }
    setPending(true); setError('');
    try {
      const result = await apiService.createBooking({ customer_name: name, phone, booking_date: date, booking_time: time, service_name: String(form.get('service')), note: String(form.get('note') || '') });
      setReceipt(result.booking_id);
    } catch {
      setError('Chưa gửi được yêu cầu. Vui lòng thử lại hoặc gọi 0979 707 033.');
    } finally { setPending(false); }
  }
  if (receipt) return <div className="auto-form-success" role="status"><CheckCircle2 size={35} /><h3>Đã nhận yêu cầu tư vấn</h3><p>Mã yêu cầu: {receipt}. Garage sẽ liên hệ để xác nhận lịch hẹn.</p><button className="auto-button" onClick={() => setReceipt('')}>Gửi yêu cầu khác</button></div>;
  return <form className="auto-consult-form" onSubmit={submit}><h3>ĐĂNG KÝ TƯ VẤN</h3><p>Để lại thông tin và thời gian bạn muốn ghé garage.</p><div className="auto-form-grid"><label>Họ và tên *<input name="name" autoComplete="name" placeholder="Nhập họ tên" required maxLength={255} /></label><label>Số điện thoại *<input name="phone" type="tel" autoComplete="tel" placeholder="Nhập số điện thoại" required maxLength={20} /></label></div><label>Dịch vụ quan tâm<select name="service" required><option value="">Chọn dịch vụ cần tư vấn</option>{accessoryServices.map(service => <option key={service.slug}>{service.name}</option>)}</select></label><div className="auto-form-grid"><label>Ngày hẹn *<input name="date" type="date" required min={today} /></label><label>Khung giờ *<select name="time" required>{['08:00', '09:00', '10:00', '11:00', '13:30', '14:30', '15:30', '16:30', '17:30', '19:00'].map(t => <option key={t}>{t}</option>)}</select></label></div><label>Nội dung cần tư vấn<textarea name="note" rows={2} placeholder="Dòng xe, phụ kiện hoặc dịch vụ bạn cần…" maxLength={3000} /></label>{error && <p className="auto-form-error" role="alert">{error}</p>}<button className="auto-button" disabled={pending}>{pending ? 'Đang gửi yêu cầu…' : 'Gửi yêu cầu tư vấn'}<ArrowUpRight size={17} /></button><small>Thông tin được sử dụng để liên hệ tư vấn và xác nhận lịch hẹn.</small></form>;
}
