'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { BookingButton } from '@/components/home/BookingButton';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
const slides = [
  { eyebrow: 'TÂY ĐÔ AUTO CAR · CẦN THƠ', title: 'NÂNG TẦM CHIẾC XE.', accent: 'ĐẬM DẤU ẤN RIÊNG.', description: 'Chuyên cung cấp phụ kiện, đồ chơi ô tô và tư vấn lắp đặt tại Cần Thơ. Màn hình, đèn, âm thanh và tiện ích cho mọi hành trình.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85', href: '/services', action: 'Khám phá dịch vụ' },
  { eyebrow: 'MÀN HÌNH · ĐÈN · ÂM THANH', title: 'NÂNG CẤP TIỆN NGHI.', accent: 'TRỌN GU CỦA BẠN.', description: 'Màn hình Android, đèn bi LED và hệ thống âm thanh xe hơi. Lựa chọn cấu hình phù hợp với dòng xe và ngân sách.', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=85', href: '/services', action: 'Xem dịch vụ nâng cấp' },
  { eyebrow: 'PHỤ KIỆN & ĐỒ CHƠI Ô TÔ', title: 'THÊM TIỆN NGHI.', accent: 'TRỌN TRẢI NGHIỆM.', description: 'Khám phá phụ kiện, camera, thiết bị thông minh và đồ chơi ô tô phù hợp với chiếc xe của bạn.', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=85', href: '/store', action: 'Khám phá phụ kiện' },
];
export function HeroSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (!playing || hovered) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setActive(current => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [playing, hovered]);
  const slide = slides[active];
  return <section className="auto-hero" aria-roledescription="trình chiếu" aria-label="Dịch vụ nổi bật" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPlaying(false)}>
    <ImageWithFallback key={slide.image} src={slide.image} alt="Minh họa không gian và tiện nghi ô tô" className="auto-hero-image" fetchPriority="high" />
    <div className="auto-hero-shade" />
    <div className="auto-container auto-hero-content" aria-live={playing ? "off" : "polite"}><p className="auto-eyebrow">{slide.eyebrow}</p><h1>{slide.title}<br /><span>{slide.accent}</span></h1><p className="auto-hero-description">{slide.description}</p><div className="auto-actions"><BookingButton>Đặt lịch ngay</BookingButton><Link className="auto-text-link" href={slide.href}>{slide.action}<ArrowRight size={17} /></Link></div></div>
    <div className="auto-container auto-hero-controls"><div className="auto-slide-dots">{slides.map((s, i) => <button key={s.title} aria-label={`Xem banner ${i + 1}`} aria-pressed={i === active} className={i === active ? 'active' : ''} onClick={() => setActive(i)} />)}</div><div className="auto-slide-arrows"><button aria-label={playing ? "Dừng chuyển banner" : "Tự động chuyển banner"} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={16} /> : <Play size={16} />}</button><span>0{active + 1} / 03</span><button aria-label="Banner trước" onClick={() => setActive((active + slides.length - 1) % slides.length)}><ChevronLeft size={18} /></button><button aria-label="Banner tiếp theo" onClick={() => setActive((active + 1) % slides.length)}><ChevronRight size={18} /></button></div></div>
  </section>;
}
