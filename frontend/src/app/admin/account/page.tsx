'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuth } from '@/services/auth';
import { apiError } from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
export default function AdminAccount() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const form = new FormData(event.currentTarget);
    setPending(true); setError('');
    try {
      await adminAuth.changePassword({ current_password: String(form.get('current_password')), password: String(form.get('password')), password_confirmation: String(form.get('password_confirmation')) });
      router.replace('/admin');
    } catch (err) { setError(apiError(err)); } finally { setPending(false); }
  }
  return <form className="max-w-lg space-y-5" onSubmit={submit}><h1 className="text-2xl font-bold">Đổi mật khẩu quản trị</h1><p className="text-sm text-gray-400">Đổi mật khẩu ban đầu trước khi sử dụng quản trị. Mật khẩu mới không được để trống. Các phiên đăng nhập khác sẽ hết hiệu lực.</p><Input label="Mật khẩu hiện tại" name="current_password" type="password" autoComplete="current-password" required /><Input label="Mật khẩu mới" name="password" type="password" autoComplete="new-password" maxLength={255} required /><Input label="Nhập lại mật khẩu mới" name="password_confirmation" type="password" autoComplete="new-password" maxLength={255} required />{error && <p role="alert" className="text-red-400">{error}</p>}<Button type="submit" disabled={pending} isLoading={pending}>Lưu mật khẩu mới</Button></form>;
}
