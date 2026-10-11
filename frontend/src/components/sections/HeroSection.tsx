'use client';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BookingButton } from '@/components/home/BookingButton';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import type { ServiceItem } from '@/types';
import { isIllustration } from '@/lib/media';

export function HeroSection({ services = [] }: { services?: ServiceItem[] }) {
  const heroService = services.find(service => service.slug === 'den-o-to' && service.image && !isIllustration(service.image))
    || services.find(service => service.is_featured && service.image && !isIllustration(service.image))
    || services.find(service => service.image && !isIllustration(service.image))
    || services.find(service => service.image);
  const image = heroService?.image;
  return <section className="auto-hero" aria-label="Nâng cấp ô tô tại Tây Đô Auto Car">
    {image && <ImageWithFallback src={image} alt={heroService?.name || 'Tây Đô Auto Car'} className="auto-hero-image" fetchPriority="high"/>}
    <div className="auto-hero-shade"/><span className="auto-hero-bgtype" aria-hidden="true">CAR CULTURE</span>
    <div className="auto-container auto-hero-content"><p className="auto-eyebrow">NÂNG CẤP & CÁ NHÂN HÓA Ô TÔ TẠI CẦN THƠ</p><h1>KHÔNG CHỈ<br/>LÀ <em>CHIẾC XE.</em><br/><span>LÀ CHẤT RIÊNG.</span></h1><p className="auto-hero-description">Từ công nghệ, ánh sáng đến từng chi tiết nội ngoại thất. Khám phá những giải pháp nâng cấp phù hợp với chiếc xe của bạn.</p><div className="auto-actions"><Link className="auto-button" href="/services">Khám phá dịch vụ<ArrowUpRight size={17}/></Link><BookingButton className="auto-button auto-button-outline">Tư vấn xe của bạn</BookingButton></div></div>
    <div className="auto-container auto-hero-controls"><a className="auto-text-link" href="#dich-vu">SCROLL TO EXPLORE<ArrowDown size={15}/></a><span>{isIllustration(image) ? 'ẢNH MINH HỌA' : 'DRIVE YOUR IDENTITY'}</span></div>
  </section>;
}
