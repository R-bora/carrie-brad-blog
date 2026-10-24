'use client';

import React, { useState } from 'react';
import { BlogPost } from '@/types/blog';

interface SanityInspectorProps {
  isConfigured: boolean;
  featuredPost: BlogPost;
  gridPosts: BlogPost[];
  onAddNewPost: (post: BlogPost) => void;
}

export const SanityInspector: React.FC<SanityInspectorProps> = ({
  isConfigured,
  featuredPost,
  gridPosts,
  onAddNewPost,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'schema' | 'queries' | 'editor'>('status');

  // Form state for creating a mock post
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('COPYWRITING');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const post: BlogPost = {
      _id: `post-custom-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      excerpt: newExcerpt || 'A newly drafted perspective published via Sanity Studio pipeline.',
      mainImage: {
        url:
          newImageUrl ||
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        alt: newTitle,
      },
      publishedAt: new Date().toISOString(),
    };

    onAddNewPost(post);
    setNewTitle('');
    setNewExcerpt('');
    setNewImageUrl('');
    alert('Post successfully injected into the live state!');
  };

  return (
    <>
      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-40 bg-[#1a1a1a] text-white hover:bg-black px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 text-xs font-sans tracking-wider border border-neutral-700 transition-all hover:scale-105"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-medium">Sanity CMS DevTools</span>
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-neutral-900 text-neutral-200 z-50 shadow-2xl flex flex-col border-l border-neutral-800 animate-slideLeft">
          {/* Header */}
          <div className="p-4 bg-black/50 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold text-sm tracking-tight">SANITY</span>
              <span className="text-xs uppercase tracking-widest text-neutral-400">Content Studio Bridge</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-800 text-[11px] font-sans">
            <button
              onClick={() => setActiveTab('status')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'status'
                  ? 'bg-neutral-800 text-white font-semibold border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Status
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'schema'
                  ? 'bg-neutral-800 text-white font-semibold border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Schema
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'queries'
                  ? 'bg-neutral-800 text-white font-semibold border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              GROQ
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'editor'
                  ? 'bg-neutral-800 text-white font-semibold border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Test Publish
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs font-mono">
            {activeTab === 'status' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="p-3 rounded bg-neutral-800/80 border border-neutral-700">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Connection Mode:</span>
                    <span className="text-emerald-400 font-medium">
                      {isConfigured ? 'Connected to Sanity.io' : 'Fallback / Local Sandbox Mode'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-neutral-400">Studio Route:</span>
                    <span className="text-neutral-300">/studio</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-neutral-400">Total Standard Posts:</span>
                    <span className="text-neutral-300">{gridPosts.length}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-neutral-400">Featured Post Loaded:</span>
                    <span className="text-neutral-300">{featuredPost ? 'Yes' : 'None'}</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-neutral-800/40 border border-neutral-700/60 leading-relaxed text-neutral-300">
                  <div className="font-semibold text-neutral-200 mb-1">To connect to your own Sanity project:</div>
                  <p className="text-neutral-400 text-[11px] mb-2">
                    Add the following to your <code className="text-red-400">.env.local</code> file:
                  </p>
                  <pre className="bg-black/60 p-2 rounded text-[11px] text-neutral-300 overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'schema' && (
              <div className="space-y-3">
                <div className="text-neutral-400 text-[11px]">
                  Post Document Schema (defines title, slug, category, mainImage, excerpt, body):
                </div>
                <pre className="bg-black/70 p-3 rounded text-[11px] text-emerald-300 overflow-x-auto whitespace-pre">
{`// sanity/schemaTypes/post.ts
defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'slug', source: 'title' },
    { name: 'isFeatured', type: 'boolean' },
    { 
      name: 'category', 
      type: 'string',
      description: 'Populates the vertical thumbnail text'
    },
    { name: 'mainImage', type: 'image', options: { hotspot: true } },
    { name: 'excerpt', type: 'text' },
    { name: 'body', type: 'array', of: [{ type: 'block' }] }
  ]
})`}
                </pre>
              </div>
            )}

            {activeTab === 'queries' && (
              <div className="space-y-4">
                <div>
                  <div className="text-neutral-400 text-[11px] mb-1">Featured Post GROQ:</div>
                  <pre className="bg-black/70 p-3 rounded text-[11px] text-amber-300 overflow-x-auto">
{`*[_type == "post" && isFeatured == true][0] {
  _id,
  title,
  "slug": slug.current,
  isFeatured,
  category,
  mainImage { asset-> { url } },
  excerpt
}`}
                  </pre>
                </div>

                <div>
                  <div className="text-neutral-400 text-[11px] mb-1">Post Grid (3-column) GROQ:</div>
                  <pre className="bg-black/70 p-3 rounded text-[11px] text-cyan-300 overflow-x-auto">
{`*[_type == "post" && !isFeatured] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  mainImage { asset-> { url } },
  excerpt
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <form onSubmit={handleCreatePost} className="space-y-3 font-sans">
                <div className="text-neutral-300 text-xs mb-2">
                  Simulate publishing a new post to the Sanity database and see the 3-column grid update in real time:
                </div>

                <div>
                  <label className="block text-neutral-400 text-[10px] uppercase tracking-wider mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Master High-Converting Sales Pages"
                    className="w-full bg-black/60 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 text-[10px] uppercase tracking-wider mb-1">
                    Category (Populates Vertical Thumbnail Text)
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-black/60 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-400"
                  >
                    <option value="COPYWRITING">COPYWRITING</option>
                    <option value="SOCIAL MEDIA">SOCIAL MEDIA</option>
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="WELLNESS">WELLNESS</option>
                    <option value="SMALL BUSINESS">SMALL BUSINESS</option>
                    <option value="MARKETING">MARKETING</option>
                    <option value="PERSONAL">PERSONAL</option>
                    <option value="REAL ESTATE">REAL ESTATE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 text-[10px] uppercase tracking-wider mb-1">Excerpt</label>
                  <textarea
                    rows={2}
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    placeholder="Brief sans-serif teaser summary..."
                    className="w-full bg-black/60 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 text-[10px] uppercase tracking-wider mb-1">Image URL (Unsplash)</label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-black/60 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2 rounded text-xs transition-colors mt-2"
                >
                  Publish to Grid
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
