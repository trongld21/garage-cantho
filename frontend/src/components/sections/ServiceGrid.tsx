import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import type { ServiceItem } from '@/types';
import { isIllustration } from '@/lib/media';

export function ServiceGrid({ services }: { services: ServiceItem[] }) {
  return <div className="auto-service-grid">{services.map((service, index) => <Link key={service.id} href={`/services/${service.slug}/`} className="auto-service-card"><div className="auto-service-photo"><ImageWithFallback src={service.image} alt={service.name} loading="lazy" fallbackType="service" /></div><span className="auto-service-number">{String(index + 1).padStart(2, '0')} /{isIllustration(service.image) && <small className="auto-illustration-label">Ảnh minh họa</small>}</span><div className="auto-service-content"><p className="auto-eyebrow">{service.category}</p><h3>{service.name}</h3><p>{service.summary}</p><div className="auto-service-more"><span>{service.price_range || 'Liên hệ tư vấn'}</span><ArrowUpRight size={19}/></div></div></Link>)}</div>;
}
