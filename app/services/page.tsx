import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#e8dfd8] selection:text-neutral-900">
      <Header />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#141414] py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-neutral-400 font-medium block mb-3">
            Tailored Engagements
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase font-normal mb-5 drop-shadow-md">
            OUR SERVICES
          </h1>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.24em] text-neutral-300 font-medium leading-relaxed max-w-lg mx-auto">
            HIGH-CONVERTING EDITORIAL ARCHITECTURE FOR CREATIVE ENTREPRENEURS
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="w-full bg-white py-16 sm:py-24 flex-1">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Service 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-[#faf9f7] border border-neutral-200/80">
            <div className="lg:col-span-4 aspect-[4/3] bg-neutral-200 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
                alt="Copywriting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-neutral-400 font-light">01</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">From $4,500</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                Brand Copywriting &amp; Narrative Architecture
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Your website copy should read like a page-turning luxury editorial. We produce complete website copy, high-converting launch funnels, email sequences, and brand voice guidelines tailored to your dream clientele.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-block bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3 transition-colors"
                >
                  Book Copywriting Package
                </Link>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-neutral-900 text-white shadow-xl">
            <div className="lg:col-span-4 aspect-[4/3] bg-neutral-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
                alt="Social Media Strategy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-neutral-400 font-light">02</span>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">From $3,500 / mo</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                Digital Content &amp; Social Strategy Direction
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Command attention in crowded feeds. We craft monthly storytelling campaigns, high-converting IG Stories frameworks, visual aesthetic moodboards, and multi-channel content engines that generate recurring inbound leads.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-block bg-white hover:bg-neutral-200 text-neutral-900 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3 transition-colors"
                >
                  Book Strategy Retainer
                </Link>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-[#faf9f7] border border-neutral-200/80">
            <div className="lg:col-span-4 aspect-[4/3] bg-neutral-200 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                alt="Web Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-neutral-400 font-light">03</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">From $6,000</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                Custom Editorial Web &amp; Sanity CMS Systems
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Eliminate bulky plugins and slow page loads. We engineer custom, pixel-perfect Next.js web applications seamlessly connected to Sanity CMS for effortless one-click article publishing.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-block bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3 transition-colors"
                >
                  Book CMS Development
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
