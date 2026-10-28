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
              'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-[#181818]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-neutral-400 font-medium block mb-3">
            Published Investigative Inquests
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase font-normal mb-5 drop-shadow-md">
            PUBLISHED DOSSIERS
          </h1>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.24em] text-neutral-300 font-medium leading-relaxed max-w-xl mx-auto">
            FORENSIC CASE BRIEFS &amp; INDEPENDENT EXPOSÉS ON BRITAIN’S MOST ACUTE STRUCTURAL CRISES
          </p>
        </div>
      </section>

      {/* Showcase */}
      <main className="w-full bg-[#fbf9f6] py-16 sm:py-24 flex-1">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Dossier 1 */}
          <article className="bg-white p-6 sm:p-10 border border-neutral-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 aspect-[16/10] bg-neutral-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                alt="The Water Dividend Files"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans">
                Corporate Utility Governance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                The Water Dividend Files: 30 Years of Private Extraction
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A forensic financial breakdown tracking £78 billion in dividend payouts and executive bonuses extracted from privatised regional water monopolies while raw sewage discharges surged and infrastructure maintenance was deferred.
              </p>
              <div className="p-4 bg-[#f8f6f2] font-sans text-xs space-y-1 border-l-2 border-neutral-900">
                <div><strong>Financial Audit:</strong> £60bn debt loaded onto formerly debt-free assets</div>
                <div><strong>Regulatory Findings:</strong> Systematic under-reporting of storm overflow events</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block text-xs font-serif italic text-neutral-800 hover:text-black border-b border-neutral-400 pb-0.5"
                >
                  Submit Corroborating Evidence on Water Utilities ⟶
                </Link>
              </div>
            </div>
          </article>

          {/* Dossier 2 */}
          <article className="bg-white p-6 sm:p-10 border border-neutral-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 aspect-[16/10] bg-neutral-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80"
                alt="Channel Procurement Audit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans">
                Home Office Procurement
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                The Channel Procurement Audit: The £8M-a-Day Hotel Syndicate
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Investigating the secretive commercial arrangements between the Home Office and private facilities syndicates, detailing inflated nightly rates, procurement waivers, and municipal council pushback.
              </p>
              <div className="p-4 bg-[#f8f6f2] font-sans text-xs space-y-1 border-l-2 border-neutral-900">
                <div><strong>Commercial Scale:</strong> 400+ hotels contracted under emergency waivers</div>
                <div><strong>Beneficiaries:</strong> Private equity housing providers &amp; facility managers</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block text-xs font-serif italic text-neutral-800 hover:text-black border-b border-neutral-400 pb-0.5"
                >
                  Submit Procurement Whistleblower Leak ⟶
                </Link>
              </div>
            </div>
          </article>

          {/* Dossier 3 */}
          <article className="bg-white p-6 sm:p-10 border border-neutral-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 aspect-[16/10] bg-neutral-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80"
                alt="Offshore Property Registry"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans">
                Land Registry &amp; Capital Flight
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
                London’s Offshore Property Registry: Ghost Towers &amp; Tax Havens
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Cross-referencing the Register of Overseas Entities with Land Registry data to identify 42,000 prime central London residential assets owned through tax haven trusts while temporary council housing costs exceed £1.7bn annually.
              </p>
              <div className="p-4 bg-[#f8f6f2] font-sans text-xs space-y-1 border-l-2 border-neutral-900">
                <div><strong>Asset Concentration:</strong> Over 52% of prime towers held by offshore entities</div>
                <div><strong>Social Cost:</strong> Acute displacement of local essential workers</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block text-xs font-serif italic text-neutral-800 hover:text-black border-b border-neutral-400 pb-0.5"
                >
                  Submit Property Ledger Information ⟶
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
