import Image from 'next/image';
import Link from 'next/link';

export function Brand() {
  return <Link href="/" className="auto-logo" aria-label="Tây Đô Auto Car - Trang chủ"><span className="auto-logo-badge"><Image src="/tay-do-logo.jpg" alt="Logo TD Car Upgrade" width={960} height={904} sizes="56px" /></span><span>TÂY ĐÔ <b>AUTO CAR</b><small>CUSTOMIZE YOUR DRIVE</small></span></Link>;
}
