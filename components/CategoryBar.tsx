'use client';

import React from 'react';
import { CategoryFilter } from '@/types/blog';

interface CategoryBarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'POLITICS',
  'IMMIGRATION',
  'NHS & HEALTH',
  'ECONOMY & HOUSING',
  'CIVIL LIBERTIES',
  'MONARCHY',
];

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="w-full bg-white border-b border-[#ece6db] py-3 sm:py-5">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Script text on the left */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className="font-script text-2xl sm:text-3xl text-neutral-800 italic select-none">
            Investigate by debate :
          </span>
        </div>

        {/* Categories: Smooth touch-scrollable strip with touch-friendly pills on mobile */}
        <div className="w-full md:w-auto overflow-hidden relative">
          <div
            className="flex items-center gap-1.5 sm:gap-2 md:gap-4 overflow-x-auto w-full px-1 py-1 justify-start md:justify-center scrollbar-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <button
              onClick={() => onSelectCategory('ALL')}
              className={`text-[9.5px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-sans transition-all px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                activeCategory === 'ALL'
                  ? 'bg-neutral-900 text-white font-bold shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 font-medium'
              }`}
            >
              ALL DEBATES
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-[9.5px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-sans transition-all px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white font-bold shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
