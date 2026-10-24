'use client';

import React from 'react';

interface ServicesSectionProps {
  onOpenContact: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="services" className="w-full bg-white py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-500 font-medium block mb-2">
            Bespoke Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-[0.05em] uppercase font-normal mb-4">
            OUR SERVICES
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Elevated digital solutions tailored specifically for creative studios and boutique digital enterprises.
          </p>
        </div>

        {/* Services 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Service 1 */}
          <div className="bg-[#faf9f7] p-8 sm:p-10 border border-neutral-200/70 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <span className="font-serif text-2xl text-neutral-400 font-light block mb-4">01</span>
              <h3 className="font-serif text-xl text-neutral-900 mb-3 font-normal">
                Brand Copywriting &amp; Messaging
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6">
                Captivating narrative direction, website copy, sales page frameworks, and proprietary brand voice manuals designed to turn casual readers into loyal brand advocates.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('Brand Copywriting')}
              className="w-full bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-[10.5px] font-sans font-semibold tracking-[0.2em] uppercase py-3 transition-colors active:scale-95"
            >
              Inquire About Copywriting
            </button>
          </div>

          {/* Service 2 */}
          <div className="bg-neutral-900 text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <span className="font-serif text-2xl text-neutral-400 font-light block mb-4">02</span>
              <h3 className="font-serif text-xl text-white mb-3 font-normal">
                Digital Content &amp; Social Strategy
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed mb-6">
                High-touch content architectures, IG story conversion formulas, quarterly campaigns, and multi-channel editorial calendars that command industry authority.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('Social Media Strategy')}
              className="w-full bg-white hover:bg-neutral-200 text-neutral-900 text-[10.5px] font-sans font-semibold tracking-[0.2em] uppercase py-3 transition-colors active:scale-95"
            >
              Inquire About Strategy
            </button>
          </div>

          {/* Service 3 */}
          <div className="bg-[#faf9f7] p-8 sm:p-10 border border-neutral-200/70 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <span className="font-serif text-2xl text-neutral-400 font-light block mb-4">03</span>
              <h3 className="font-serif text-xl text-neutral-900 mb-3 font-normal">
                Editorial CMS &amp; Web Systems
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6">
                Custom web experiences built with modern frameworks and connected directly to a headless Sanity CMS backend for seamless, stress-free article publishing.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('Editorial CMS & Systems')}
              className="w-full bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-[10.5px] font-sans font-semibold tracking-[0.2em] uppercase py-3 transition-colors active:scale-95"
            >
              Inquire About Web Systems
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
