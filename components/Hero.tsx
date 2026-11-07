'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
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

  // Continuous 60fps smooth loop that works seamlessly on laptop, desktop, and touch screens
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const SPEED_PER_SEC = 48; // Smooth 48px/second gliding velocity

    const step = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (trackRef.current) {
        const track = trackRef.current;
        const singleSetWidth = track.scrollWidth / 3;

        if (!isHovered && singleSetWidth > 0) {
          accumulatedScroll.current += SPEED_PER_SEC * deltaTime;
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

  const baseItems: BlogPost[] =
    posts && posts.length > 0
      ? posts
      : [
          {
            _id: 'uk-trend-1',
            slug: 'asylum-hotel-profiteers',
            title: 'THE ASYLUM HOTEL PROFITEERS: WHERE THE BILLIONS ACTUALLY GO',
            category: 'IMMIGRATION',
            excerpt: 'How private contractors extract massive profit margins housing channel arrivals.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '6 MIN READ',
          },
          {
            _id: 'uk-trend-2',
            slug: 'london-councils-on-the-brink',
            title: 'LONDON COUNCILS ON THE BRINK: WHY LOCAL AUTHORITIES ARE GOING BUST',
            category: 'ECONOMY',
            excerpt: 'Temporary accommodation and adult social care debts trigger unprecedented Section 114 notices.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '8 MIN READ',
          },
          {
            _id: 'uk-trend-3',
            slug: 'the-royal-prerogative-secret-veto',
            title: 'THE ROYAL PREROGATIVE: SECRET WINDSOR CONSENT OVER BRITISH LAWS',
            category: 'MONARCHY',
            excerpt: 'National Archives expose how Palace lawyers vetted over 1,000 parliamentary bills in secret.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '7 MIN READ',
          },
          {
            _id: 'uk-trend-4',
            slug: 'junior-doctors-vs-downing-street',
            title: 'JUNIOR DOCTORS VS DOWNING STREET: THE NHS STRIKE DEADLOCK',
            category: 'NHS & HEALTH',
            excerpt: 'Inside the bitter ideological war over full pay restoration and healthcare retention.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '5 MIN READ',
          },
          {
            _id: 'uk-trend-5',
            slug: 'digital-id-cashless-britain',
            title: 'DIGITAL ID & CASHLESS BRITAIN: THE WAR ON MONETARY FREEDOM',
            category: 'CIVIL LIBERTIES',
            excerpt: 'Bank branch closures, central bank digital currencies, and debanking scandals across the UK.',
            mainImage: {
              url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
            },
            estimatedReadTime: '6 MIN READ',
          },
        ];

  // Duplicate items 3 times for seamless infinite ribbon
  const trendingItems = [...baseItems, ...baseItems, ...baseItems];

  return (
    <section className="w-full bg-[#f8f5ee] border-b border-[#e2dbcd] py-6 sm:py-10 md:py-12 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Chevrons & Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#d8cfbe] pb-3 mb-4 sm:mb-6 gap-3">
          <div className="flex items-start sm:items-center space-x-2.5 sm:space-x-3">
            <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-black text-white text-xs sm:text-base shadow-sm flex-shrink-0 mt-0.5 sm:mt-0">
              ⚡
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="font-serif font-bold text-base sm:text-xl md:text-2xl uppercase tracking-tight text-neutral-900">
                  TRENDING UK CONTROVERSIES
                </h3>
                <span className="text-[8.5px] sm:text-[9.5px] font-sans font-bold bg-[#942323] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  TOP INQUESTS
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-sans font-bold text-[#6b665c] border border-[#d6cebf] px-2 py-0.5 rounded-full uppercase tracking-wider hidden md:inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE ROLLING RADAR
                </span>
              </div>
              <p className="font-sans text-[8.5px] sm:text-[10.5px] text-[#6b665c] uppercase tracking-[0.12em] sm:tracking-[0.16em] mt-0.5">
                ACTIVE PARLIAMENTARY &amp; PUBLIC INQUIRIES • SWIPE TO EXPLORE
              </p>
            </div>
          </div>

          {/* Carousel Scroll Controls */}
          <div className="flex items-center justify-between sm:justify-end space-x-2">
            <span className="sm:hidden text-[9px] font-sans uppercase tracking-widest text-[#6b665c]">
              Swipe cards ↔
            </span>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <button
                onClick={() => scrollTrack(-1)}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-black hover:text-white border border-[#d6cfbe] text-black flex items-center justify-center transition-all shadow-sm font-bold text-xs active:scale-95"
                title="Scroll Left"
                aria-label="Scroll left"
              >
                ❮
              </button>
              <button
                onClick={() => scrollTrack(1)}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-black hover:text-white border border-[#d6cfbe] text-black flex items-center justify-center transition-all shadow-sm font-bold text-xs active:scale-95"
                title="Scroll Right"
                aria-label="Scroll right"
              >
                ❯
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track (Continuous 60fps loop, touch-friendly, hover-pause) */}
        <div
          ref={trackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setTimeout(() => {
              if (trackRef.current) {
                accumulatedScroll.current = trackRef.current.scrollLeft;
              }
              setIsHovered(false);
            }, 600);
          }}
          className="flex gap-3 sm:gap-5 md:gap-6 overflow-x-auto pb-4 pt-1 px-1 cursor-grab active:cursor-grabbing select-none"
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
              'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80';

            const rankNum = (idx % baseItems.length) + 1;

            return (
              <Link
                key={`${item._id}-${idx}`}
                href={`/blog/${item.slug}`}
                target="_blank"
                className="flex-shrink-0 w-[215px] xs:w-[235px] sm:w-[260px] md:w-[280px] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col border border-[#e8e2d5]"
              >
                {/* Poster Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  {/* Floating Rank Badge */}
                  <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 bg-black/85 backdrop-blur-md text-white font-serif font-black text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                    <span className="text-amber-400 font-bold">#</span>
                    0{rankNum}
                  </div>

                  {/* Floating Category Badge */}
                  <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 bg-white/95 backdrop-blur-md text-black text-[7.5px] sm:text-[8.5px] font-sans font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm truncate max-w-[120px]">
                    {item.category || 'UK TOPIC'}
                  </div>

                  <img
                    src={imgUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                  />

                  {/* Bottom Gradient Fade over Poster */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/92 via-black/50 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                    <div className="text-[8.5px] sm:text-[9.5px] font-sans font-bold text-amber-300 tracking-wider uppercase mb-1 flex items-center gap-1">
                      <span>🔥 {94 - (rankNum - 1) * 8}.2K CITATIONS</span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-300">{item.estimatedReadTime || '6 MIN'}</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm md:text-[15px] leading-snug line-clamp-2 uppercase group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="p-2.5 sm:p-3 bg-white flex items-center justify-between text-[9.5px] sm:text-[10px] font-sans font-bold text-[#6b665c] group-hover:text-[#942323] transition-colors border-t border-[#f0ebe0]">
                  <span className="uppercase tracking-wider">READ DEBATE</span>
                  <span className="font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
