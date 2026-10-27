'use client';

import { useRef, useState } from 'react';
import { apiService, apiError } from '@/services/api';

export function ProductImage({ image, disabled, onChange, onBusy }: {
  image: string; disabled: boolean; onChange: (url: string) => void; onBusy: (busy: boolean) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  return <div className="space-y-3">
    <label htmlFor="product-image" className="block text-xs font-semibold text-[#A8A8A8] uppercase">Ảnh sản phẩm</label>
    <p className="text-xs text-[#A8A8A8]">Chọn file ảnh JPG, PNG hoặc WebP từ thiết bị, tối đa 2 MB.</p>
    <button type="button" disabled={disabled || busy} onClick={() => fileInput.current?.click()}
      className="rounded-xs border border-white/20 bg-[#202020] px-4 py-3 text-sm text-white disabled:opacity-50">{busy ? 'Đang tải ảnh…' : 'Chọn ảnh từ thiết bị'}</button>
    {fileName && <p className="break-all text-xs text-[#A8A8A8]">{fileName}</p>}
    <input ref={fileInput} id="product-image" type="file" accept="image/jpeg,image/png,image/webp" disabled={disabled || busy}
      className="hidden" onChange={async event => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;
        setError('');
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
          setError('Vui lòng chọn ảnh JPG, PNG hoặc WebP không quá 2 MB.'); return;
        }
        setBusy(true); onBusy(true);
        try { onChange(await apiService.uploadProductImage(file)); setFileName(file.name); }
        catch (err) { setError(apiError(err)); }
        finally { setBusy(false); onBusy(false); }
      }} />
    {busy && <p role="status" className="text-sm text-[#C7A35A]">Đang tải ảnh lên…</p>}
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
    {image && <div className="space-y-2">
      <img src={image} alt="Xem trước ảnh sản phẩm" className="h-36 w-48 object-contain border border-white/10" />
      <button type="button" disabled={disabled || busy} className="text-xs text-red-400" onClick={() => { onChange(''); setFileName(''); }}>Xóa ảnh khỏi sản phẩm</button>
    </div>}
  </div>;
}
