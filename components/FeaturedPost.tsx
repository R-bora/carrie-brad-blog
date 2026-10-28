'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/sanity/lib/image';

interface FeaturedPostProps {
  post: BlogPost;
  allPosts?: BlogPost[];
  onOpenPost?: (post: BlogPost) => void;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({
  post,
  allPosts,
  onOpenPost,
}) => {
  const slides = allPosts && allPosts.length > 0 ? allPosts.slice(0, 3) : [post];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentPost = slides[currentIdx] || post;

  const imageUrl =
    currentPost.mainImage?.asset?.url ||
    (currentPost.mainImage?.asset ? urlForImage(currentPost.mainImage)?.url() : null) ||
    currentPost.mainImage?.url ||
    'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80';

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 7.5 seconds when not hovered
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 7500);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full bg-[#0d0d0d] text-white border-b border-neutral-800 overflow-hidden py-10 sm:py-16 md:py-20"
    >
      {/* Dynamic blurred background banner */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-[2px] transition-all duration-700 pointer-events-none scale-105"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/90 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-[#0d0d0d]/80 pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Spotlight Info & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* HiAnime-style Spotlight Badge & Chips */}
            <div className="flex flex-wrap items-center gap-2 text-[9.5px] sm:text-[10px] font-sans font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase">
              <span className="inline-flex items-center gap-1.5 bg-[#942323] text-white px-3 py-1 rounded-full shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                #{currentIdx + 1} LEAD INVESTIGATION
              </span>
              <span className="bg-white/10 text-neutral-200 border border-white/20 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                {currentPost.category || 'UK CONTROVERSY'}
              </span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-neutral-300 hidden sm:inline">
                {currentPost.publishedAt
                  ? new Date(currentPost.publishedAt).toLocaleDateString('en-GB', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }).toUpperCase()
                  : 'OCTOBER 2026'}
              </span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-amber-400 font-semibold">★ 4.9 • 84.5K CITATIONS</span>
            </div>

            {/* Headline */}
            <h2
              onClick={() => onOpenPost && onOpenPost(currentPost)}
              className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-white leading-[1.2] tracking-tight hover:text-amber-300 transition-colors cursor-pointer drop-shadow-sm uppercase"
            >
              {currentPost.title}
            </h2>

            {/* Excerpt */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-4 font-normal">
              {currentPost.excerpt}
            </p>

            {/* Action Buttons & HiAnime Slider Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <button
                  onClick={() => onOpenPost && onOpenPost(currentPost)}
                  className="inline-flex items-center gap-1.5 bg-[#942323] hover:bg-red-700 text-white font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] px-4.5 sm:px-6 py-2.5 rounded-full uppercase transition-all shadow-lg hover:shadow-red-900/40 active:scale-95"
                >
                  <span>📖 READ FULL INQUEST</span>
                </button>
                <button
                  onClick={() => onOpenPost && onOpenPost(currentPost)}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/20 font-sans font-bold text-[9.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] px-3.5 sm:px-5 py-2.5 rounded-full uppercase transition-all backdrop-blur-sm active:scale-95"
                >
                  <span>🔖 BRIEFING NOTE</span>
                </button>
              </div>

              {slides.length > 1 && (
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-neutral-400 font-mono text-xs font-bold px-1">
                    0{currentIdx + 1} / 0{slides.length}
                  </span>
                  <button
                    onClick={prevSlide}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-[#942323] border border-white/20 text-white flex items-center justify-center transition-all active:scale-95"
                    title="Previous Investigation"
                  >
                    ❮
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-[#942323] border border-white/20 text-white flex items-center justify-center transition-all active:scale-95"
                    title="Next Investigation"
                  >
                    ❯
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Blended Featured Artwork with Atmospheric Glow */}
          <div className="lg:col-span-5 relative flex justify-center mt-2 lg:mt-0">
            <div
              className="relative w-full max-w-sm sm:max-w-md cursor-pointer group"
              onClick={() => onOpenPost && onOpenPost(currentPost)}
            >
              {/* Atmospheric Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#942323]/30 via-amber-500/20 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />

              {/* Circular Badge */}
              <div className="absolute -top-2.5 -left-2.5 sm:-top-5 sm:-left-5 z-20 w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-[#141414] text-white shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center transform -rotate-12 border border-white/20 group-hover:scale-105 transition-transform select-none">
                <div className="text-center font-sans tracking-[0.14em] text-[8px] sm:text-[10px] font-bold leading-tight uppercase p-1">
                  <div>THE</div>
                  <div className="py-0.5 text-red-400">UK</div>
                  <div>DOSSIER</div>
                </div>
              </div>

              {/* Thumbnail Container with Feathered Edge Mask */}
              <div
                className="relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden shadow-2xl bg-neutral-900 border border-white/10 rounded-2xl sm:rounded-3xl"
                style={{
                  maskImage: 'radial-gradient(ellipse 95% 92% at 50% 50%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 95% 92% at 50% 50%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 100%)',
                }}
              >
                <img
                  src={imageUrl}
                  alt={currentPost.title}
                  className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 bg-black/70 backdrop-blur-md px-3 py-1.5 sm:py-2 rounded-xl flex items-center justify-between text-[9px] sm:text-[9.5px] font-sans text-neutral-200 uppercase tracking-wider border border-white/15">
                  <span className="truncate mr-2">BY GAINLEADX INVESTIGATIVE DESK • {currentPost.estimatedReadTime || '7 MIN'}</span>
                  <span className="text-amber-400 font-bold flex-shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    READ INQUEST →
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
