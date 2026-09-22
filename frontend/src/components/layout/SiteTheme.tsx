'use client';
import { usePathname } from 'next/navigation';
export function SiteTheme({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className={pathname.startsWith('/admin') ? 'contents' : 'public-site flex min-h-screen flex-col'}>{children}</div>;
}
