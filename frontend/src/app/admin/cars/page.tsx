'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { CarItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, Car, RefreshCw } from 'lucide-react';

export default function AdminCarsPage() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<CarItem> | null>(null);

  const loadCars = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getCars();
      setCars(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleOpenAddModal = () => {
    setEditingCar({
      title: '',
      slug: '',
      listing_type: 'sale',
      price: 1000000000,
      year: 2023,
      transmission: 'Tự động 6 cấp',
      fuel_type: 'Xăng',
      mileage: '10.000 km',
      color: 'Đen',
      location: 'Cần Thơ',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      summary: '',
      description: '',
      status: 'available',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c: CarItem) => {
    setEditingCar(c);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;
    await apiService.saveCar(editingCar);
    setIsModalOpen(false);
    loadCars();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa xe này khỏi danh mục?')) {
      await apiService.deleteCar(id);
      loadCars();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="gold">QUẢN LÝ SHOWROOM XE</Badge>
          <h1 className="text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-tight mt-1">
            DANH MỤC XE MUA BÁN & CHO THUÊ
          </h1>
          <p className="text-xs text-[#A8A8A8]">
            Quản lý thông số kỹ thuật, giá niêm yết và trạng thái xe trong showroom.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadCars}
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
            Thêm Xe Mới
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#161616] border border-white/10 rounded-xs overflow-x-auto">
        <table className="w-full text-left text-xs text-[#A8A8A8]">
          <thead className="bg-[#202020] text-[#F5F5F5] uppercase tracking-wider font-bold border-b border-white/10">
            <tr>
              <th className="p-4">Tên Xe</th>
              <th className="p-4">Phân Loại</th>
              <th className="p-4">Năm SX</th>
              <th className="p-4">Nhiên Liệu / Hộp Số</th>
              <th className="p-4">Giá Niêm Yết</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {cars.map((c) => (
              <tr key={c.id} className="hover:bg-[#202020]/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center space-x-3">
                  <div className="w-12 h-10 rounded-xs overflow-hidden bg-[#202020] flex-shrink-0 border border-white/10">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block">{c.title}</span>
                    <span className="text-[10px] text-[#A8A8A8] font-mono">/{c.slug}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={c.listing_type === 'sale' ? 'gold' : 'titanium'}>
                    {c.listing_type === 'sale' ? 'Cần Bán' : 'Cho Thuê'}
                  </Badge>
                </td>
                <td className="p-4 font-mono font-bold text-white">{c.year}</td>
                <td className="p-4 text-xs">
                  {c.fuel_type} • {c.transmission}
                </td>
                <td className="p-4 font-mono font-bold text-[#C7A35A]">
                  {c.price.toLocaleString('vi-VN')} đ
                  {c.listing_type === 'rent' && <span className="text-[10px] text-[#A8A8A8]">/ngày</span>}
                </td>
                <td className="p-4">
                  <Badge variant={c.status === 'available' ? 'emerald' : 'dark'}>
                    {c.status === 'available' ? 'Còn Xe' : 'Đã Giao / Hết'}
                  </Badge>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(c)}
                    className="p-1.5 bg-[#202020] text-[#C7A35A] rounded-xs hover:bg-[#2A2A2A]"
                    title="Chỉnh Sửa"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 bg-[#E53935]/10 text-[#E53935] rounded-xs hover:bg-[#E53935] hover:text-white"
                    title="Xóa Xe"
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
      {editingCar && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingCar.id ? 'CHỈNH SỬA THÔNG TIN XE' : 'THÊM XE MỚI VÀO SHOWROOM'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Tên Xe đầy đủ *"
              value={editingCar.title || ''}
              onChange={(e) => setEditingCar({ ...editingCar, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Slug URL *"
                value={editingCar.slug || ''}
                onChange={(e) => setEditingCar({ ...editingCar, slug: e.target.value })}
                required
              />

              <Select
                label="Loại Hình *"
                value={editingCar.listing_type || 'sale'}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, listing_type: e.target.value as 'sale' | 'rent' })
                }
                options={[
                  { value: 'sale', label: 'Xe Mua Bán' },
                  { value: 'rent', label: 'Xe Cho Thuê' },
                ]}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Giá Niêm Yết (VNĐ) *"
                type="number"
                value={editingCar.price || 0}
                onChange={(e) => setEditingCar({ ...editingCar, price: Number(e.target.value) })}
                required
              />

              <Input
                label="Năm Sản Xuất *"
                type="number"
                value={editingCar.year || 2023}
                onChange={(e) => setEditingCar({ ...editingCar, year: Number(e.target.value) })}
                required
              />

              <Input
                label="Số KM Đã Đi *"
                value={editingCar.mileage || '10.000 km'}
                onChange={(e) => setEditingCar({ ...editingCar, mileage: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Hộp Số *"
                value={editingCar.transmission || 'Tự động'}
                onChange={(e) => setEditingCar({ ...editingCar, transmission: e.target.value })}
              />

              <Input
                label="Nhiên Liệu *"
                value={editingCar.fuel_type || 'Xăng'}
                onChange={(e) => setEditingCar({ ...editingCar, fuel_type: e.target.value })}
              />
            </div>

            <Input
              label="URL Hình Ảnh *"
              value={editingCar.image || ''}
              onChange={(e) => setEditingCar({ ...editingCar, image: e.target.value })}
            />

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase">Mô Tả Chi Tiết</label>
              <textarea
                rows={4}
                value={editingCar.description || ''}
                onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })}
                className="w-full bg-[#202020] text-white text-xs p-3 rounded-xs border border-white/10"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button type="submit" variant="primary" size="md">
                Lưu Thông Tin Xe
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
