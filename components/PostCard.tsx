'use client';

import React from 'react';
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

  return (
    <article className="group flex flex-col h-full bg-white transition-all">
      {/* Thumbnail Container with Vertical Category Text along left edge */}
      <div className="relative flex items-stretch">
        {/* Vertical Category Text along the left edge */}
        <div className="w-6 sm:w-7 flex-shrink-0 flex items-center justify-center py-2 pr-1 select-none">
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
        <div
          onClick={() => onOpenPost && onOpenPost(post)}
          className="relative flex-1 aspect-[1/1] overflow-hidden bg-neutral-100 cursor-pointer"
        >
          <img
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Typography Content below image - STRICT ORDER:
          1. Serif title
          2. Sans-serif excerpt
          3. Italicized Read More link with arrow (centered)
      */}
      <div className="flex flex-col flex-1 pt-6 pl-7 sm:pl-8">
        {/* 1. Serif Title */}
        <h3
          onClick={() => onOpenPost && onOpenPost(post)}
          className="font-serif text-[18px] sm:text-[19px] leading-[1.3] text-neutral-900 font-medium cursor-pointer hover:text-neutral-600 transition-colors"
        >
          {post.title}
        </h3>

        {/* 2. Sans-serif Excerpt */}
        <p className="font-sans text-[12px] sm:text-[12.5px] leading-[1.65] text-neutral-500 mt-3 font-normal line-clamp-3">
          {post.excerpt}
        </p>

        {/* 3. Centered Italicized Read More Link with Arrow */}
        <div className="mt-5 pt-1 text-center">
          <button
            onClick={() => onOpenPost && onOpenPost(post)}
            className="inline-flex items-center space-x-2 text-xs sm:text-[13px] font-serif italic text-neutral-700 hover:text-black transition-all group-hover:translate-x-0.5"
          >
            <span>Read More</span>
            <span className="font-sans not-italic text-sm">⟶</span>
          </button>
        </div>
      </div>
    </article>
  );
};
