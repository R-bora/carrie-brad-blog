'use client';

import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = 'General Inquiry',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService);
  const [budget, setBudget] = useState('$5k - $10k');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white text-neutral-900 shadow-2xl p-6 sm:p-10 border border-neutral-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
          aria-label="Close contact modal"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans block mb-1">
                Direct Inquiries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal">
                Start a Conversation
              </h3>
              <p className="font-sans text-xs text-neutral-500 mt-1">
                Please provide a few details about your project and we'll reply within 24–48 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                  Service Requested
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                >
                  <option value="General Inquiry">General Editorial Inquiry</option>
                  <option value="Brand Copywriting">Brand Copywriting &amp; Voice Direction</option>
                  <option value="Social Media Strategy">Social Media Strategy &amp; Editorial Systems</option>
                  <option value="Editorial CMS & Systems">Custom Editorial Web &amp; Headless CMS Setup</option>
                  <option value="Consulting">1-on-1 Creative Business Mentorship</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                  Project Budget Timeline
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                >
                  <option value="$3k - $5k">$3,000 – $5,000</option>
                  <option value="$5k - $10k">$5,000 – $10,000</option>
                  <option value="$10k+">$10,000+</option>
                  <option value="Just exploring">Currently exploring options</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                  Tell Us About Your Vision *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current brand challenges, goals, and desired timeline..."
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3 text-xs tracking-[0.2em] uppercase transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-3 animate-fadeIn">
            <div className="text-4xl text-emerald-600">✓</div>
            <h4 className="font-serif text-2xl text-neutral-900">Message Received</h4>
            <p className="font-sans text-xs text-neutral-600 max-w-md mx-auto">
              Thank you, {name}! Gainleadx will review your inquiry regarding {service} and be in touch within 24 to 48 hours.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 bg-neutral-900 text-white text-xs uppercase tracking-widest px-6 py-2 hover:bg-neutral-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
