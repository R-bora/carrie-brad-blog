'use client';

import React from 'react';
import { CategoryFilter } from '@/types/blog';

interface CategoryBarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'SOCIAL MEDIA',
  'WELLNESS',
  'BUSINESS',
  'COPYWRITING',
];

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="w-full bg-white border-b border-editorial-border/60">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
        {/* Script text on the left */}
        <div className="flex items-center space-x-2">
          <span className="font-script text-2xl sm:text-3xl text-neutral-800 italic select-none">
            Browse the blog :
          </span>
        </div>

        {/* Categories spaced evenly on the right */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-9 md:gap-11">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`text-[11px] uppercase tracking-[0.22em] font-sans transition-all pb-0.5 ${
              activeCategory === 'ALL'
                ? 'text-black font-semibold border-b border-black'
                : 'text-neutral-600 hover:text-black font-medium'
            }`}
          >
            ALL
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`text-[11px] uppercase tracking-[0.22em] font-sans transition-all pb-0.5 ${
                activeCategory === cat
                  ? 'text-black font-semibold border-b border-black'
                  : 'text-neutral-600 hover:text-black font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
