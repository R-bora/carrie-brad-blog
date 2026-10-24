'use client';

import React, { useState } from 'react';

interface ContactSectionProps {
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContactModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 6000);
  };

  return (
    <section id="contact" className="w-full bg-[#1c1c1c] text-white py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-3">
          Stay Connected
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-[0.05em] uppercase font-normal mb-4">
          LET'S CONNECT
        </h2>
        <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto mb-10 leading-relaxed">
          Join over 12,000+ creative entrepreneurs who receive our private weekly editorial dispatch on digital marketing, high-ticket copywriting, and lifestyle strategy.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 mb-10">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 bg-neutral-800 border border-neutral-700 px-4 py-3 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="bg-white hover:bg-neutral-200 text-black text-xs font-sans font-semibold tracking-[0.2em] uppercase px-6 py-3 transition-colors active:scale-95"
          >
            SUBSCRIBE
          </button>
        </form>

        {subscribed && (
          <div className="text-emerald-400 text-xs font-sans mb-8 animate-fadeIn">
            ✓ Thank you for subscribing! Check your inbox for your welcome dispatch.
          </div>
        )}

        <div className="inline-block p-px bg-neutral-800 w-32 mb-8" />

        <div>
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
            Have an inquiry or collaboration proposal?
          </p>
          <button
            onClick={onOpenContactModal}
            className="bg-[#e8dfd8] hover:bg-[#dfd4cc] text-neutral-900 text-xs font-sans font-semibold tracking-[0.2em] uppercase px-8 py-3.5 transition-all shadow-md active:scale-95"
          >
            OPEN CLIENT INQUIRY FORM
          </button>
        </div>
      </div>
    </section>
  );
};
