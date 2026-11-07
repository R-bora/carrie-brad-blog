'use client';

import React from 'react';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

interface PostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const portableTextComponents = {
  types: {
    calloutBox: ({ value }: any) => {
      const typeClasses: Record<string, string> = {
        whistleblower: 'border-red-600 bg-red-50/70 text-red-950',
        official_denial: 'border-neutral-700 bg-neutral-100 text-neutral-900',
        statutory_data: 'border-blue-600 bg-blue-50/70 text-blue-950',
        legal_warning: 'border-amber-600 bg-amber-50/70 text-amber-950',
      };
      const borderClass = typeClasses[value?.type] || 'border-neutral-900 bg-neutral-50 text-neutral-900';

      return (
        <div className={`p-5 my-6 border-l-4 ${borderClass} font-sans`}>
          {value?.title && (
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 flex items-center gap-1.5">
              <span>⚠️</span>
              {value.title}
            </h4>
          )}
          {value?.text && <p className="text-xs sm:text-sm leading-relaxed">{value.text}</p>}
        </div>
      );
    },
    keyStat: ({ value }: any) => (
      <div className="my-6 p-6 bg-neutral-900 text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-neutral-400">
            {value?.label || 'FORENSIC AUDIT FIGURE'}
          </div>
          <div className="font-serif text-4xl sm:text-5xl font-black text-amber-400 mt-1">
            {value?.stat}
          </div>
        </div>
        {value?.source && (
          <div className="text-[10px] font-sans text-neutral-400 border-t sm:border-t-0 sm:border-l border-neutral-700 pt-2 sm:pt-0 sm:pl-4 max-w-xs text-right sm:text-left">
            Source: {value.source}
          </div>
        )}
      </div>
    ),
    image: ({ value }: any) => {
      const imgUrl = value?.asset?.url || (value ? urlForImage(value)?.url() : null);
      if (!imgUrl) return null;
      return (
        <figure className="my-6">
          <img src={imgUrl} alt={value?.alt || 'Investigation image'} className="w-full aspect-[16/9] object-cover rounded" />
          {(value?.caption || value?.photoCredit) && (
            <figcaption className="text-[11px] font-sans text-neutral-500 mt-2 flex justify-between italic">
              <span>{value.caption}</span>
              {value.photoCredit && <span className="uppercase text-[9px] not-italic">{value.photoCredit}</span>}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold mt-8 mb-4 border-b border-neutral-200 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-semibold mt-6 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="p-6 bg-[#f7f5f2] border-l-4 border-neutral-900 my-6 font-serif text-base sm:text-lg italic text-neutral-900 leading-relaxed">
        “{children}”
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-800 mb-4">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-800 space-y-2 my-4 pl-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-800 space-y-2 my-4 pl-2">
        {children}
      </ol>
    ),
  },
};

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const imageUrl =
    post.mainImage?.asset?.url ||
    (post.mainImage?.asset ? urlForImage(post.mainImage)?.url() : null) ||
    post.mainImage?.url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white shadow-2xl overflow-y-auto border border-neutral-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 text-neutral-900 hover:bg-black hover:text-white transition-colors flex items-center justify-center shadow-lg text-sm font-bold border border-neutral-200"
          aria-label="Close article modal"
        >
          ✕
        </button>

        {/* Header Cover Image */}
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] bg-neutral-900 overflow-hidden">
            <img
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover filter contrast-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="bg-white text-black text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1">
                {post.category}
              </span>
              {post.inquestStatus && (
                <span className="bg-[#942323] text-white text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1">
                  {post.inquestStatus}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Article Content Container */}
        <div className="p-6 sm:p-10 md:p-12">
          {/* Metadata Byline Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-sans uppercase tracking-[0.2em] text-neutral-500 border-b border-neutral-200 pb-3 mb-6">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-neutral-900">
                BY {post.authorName || 'GAINLEADX INQUEST DESK'}
              </span>
              <span>•</span>
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'OCTOBER 2026'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-700 font-semibold">
              <span>{post.estimatedReadTime || '6 MIN READ'}</span>
              {post.citationsCount && (
                <>
                  <span>•</span>
                  <span className="text-[#942323] font-bold">{post.citationsCount}</span>
                </>
              )}
            </div>
          </div>

          {/* Broadsheet Headline */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-neutral-900 mb-4 font-normal uppercase">
            {post.title}
          </h1>

          {/* Subtitle / Deck if present */}
          {post.headlineDeck && (
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] text-neutral-500 font-medium mb-6">
              {post.headlineDeck}
            </p>
          )}

          {/* Excerpt Lead Paragraph */}
          <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-800 italic border-l-4 border-neutral-900 pl-4 py-1.5 mb-8 bg-[#faf9f7]">
            {post.excerpt}
          </p>

          {/* Key Inquest Findings Highlight Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#f4f0e6] border-2 border-neutral-900 mb-8 font-sans">
              <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#942323] mb-2 flex items-center gap-1.5">
                <span>📋</span>
                KEY INQUEST FINDINGS &amp; EVIDENCE
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-900">
                {post.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-neutral-900">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Render Rich Body */}
          {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
            <div className="article-body">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          ) : (
            <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-800 space-y-4">
              <p>
                Our investigation cross-referenced parliamentary records, internal departmental risk registers, and Companies House financial disclosures to reconstruct the administrative paper trail.
              </p>
              <p>
                Civil liberties organizations and policy analysts have repeatedly warned that the current procurement framework circumvents public scrutiny through emergency contracting waivers, leading to multi-billion pound commitments without statutory oversight.
              </p>
              <div className="p-6 bg-[#f7f5f2] border-l-4 border-neutral-900 my-6">
                <p className="font-serif text-base sm:text-lg italic text-neutral-900">
                  “When public institutions shield systemic failure behind non-disclosure agreements, independent investigative journalism remains the taxpayer's primary defense.”
                </p>
              </div>
              <p>
                Whistleblower testimonies submitted directly to the Gainleadx Inquest Bureau indicate that senior departmental officials were alerted to structural deficiencies months prior to public disclosure.
              </p>
            </div>
          )}

          {/* Source Documents & Leaked Files */}
          {post.sourceDocuments && post.sourceDocuments.length > 0 && (
            <div className="mt-8 p-5 border border-neutral-300 bg-neutral-50 rounded font-sans text-xs">
              <div className="font-bold uppercase tracking-wider text-neutral-800 mb-2">
                Referenced Documents &amp; Audit Records
              </div>
              <div className="space-y-1.5">
                {post.sourceDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between text-neutral-700">
                    <span>
                      📄 {doc.documentName}{' '}
                      {doc.documentType && (
                        <span className="text-[10px] text-neutral-400">({doc.documentType})</span>
                      )}
                    </span>
                    {doc.externalUrl && (
                      <a
                        href={doc.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#942323] hover:underline font-semibold text-[11px]"
                      >
                        Inspect Record ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-neutral-200 flex justify-between items-center">
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-neutral-400">
              Gainleadx Investigative Bureau
            </span>
            <button
              onClick={onClose}
              className="bg-black text-white text-xs uppercase tracking-widest px-6 py-2.5 font-medium hover:bg-neutral-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
