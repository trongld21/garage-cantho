'use client';
import { useEffect, useState } from 'react';
import { apiService, apiError } from '@/services/api';
import type { ServiceCategory } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export default function CategoriesPage() {
  const [items, setItems] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<{ id?: number; name: string } | null>(null);
  async function refresh() {
    setLoading(true);
    try { setItems(await apiService.getServiceCategories()); }
    catch (err) { setError(apiError(err)); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    let active = true;
    apiService.getServiceCategories().then(data => { if (active) setItems(data); }).catch(err => { if (active) setError(apiError(err)); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return <div className="space-y-6 text-white">
    <div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-bold">DANH MỤC DỊCH VỤ</h1><p className="text-sm text-[#A8A8A8] mt-2">Đổi tên danh mục sẽ cập nhật các dịch vụ thuộc danh mục đó.</p></div><div className="flex gap-3"><Button disabled={loading || busy} variant="outline" onClick={() => { setError(''); void refresh(); }}>Làm mới</Button><Button disabled={busy} onClick={() => { setError(''); setEditing({ name: '' }); }}>Thêm danh mục</Button></div></div>
    {error && <p role="alert" className="text-red-400">{error}</p>}
    {loading ? <p role="status">Đang tải danh mục…</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm bg-[#161616]"><thead><tr className="border-b border-white/10"><th className="p-4">Tên danh mục</th><th className="p-4">Số dịch vụ</th><th className="p-4">Thao tác</th></tr></thead><tbody>{items.map(item => <tr key={item.id} className="border-b border-white/10"><td className="p-4">{item.name}</td><td className="p-4">{item.services_count}</td><td className="p-4 space-x-4"><button disabled={busy} className="text-[#C7A35A]" onClick={() => { setError(''); setEditing({ id: item.id, name: item.name }); }}>Sửa</button><button disabled={busy || item.services_count > 0} title={item.services_count ? 'Chuyển dịch vụ sang danh mục khác trước khi xóa' : 'Xóa danh mục'} className="text-red-400 disabled:opacity-40" onClick={async () => {
      if (!confirm(`Xóa danh mục “${item.name}”?`)) return;
      setBusy(true); setError('');
      try { await apiService.deleteServiceCategory(item.id); await refresh(); }
      catch (err) { setError(apiError(err)); }
      finally { setBusy(false); }
    }}>Xóa</button></td></tr>)}</tbody></table>{!items.length && <p className="p-4">Chưa có danh mục. Thêm danh mục để sử dụng trong dịch vụ.</p>}</div>}
    <Modal isOpen={!!editing} onClose={() => { if (!busy) setEditing(null); }} title={editing?.id ? 'SỬA DANH MỤC' : 'THÊM DANH MỤC'}>{editing && <form className="space-y-4" onSubmit={async event => {
      event.preventDefault(); if (busy) return;
      setBusy(true); setError('');
      try { await apiService.saveServiceCategory(editing); setEditing(null); await refresh(); }
      catch (err) { setError(apiError(err)); }
      finally { setBusy(false); }
    }}>{error && <p role="alert" className="text-red-400">{error}</p>}<Input label="Tên danh mục" required maxLength={255} disabled={busy} value={editing.name} onChange={event => setEditing({ ...editing, name: event.target.value })} /><Button type="submit" disabled={busy} isLoading={busy}>Lưu danh mục</Button></form>}</Modal>
  </div>;
}
