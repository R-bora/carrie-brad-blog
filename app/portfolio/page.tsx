import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#e8dfd8] selection:text-neutral-900">
      <Header />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#181818] py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-[#181818]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-neutral-400 font-medium block mb-3">
            Curated Client Work
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase font-normal mb-5 drop-shadow-md">
            OUR PORTFOLIO
          </h1>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.24em] text-neutral-300 font-medium leading-relaxed max-w-lg mx-auto">
            CASE STUDIES IN BRAND POSITIONING, EDITORIAL LAUNCHES &amp; CMS INTEGRATION
          </p>
        </div>
      </section>

      {/* Showcase */}
      <main className="w-full bg-[#fbf9f6] py-16 sm:py-24 flex-1">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Project 1 */}
          <article className="bg-white p-6 sm:p-10 border border-neutral-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 aspect-[16/10] bg-neutral-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Minimalist Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans">
                Architecture &amp; Interior Studio
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                The Modern Minimalist Studio
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Redefined their visual and narrative identity from commoditized residential designer to an internationally sought-after architectural practice.
              </p>
              <div className="p-4 bg-[#f8f6f2] font-sans text-xs space-y-1 border-l-2 border-neutral-900">
                <div><strong>Impact:</strong> 180% increase in average retainer size</div>
                <div><strong>Scope:</strong> Brand Strategy, Website Copy, Next.js Development</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block text-xs font-serif italic text-neutral-800 hover:text-black border-b border-neutral-400 pb-0.5"
                >
                  Inquire About a Project Like This ⟶
                </Link>
              </div>
            </div>
          </article>

          {/* Project 2 */}
          <article className="bg-white p-6 sm:p-10 border border-neutral-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 aspect-[16/10] bg-neutral-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                alt="Botanical Skincare"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans">
                Luxury Botanical Wellness
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                Aura Botanical Skincare
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Developed a poetic yet conversion-optimized brand voice for an artisanal organic skincare line expanding from direct-to-consumer into high-end retail boutiques.
              </p>
              <div className="p-4 bg-[#f8f6f2] font-sans text-xs space-y-1 border-l-2 border-neutral-900">
                <div><strong>Impact:</strong> 240% increase in customer lifetime value</div>
                <div><strong>Scope:</strong> Product Copy, Email Automation Sequences, Packaging Copy</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block text-xs font-serif italic text-neutral-800 hover:text-black border-b border-neutral-400 pb-0.5"
                >
                  Inquire About a Project Like This ⟶
                </Link>
              </div>
            </div>
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
