import Link from 'next/link';

export function Brand() {
  return <Link href="/" className="auto-logo" aria-label="Tây Đô Auto Car - Trang chủ"><span className="auto-logo-badge" aria-hidden="true"><svg viewBox="0 0 38 38" fill="none"><path d="M4 10H34L29 16H20L16 30H9L13 16H4Z" fill="currentColor"/><path d="M26 20H33L29 30H21Z" fill="currentColor"/></svg></span><span>TÂY ĐÔ <b>AUTO CAR</b><small>CUSTOMIZE YOUR DRIVE</small></span></Link>;
}
