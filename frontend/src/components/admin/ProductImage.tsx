'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { apiService, apiError } from '@/services/api';

export function ProductImage({ image, disabled, onChange, onBusy }: {
  image: string; disabled: boolean; onChange: (url: string) => void; onBusy: (busy: boolean) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return <div className="space-y-3">
    <label htmlFor="product-image" className="block text-xs font-semibold text-[#A8A8A8] uppercase">Ảnh sản phẩm</label>
    <p className="text-xs text-[#A8A8A8]">Tải ảnh JPG, PNG hoặc WebP, tối đa 2 MB; hoặc nhập URL bên dưới.</p>
    <input id="product-image" type="file" accept="image/jpeg,image/png,image/webp" disabled={disabled || busy}
      className="w-full text-sm text-white" onChange={async event => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;
        setError('');
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
          setError('Vui lòng chọn ảnh JPG, PNG hoặc WebP không quá 2 MB.'); return;
        }
        setBusy(true); onBusy(true);
        try { onChange(await apiService.uploadProductImage(file)); }
        catch (err) { setError(apiError(err)); }
        finally { setBusy(false); onBusy(false); }
      }} />
    {busy && <p role="status" className="text-sm text-[#C7A35A]">Đang tải ảnh lên…</p>}
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
    <Input label="URL hình ảnh" type="url" value={image} disabled={disabled || busy} onChange={event => onChange(event.target.value)} />
    {image && <div className="space-y-2">
      <img src={image} alt="Xem trước ảnh sản phẩm" className="h-36 w-48 object-contain border border-white/10" />
      <button type="button" disabled={disabled || busy} className="text-xs text-red-400" onClick={() => onChange('')}>Xóa ảnh khỏi sản phẩm</button>
    </div>}
  </div>;
}
