import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiService } from '@/services/api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, User, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await apiService.getPostBySlug(slug);
  if (!post) return { title: 'Tin tức ô tô | Garage Tây Nam Bộ' };

  return {
    title: `${post.title} | Tây Nam Bộ Garage`,
    description: post.summary,
  };
}

export const revalidate = 60;

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await apiService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#0A0A0A] py-16 md:py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center space-x-2 text-xs text-[#A8A8A8] hover:text-[#C7A35A] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Tin Tức</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <Badge variant="gold">{post.category}</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] uppercase tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#A8A8A8] border-y border-white/10 py-3">
            {post.author && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-[#C7A35A]" />
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#C7A35A]" />
              <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#C7A35A]" />
                <span>Thời gian đọc: {post.read_time}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-[#161616] border border-white/10 rounded-xs overflow-hidden h-80 sm:h-[450px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Summary Intro */}
        <div className="p-6 bg-[#161616] border-l-4 border-[#C7A35A] text-base text-[#F5F5F5] font-semibold leading-relaxed">
          {post.summary}
        </div>

        {/* Main Body */}
        <div className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed space-y-6 whitespace-pre-line">
          {post.content}
        </div>

        {/* Article Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#A8A8A8] uppercase tracking-widest mr-2 flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-[#C7A35A]" />
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
