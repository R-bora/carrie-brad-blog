'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#e8dfd8] selection:text-neutral-900">
      <Header />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#161616] py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-[#161616]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-red-500 font-semibold block mb-3">
            Confidential Whistleblower Bureau
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase font-normal mb-5 drop-shadow-md">
            WHISTLEBLOWER DESK
          </h1>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.24em] text-neutral-300 font-medium leading-relaxed max-w-xl mx-auto">
            SECURE TRANSMISSION FOR LEAKS, EVIDENCE &amp; UNREPORTED UK SCANDALS
          </p>
        </div>
      </section>

      {/* Main Form */}
      <main className="w-full bg-[#fdfcfb] py-16 sm:py-24 flex-1">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Bureau Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans block mb-1">
                  Source Protection Bureau
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
                  Gainleadx Investigative Desk
                </h2>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mt-3">
                  We rigorously defend source confidentiality under recognized UK journalistic protections. If you have internal records, financial ledgers, or firsthand evidence exposing public misconduct, our investigative reporters verify and report without compromising you.
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs text-neutral-700 border-t border-b border-neutral-200 py-6">
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px] mb-0.5">
                    Bureau Location
                  </span>
                  <p className="font-medium text-neutral-900">London Westminster Bureau • End-to-End Encrypted</p>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px] mb-0.5">
                    Secure Tip Inboxes
                  </span>
                  <a
                    href="mailto:tips@gainleadx.com"
                    className="font-medium text-neutral-900 hover:text-black border-b border-neutral-300"
                  >
                    tips@gainleadx.com • Proton &amp; PGP available
                  </a>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px] mb-0.5">
                    Active Investigative Desks
                  </span>
                  <p className="font-medium text-neutral-900">Westminster Lobbying • NHS Crisis • Channel Logistics • Water Privatisation</p>
                </div>
              </div>

              <div className="p-6 bg-[#f7f5f2] border-l-4 border-neutral-900">
                <p className="font-serif text-sm italic text-neutral-800">
                  “Democracy thrives on transparency. When institutions conceal systemic failure, whistleblowers and independent investigative journalism are the public’s last line of defense.”
                </p>
              </div>
            </div>

            {/* Right: The Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-neutral-200 shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                        Name or Whistleblower Pseudonym *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="E.g. Civil Servant / Anonymous Source"
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                        Secure Email / Proton / Signal *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="source@proton.me"
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Investigative Subject / Department
                    </label>
                    <select className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black">
                      <option value="Westminster & Lobbying">Westminster, MP Second Jobs &amp; Dark Money</option>
                      <option value="NHS Healthcare Crisis">NHS Procurement, PFI Debt &amp; Agency Staffing</option>
                      <option value="Channel Borders & Asylum Hotels">Channel Migration, Asylum Hotels &amp; Security Contracts</option>
                      <option value="Water Utilities & Sewage">Water Monopolies, Dividends &amp; River Sewage</option>
                      <option value="Housing & Land Banking">Housing Monopolies &amp; Offshore Land Banking</option>
                      <option value="Civil Liberties & Policing">Civil Liberties, Facial Recognition &amp; Protest Laws</option>
                      <option value="General Tip">General Confidential Submission</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Type of Material / Evidence Available
                    </label>
                    <select className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black">
                      <option value="Internal Documents">Internal PDF Memos / Unredacted Reports</option>
                      <option value="Procurement Ledgers">Financial Spreadsheets / Commercial Invoices</option>
                      <option value="Firsthand Testimony">Firsthand Eyewitness / Institutional Account</option>
                      <option value="Background Tip">Investigative Lead Requiring Follow-Up</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Provide Evidence Summary &amp; Key Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Detail dates, key officials, companies involved, contract sums, or specific document titles. Do not include identifiable personal metadata if you wish to remain anonymous."
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3.5 text-xs tracking-[0.2em] uppercase transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {loading ? 'TRANSMITTING CONFIDENTIAL TIP...' : 'TRANSMIT CONFIDENTIAL EVIDENCE'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3 animate-fadeIn">
                  <div className="text-4xl text-emerald-600">✓</div>
                  <h3 className="font-serif text-2xl text-neutral-900 font-normal">Evidence Transmitted to Bureau</h3>
                  <p className="font-sans text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Your confidential tip has been queued in Gainleadx's encrypted whistleblower vault. An investigative reporter will review the material in accordance with source protection guidelines.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
