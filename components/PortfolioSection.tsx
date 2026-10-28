'use client';

import React, { useState } from 'react';

interface PortfolioSectionProps {
  onOpenContact: (dossierTitle?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenContact }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  const dossiers = [
    {
      id: 'water-dividend',
      title: 'The Water Dividend Files',
      category: 'ENVIRONMENT & FINANCE',
      excerpt: 'How £72 billion was extracted in dividends while raw sewage discharges reached 3.6 million hours.',
      image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
      description: 'A cross-decade audit into Thames Water, Southern Water, and Yorkshire Water. Analyzing complex offshore holding structures in the Cayman Islands that loaded debt onto British billpayers while starving infrastructure maintenance.',
      findings: [
        { label: 'Key Finding', val: '£72B in dividends paid out since 1989 privatisation' },
        { label: 'Infrastructure Debt', val: '£64B accumulated debt across privatised water firms' },
        { label: 'Legal Impact', val: 'Formal referrals to the Environment Agency & SFO' }
      ]
    },
    {
      id: 'barge-procurement',
      title: 'The Channel Procurement Audit',
      category: 'IMMIGRATION & HOME OFFICE',
      excerpt: 'Unredacted contracts reveal millions awarded to shell logistics firms for asylum accommodations.',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      description: 'An investigation tracing public treasury payouts to offshore suppliers managing the Bibby Stockholm and hotel holding facilities. FOI requests expose daily per-person costs exceeding luxury hotel rates.',
      findings: [
        { label: 'Daily Expense', val: 'Over £8.2M spent per day on emergency hotel accommodation' },
        { label: 'Vetting Protocol', val: 'Direct-award contracts without competitive tender' },
        { label: 'Parliamentary Review', val: 'Public Accounts Committee formal evidence submission' }
      ]
    },
    {
      id: 'crown-estate',
      title: 'The Offshore Property Registry',
      category: 'HOUSING & ASSETS',
      excerpt: 'Mapping 87,000 secret offshore entities owning prime British residential and commercial land.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      description: 'Forensic matching of Land Registry records with overseas corporate registers reveals Russian, Gulf, and international politically exposed persons holding vast residential parcels in Mayfair, Kensington, and Westminster.',
      findings: [
        { label: 'Registry Loophole', val: 'Thousands of anonymous trusts still unverified' },
        { label: 'Market Distortion', val: 'Estimated £12B in London real estate held passively' },
        { label: 'Reform Proposal', val: 'Draft amendments submitted for the Economic Crime Bill' }
      ]
    }
  ];

  const activeDossier = dossiers.find((d) => d.title === selectedCaseStudy);

  return (
    <section id="portfolio" className="w-full bg-[#f6f4f0] py-16 sm:py-24 border-t border-neutral-200/70 scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#942323] font-bold block mb-2">
              SPECIAL INQUEST DOSSIERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 tracking-[0.05em] uppercase font-normal">
              FEATURED EXPOSÉS
            </h2>
          </div>
          <p className="font-sans text-xs text-neutral-600 max-w-sm leading-relaxed">
            Forensic cross-sector investigations breaking down the UK's most heavily guarded public interest records.
          </p>
        </div>

        {/* Dossiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {dossiers.map((d) => (
            <div key={d.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200">
              <div
                className="aspect-[4/3] overflow-hidden bg-neutral-200 cursor-pointer"
                onClick={() => setSelectedCaseStudy(d.title)}
              >
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-[9.5px] uppercase tracking-[0.2em] font-sans text-[#942323] font-bold block mb-1">
                  {d.category}
                </span>
                <h4 className="font-serif text-lg text-neutral-900 mb-2 font-bold uppercase leading-snug">
                  {d.title}
                </h4>
                <p className="font-sans text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
                  {d.excerpt}
                </p>
                <button
                  onClick={() => setSelectedCaseStudy(d.title)}
                  className="text-xs font-serif italic text-neutral-800 hover:text-[#942323] font-medium"
                >
                  Read Investigation Briefing ⟶
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white text-neutral-900 shadow-2xl p-6 sm:p-10 border border-neutral-200 max-h-[90vh] overflow-y-auto rounded-2xl">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
              aria-label="Close dossier modal"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#942323] font-bold font-sans block mb-1">
              {activeDossier.category}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-4 font-bold uppercase">
              {activeDossier.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              {activeDossier.description}
            </p>

            <div className="p-4 bg-[#f8f6f2] border-l-4 border-black mb-6 font-sans text-xs space-y-2 rounded-r-lg">
              {activeDossier.findings.map((f, i) => (
                <div key={i}>
                  <strong>{f.label}:</strong> {f.val}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  const title = activeDossier.title;
                  setSelectedCaseStudy(null);
                  onOpenContact(`Dossier Evidence: ${title}`);
                }}
                className="bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest px-6 py-2.5 font-bold transition-all rounded-lg"
              >
                Submit Whistleblower Evidence
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
