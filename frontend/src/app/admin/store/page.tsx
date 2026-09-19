'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { ProductItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, ShoppingBag, RefreshCw } from 'lucide-react';

export default function AdminStorePage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct({
      name: '',
      slug: '',
      category: 'Phụ tùng',
      brand: 'Chính Hãng',
      price: 1000000,
      sale_price: null,
      stock: 10,
      summary: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      is_featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: ProductItem) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await apiService.saveProduct(editingProduct);
    setIsModalOpen(false);
    loadProducts();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await apiService.deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="gold">QUẢN LÝ PHỤ TÙNG & ĐỒ CHƠI</Badge>
          <h1 className="text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-tight mt-1">
            DANH MỤC CỬA HÀNG PHỤ TÙNG
          </h1>
          <p className="text-xs text-[#A8A8A8]">
            Quản lý kho linh kiện, điều chỉnh giá bán và trạng thái tồn kho.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadProducts}
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
            Thêm Sản Phẩm Mới
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#161616] border border-white/10 rounded-xs overflow-x-auto">
        <table className="w-full text-left text-xs text-[#A8A8A8]">
          <thead className="bg-[#202020] text-[#F5F5F5] uppercase tracking-wider font-bold border-b border-white/10">
            <tr>
              <th className="p-4">Tên Sản Phẩm</th>
              <th className="p-4">Thương Hiệu</th>
              <th className="p-4">Danh Mục</th>
              <th className="p-4">Giá Niêm Yết / Khuyến Mãi</th>
              <th className="p-4">Tồn Kho</th>
              <th className="p-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[#202020]/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xs overflow-hidden bg-[#202020] flex-shrink-0 border border-white/10">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block">{p.name}</span>
                    <span className="text-[10px] text-[#A8A8A8] font-mono">/{p.slug}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="titanium">{p.brand}</Badge>
                </td>
                <td className="p-4 text-white font-medium">{p.category}</td>
                <td className="p-4 font-mono">
                  <span className="font-bold text-[#C7A35A] block">
                    {p.sale_price ? p.sale_price.toLocaleString('vi-VN') : p.price.toLocaleString('vi-VN')} đ
                  </span>
                  {p.sale_price && (
                    <span className="text-[10px] text-[#666666] line-through block">
                      {p.price.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                </td>
                <td className="p-4 font-mono font-bold text-emerald-400">{p.stock} Cái</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(p)}
                    className="p-1.5 bg-[#202020] text-[#C7A35A] rounded-xs hover:bg-[#2A2A2A]"
                    title="Chỉnh Sửa"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 bg-[#E53935]/10 text-[#E53935] rounded-xs hover:bg-[#E53935] hover:text-white"
                    title="Xóa Sản Phẩm"
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
      {editingProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct.id ? 'CHỈNH SỬA SẢN PHẨM' : 'THÊM SẢN PHẨM MỚI'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Tên Sản Phẩm *"
              value={editingProduct.name || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Slug URL *"
                value={editingProduct.slug || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                required
              />

              <Input
                label="Thương Hiệu *"
                value={editingProduct.brand || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Giá Niêm Yết (VNĐ) *"
                type="number"
                value={editingProduct.price || 0}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                required
              />

              <Input
                label="Giá Khuyến Mãi (VNĐ)"
                type="number"
                value={editingProduct.sale_price || ''}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    sale_price: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />

              <Input
                label="Số Lượng Tồn Kho *"
                type="number"
                value={editingProduct.stock || 0}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                required
              />
            </div>

            <Input
              label="URL Hình Ảnh *"
              value={editingProduct.image || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
            />

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase">Tóm Tắt Sản Phẩm</label>
              <textarea
                rows={2}
                value={editingProduct.summary || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, summary: e.target.value })}
                className="w-full bg-[#202020] text-white text-xs p-3 rounded-xs border border-white/10"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase">Mô Tả Chi Tiết</label>
              <textarea
                rows={4}
                value={editingProduct.description || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full bg-[#202020] text-white text-xs p-3 rounded-xs border border-white/10"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button type="submit" variant="primary" size="md">
                Lưu Sản Phẩm
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
