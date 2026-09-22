'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { adminAuth, AdminUser } from '@/services/auth';
import { apiError } from '@/services/api';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
export function AdminGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<{ path: string; user: AdminUser } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (pathname === '/admin/login') return;
    let active = true;
    adminAuth.me().then(user => {
      if (!active) return;
      if (user.must_change_password && pathname !== '/admin/account') { router.replace('/admin/account'); return; }
      setSession({ path: pathname, user });
      setError('');
    }).catch(err => {
      if (!active) return;
      if (axios.isAxiosError(err) && [401, 403].includes(err.response?.status ?? 0)) router.replace('/admin/login');
      else setError(apiError(err));
    });
    return () => { active = false; };
  }, [pathname, router]);
  useEffect(() => {
    const expired = () => { setSession(null); router.replace('/admin/login'); };
    const changePassword = () => { setSession(null); router.replace('/admin/account'); };
    window.addEventListener('admin-session-expired', expired);
    window.addEventListener('admin-password-required', changePassword);
    return () => { window.removeEventListener('admin-session-expired', expired); window.removeEventListener('admin-password-required', changePassword); };
  }, [router]);
  if (pathname === '/admin/login') return <>{children}</>;
  if (!session || session.path !== pathname) return <div className="p-10 text-white">{error ? <><p role="alert">{error}</p><button onClick={() => window.location.reload()} className="mt-4 underline">Thử lại</button></> : 'Đang kiểm tra phiên đăng nhập…'}</div>;
  return <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex"><AdminSidebar /><div className="flex-1 flex flex-col min-w-0"><AdminHeader user={session.user} /><main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main></div></div>;
}
