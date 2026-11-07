'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/sanity/lib/image';

interface PostCardProps {
  post: BlogPost;
  onOpenPost?: (post: BlogPost) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onOpenPost }) => {
  const imageUrl =
    post.mainImage?.asset?.url ||
    (post.mainImage?.asset ? urlForImage(post.mainImage)?.url() : null) ||
    post.mainImage?.url ||
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80';

  const postUrl = `/blog/${post.slug}`;

  return (
    <article className="group flex flex-col h-full bg-white transition-all active:scale-[0.99] duration-150">
      {/* Thumbnail Container */}
      <div className="relative flex items-stretch">
        {/* Vertical Category Text along the left edge (Desktop / Tablet sm+ only) */}
        <div className="hidden sm:flex w-6 sm:w-7 flex-shrink-0 items-center justify-center py-2 pr-1 select-none">
          <span
            className="text-[10px] font-sans font-medium uppercase tracking-[0.24em] text-neutral-500 whitespace-nowrap transition-colors group-hover:text-neutral-900"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            {post.category || 'ARTICLE'}
          </span>
        </div>

        {/* Thumbnail Image */}
        <Link
          href={postUrl}
          target="_blank"
          className="relative flex-1 aspect-[16/10] sm:aspect-[1/1] overflow-hidden bg-neutral-100 block cursor-pointer rounded-lg sm:rounded-none"
        >
          {/* Mobile Category Badge Pill */}
          <div className="sm:hidden absolute top-2.5 left-2.5 z-10 bg-black/80 backdrop-blur-sm text-white text-[8px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {post.category || 'INQUEST'}
          </div>

          <img
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Typography Content below image */}
      <div className="flex flex-col flex-1 pt-4 sm:pt-6 sm:pl-8">
        {/* 1. Serif Title */}
        <Link href={postUrl} target="_blank" className="group-hover:text-neutral-600 block">
          <h3 className="font-serif text-[17px] sm:text-[19px] leading-[1.3] text-neutral-900 font-medium cursor-pointer hover:text-neutral-600 transition-colors uppercase">
            {post.title}
          </h3>
        </Link>

        {/* 2. Sans-serif Excerpt */}
        <p className="font-sans text-[12px] sm:text-[12.5px] leading-[1.65] text-neutral-500 mt-2.5 sm:mt-3 font-normal line-clamp-3">
          {post.excerpt}
        </p>

        {/* 3. Centered Italicized Read More Link with Arrow */}
        <div className="mt-4 sm:mt-5 pt-1 text-left sm:text-center">
          <Link
            href={postUrl}
            target="_blank"
            className="inline-flex items-center space-x-2 text-xs sm:text-[13px] font-serif italic text-[#942323] sm:text-neutral-700 hover:text-black transition-all group-hover:translate-x-0.5 py-1"
          >
            <span>Read Inquest</span>
            <span className="font-sans not-italic text-sm">⟶</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
