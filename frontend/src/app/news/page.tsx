'use client';

import React from 'react';
import { apiService } from '@/services/api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { PageStatus, useApiData } from '@/lib/use-static-data';

export default function NewsPage() {
  const { data: posts, loading, error } = useApiData(() => apiService.getPosts(), []);
  if (loading || error) return <PageStatus loading={loading} error={error} />;
  const featured = posts[0];

  return (
    <div className="bg-[var(--bg-deep)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="gold">TIN TỨC & LẮP ĐẶT PHỤ KIỆN</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] uppercase tracking-tight leading-tight">
            GÓC CHUYÊN GIA <br />
            <span className="text-gold-gradient">& KINH NGHIỆM AUTOMOTIVE</span>
          </h1>
          <p className="text-base text-[var(--text-secondary)]">
            Chia sẻ các bài viết kỹ thuật chuyên sâu giúp nâng cao độ bền và giữ gìn giá trị cho chiếc xe ô tô của bạn.
          </p>
        </div>

        {/* Featured Article */}
        {featured && (
          <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 img-zoom-wrapper h-80 sm:h-[400px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <Badge variant="gold">{featured.category}</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] uppercase tracking-tight leading-tight">
                {featured.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {featured.summary}
              </p>
              <div className="pt-4 flex items-center justify-between border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                <span>{new Date(featured.published_at).toLocaleDateString('vi-VN')}</span>
                <a href={`/news/${featured.slug}/`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Đọc Bài Viết
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Other Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs p-6 flex flex-col justify-between hover:border-[var(--accent-gold)]/40 transition-colors group"
            >
              <div className="space-y-4">
                <div className="img-zoom-wrapper h-48 rounded-xs overflow-hidden bg-[var(--bg-surface)]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge variant="titanium">{post.category}</Badge>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span>
                <a href={`/news/${post.slug}/`}>
                  <Button variant="secondary" size="sm">
                    Chi Tiết
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
