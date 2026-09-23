'use client';

import { useEffect, useRef, useState } from 'react';

export function useApiData<T>(loader: () => Promise<T>, initial: T) {
  const loaderRef = useRef(loader);
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    loaderRef.current()
      .then(value => { if (active) setData(value); })
      .catch(() => { if (active) setError('Không thể tải dữ liệu. Vui lòng thử lại.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []); // loader is intentionally a one-time page request.

  return { data, loading, error };
}

export function usePathSlug(section: string) {
  if (typeof window === 'undefined') return '';
  const match = window.location.pathname.match(new RegExp(`/${section}/([^/]+)`));
  return match ? decodeURIComponent(match[1]) : '';
}

export function useSlugData<T>(section: string, loader: (slug: string) => Promise<T | null>) {
  const slug = usePathSlug(section);
  const loaderRef = useRef(loader);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    let active = true;
    loaderRef.current(slug)
      .then(value => { if (active) setData(value); })
      .catch(() => { if (active) setError('Không thể tải dữ liệu. Vui lòng thử lại.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]); // Each route load resolves exactly one slug.

  return { data, loading, error };
}

export function PageStatus({ loading, error, missing }: { loading: boolean; error?: string; missing?: boolean }) {
  if (!loading && !error && !missing) return null;
  return <main className="auto-container auto-section auto-empty">
    <h1>{loading ? 'Đang tải…' : missing ? 'Không tìm thấy nội dung' : 'Không thể tải dữ liệu'}</h1>
    {error && <p>{error}</p>}
    {missing && <p>Nội dung có thể đã được di chuyển hoặc không còn tồn tại.</p>}
  </main>;
}
