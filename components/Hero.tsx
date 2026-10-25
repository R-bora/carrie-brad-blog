'use client';

import React, { useRef, useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/sanity/lib/image';

interface HeroProps {
  posts?: BlogPost[];
  onOpenTrendingPost?: () => void;
  onOpenPost?: (post: BlogPost) => void;
}

export const Hero: React.FC<HeroProps> = ({
  posts,
  onOpenTrendingPost,
  onOpenPost,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const accumulatedScroll = useRef(0);

  const scrollTrack = (direction: number) => {
    if (trackRef.current) {
      setIsHovered(true);
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      if (direction < 0 && trackRef.current.scrollLeft <= 50) {
        trackRef.current.scrollLeft += singleSetWidth;
        accumulatedScroll.current = trackRef.current.scrollLeft;
      }
      trackRef.current.scrollBy({ left: direction * 260, behavior: 'smooth' });

      setTimeout(() => {
        if (trackRef.current && trackRef.current.scrollLeft >= singleSetWidth * 2) {
          trackRef.current.scrollLeft -= singleSetWidth;
        }
        if (trackRef.current) {
          accumulatedScroll.current = trackRef.current.scrollLeft;
        }
        setIsHovered(false);
      }, 500);
    }
  };

  // Continuous 60fps smooth loop from right to left
  useEffect(() => {
    let animId: number;
    const SPEED = 0.85; // smooth gliding pixels per frame

    const step = () => {
      if (trackRef.current) {
        const track = trackRef.current;
        const singleSetWidth = track.scrollWidth / 3;

        if (!isHovered) {
          accumulatedScroll.current += SPEED;
          if (accumulatedScroll.current >= singleSetWidth) {
            accumulatedScroll.current -= singleSetWidth;
          }
          track.scrollLeft = accumulatedScroll.current;
        } else {
          accumulatedScroll.current = track.scrollLeft;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const baseItems =
    posts && posts.length > 0
      ? posts
      : [
          {
            id: 'post-1',
            title: 'HOW TO GET CLIENTS FROM INSTAGRAM',
            category: 'SOCIAL MEDIA',
            excerpt: 'Turn your feed into a high-converting client acquisition funnel.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '4 MIN READ',
          },
          {
            id: 'featured-1',
            title: 'DREADING TAX SEASON? STRATEGIES TO PREPARE EARLY',
            category: 'BUSINESS',
            excerpt: 'Proactive tax protocols for independent founders.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '6 MIN READ',
          },
          {
            id: 'post-2',
            title: 'CREATIVE BURNOUT: HOW TO REGAIN FOCUS',
            category: 'WELLNESS',
            excerpt: 'Restorative habits to rekindle creative stamina.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '5 MIN READ',
          },
          {
            id: 'post-3',
            title: 'CONVERTING VISITORS WITH HIGH-TOUCH COPY',
            category: 'COPYWRITING',
            excerpt: 'Landing page copy that addresses objections with proof.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '4 MIN READ',
          },
        ];

  // Duplicate items 3 times for seamless infinite ribbon
  const trendingItems = [...baseItems, ...baseItems, ...baseItems];

  return (
    <section className="w-full bg-[#f8f5ee] border-b border-[#e2dbcd] py-7 sm:py-12 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Chevrons & Status Badge */}
        <div className="flex items-center justify-between border-b border-[#d8cfbe] pb-3 mb-5 sm:mb-6">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black text-white text-sm sm:text-base shadow-sm">
              🔥
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-2xl uppercase tracking-tight text-neutral-900 flex items-center gap-2">
                TRENDING BLOGS
                <span className="text-[9px] sm:text-[9.5px] font-sans font-bold bg-[#942323] text-white px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  TOP RANKED
                </span>
                <span className="text-[9.5px] font-sans font-bold text-[#6b665c] border border-[#d6cebf] px-2.5 py-0.5 rounded-full uppercase tracking-wider hidden md:inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  INFINITE LOOP
                </span>
              </h3>
              <p className="font-sans text-[9px] sm:text-[11px] text-[#6b665c] uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                GLIDING RIGHT TO LEFT • PAUSES ON TOUCH
              </p>
            </div>
          </div>

          {/* Carousel Scroll Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={() => scrollTrack(-1)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-black hover:text-white border border-[#d6cfbe] text-black flex items-center justify-center transition-all shadow-sm font-bold text-xs active:scale-95"
              title="Scroll Left"
              aria-label="Scroll left"
            >
              ❮
            </button>
            <button
              onClick={() => scrollTrack(1)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-black hover:text-white border border-[#d6cfbe] text-black flex items-center justify-center transition-all shadow-sm font-bold text-xs active:scale-95"
              title="Scroll Right"
              aria-label="Scroll right"
            >
              ❯
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track (Continuous Infinite Loop, Touch-friendly) */}
        <div
          ref={trackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 px-1 cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {trendingItems.map((item, idx) => {
            const imgUrl =
              item.mainImage?.asset?.url ||
              (item.mainImage?.asset ? urlForImage(item.mainImage)?.url() : null) ||
              item.mainImage?.url ||
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80';

            const rankNum = (idx % baseItems.length) + 1;

            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => {
                  if (onOpenPost) onOpenPost(item as BlogPost);
                  else if (onOpenTrendingPost) onOpenTrendingPost();
                }}
                className="flex-shrink-0 w-56 sm:w-68 bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col border border-[#e8e2d5]"
              >
                {/* Poster Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  {/* Floating Rank Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 bg-black/85 backdrop-blur-md text-white font-serif font-black text-xs px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                    <span className="text-amber-400 font-bold">#</span>
                    0{rankNum}
                  </div>

                  {/* Floating Category Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10 bg-white/95 backdrop-blur-md text-black text-[8px] sm:text-[8.5px] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category || 'BLOG'}
                  </div>

                  <img
                    src={imgUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter contrast-[1.03]"
                  />

                  {/* Bottom Gradient Fade over Poster */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end p-3.5 sm:p-4 text-white">
                    <div className="text-[9px] sm:text-[9.5px] font-sans font-bold text-amber-300 tracking-wider uppercase mb-1 flex items-center gap-1">
                      <span>🔥 {32 - (rankNum - 1) * 4}.5K READS</span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-300">{item.estimatedReadTime || '4 MIN'}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-[15px] leading-snug line-clamp-2 uppercase group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="p-2.5 sm:p-3 bg-white flex items-center justify-between text-[10px] font-sans font-bold text-[#6b665c] group-hover:text-[#942323] transition-colors border-t border-[#f0ebe0]">
                  <span className="uppercase tracking-wider">READ ARTICLE</span>
                  <span className="font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
