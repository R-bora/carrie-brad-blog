'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111111] text-neutral-300 py-16 border-t border-neutral-800 text-center">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        {/* Brand */}
        <div className="font-serif text-2xl tracking-[0.24em] text-white uppercase mb-3">
          CARRIE BRAD
        </div>

        <p className="font-sans text-[10.5px] uppercase tracking-[0.22em] text-neutral-400 mb-8 max-w-md mx-auto">
          Digital Marketing, Strategy &amp; Lifestyle Editorial for Creative Entrepreneurs
        </p>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-[11px] tracking-[0.18em] uppercase font-sans text-neutral-400 mb-9">
          <Link href="#hero" className="hover:text-white transition-colors">
            HOME
          </Link>
          <Link href="#services" className="hover:text-white transition-colors">
            SERVICES
          </Link>
          <Link href="#portfolio" className="hover:text-white transition-colors">
            PORTFOLIO
          </Link>
          <Link href="#blog" className="hover:text-white transition-colors">
            BLOG
          </Link>
          <Link href="#contact" className="hover:text-white transition-colors">
            CONTACT
          </Link>
          <Link href="/studio" className="text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            SANITY STUDIO
          </Link>
        </div>

        {/* Back to top */}
        <div className="mb-8">
          <a
            href="#hero"
            className="text-xs font-sans text-neutral-500 hover:text-neutral-300 uppercase tracking-widest inline-flex items-center space-x-1 transition-colors"
          >
            <span>↑</span>
            <span>Back to Top</span>
          </a>
        </div>

        <div className="w-16 h-px bg-neutral-800 mx-auto mb-8" />

        {/* Copyright */}
        <div className="text-[10px] font-sans tracking-[0.16em] text-neutral-500 uppercase">
          &copy; {new Date().getFullYear()} CARRIE BRAD. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
