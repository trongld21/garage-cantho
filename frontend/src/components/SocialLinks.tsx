import { ArrowUpRight, MessageCircle, Music2 } from 'lucide-react';
import { business } from '@/lib/business';

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3 mt-4" aria-label="Mạng xã hội">
      {[
        { name: 'Facebook', href: business.facebookUrl, Icon: MessageCircle },
        { name: 'TikTok', href: business.tiktokUrl, Icon: Music2 },
      ].map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} của Tây Đô Auto Car (mở tab mới)`}
          className="inline-flex items-center gap-2 border border-current/20 px-3 py-2 text-sm hover:text-[#dd1018] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dd1018] transition-colors"
        >
          <Icon size={17} aria-hidden="true" />
          {name}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
