'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveDate, setLiveDate] = useState('FRIDAY, OCTOBER 23, 2026');
  const [liveTime, setLiveTime] = useState('07:28:45 PM');
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      setLiveDate(now.toLocaleDateString('en-US', dateOptions).toUpperCase());
      setLiveTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Editorial Dateline Strip with Real-time Clock */}
      <div className="w-full bg-[#f4f0e6] border-b border-[#dfd8c7] text-[11px] font-sans font-medium text-[#6b665c]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="font-bold text-[#111111] tracking-wider uppercase">{liveDate}</span>
            <span className="text-neutral-400">•</span>
            <span className="font-bold text-[#942323] tracking-wider font-mono text-[10.5px]">{liveTime}</span>
            <span className="text-neutral-400 hidden sm:inline">•</span>
            <span className="hidden sm:inline">LIVE DIGITAL EDITION</span>
          </div>

          <div className="hidden lg:block italic text-xs text-[#2c2c2c] tracking-wide">
            "Weekly Dispatches on Digital Strategy, Creative Living &amp; High-Touch Copy"
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/studio"
              className="inline-flex items-center gap-1.5 bg-black hover:bg-[#942323] text-white px-2.5 py-0.5 text-[9.5px] font-sans font-bold tracking-wider uppercase transition-colors"
              title="Launch Sanity CMS Studio"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              SANITY STUDIO
            </Link>
            <span className="text-neutral-400">•</span>
            <a href="#newsletter" className="text-[#942323] hover:underline font-bold tracking-wider uppercase text-[10px]">
              SUBSCRIBE TO THE MEMO
            </a>
          </div>
        </div>
      </div>

      <header className="w-full bg-[#fbf9f5]/95 backdrop-blur-md border-b-2 border-black sticky top-0 z-50 h-14 flex items-center shadow-sm">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo on the far left */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="font-serif tracking-[0.2em] text-lg sm:text-xl font-black text-neutral-900 hover:opacity-85 transition-opacity uppercase"
          >
            CARRIE BRAD
          </Link>
        </div>

        {/* Centered Desktop Menu - Editorial Blog Navigation */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9 text-[11px] font-sans font-bold tracking-[0.18em] uppercase">
          <Link
            href="/"
            className={`transition-colors border-b-2 py-1 ${
              pathname === '/'
                ? 'text-[#942323] border-[#942323]'
                : 'text-neutral-700 border-transparent hover:text-[#942323]'
            }`}
          >
            HOME
          </Link>
          <Link
            href="/services"
            className={`transition-colors border-b-2 py-1 ${
              pathname === '/services'
                ? 'text-[#942323] border-[#942323]'
                : 'text-neutral-700 border-transparent hover:text-[#942323]'
            }`}
          >
            SERVICES
          </Link>
          <Link
            href="/portfolio"
            className={`transition-colors border-b-2 py-1 ${
              pathname === '/portfolio'
                ? 'text-[#942323] border-[#942323]'
                : 'text-neutral-700 border-transparent hover:text-[#942323]'
            }`}
          >
            PORTFOLIO
          </Link>
          <Link
            href="/blog"
            className={`transition-colors border-b-2 py-1 ${
              pathname === '/blog'
                ? 'text-[#942323] border-[#942323]'
                : 'text-neutral-700 border-transparent hover:text-[#942323]'
            }`}
          >
            BLOG
          </Link>
        </nav>

        {/* Right side: Studio CMS + Black CONTACT Button */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-1.5 border border-black hover:bg-black hover:text-white text-neutral-900 text-[10px] sm:text-[11px] tracking-[0.16em] font-sans font-bold px-3 py-1.5 uppercase transition-colors"
            title="Open Sanity CMS Studio"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            CMS STUDIO
          </Link>
          <Link
            href="/contact"
            className="bg-black hover:bg-neutral-800 text-white text-[10px] sm:text-[11px] tracking-[0.18em] font-sans font-bold px-4 sm:px-5 py-2 uppercase transition-colors shadow-sm"
          >
            CONTACT
          </Link>

          {/* Social Icons */}
          <div className="hidden sm:flex items-center space-x-3 text-neutral-800">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-black transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-black transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.556 5 15.658 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-800 hover:text-black p-1.5 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-5 shadow-lg animate-fadeIn w-full absolute top-full left-0">
          <nav className="flex flex-col space-y-4 text-xs font-sans font-medium tracking-[0.2em] text-neutral-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-black transition-colors py-1"
            >
              HOME
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-black transition-colors py-1"
            >
              SERVICES
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-black transition-colors py-1"
            >
              PORTFOLIO
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-black transition-colors py-1"
            >
              BLOG
            </Link>
            <Link
              href="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#942323] font-bold hover:text-black transition-colors py-1 flex items-center justify-between"
            >
              <span>SANITY CMS STUDIO</span>
              <span className="text-[10px] font-mono bg-neutral-200 text-black px-1.5 py-0.5 rounded">ADMIN ↗</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-black text-white text-center py-2.5 uppercase tracking-[0.2em]"
            >
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
    </>
  );
};
