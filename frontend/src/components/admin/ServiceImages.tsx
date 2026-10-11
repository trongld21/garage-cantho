'use client';
import { useState } from 'react';
import { apiService, apiError } from '@/services/api';

export function ServiceImages({ image, gallery, disabled, onChange, onBusy }: {
  image?: string; gallery?: string[] | null; disabled: boolean;
  onChange: (image: string, gallery: string[]) => void; onBusy: (busy: boolean) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const images = [...new Set([image, ...(gallery || [])].filter((url): url is string => !!url))];
  return <div className="space-y-3">
    <label className="block text-xs font-semibold text-[#A8A8A8] uppercase" htmlFor="service-images">Ảnh dịch vụ</label>
    <p className="text-xs text-[#A8A8A8]">Chọn nhiều ảnh JPG, PNG hoặc WebP. Tối đa 2 MB/ảnh, 10 ảnh/lần và 30 ảnh/dịch vụ.</p>
    <input id="service-images" type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={busy || disabled} className="text-sm text-white w-full" onChange={async event => {
      const files = Array.from(event.target.files || []);
      event.target.value = '';
      if (!files.length) return;
      if (files.length > 10 || images.length + files.length > 30 || files.some(file => file.size > 2 * 1024 * 1024)) {
        setError('Vui lòng chọn tối đa 10 ảnh/lần, 2 MB/ảnh và tổng cộng tối đa 30 ảnh.'); return;
      }
      setBusy(true); onBusy(true); setError('');
      try {
        const uploaded = await apiService.uploadServiceImages(files);
        const next = [...images, ...uploaded];
        onChange(image || next[0], next);
      } catch (err) { setError(apiError(err)); }
      finally { setBusy(false); onBusy(false); }
    }} />
    {busy && <p role="status" className="text-sm text-[#C7A35A]">Đang tải ảnh lên…</p>}
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{images.map(url => <div key={url} className="border border-white/10 p-2 space-y-2">
      <a href={url} target="_blank" rel="noreferrer"><img src={url} alt="Ảnh dịch vụ" className="h-28 w-full object-cover" /></a>
      <button type="button" disabled={busy || disabled} className="text-xs text-[#C7A35A]" onClick={() => onChange(url, images)}>{url === image ? '✓ Ảnh đại diện' : 'Chọn làm đại diện'}</button>
      <button type="button" disabled={busy || disabled} className="block text-xs text-red-400" onClick={() => {
        const next = images.filter(item => item !== url);
        onChange(image === url ? next[0] || '' : image || '', next);
      }}>Xóa khỏi dịch vụ</button>
    </div>)}</div>
  </div>;
}
