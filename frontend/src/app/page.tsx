'use client';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone, ShieldCheck, Wrench, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { ConsultationForm } from '@/components/home/ConsultationForm';
import { ProductCatalog } from '@/components/home/Catalog';
import { Gallery } from '@/components/home/Gallery';
import { apiService } from '@/services/api';
import { business } from '@/lib/business';
import { PageStatus, useApiData } from '@/lib/use-static-data';
import type { ProductItem, ServiceItem } from '@/types';

const tickerItems = ['DETAIL MATTERS', 'DRIVE DIFFERENT', 'CAR ACCESSORIES', 'BUILT AROUND YOU', 'TÂY ĐÔ AUTO CAR'];

export default function HomePage() {
  const { data, loading, error } = useApiData(async () => {
    const [services, products] = await Promise.all([apiService.getServices(), apiService.getProducts()]);
    return { services, products };
  }, { services: [] as ServiceItem[], products: [] as ProductItem[] });
  const { services, products } = data;
  return <div className="auto-home">
    <HeroSection services={services}/>
    <div className="auto-ticker">
      <div className="auto-ticker-track">
        {[0, 1].map(copy => (
          <div className="auto-ticker-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {tickerItems.map(text => <span key={text}>{text}<i aria-hidden="true">✦</i></span>)}
          </div>
        ))}
      </div>
    </div>
    <section id="gioi-thieu" className="auto-section auto-container"><EditorialHeading eyebrow="KHÁM PHÁ TÂY ĐÔ AUTO CAR">MỖI CHI TIẾT.<br/><em>MỘT DẤU ẤN.</em></EditorialHeading><p className="auto-intro-copy">Phụ kiện và đồ chơi ô tô tại Cần Thơ. Lựa chọn giải pháp phù hợp với dòng xe, nhu cầu sử dụng và phong cách của bạn.</p><div className="auto-benefits">{[{ Icon: Wrench, title: 'Giải pháp nâng cấp đa dạng', text: 'Khám phá phụ kiện và dịch vụ theo nhu cầu sử dụng.' }, { Icon: Sparkles, title: 'Đề cao phong cách', text: 'Tư vấn lựa chọn phù hợp với chiếc xe của bạn.' }, { Icon: ShieldCheck, title: 'Tư vấn trực tiếp', text: 'Trao đổi chi tiết với garage trước khi thực hiện.' }].map(({ Icon, title, text }) => <div key={title}><Icon size={25}/><span><strong>{title}</strong><small>{text}</small></span></div>)}</div></section>
    <section id="dich-vu" className="auto-section auto-muted"><div className="auto-container"><EditorialHeading eyebrow="01 / NÂNG CẤP THEO PHONG CÁCH CỦA BẠN" href="/services">NÂNG CẤP <em>KHÔNG GIỚI HẠN.</em></EditorialHeading><PageStatus loading={loading} error={error}/><ServiceGrid services={services.slice(0, 6)}/></div></section>
    <section id="san-pham" className="auto-section auto-paper"><div className="auto-container"><EditorialHeading eyebrow="02 / DANH MỤC PHỤ KIỆN" href="/store">KHÁM PHÁ <em>PHỤ KIỆN</em></EditorialHeading>{loading || error ? <PageStatus loading={loading} error={error}/> : <ProductCatalog products={products} collections searchable/>}</div></section>
    <section className="auto-statement"><div className="auto-container"><p className="auto-eyebrow">THE CAR IS AN EXTENSION OF YOU</p><h2>CHẤT RIÊNG<br/><em>KHÔNG CẦN</em><br/>GIỚI THIỆU.</h2><p>Ánh đèn, âm thanh, màn hình hay cảm giác khi bước vào xe. Hãy kể cho chúng tôi phong cách bạn đang hướng đến.</p><Link className="auto-text-link" href="/#tu-van">Trao đổi ý tưởng nâng cấp<ArrowUpRight size={17}/></Link></div></section>
    <section id="thu-vien" className="auto-section auto-container"><EditorialHeading eyebrow="GÓC NHÌN TÂY ĐÔ AUTO CAR" href="/services" label="Khám phá dịch vụ">THƯ VIỆN <em>HÌNH ẢNH</em></EditorialHeading><Gallery services={services}/><p className="auto-image-caption">Hình ảnh từ dữ liệu dịch vụ của garage. Ảnh minh họa có nhãn riêng.</p></section>
    <section className="auto-section auto-container"><EditorialHeading eyebrow="03 / HÀNH TRÌNH NÂNG CẤP">BẮT ĐẦU TỪ <em>Ý TƯỞNG.</em></EditorialHeading><div className="auto-process">{[['Chọn hạng mục', 'Khám phá phụ kiện và dịch vụ bạn quan tâm.'], ['Gửi thông tin xe', 'Chia sẻ dòng xe và mong muốn nâng cấp.'], ['Nhận tư vấn', 'Trao đổi phương án phù hợp và báo giá.'], ['Thống nhất lịch hẹn', 'Garage liên hệ xác nhận trước khi thực hiện.']].map(([title, text], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    <section id="tu-van" className="auto-consult"><div className="auto-container"><div><p className="auto-eyebrow">04 / TÂY ĐÔ AUTO CAR</p><h2>CHUẨN BỊ CHO<br/><em>PHIÊN BẢN MỚI</em><br/>CỦA XẾ YÊU?</h2><p>Ghé garage tại Cần Thơ hoặc gửi yêu cầu tư vấn. Đội ngũ Tây Đô sẽ liên hệ xác nhận lịch hẹn và trao đổi chi tiết.</p><div className="auto-contact-detail"><MapPin/><div><strong>ĐỊA CHỈ</strong><p>{business.address}</p><a href={business.mapUrl} target="_blank" rel="noreferrer">Xem chỉ đường ↗</a></div></div><div className="auto-contact-detail"><Phone/><div><strong>HOTLINE TƯ VẤN</strong><a href={business.phoneHref}>{business.phone}</a><p>{business.hours}</p></div></div></div><ConsultationForm/></div></section>
  </div>;
}
