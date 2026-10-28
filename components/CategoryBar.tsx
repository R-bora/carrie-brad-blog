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
    <section className="w-full bg-white border-b border-[#ece6db]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Script text on the left */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className="font-script text-2xl sm:text-3xl text-neutral-800 italic select-none">
            Investigate by debate :
          </span>
        </div>

        {/* Categories: Smooth horizontal scrollable strip on mobile, spaced evenly on desktop */}
        <div
          className="flex items-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto w-full md:w-auto px-2 py-1 justify-start md:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-sans transition-all pb-1 whitespace-nowrap flex-shrink-0 ${
              activeCategory === 'ALL'
                ? 'text-black font-bold border-b-2 border-black'
                : 'text-neutral-500 hover:text-black font-medium border-b-2 border-transparent'
            }`}
          >
            ALL DEBATES
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-sans transition-all pb-1 whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat
                  ? 'text-black font-bold border-b-2 border-black'
                  : 'text-neutral-500 hover:text-black font-medium border-b-2 border-transparent'
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
