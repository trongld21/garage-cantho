'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Clock, MapPin, Menu, Phone, X } from 'lucide-react';
import { useServices } from '@/lib/use-services';
import { business } from '@/lib/business';
import { Brand } from '@/components/layout/Brand';

export default function Navbar() {
  const accessoryServices = useServices();
const links = [
  { title: 'Trang chủ', href: '/' },
  { title: 'Dịch vụ nâng cấp', href: '/services', children: accessoryServices.map(service => [service.name, `/services/${service.slug}`]) },
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
      <Brand />
      <a className="auto-header-info" href={business.phoneHref}><Phone size={17}/>{business.phone}</a>
      <Link className="auto-button auto-header-quote" href="/#tu-van">Đặt lịch tư vấn ↗</Link>
      <button className="auto-menu-toggle" aria-label={mobile ? 'Đóng menu' : 'Mở menu'} aria-expanded={mobile} aria-controls="main-navigation" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
    </div>
    <div className="auto-nav-wrap"><div className="auto-container auto-nav-inner"><nav id="main-navigation" aria-label="Điều hướng chính" className={`auto-nav ${mobile ? 'is-open' : ''}`} onKeyDown={e => { if (e.key === 'Escape') { setMobile(false); (e.target as HTMLElement).blur(); } }}>
      {links.map(link => <div className="auto-nav-item" key={link.title}><Link href={link.href} aria-current={(pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'))) ? 'page' : undefined} onClick={() => setMobile(false)}>{link.title}{link.children && <ChevronDown size={12} />}</Link>{link.children && <div className="auto-dropdown">{link.children.map(([title, href]) => <Link key={href} href={href} onClick={() => setMobile(false)}>{title}</Link>)}</div>}</div>)}
      <span className="auto-mobile-hours"><Clock size={15} />{business.hours}</span>
    </nav><Link className="auto-button" href="/#tu-van">Đăng ký báo giá</Link></div></div>
  </header>;
}
