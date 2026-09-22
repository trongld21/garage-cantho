'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { adminAuth, AdminUser } from '@/services/auth';
import { apiError } from '@/services/api';
export function AdminHeader({ user }: { user: AdminUser }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function logout() {
    setPending(true); setError('');
    try { await adminAuth.logout(); window.dispatchEvent(new Event('admin-session-expired')); router.replace('/admin/login'); }
    catch (err) { setError(apiError(err)); setPending(false); }
  }
  return <header className="bg-[#161616] border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4"><div><strong className="block text-white">{user.name}</strong><small className="text-gray-400">{user.email}</small></div><div className="flex items-center gap-4 text-sm"><Link href="/admin/account" className="text-[#C7A35A]">Đổi mật khẩu</Link><button onClick={logout} disabled={pending} className="border border-white/20 px-3 py-2 rounded disabled:opacity-50">{pending ? 'Đang đăng xuất…' : 'Đăng xuất'}</button></div>{error && <p role="alert" className="text-red-400 w-full">{error}</p>}</header>;
}
