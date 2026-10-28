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
              'url("https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-neutral-400 font-medium block mb-3">
            Investigative Pillars
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase font-normal mb-5 drop-shadow-md">
            FOCUS PILLARS
          </h1>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.24em] text-neutral-300 font-medium leading-relaxed max-w-xl mx-auto">
            FORENSIC SCRUTINY INTO BRITAIN’S MOST CONTENTIOUS INSTITUTIONAL &amp; POLITICAL DEBATES
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="w-full bg-white py-16 sm:py-24 flex-1">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Pillar 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-[#faf9f7] border border-neutral-200/80">
            <div className="lg:col-span-4 aspect-[4/3] bg-neutral-200 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80"
                alt="Westminster & Dark Money"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-neutral-400 font-light">01</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Parliamentary Scrutiny</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                Westminster, Lobbying &amp; Dark Money
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Investigating second jobs, APPG corporate sponsorships, advisory retainers, and the opaque revolving door between ministerial decision-making and lucrative private government contracts. We trace the financial conduits shaping legislative votes.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-block bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3 transition-colors"
                >
                  Submit Tip to Westminster Desk
                </Link>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-neutral-900 text-white shadow-xl">
            <div className="lg:col-span-4 aspect-[4/3] bg-neutral-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="NHS & Welfare"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-neutral-400 font-light">02</span>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Public Health Audit</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                NHS Crisis, PFI Debt &amp; Backdoor Privatisation
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Auditing how decades of Private Finance Initiative (PFI) interest repayments, private agency staffing markups, and Integrated Care Board commissioning decisions divert public NHS funds into corporate equity portfolios while frontline services decay.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-block bg-white hover:bg-neutral-200 text-neutral-900 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3 transition-colors"
                >
                  Submit NHS Whistleblower Evidence
                </Link>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-[#faf9f7] border border-neutral-200/80">
            <div className="lg:col-span-4 aspect-[4/3] bg-neutral-200 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
                alt="Borders & Civil Liberties"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-neutral-400 font-light">03</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">State Power &amp; Borders</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                Borders, Law &amp; Civil Liberties
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Examining the multi-billion-pound commercial contracts managing asylum reception hotels, Channel detention logistics, and the unprecedented expansion of police surveillance and protest restrictions under the Public Order Acts.
              </p>
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="inline-block bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3 transition-colors"
                >
                  Submit Tip to Civil Liberties Desk
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
