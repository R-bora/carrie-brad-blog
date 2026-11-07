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
  initialService = 'General Whistleblower Tip',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [desk, setDesk] = useState(initialService);
  const [evidenceType, setEvidenceType] = useState('Leaked Internal Documents');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white text-neutral-900 shadow-2xl p-5 sm:p-8 md:p-10 border border-neutral-300 max-h-[92vh] overflow-y-auto rounded-xl sm:rounded-2xl">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
          aria-label="Close contact modal"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            <div className="mb-5 sm:mb-6 pr-6">
              <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.25em] text-red-700 font-sans font-semibold block mb-1">
                Gainleadx Whistleblower Desk
              </span>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900 font-normal">
                Submit a Confidential Tip or Evidence
              </h3>
              <p className="font-sans text-xs text-neutral-600 mt-1.5 leading-relaxed">
                We accept sensitive documents, internal memos, and verified whistleblower accounts. Your identity is safeguarded under strict UK journalistic source protection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                    Name or Pseudonym *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Whistleblower / Whitehall Source"
                    className="w-full bg-neutral-50 border border-neutral-300 p-2.5 sm:p-3 text-base sm:text-xs text-neutral-900 focus:outline-none focus:border-black rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                    Secure Email or Signal / Proton *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="source@proton.me or secure contact"
                    className="w-full bg-neutral-50 border border-neutral-300 p-2.5 sm:p-3 text-base sm:text-xs text-neutral-900 focus:outline-none focus:border-black rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                  Investigative Desk / Topic
                </label>
                <select
                  value={desk}
                  onChange={(e) => setDesk(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 sm:p-3 text-base sm:text-xs text-neutral-900 focus:outline-none focus:border-black rounded"
                >
                  <option value="Westminster & Parliamentary Misconduct">Westminster, Lobbying &amp; Dark Money</option>
                  <option value="NHS Healthcare Crisis & Privatisation">NHS Crisis, PFI Debt &amp; Agency Profiteering</option>
                  <option value="Channel Migration & Asylum Contracts">Channel Borders, Asylum Hotels &amp; Private Contracts</option>
                  <option value="Water Privatisation & Sewage Scandals">Water Companies, Dividends &amp; River Sewage</option>
                  <option value="Housing Monopolies & Offshore Trusts">Housing Crisis, Land Banking &amp; Offshore Wealth</option>
                  <option value="Civil Liberties & Protest Laws">Civil Liberties, Surveillance &amp; Public Order Acts</option>
                  <option value="General Whistleblower Tip">General Whistleblower Submission</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                  Nature of Evidence
                </label>
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 sm:p-3 text-base sm:text-xs text-neutral-900 focus:outline-none focus:border-black rounded"
                >
                  <option value="Leaked Internal Documents">Leaked Internal Documents / PDFs / Emails</option>
                  <option value="Firsthand Witness Account">Firsthand Witness / Insider Testimony</option>
                  <option value="Financial Records / Ledger Inconsistencies">Financial Records / Procurement Discrepancies</option>
                  <option value="Background Lead / Pointer">Background Pointer for Investigative Verification</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                  Brief Summary of the Evidence &amp; Key Actors *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline key departments, dates, corporate entities, contracts, or specific allegations. Do not transmit classified state secrets over unencrypted channels."
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 sm:p-3 text-base sm:text-xs text-neutral-900 focus:outline-none focus:border-black rounded"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3.5 text-xs tracking-[0.2em] uppercase transition-all shadow-md active:scale-95 disabled:opacity-50 rounded"
              >
                {isSubmitting ? 'TRANSMITTING CONFIDENTIAL TIP...' : 'TRANSMIT CONFIDENTIAL TIP'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-3 animate-fadeIn">
            <div className="text-4xl text-emerald-600">✓</div>
            <h4 className="font-serif text-2xl text-neutral-900">Confidential Submission Transmitted</h4>
            <p className="font-sans text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
              Thank you, {name}. Your evidence regarding <strong>{desk}</strong> has been logged to the Gainleadx investigative queue. Source anonymity is fully preserved.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 bg-neutral-900 text-white text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-neutral-800 transition-colors rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
