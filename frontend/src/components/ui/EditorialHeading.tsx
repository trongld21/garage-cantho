import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function EditorialHeading({ eyebrow, children, href, label = 'Xem tất cả' }: { eyebrow: string; children: React.ReactNode; href?: string; label?: string }) {
  return <div className="auto-section-heading"><div><p className="auto-eyebrow">{eyebrow}</p><h2>{children}</h2></div>{href && <Link href={href}>{label}<ArrowUpRight size={17}/></Link>}</div>;
}
