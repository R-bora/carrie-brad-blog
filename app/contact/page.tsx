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
              'url("https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-[#161616]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-neutral-400 font-medium block mb-3">
            Begin Your Transformation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase font-normal mb-5 drop-shadow-md">
            GET IN TOUCH
          </h1>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.24em] text-neutral-300 font-medium leading-relaxed max-w-lg mx-auto">
            LET'S DISCUSS YOUR BRAND'S NEXT EDITORIAL CHAPTER
          </p>
        </div>
      </section>

      {/* Main Form */}
      <main className="w-full bg-[#fdfcfb] py-16 sm:py-24 flex-1">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Studio Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans block mb-1">
                  Direct Inquiries
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
                  Carrie Brad Studio
                </h2>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mt-3">
                  We accept a limited number of clients per quarter to ensure white-glove creative attention and meticulous execution.
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs text-neutral-700 border-t border-b border-neutral-200 py-6">
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px] mb-0.5">
                    Studio Location
                  </span>
                  <p className="font-medium text-neutral-900">New York &amp; London • Available Worldwide</p>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px] mb-0.5">
                    Email Inquiries
                  </span>
                  <a
                    href="mailto:hello@carriebrad.com"
                    className="font-medium text-neutral-900 hover:text-black border-b border-neutral-300"
                  >
                    hello@carriebrad.com
                  </a>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px] mb-0.5">
                    Office Hours
                  </span>
                  <p className="font-medium text-neutral-900">Monday – Thursday: 9:00 AM – 5:00 PM EST</p>
                </div>
              </div>

              <div className="p-6 bg-[#f7f5f2] border-l-4 border-neutral-900">
                <p className="font-serif text-sm italic text-neutral-800">
                  “Every great brand began as an intentional decision to stop blending in and start communicating with distinctive clarity.”
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
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="First &amp; Last Name"
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Service of Interest
                    </label>
                    <select className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black">
                      <option value="Brand Copywriting">Brand Copywriting &amp; Narrative Architecture</option>
                      <option value="Social Media Strategy">Digital Content &amp; Social Media Direction</option>
                      <option value="Editorial CMS & Systems">Custom Web &amp; Headless Editorial System</option>
                      <option value="Complete Overhaul">Comprehensive Full Studio Rebrand</option>
                      <option value="General Inquiry">General Studio Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Estimated Project Budget
                    </label>
                    <select className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black">
                      <option value="$3,500 – $5,000">$3,500 – $5,000</option>
                      <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                      <option value="Exploring">Currently budgeting / exploring</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Share Details About Your Vision *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your brand, current milestones, website URL, and ideal timeline..."
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3.5 text-xs tracking-[0.2em] uppercase transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {loading ? 'SENDING INQUIRY...' : 'SUBMIT INQUIRY'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3 animate-fadeIn">
                  <div className="text-4xl text-emerald-600">✓</div>
                  <h3 className="font-serif text-2xl text-neutral-900 font-normal">Thank You for Inquiring</h3>
                  <p className="font-sans text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received directly by Carrie Brad's studio. We will review your materials and respond within 24 to 48 hours.
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
