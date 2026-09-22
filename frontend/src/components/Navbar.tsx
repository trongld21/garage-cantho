'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, ChevronDown, Clock, MapPin, Menu, Phone, Search, X } from 'lucide-react';
import { useServices } from '@/lib/use-services';
import { business } from '@/lib/business';

export default function Navbar() {
  const accessoryServices = useServices();
const links = [
  { title: 'Trang chủ', href: '/' },
  { title: 'Dịch vụ nâng cấp', href: '/services', children: accessoryServices.map(service => [service.category, `/services/${service.slug}`]) },
  { title: 'Phụ kiện ô tô', href: '/store' },
  { title: 'Thư viện', href: '/#thu-vien' },
  { title: 'Chia sẻ', href: '/news' },
  { title: 'Giới thiệu', href: '/#gioi-thieu' },
  { title: 'Liên hệ', href: '/contact' },
];

  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  return <header className="auto-header">
    <div className="auto-topbar"><div className="auto-container"><span><MapPin size={13} />{business.address}</span><a href={business.phoneHref}>Tư vấn phụ kiện: {business.phone} <span>→</span></a></div></div>
    <div className="auto-container auto-header-main">
      <Link href="/" className="auto-logo" aria-label="Tây Đô Auto Car - Trang chủ"><Car size={39} strokeWidth={1.6} /><span>TÂY ĐÔ <b>AUTO CAR</b><small>PHỤ KIỆN · ĐỒ CHƠI · NÂNG CẤP Ô TÔ</small></span></Link>
      <form action="/store" className="auto-search" role="search"><input name="search" aria-label="Tìm sản phẩm hoặc thương hiệu" placeholder="Bạn đang tìm phụ kiện nào cho xe?" /><button aria-label="Tìm kiếm"><Search size={19} /></button></form>
      <div className="auto-header-hours"><Clock size={23} /><span><small>GIỜ LÀM VIỆC</small><strong>{business.hours}</strong></span></div>
      <div className="auto-header-info"><Phone size={25} /><span><small>HOTLINE TƯ VẤN</small><a href={business.phoneHref}>{business.phone}</a></span></div>
      <button className="auto-menu-toggle" aria-label={mobile ? 'Đóng menu' : 'Mở menu'} aria-expanded={mobile} aria-controls="main-navigation" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
    </div>
    <div className="auto-nav-wrap"><div className="auto-container auto-nav-inner"><nav id="main-navigation" aria-label="Điều hướng chính" className={`auto-nav ${mobile ? 'is-open' : ''}`} onKeyDown={e => { if (e.key === 'Escape') { setMobile(false); (e.target as HTMLElement).blur(); } }}>
      {links.map(link => <div className="auto-nav-item" key={link.title}><Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setMobile(false)}>{link.title}{link.children && <ChevronDown size={12} />}</Link>{link.children && <div className="auto-dropdown">{link.children.map(([title, href]) => <Link key={href} href={href} onClick={() => setMobile(false)}>{title}</Link>)}</div>}</div>)}
      <span className="auto-mobile-hours"><Clock size={15} />{business.hours}</span>
    </nav><Link className="auto-button" href="/#tu-van">Đăng ký báo giá</Link></div></div>
  </header>;
}
