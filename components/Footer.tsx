'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111111] text-neutral-300 py-12 sm:py-16 border-t border-neutral-800 text-center">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        {/* Brand */}
        <div className="font-serif text-xl sm:text-2xl tracking-[0.24em] text-white uppercase mb-3">
          GAINLEADX
        </div>

        <p className="font-sans text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-neutral-400 mb-7 max-w-md mx-auto leading-relaxed">
          Digital Marketing, Strategy &amp; Lifestyle Editorial for Creative Entrepreneurs
        </p>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-[10.5px] sm:text-[11px] tracking-[0.18em] uppercase font-sans text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <Link href="/services" className="hover:text-white transition-colors">
            SERVICES
          </Link>
          <Link href="/portfolio" className="hover:text-white transition-colors">
            PORTFOLIO
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            BLOG
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            CONTACT
          </Link>
        </div>

        {/* Back to top */}
        <div className="mb-7">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[11px] font-sans text-neutral-500 hover:text-neutral-300 uppercase tracking-widest inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <span>↑</span>
            <span>Back to Top</span>
          </a>
        </div>

        <div className="w-16 h-px bg-neutral-800 mx-auto mb-7" />

        {/* Copyright */}
        <div className="text-[9.5px] sm:text-[10px] font-sans tracking-[0.16em] text-neutral-500 uppercase">
          &copy; {new Date().getFullYear()} GAINLEADX. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
