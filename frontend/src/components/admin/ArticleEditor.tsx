'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { apiService, apiError } from '@/services/api';
const CKEditorInput = dynamic(() => import('./CKEditorInput'), { ssr: false, loading: () => <p>Đang tải trình soạn thảo…</p> });
export interface ArticleEditorProps { value: string; onChange: (value: string) => void; disabled?: boolean; }
export function ArticleEditor(props: ArticleEditorProps) {
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    apiService.getEditorConfig().then(config => { if (active) setLicenseKey(config.license_key || ''); }).catch(err => { if (active) { setError(apiError(err)); setLicenseKey(''); } });
    return () => { active = false; };
  }, []);
  if (licenseKey === null) return <p>Đang tải cấu hình soạn thảo…</p>;
  if (licenseKey) return <CKEditorInput {...props} licenseKey={licenseKey} />;
  return <div className="space-y-2"><p className="text-sm text-amber-300">{error || 'CKEditor đã tích hợp, chờ cấu hình khóa bản quyền. Bạn vẫn có thể viết văn bản hoặc HTML bên dưới.'}</p><textarea aria-label="Nội dung bài viết" rows={12} value={props.value} onChange={e => props.onChange(e.target.value)} disabled={props.disabled} maxLength={200000} className="w-full bg-[#202020] text-white text-sm p-3 border border-white/10 rounded" /></div>;
}
