'use client';

import React, { useState, useEffect } from 'react';
import { apiService, apiError } from '@/services/api';
import { PostItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ArticleEditor } from '@/components/admin/ArticleEditor';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, Newspaper, RefreshCw } from 'lucide-react';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Modal Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<PostItem>>({});

  const loadPosts = async () => {
    setError('');
    setIsLoading(true);
    try {
      const data = await apiService.getAdminPosts();
      setPosts(data);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    apiService.getAdminPosts().then(data => { if (active) setPosts(data); }).catch(err => { if (active) setError(apiError(err)); }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const handleOpenAddModal = () => {
    setEditingPost({
      title: '',
      slug: '',
      category: 'Kinh nghiệm xe',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
      author: 'Ban Biên Tập Garage',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: PostItem) => {
    setEditingPost(p);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    if (saving) return;
    setSaving(true); setError('');
    try {
    await apiService.savePost(editingPost);
    setIsModalOpen(false);
    loadPosts();
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
      await apiService.deletePost(id);
      loadPosts();
      } catch (err) { setError(apiError(err)); }
    }
  };

  return (
    <div className="space-y-6">
      {error && <p role="alert" className="text-red-400">{error}</p>}
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="gold">QUẢN LÝ TIN TỨC & BÀI VIẾT</Badge>
          <h1 className="text-3xl font-extrabold text-[#F5F5F5] uppercase tracking-tight mt-1">
            DANH MỤC BÀI VIẾT BIÊN TẬP
          </h1>
          <p className="text-xs text-[#A8A8A8]">
            Đăng bài chia sẻ kinh nghiệm ô tô, hướng dẫn lắp đặt phụ kiện và tin tức ngành.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadPosts}
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
            Viết Bài Mới
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#161616] border border-white/10 rounded-xs overflow-x-auto">
        <table className="w-full text-left text-xs text-[#A8A8A8]">
          <thead className="bg-[#202020] text-[#F5F5F5] uppercase tracking-wider font-bold border-b border-white/10">
            <tr>
              <th className="p-4">Tiêu Đề Bài Viết</th>
              <th className="p-4">Danh Mục</th>
              <th className="p-4">Tác Giả</th>
              <th className="p-4">Ngày Xuất Bản</th>
              <th className="p-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-[#202020]/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center space-x-3">
                  <div className="w-12 h-10 rounded-xs overflow-hidden bg-[#202020] flex-shrink-0 border border-white/10">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block line-clamp-1">{p.title}</span>
                    <span className="text-[10px] text-[#A8A8A8] font-mono">/{p.slug}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="titanium">{p.category}</Badge>
                </td>
                <td className="p-4 font-semibold text-white">{p.author || 'Ban Biên Tập'}</td>
                <td className="p-4 font-mono">
                  {new Date(p.published_at).toLocaleDateString('vi-VN')}
                </td>
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
                    title="Xóa Bài Viết"
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
      {editingPost && (
        <Modal
          maxWidth="4xl"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingPost.id ? 'CHỈNH SỬA BÀI VIẾT' : 'SOẠN THẢO BÀI VIẾT MỚI'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            {error && <p role="alert" className="text-red-400">{error}</p>}
            <Input
              label="Tiêu Đề Bài Viết *"
              value={editingPost.title || ''}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Slug URL *"
                value={editingPost.slug || ''}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                required
              />

              <Select
                label="Danh Mục *"
                value={editingPost.category || 'Kinh nghiệm xe'}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                options={[
                  { value: 'Kinh nghiệm xe', label: 'Kinh nghiệm xe' },
                  { value: 'Dịch vụ', label: 'Dịch vụ' },
                  { value: 'Phụ kiện', label: 'Phụ kiện' },
                  { value: 'Tin tức', label: 'Tin tức' },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Tác Giả"
                value={editingPost.author || ''}
                onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
              />

              <Input
                label="URL Ảnh Bìa *"
                value={editingPost.image || ''}
                onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase">Tóm Tắt Ngắn</label>
              <textarea
                rows={2}
                value={editingPost.summary || ''}
                onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                className="w-full bg-[#202020] text-white text-xs p-3 rounded-xs border border-white/10"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#A8A8A8] uppercase">Nội Dung Bài Viết</label>
              <ArticleEditor key={editingPost.id ?? 'new'} value={editingPost.content || ''} onChange={content => setEditingPost(previous => ({ ...previous, content }))} disabled={saving} />
            </div>

            <label className="flex gap-2 text-white"><input type="checkbox" checked={editingPost.is_published ?? true} onChange={e => setEditingPost({ ...editingPost, is_published: e.target.checked })} />Xuất bản trên website</label>
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button disabled={saving} isLoading={saving} type="submit" variant="primary" size="md">
                Lưu Bài Viết
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
