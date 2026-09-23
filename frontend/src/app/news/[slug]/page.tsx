'use client';

import React from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { Badge } from '@/components/ui/Badge';
import { ArticleShare } from '@/components/ArticleShare';
import { ArrowLeft, User, Calendar, Clock, Tag } from 'lucide-react';
import { PageStatus, useSlugData } from '@/lib/use-static-data';

export default function NewsDetailPage() {
  const { data: post, loading, error } = useSlugData('news', slug => apiService.getPostBySlug(slug));
  if (loading || error || !post) return <PageStatus loading={loading} error={error} missing={!loading && !error && !post} />;
  const url = typeof window === 'undefined' ? '' : window.location.href;
  return (
    <div className="bg-[var(--bg-deep)] py-16 md:py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center space-x-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-gold)] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Tin Tức</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <Badge variant="gold">{post.category}</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] uppercase tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--text-secondary)] border-y border-[var(--border-subtle)] py-3">
            {post.author && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Thời gian đọc: {post.read_time}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-[var(--bg-graphite)] border border-[var(--border-subtle)] rounded-xs overflow-hidden h-80 sm:h-[450px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Summary Intro */}
        <div className="p-6 bg-[var(--bg-graphite)] border-l-4 border-[var(--accent-gold)] text-base text-[var(--text-primary)] font-semibold leading-relaxed">
          {post.summary}
        </div>

        {/* Main Body */}
        <div className="article-content text-sm sm:text-base text-[var(--text-primary)] leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
        <ArticleShare title={post.title} url={url} />

        {/* Article Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mr-2 flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Thẻ:</span>
            </span>
            {post.tags.map((t) => (
              <Badge key={t} variant="titanium">{t}</Badge>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
