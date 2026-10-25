'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContactModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveDate, setLiveDate] = useState('FRIDAY, OCTOBER 23, 2026');
  const [liveTime, setLiveTime] = useState('07:28:45 PM');
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
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
      {/* 1. Top Editorial Dateline Strip with Real-time Clock */}
      <div className="w-full bg-[#f4f0e6] border-b border-[#dfd8c7] text-[10px] sm:text-[11px] font-sans font-medium text-[#6b665c]">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between gap-2">
          {/* Left: Real-time Date and Clock */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 overflow-hidden">
            <span className="font-bold text-[#111111] tracking-wider uppercase whitespace-nowrap text-[9.5px] sm:text-[11px]">
              {liveDate}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="font-bold text-[#942323] tracking-wider font-mono text-[9.5px] sm:text-[10.5px] whitespace-nowrap">
              {liveTime}
            </span>
            <span className="text-neutral-400 hidden md:inline">•</span>
            <span className="hidden md:inline whitespace-nowrap">LIVE DIGITAL EDITION</span>
          </div>

          {/* Center Motto - Desktop Only */}
          <div className="hidden lg:block italic text-xs text-[#2c2c2c] tracking-wide truncate max-w-md text-center">
            "Weekly Dispatches on Digital Strategy, Creative Living &amp; High-Touch Copy"
          </div>

          {/* Right: Newsletter Subscribe Link */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <a
              href="#newsletter"
              className="text-[#942323] hover:underline font-bold tracking-wider uppercase text-[9px] sm:text-[10px] whitespace-nowrap"
            >
              SUBSCRIBE TO THE MEMO
            </a>
          </div>
        </div>
      </div>

      {/* 2. Grand Editorial Broadsheet Masthead (CARRIE BRAD Centered) */}
      <div className="w-full bg-[#fbf9f5] border-b border-[#dfd8c7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          {/* Top Subtitle Rule */}
          <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-sans font-bold tracking-[0.14em] sm:tracking-[0.25em] uppercase text-[#6b665c] border-b border-[#dfd8c7] pb-1.5 sm:pb-2 mb-2 sm:mb-3">
            <div className="w-1/4 text-left hidden sm:block">FOUNDED MMXX</div>
            <div className="w-full sm:w-2/4 text-center leading-snug">
              A CURATED EDITORIAL BLOG ON MARKETING &amp; WELLNESS
            </div>
            <div className="w-1/4 text-right hidden sm:block">WEEKLY CIRCULATION</div>
          </div>

          {/* The Big Centered Nameplate */}
          <div className="text-center py-1 sm:py-2 md:py-3">
            <Link href="/" className="inline-block group">
              <h1 className="font-serif text-[38px] sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-[-0.02em] uppercase text-[#111111] leading-none group-hover:opacity-85 transition-opacity">
                Carrie Brad
              </h1>
            </Link>
          </div>

          {/* Bottom Masthead Rule */}
          <div className="border-t-2 border-b border-black py-1 sm:py-1.5 mt-2 sm:mt-3 flex items-center justify-between text-[9px] sm:text-[11px] font-sans font-semibold tracking-[0.12em] sm:tracking-[0.16em] uppercase text-[#111111]">
            <span>THE JOURNAL</span>
            <span className="font-script text-xl sm:text-2xl md:text-3xl lowercase tracking-normal text-[#2c2c2c] font-normal -my-1">
              editorial notes &amp; strategy
            </span>
            <span>AUTUMN • 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Rock-Solid Sticky Stationary Navigation Bar */}
      <header className="w-full bg-[#fbf9f5]/95 backdrop-blur-md border-b-2 border-black sticky top-0 z-50 h-13 sm:h-14 flex items-center shadow-sm">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Brand Mark OR Desktop Edition Tag */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-serif tracking-[0.16em] text-base sm:text-lg font-black text-neutral-900 md:hidden uppercase"
            >
              CARRIE BRAD
            </Link>
            <span className="hidden md:inline-block text-[10px] font-sans font-bold tracking-[0.22em] text-[#6b665c] uppercase">
              VOL. IV • ISSUE 42
            </span>
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

          {/* Right side: Contact Button + Social Icons + Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3.5">
            {onOpenContactModal ? (
              <button
                onClick={onOpenContactModal}
                className="bg-black hover:bg-neutral-800 text-white text-[9.5px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] font-sans font-bold px-3.5 sm:px-5 py-1.5 sm:py-2 uppercase transition-colors shadow-sm"
              >
                CONTACT
              </button>
            ) : (
              <Link
                href="/contact"
                className="bg-black hover:bg-neutral-800 text-white text-[9.5px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] font-sans font-bold px-3.5 sm:px-5 py-1.5 sm:py-2 uppercase transition-colors shadow-sm"
              >
                CONTACT
              </Link>
            )}

            {/* Social Icons (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center space-x-2.5 text-neutral-800">
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
          <div className="md:hidden bg-[#fbf9f5] border-t border-neutral-200 px-6 py-5 shadow-xl animate-fadeIn w-full absolute top-full left-0 z-50">
            <nav className="flex flex-col space-y-3.5 text-xs font-sans font-bold tracking-[0.2em] text-neutral-800">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 transition-colors ${
                  pathname === '/' ? 'text-[#942323]' : 'hover:text-[#942323]'
                }`}
              >
                HOME
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 transition-colors ${
                  pathname === '/services' ? 'text-[#942323]' : 'hover:text-[#942323]'
                }`}
              >
                SERVICES
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 transition-colors ${
                  pathname === '/portfolio' ? 'text-[#942323]' : 'hover:text-[#942323]'
                }`}
              >
                PORTFOLIO
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 transition-colors ${
                  pathname === '/blog' ? 'text-[#942323]' : 'hover:text-[#942323]'
                }`}
              >
                BLOG
              </Link>

              <div className="pt-2">
                {onOpenContactModal ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenContactModal();
                    }}
                    className="w-full bg-black text-white text-center py-3 uppercase tracking-[0.2em] text-[11px] font-bold shadow-sm"
                  >
                    CONTACT
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full bg-black text-white text-center py-3 uppercase tracking-[0.2em] text-[11px] font-bold shadow-sm"
                  >
                    CONTACT
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
