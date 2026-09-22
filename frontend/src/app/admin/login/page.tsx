'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuth } from '@/services/auth';
import { apiError } from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const form = new FormData(event.currentTarget);
    setPending(true); setError('');
    try {
      const user = await adminAuth.login(String(form.get('email')), String(form.get('password')));
      router.replace(user.must_change_password ? '/admin/account' : '/admin');
    } catch (err) { setError(apiError(err)); } finally { setPending(false); }
  }
  return <div className="min-h-[70vh] flex items-center justify-center p-6"><form className="w-full max-w-md p-8 space-y-5 bg-[#161616] border border-white/10 rounded" onSubmit={submit}><h1 className="text-2xl font-bold text-white">Đăng nhập quản trị</h1><p className="text-sm text-gray-400">Tây Đô Auto Car</p><Input label="Email" name="email" type="email" autoComplete="username" required maxLength={255} /><Input label="Mật khẩu" name="password" type="password" autoComplete="current-password" required maxLength={255} />{error && <p role="alert" className="text-red-400">{error}</p>}<Button type="submit" isLoading={pending} disabled={pending}>Đăng nhập</Button></form></div>;
}
