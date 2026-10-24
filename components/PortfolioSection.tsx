'use client';

import React, { useState } from 'react';

interface PortfolioSectionProps {
  onOpenContact: (projectTitle?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenContact }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  return (
    <section id="portfolio" className="w-full bg-[#f6f4f0] py-20 sm:py-28 border-t border-neutral-200/70 scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-500 font-medium block mb-2">
              Selected Collaborations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 tracking-[0.05em] uppercase font-normal">
              OUR PORTFOLIO
            </h2>
          </div>
          <p className="font-sans text-xs text-neutral-500 max-w-sm">
            A preview of recent creative direction, brand copy, and publishing architecture projects.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Project 1 */}
          <div className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div
              className="aspect-[4/3] overflow-hidden bg-neutral-200 cursor-pointer"
              onClick={() => setSelectedCaseStudy('The Modern Minimalist Studio')}
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Interior Architecture Project"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-neutral-400 block mb-1">
                Architecture &amp; Design
              </span>
              <h4 className="font-serif text-lg text-neutral-900 mb-2">The Modern Minimalist Studio</h4>
              <p className="font-sans text-xs text-neutral-500 line-clamp-2 mb-4">
                Complete editorial rebranding, visual narrative positioning, and bespoke web launch.
              </p>
              <button
                onClick={() => setSelectedCaseStudy('The Modern Minimalist Studio')}
                className="text-xs font-serif italic text-neutral-700 hover:text-black"
              >
                View Case Study ⟶
              </button>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div
              className="aspect-[4/3] overflow-hidden bg-neutral-200 cursor-pointer"
              onClick={() => setSelectedCaseStudy('Aura Botanical Skincare')}
            >
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                alt="Botanical Skincare Project"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-neutral-400 block mb-1">
                Luxury Wellness
              </span>
              <h4 className="font-serif text-lg text-neutral-900 mb-2">Aura Botanical Skincare</h4>
              <p className="font-sans text-xs text-neutral-500 line-clamp-2 mb-4">
                Brand voice development, high-converting product descriptions, and email sequencing.
              </p>
              <button
                onClick={() => setSelectedCaseStudy('Aura Botanical Skincare')}
                className="text-xs font-serif italic text-neutral-700 hover:text-black"
              >
                View Case Study ⟶
              </button>
            </div>
          </div>

          {/* Project 3 */}
          <div className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div
              className="aspect-[4/3] overflow-hidden bg-neutral-200 cursor-pointer"
              onClick={() => setSelectedCaseStudy('Lumina Creative Gatherings')}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Creative Retreats Project"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-neutral-400 block mb-1">
                Retreats &amp; Community
              </span>
              <h4 className="font-serif text-lg text-neutral-900 mb-2">Lumina Creative Gatherings</h4>
              <p className="font-sans text-xs text-neutral-500 line-clamp-2 mb-4">
                Digital editorial publication with headless Sanity publishing workflow.
              </p>
              <button
                onClick={() => setSelectedCaseStudy('Lumina Creative Gatherings')}
                className="text-xs font-serif italic text-neutral-700 hover:text-black"
              >
                View Case Study ⟶
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white text-neutral-900 shadow-2xl p-6 sm:p-10 border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans block mb-1">
              Case Study Details
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-4">
              {selectedCaseStudy}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              This comprehensive engagement encompassed high-tier brand messaging, website redesign on Next.js, and migration to a structured Sanity.io CMS architecture resulting in an immediate 140% boost in organic inbound inquiries.
            </p>

            <div className="p-4 bg-[#f8f6f2] border-l-2 border-neutral-800 mb-6 font-sans text-xs space-y-2">
              <div><strong>Deliverables:</strong> Brand Voice Manual, Website Copy, Sanity CMS Integration</div>
              <div><strong>Timeline:</strong> 6 Weeks</div>
              <div><strong>Outcome:</strong> 2.4x Increase in Client Inbound Value</div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  const title = selectedCaseStudy;
                  setSelectedCaseStudy(null);
                  onOpenContact(title);
                }}
                className="bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest px-6 py-2.5 font-medium transition-all"
              >
                Inquire Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
