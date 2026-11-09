import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { postBySlugQuery, allPostsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import { BlogPost } from '@/types/blog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const revalidate = 60;

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPostData(slug: string): Promise<{
  post: BlogPost | null;
  relatedPosts: BlogPost[];
}> {
  if (!isSanityConfigured()) {
    return { post: null, relatedPosts: [] };
  }

  try {
    const [sanityPost, allSanity] = await Promise.all([
      client.fetch<BlogPost>(postBySlugQuery, { slug }),
      client.fetch<BlogPost[]>(allPostsQuery),
    ]);

    const post = sanityPost || null;
    const relatedPosts = (allSanity || []).filter((p: BlogPost) => p.slug !== slug).slice(0, 3);

    return { post, relatedPosts };
  } catch (error) {
    console.warn('Sanity fetch error in slug route:', error);
    return { post: null, relatedPosts: [] };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { post } = await getPostData(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found | Gainleadx',
      description: 'The requested investigative inquest could not be found.',
    };
  }

  const imageUrl =
    post.mainImage?.asset?.url ||
    (post.mainImage?.asset ? urlForImage(post.mainImage)?.url() : null) ||
    post.mainImage?.url;

  return {
    title: `${post.title} | Gainleadx Inquest`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
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
      <div className="my-6 p-5 sm:p-6 bg-neutral-900 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="text-[9.5px] sm:text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-neutral-400">
            {value?.label || 'FORENSIC AUDIT FIGURE'}
          </div>
          <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 mt-1">
            {value?.stat}
          </div>
        </div>
        {value?.source && (
          <div className="text-[10px] font-sans text-neutral-400 border-t sm:border-t-0 sm:border-l border-neutral-700 pt-2 sm:pt-0 sm:pl-4 max-w-xs text-left">
            Source: {value.source}
          </div>
        )}
      </div>
    ),
    image: ({ value }: any) => {
      const imgUrl = value?.asset?.url || (value ? urlForImage(value)?.url() : null);
      if (!imgUrl) return null;
      return (
        <figure className="my-8">
          <img
            src={imgUrl}
            alt={value?.alt || 'Investigation evidence'}
            className="w-full aspect-[16/9] object-cover rounded shadow-sm"
          />
          {(value?.caption || value?.credit) && (
            <figcaption className="text-[11px] font-sans text-neutral-500 mt-2 flex justify-between italic">
              <span>{value.caption}</span>
              {value.credit && <span className="uppercase text-[9px] not-italic">{value.credit}</span>}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold mt-10 mb-4 border-b border-neutral-200 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-semibold mt-7 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="p-6 bg-[#f7f5f2] border-l-4 border-neutral-900 my-6 font-serif text-base sm:text-lg italic text-neutral-900 leading-relaxed">
        “{children}”
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-800 mb-4 font-normal">
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

export default async function BlogPostPage({ params }: PageProps) {
  const { post, relatedPosts } = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  const imageUrl =
    post.mainImage?.asset?.url ||
    (post.mainImage?.asset ? urlForImage(post.mainImage)?.url() : null) ||
    post.mainImage?.url;

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#e8dfd8] selection:text-neutral-900">
      <Header />

      <main className="w-full flex-1 bg-[#fbf9f5] py-5 sm:py-10 md:py-12">
        <article className="max-w-[880px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold tracking-[0.16em] uppercase text-neutral-600 hover:text-black transition-colors"
            >
              <span>←</span>
              <span>Back to all Dispatches</span>
            </Link>
            <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-widest text-[#942323] uppercase">
              LONDON &amp; WESTMINSTER BUREAU
            </span>
          </div>

          {/* Article Header Card */}
          <header className="bg-white p-4 sm:p-8 md:p-12 border border-[#dfd8c7] shadow-sm mb-6 sm:mb-8 rounded-lg sm:rounded-none">
            {/* Category & Status Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="bg-neutral-900 text-white text-[9px] sm:text-[9.5px] font-sans font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase px-2.5 sm:px-3 py-1">
                {post.category}
              </span>
              {post.inquestStatus && (
                <span className="bg-[#942323] text-white text-[9px] sm:text-[9.5px] font-sans font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase px-2.5 sm:px-3 py-1">
                  {post.inquestStatus}
                </span>
              )}
              {post.citationsCount && (
                <span className="text-[9.5px] sm:text-[10px] font-sans font-bold tracking-wider text-amber-600 ml-auto uppercase">
                  {post.citationsCount}
                </span>
              )}
            </div>

            {/* Main Broadsheet Headline (Responsive typography) */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl leading-[1.2] sm:leading-[1.18] text-neutral-900 mb-3 sm:mb-4 font-normal uppercase">
              {post.title}
            </h1>

            {/* Sub-headline / Deck */}
            {post.headlineDeck && (
              <p className="font-sans text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-neutral-600 font-medium mb-4 sm:mb-6 leading-relaxed">
                {post.headlineDeck}
              </p>
            )}

            {/* Byline & Publication Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-[9.5px] sm:text-[10.5px] font-sans uppercase tracking-[0.18em] sm:tracking-[0.2em] text-neutral-500 border-t border-b border-neutral-200 py-3 sm:py-3.5 mt-4 sm:mt-6">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-bold text-neutral-900">
                  BY {post.authorName || 'GAINLEADX INQUEST DESK'}
                </span>
                <span>•</span>
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'OCTOBER 2026'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-700 font-semibold">
                <span>{post.estimatedReadTime || '6 MIN READ'}</span>
              </div>
            </div>

            {/* Featured Image */}
            {imageUrl && (
              <div className="mt-5 sm:mt-8">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-neutral-900 shadow-sm border border-neutral-200 rounded-lg sm:rounded-none">
                  <img
                    src={imageUrl}
                    alt={post.mainImage?.alt || post.title}
                    className="w-full h-full object-cover filter contrast-[1.03]"
                  />
                </div>
                {(post.mainImage?.caption || post.mainImage?.credit) && (
                  <div className="flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] font-sans text-neutral-500 mt-2 px-1">
                    <span>{post.mainImage.caption}</span>
                    {post.mainImage.credit && (
                      <span className="uppercase tracking-wider font-semibold">
                        {post.mainImage.credit}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Excerpt Lead Box */}
            <div className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-neutral-800 italic border-l-4 border-neutral-900 pl-3.5 sm:pl-4 py-2 mt-6 sm:mt-8 bg-[#faf9f7]">
              {post.excerpt}
            </div>

            {/* Key Inquest Findings Highlight Box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="p-4 sm:p-6 bg-[#f4f0e6] border-2 border-neutral-900 my-6 sm:my-8 font-sans rounded-lg sm:rounded-none">
                <div className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[#942323] mb-2.5 sm:mb-3 flex items-center gap-1.5">
                  <span>📋</span>
                  <span>KEY INQUEST FINDINGS &amp; EVIDENCE</span>
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

            {/* Article Body */}
            <div className="mt-6 sm:mt-8 pt-2 sm:pt-4">
              {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
                <div className="article-body">
                  <PortableText value={post.body} components={portableTextComponents} />
                </div>
              ) : (
                <div className="font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 space-y-4 sm:space-y-5">
                  <p>
                    Our investigative inquest cross-referenced parliamentary records, internal departmental risk registers, and statutory public disclosures to reconstruct the administrative paper trail.
                  </p>
                  <p>
                    Civil liberties organizations, fiscal watchdog committees, and policy analysts have repeatedly warned that the current administrative framework circumvents public scrutiny through emergency contracting waivers, leading to multi-billion pound commitments without statutory oversight.
                  </p>
                  <blockquote className="p-4 sm:p-6 bg-[#f7f5f2] border-l-4 border-neutral-900 my-5 sm:my-6 font-serif text-sm sm:text-base md:text-lg italic text-neutral-900 leading-relaxed">
                    “When public institutions shield systemic failure behind non-disclosure agreements, independent investigative journalism remains the taxpayer's primary defense.”
                  </blockquote>
                  <p>
                    Whistleblower testimonies submitted directly to the Gainleadx Inquest Bureau indicate that senior departmental officials were alerted to structural deficiencies months prior to public disclosure.
                  </p>
                  <p>
                    As parliamentary committees prepare for upcoming hearings, Gainleadx continues to monitor commercial ledger disclosures and audit trail filings.
                  </p>
                </div>
              )}
            </div>

            {/* Source Documents & Leaked Files */}
            {post.sourceDocuments && post.sourceDocuments.length > 0 && (
              <div className="mt-8 sm:mt-10 p-4 sm:p-5 border border-neutral-300 bg-neutral-50 rounded font-sans text-xs">
                <div className="font-bold uppercase tracking-wider text-neutral-800 mb-2.5">
                  Referenced Documents &amp; Audit Records
                </div>
                <div className="space-y-2">
                  {post.sourceDocuments.map((doc, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-neutral-700 gap-1 sm:gap-2">
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
                          className="text-[#942323] hover:underline font-semibold text-[11px] self-start sm:self-auto"
                        >
                          Inspect Record ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Whistleblower Bureau Callout */}
            <div className="mt-10 sm:mt-12 p-5 sm:p-8 bg-[#161616] text-white border-t-4 border-[#942323] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-lg sm:rounded-none">
              <div>
                <span className="text-[9.5px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-red-400 block mb-1">
                  Confidential Whistleblower Desk
                </span>
                <h4 className="font-serif text-base sm:text-xl font-normal text-white">
                  Have unredacted evidence or an internal leak on this topic?
                </h4>
                <p className="font-sans text-xs text-neutral-400 mt-1">
                  We guarantee source confidentiality under UK journalistic protection principles.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center bg-white hover:bg-neutral-200 text-neutral-900 text-xs font-sans font-bold tracking-[0.18em] uppercase px-5 py-3 whitespace-nowrap transition-colors flex-shrink-0"
              >
                Submit Evidence
              </Link>
            </div>
          </header>

          {/* Related Inquests Section */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#dfd8c7]">
              <div className="mb-5 sm:mb-6">
                <span className="text-[9.5px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-[#942323] block mb-1">
                  More From The Bureau
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-normal uppercase">
                  Related Investigations
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {relatedPosts.map((rel) => {
                  const relImg =
                    rel.mainImage?.asset?.url ||
                    (rel.mainImage?.asset ? urlForImage(rel.mainImage)?.url() : null) ||
                    rel.mainImage?.url;

                  return (
                    <Link
                      key={rel._id}
                      href={`/blog/${rel.slug}`}
                      className="group bg-white border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow rounded-lg sm:rounded-none"
                    >
                      <div>
                        {relImg && (
                          <div className="aspect-[16/10] overflow-hidden bg-neutral-100 mb-2.5 sm:mb-3 rounded">
                            <img
                              src={relImg}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <span className="text-[8.5px] sm:text-[9px] font-sans font-bold uppercase tracking-widest text-[#942323] block mb-1">
                          {rel.category}
                        </span>
                        <h4 className="font-serif text-xs sm:text-sm font-semibold leading-snug text-neutral-900 group-hover:text-[#942323] transition-colors line-clamp-2 uppercase">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] font-sans font-bold text-neutral-500 group-hover:text-black uppercase tracking-wider mt-3 block">
                        Read Inquest →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
