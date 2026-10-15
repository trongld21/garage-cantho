'use client';

import React, { useState, useEffect } from 'react';
import { apiService, apiError } from '@/services/api';
import { slugForName } from '@/lib/slug';
import { ServiceItem, ServiceCategory } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { ServiceImages } from '@/components/admin/ServiceImages';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Modal Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  const loadServices = async () => {
    setError('');
    setIsLoading(true);
    try {
      const [data, categories] = await Promise.all([apiService.getServices(), apiService.getServiceCategories()]);
      setCategories(categories);
      setServices(data);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    Promise.all([apiService.getServices(), apiService.getServiceCategories()]).then(([data, categories]) => { if (active) { setServices(data); setCategories(categories); } }).catch(err => { if (active) setError(apiError(err)); }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const handleOpenAddModal = () => {
    setEditingService({
      name: '',
      slug: '',
      category: categories[0]?.name || '',
      summary: '',
      description: '',
      price_range: 'Báo giá',
      image: '',
      gallery: [],
      is_featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    if (saving || uploading) return;
    setSaving(true); setError('');
    try {
    await apiService.saveService(editingService);
    setIsModalOpen(false);
    loadServices();
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      try {
      await apiService.deleteService(id);
      loadServices();
      } catch (err) { setError(apiError(err)); }
    }
  };

  return (
    <div className="space-y-6">
      {error && <p role="alert" className="text-red-400">{error}</p>}
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="gold">QUẢN LÝ DỊCH VỤ</Badge>
          <h1 className="text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-tight mt-1">
            DANH MỤC DỊCH VỤ GARAGE
          </h1>
          <p className="text-xs text-[#A8A8A8]">
            Thêm mới, chỉnh sửa thông tin dịch vụ, giá tham khảo và bài viết quy trình.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadServices}
            isLoading={isLoading}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Làm Mới
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Thêm Dịch Vụ Mới
          </Button>
        </div>
      </div>

      {/* Services Data Table */}
      <div className="bg-[#161616] border border-white/10 rounded-xs overflow-x-auto">
        <table className="w-full text-left text-xs text-[#A8A8A8]">
          <thead className="bg-[#202020] text-[#F5F5F5] uppercase tracking-wider font-bold border-b border-white/10">
            <tr>
              <th className="p-4">Tên Dịch Vụ</th>
              <th className="p-4">Danh Mục</th>
              <th className="p-4">Báo Giá Tham Khảo</th>
              <th className="p-4">Nổi Bật</th>
              <th className="p-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-[#202020]/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xs overflow-hidden bg-[#202020] flex-shrink-0 border border-white/10">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block">{s.name}</span>
                    <span className="text-[10px] text-[#A8A8A8] font-mono">/{s.slug}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="titanium">{s.category}</Badge>
                </td>
                <td className="p-4 font-mono font-bold text-[#C7A35A]">{s.price_range}</td>
                <td className="p-4">
                  <Badge variant={s.is_featured ? 'gold' : 'dark'}>
                    {s.is_featured ? 'Nổi Bật' : 'Thường'}
                  </Badge>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(s)}
                    className="p-1.5 bg-[#202020] text-[#C7A35A] rounded-xs hover:bg-[#2A2A2A]"
                    title="Chỉnh Sửa"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1.5 bg-[#E53935]/10 text-[#E53935] rounded-xs hover:bg-[#E53935] hover:text-white"
                    title="Xóa Dịch Vụ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {editingService && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => { if (!saving && !uploading) setIsModalOpen(false); }}
          title={editingService.id ? 'CHỈNH SỬA DỊCH VỤ' : 'THÊM DỊCH VỤ MỚI'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            {error && <p role="alert" className="text-red-400">{error}</p>}
            <Input
              label="Tên Dịch Vụ *"
              value={editingService.name || ''}
              onChange={(e) => setEditingService({ ...editingService, name: e.target.value, slug: slugForName(e.target.value, editingService.name, editingService.slug, editingService.id) })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Slug URL *"
                value={editingService.slug || ''}
                onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                required
              />

              <Select
                label="Danh Mục *"
                required
                value={editingService.category || ''}
                onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                options={[{ value: '', label: 'Chọn danh mục' }, ...categories.map(category => ({ value: category.name, label: category.name }))]}
              />
            </div>

            <Input
              label="Khoảng Giá Tham Khảo *"
              value={editingService.price_range || ''}
              onChange={(e) => setEditingService({ ...editingService, price_range: e.target.value })}
            />

            <Input
              label="URL ảnh đại diện (nếu dùng ảnh có sẵn)"
              value={editingService.image || ''}
              onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
            />

            <ServiceImages image={editingService.image} gallery={editingService.gallery} disabled={saving} onBusy={setUploading} onChange={(image, gallery) => setEditingService(current => current ? { ...current, image, gallery } : current)} />

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase">Tóm Tắt Ngắn</label>
              <textarea
                rows={2}
                value={editingService.summary || ''}
                onChange={(e) => setEditingService({ ...editingService, summary: e.target.value })}
                className="w-full bg-[#202020] text-white text-xs p-3 rounded-xs border border-white/10"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase">Mô Tả Chi Tiết</label>
              <textarea
                rows={4}
                value={editingService.description || ''}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full bg-[#202020] text-white text-xs p-3 rounded-xs border border-white/10"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingService.is_featured ?? true}
                  onChange={(e) =>
                    setEditingService({ ...editingService, is_featured: e.target.checked })
                  }
                  className="rounded-xs"
                />
                <span>Hiển thị nổi bật trang chủ</span>
              </label>

              <Button disabled={saving || uploading} isLoading={saving} type="submit" variant="primary" size="md">
                Lưu Dịch Vụ
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
