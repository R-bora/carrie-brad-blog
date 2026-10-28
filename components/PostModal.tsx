'use client';

import React from 'react';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/sanity/lib/image';

interface PostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const imageUrl =
    post.mainImage?.asset?.url ||
    (post.mainImage?.asset ? urlForImage(post.mainImage)?.url() : null) ||
    post.mainImage?.url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white shadow-2xl overflow-y-auto border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors flex items-center justify-center shadow-md text-sm font-semibold"
          aria-label="Close article modal"
        >
          ✕
        </button>

        {/* Header Image */}
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] bg-neutral-100 overflow-hidden">
            <img
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-6 bg-black/80 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-sans">
              {post.category}
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="p-6 sm:p-10 md:p-12">
          <div className="text-[11px] font-sans uppercase tracking-[0.22em] text-neutral-400 mb-2">
            Published {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Editorial Staff'}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-neutral-900 mb-6 font-normal">
            {post.title}
          </h1>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-700 italic border-l-2 border-neutral-300 pl-4 py-1 mb-8">
            {post.excerpt}
          </p>

          <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-800 space-y-4">
            <p>
              Operating a growing enterprise requires deliberate clarity and an uncompromising focus on what truly drives results. When you align your content strategy, visual brand aesthetics, and technical foundations, your business attracts your ideal clientele with effortless precision.
            </p>
            <p>
              In this editorial breakdown, we examine the practical systems top creators and modern studio founders use to simplify their operations, elevate their conversions, and create lasting brand loyalty.
            </p>
            <div className="p-6 bg-[#f7f5f2] border-l-4 border-neutral-800 my-6">
              <p className="font-serif text-base sm:text-lg italic text-neutral-900">
                “Consistent execution combined with clear editorial positioning will consistently outperform sporadic flashes of genius.”
              </p>
            </div>
            <p>
              Whether you are refining your client onboarding, auditing your social analytics, or preparing your quarterly business goals, maintaining strategic focus remains your greatest competitive advantage.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-200 flex justify-between items-center">
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-neutral-400">
              Gainleadx Editorial
            </span>
            <button
              onClick={onClose}
              className="bg-black text-white text-xs uppercase tracking-widest px-6 py-2.5 font-medium hover:bg-neutral-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
