'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Clock, MapPin, Phone, ShieldCheck, Wrench, Headphones } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ConsultationForm } from '@/components/home/ConsultationForm';
import { ProductCatalog } from '@/components/home/Catalog';
import { Gallery } from '@/components/home/Gallery';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { apiService } from '@/services/api';
import { business } from '@/lib/business';
import { PageStatus, useApiData } from '@/lib/use-static-data';
import type { ProductItem, ServiceItem } from '@/types';

function Heading({ eyebrow, title, href, label = 'Xem tất cả' }: { eyebrow: string; title: string; href?: string; label?: string }) {
  return <div className="auto-section-heading"><div><p className="auto-eyebrow">{eyebrow}</p><h2>{title}</h2></div>{href && <Link href={href}>{label}<ArrowUpRight size={17} /></Link>}</div>;
}
export default function HomePage() {
  const { data, loading, error } = useApiData(async () => {
    const [services, products] = await Promise.all([apiService.getServices(), apiService.getProducts()]);
    return { services, products };
  }, { services: [] as ServiceItem[], products: [] as ProductItem[] });
  if (loading || error) return <PageStatus loading={loading} error={error} />;
  const { services, products } = data;
  return <div className="auto-home">
    <HeroSection />
    <div className="auto-benefits"><div className="auto-container">{[{ Icon: Wrench, title: 'Kỹ thuật chuyên nghiệp', text: 'Chăm chút từng hạng mục' }, { Icon: ShieldCheck, title: 'Phụ kiện đa dạng', text: 'Lựa chọn theo nhu cầu' }, { Icon: Headphones, title: 'Tư vấn tận tâm', text: 'Giải pháp phù hợp với xe' }, { Icon: Phone, title: 'Tư vấn phụ kiện', text: business.phone }].map(({ Icon, title, text }) => <div key={title}><Icon size={27} strokeWidth={1.5} /><span><strong>{title}</strong><small>{text}</small></span></div>)}</div></div>
    <section id="thu-vien" className="auto-section auto-container"><Heading eyebrow="GÓC NHÌN TÂY ĐÔ AUTO CAR" title="THƯ VIỆN HÌNH ẢNH" href="/services" label="Khám phá dịch vụ" /><Gallery services={services} /><p className="auto-image-caption">Hình ảnh minh họa các nhóm dịch vụ. Nhấn vào ảnh để tìm hiểu thêm.</p></section>
    <section id="dich-vu" className="auto-section auto-muted"><div className="auto-container"><Heading eyebrow="PHỤ KIỆN & NÂNG CẤP Ô TÔ" title="MÀN HÌNH · ĐÈN · ÂM THANH" href="/services" /><div className="auto-service-grid">{services.filter(s => s.is_featured).map((s, i) => <a key={s.id} href={`/services/${s.slug}/`} className="auto-service-card"><div className="auto-service-photo"><ImageWithFallback src={s.image} alt={s.name} loading="lazy" fallbackType="service" /></div><span className="auto-service-number">0{i + 1}</span><Wrench size={26} strokeWidth={1.4} /><h3>{s.name}</h3><p>{s.summary}</p><span className="auto-service-more">Tìm hiểu thêm<ArrowRight size={16} /></span></a>)}</div></div></section>
    <section id="tu-van" className="auto-consult"><div className="auto-container"><div><p className="auto-eyebrow">BẠN CẦN TƯ VẤN CHO CHIẾC XE CỦA MÌNH?</p><h2>ĐÚNG NHU CẦU.<br />ĐÚNG GIẢI PHÁP.</h2><p>Chọn dịch vụ và thời gian phù hợp. Đội ngũ Tây Đô Auto Car sẽ liên hệ xác nhận, tư vấn chi tiết trước khi thực hiện.</p></div><ConsultationForm /></div></section>
    <section className="auto-section auto-container"><Heading eyebrow="TIỆN NGHI HƠN TRÊN MỖI CHUYẾN ĐI" title="PHỤ KIỆN & ĐỒ CHƠI Ô TÔ" href="/store" /><ProductCatalog products={products} collections /></section>
    {Array.from(new Set(products.map(product => product.category))).map(category => <section className="auto-section auto-category-section" key={category}><div className="auto-container"><Heading eyebrow="SẢN PHẨM THEO NHU CẦU" title={category.toLocaleUpperCase('vi')} href={`/store?category=${encodeURIComponent(category)}`} /><ProductCatalog products={products.filter(product => product.category === category).slice(0, 8)} /></div></section>)}
    <section className="auto-service-directory"><div className="auto-container"><div><p className="auto-eyebrow">DỊCH VỤ Ô TÔ</p><h2>NÂNG CẤP TIỆN NGHI<br />CHO CHIẾC XE CỦA BẠN</h2><p>Tìm dịch vụ phù hợp và trao đổi trực tiếp với đội ngũ Tây Đô.</p></div><div className="auto-service-links">{services.map(service => <a key={service.id} href={`/services/${service.slug}/`}><Wrench size={20} /><span>{service.name}</span><ArrowUpRight size={18} /></a>)}</div></div></section>
    <section id="gioi-thieu" className="auto-section auto-muted"><div className="auto-container auto-about"><div className="auto-about-image"><ImageWithFallback src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85" alt="Minh họa nâng cấp phụ kiện ô tô" loading="lazy" fallbackType="service" /><span>TÂY ĐÔ<br /><strong>AUTO CAR</strong></span></div><div><p className="auto-eyebrow">NGƯỜI BẠN ĐỒNG HÀNH CỦA CHIẾC XE</p><h2>PHỤ KIỆN ĐÚNG CHẤT.<br />TRẢI NGHIỆM KHÁC BIỆT.</h2><p>Tây Đô Auto Car chuyên cung cấp phụ kiện và đồ chơi ô tô tại Cần Thơ: màn hình Android, đèn ô tô, âm thanh xe hơi, camera và phụ kiện nội ngoại thất. Tư vấn lựa chọn và lắp đặt theo dòng xe, nhu cầu sử dụng và ngân sách của bạn.</p><ul>{['Tư vấn hạng mục và báo giá trước khi thực hiện', 'Tư vấn thiết bị tương thích với từng dòng xe', 'Hướng dẫn sử dụng và hỗ trợ sau lắp đặt'].map(t => <li key={t}><Check size={18} />{t}</li>)}</ul><Link className="auto-button auto-button-dark" href="/contact">Kết nối với Tây Đô<ArrowUpRight size={17} /></Link></div></div></section>
    <section className="auto-location"><div className="auto-container"><div><p className="auto-eyebrow">GHÉ THĂM GARAGE</p><h2>HẸN GẶP BẠN TẠI TÂY ĐÔ.</h2><p><MapPin size={18} />{business.address}</p><p><Clock size={18} />{business.hours}</p></div><a className="auto-button auto-button-dark" href={business.mapUrl} target="_blank" rel="noreferrer">Chỉ đường đến garage<ArrowUpRight size={18} /></a></div></section>
  </div>;
}
