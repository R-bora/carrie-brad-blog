'use client';

import React from 'react';
import { BlogPost } from '@/types/blog';
import { PostCard } from './PostCard';

interface PostGridProps {
  posts: BlogPost[];
  onOpenPost?: (post: BlogPost) => void;
}

export const PostGrid: React.FC<PostGridProps> = ({ posts, onOpenPost }) => {
  if (!posts || posts.length === 0) {
    return (
      <section className="w-full py-16 text-center">
        <p className="font-serif italic text-neutral-500">
          No articles found for this category.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1140px] mx-auto">
        {/* 3-Column Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-10 gap-y-14 sm:gap-y-16">
          {posts.map((post) => (
            <PostCard
              key={post._id || post.slug}
              post={post}
              onOpenPost={onOpenPost}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
