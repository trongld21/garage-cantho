'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiService, apiError } from '@/services/api';
export default function AdminDashboard() {
  const [counts, setCounts] = useState<number[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { Promise.all([apiService.getServices(), apiService.getProducts(), apiService.getAdminPosts(), apiService.getBookings()]).then(data => setCounts(data.map(items => items.length))).catch(err => setError(apiError(err))); }, []);
  const sections = [ ['Dịch vụ lắp đặt & nâng cấp', '/admin/services', 'Quản lý tên dịch vụ, hình ảnh, mô tả, báo giá và hiển thị nổi bật.'], ['Phụ kiện & đồ chơi ô tô', '/admin/store', 'Quản lý sản phẩm, danh mục, thương hiệu, giá bán và tồn kho.'], ['Tin tức & kinh nghiệm', '/admin/posts', 'Quản lý nội dung bài viết hiển thị trên website.'], ['Lịch tư vấn & lắp đặt', '/admin/bookings', 'Tiếp nhận yêu cầu khách hàng và cập nhật trạng thái xử lý.'] ];
  return <div className="space-y-8"><div><h1 className="text-3xl font-bold text-white">QUẢN TRỊ PHỤ KIỆN Ô TÔ</h1><p className="text-[#A8A8A8] mt-3">Nội dung được lưu và sử dụng trực tiếp trên website khách hàng.</p></div>{error && <p role="alert" className="text-red-400">{error}</p>}<div className="grid sm:grid-cols-2 gap-5">{sections.map(([name, href, description], index) => <Link key={href} href={href} className="p-6 bg-[#161616] border border-white/10 hover:border-[#C7A35A] rounded"><p className="text-3xl text-[#C7A35A]">{counts[index] ?? '—'}</p><h2 className="text-lg font-bold text-white mt-3">{name}</h2><p className="text-sm text-[#A8A8A8] mt-2">{description}</p></Link>)}</div></div>;
}
