'use client';

import React from 'react';

interface ServicesSectionProps {
  onOpenContact: (pillarName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="services" className="w-full bg-white py-16 sm:py-24 scroll-mt-20 border-b border-[#e2dbcd]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#942323] font-bold block mb-2">
            INVESTIGATIVE INQUESTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-[0.05em] uppercase font-normal mb-4">
            OUR FOCUS AREAS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Gainleadx conducts independent investigations into the most contentious political, economic, and institutional fault lines shaping modern Britain.
          </p>
        </div>

        {/* Investigative 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-[#faf9f7] p-7 sm:p-9 border border-neutral-200/80 flex flex-col justify-between hover:shadow-lg transition-shadow rounded-xl">
            <div>
              <span className="font-serif text-2xl text-neutral-400 font-light block mb-3">01</span>
              <h3 className="font-serif text-xl text-neutral-900 mb-3 font-semibold uppercase">
                Westminster &amp; Dark Money
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6">
                Investigating undeclared corporate lobbying, all-party parliamentary group funding, revolving-door advisory gigs, and peerage appointments across Whitehall and the House of Lords.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('Westminster & Dark Money')}
              className="w-full bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-[10px] sm:text-[10.5px] font-sans font-bold tracking-[0.18em] uppercase py-3 transition-colors active:scale-95 rounded-lg"
            >
              Submit Tip on Westminster
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-neutral-900 text-white p-7 sm:p-9 flex flex-col justify-between shadow-xl rounded-xl">
            <div>
              <span className="font-serif text-2xl text-red-400 font-light block mb-3">02</span>
              <h3 className="font-serif text-xl text-white mb-3 font-semibold uppercase">
                NHS, Welfare &amp; Austerity
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed mb-6">
                Forensic breakdowns of private healthcare outsourcing, dental deserts, local authority emergency bankruptcies, and the escalating human toll of the two-child benefit cap.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('NHS, Welfare & Austerity')}
              className="w-full bg-white hover:bg-neutral-200 text-neutral-900 text-[10px] sm:text-[10.5px] font-sans font-bold tracking-[0.18em] uppercase py-3 transition-colors active:scale-95 rounded-lg"
            >
              Submit Healthcare Evidence
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#faf9f7] p-7 sm:p-9 border border-neutral-200/80 flex flex-col justify-between hover:shadow-lg transition-shadow rounded-xl">
            <div>
              <span className="font-serif text-2xl text-neutral-400 font-light block mb-3">03</span>
              <h3 className="font-serif text-xl text-neutral-900 mb-3 font-semibold uppercase">
                Borders, Law &amp; Civil Liberties
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6">
                Examining the real accounting behind Channel asylum operations, controversial protest policing laws, facial recognition rollouts, and the future of Britain's ECHR membership.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('Borders, Law & Civil Liberties')}
              className="w-full bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-[10px] sm:text-[10.5px] font-sans font-bold tracking-[0.18em] uppercase py-3 transition-colors active:scale-95 rounded-lg"
            >
              Submit Legal &amp; Policy Tip
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
