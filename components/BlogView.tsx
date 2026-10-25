'use client';

import React, { useState } from 'react';
import { BlogPost, CategoryFilter } from '@/types/blog';
import { Header } from './Header';
import { Hero } from './Hero';
import { CategoryBar } from './CategoryBar';
import { FeaturedPost } from './FeaturedPost';
import { PostGrid } from './PostGrid';
import { ServicesSection } from './ServicesSection';
import { PortfolioSection } from './PortfolioSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { PostModal } from './PostModal';
import { ContactModal } from './ContactModal';

interface BlogViewProps {
  initialFeaturedPost: BlogPost;
  initialGridPosts: BlogPost[];
  isSanityConnected: boolean;
}

export const BlogView: React.FC<BlogViewProps> = ({
  initialFeaturedPost,
  initialGridPosts,
  isSanityConnected,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [featuredPost] = useState<BlogPost>(initialFeaturedPost);
  const [gridPosts] = useState<BlogPost[]>(initialGridPosts);
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);

  // Contact Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactServicePrefill, setContactServicePrefill] = useState<string>('General Inquiry');

  const handleOpenContactModal = (servicePrefill?: string) => {
    if (servicePrefill) {
      setContactServicePrefill(servicePrefill);
    }
    setContactModalOpen(true);
  };

  // Filter posts based on active category
  const filteredGridPosts =
    activeCategory === 'ALL'
      ? gridPosts
      : gridPosts.filter((post) => {
          const cat = post.category.toUpperCase();
          if (activeCategory === 'BUSINESS') {
            return cat.includes('BUSINESS');
          }
          return cat === activeCategory;
        });

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col w-full selection:bg-[#e8dfd8] selection:text-neutral-900 overflow-x-hidden">
      {/* 1. Full-width Responsive Header */}
      <Header onOpenContactModal={() => handleOpenContactModal('General Inquiry')} />

      {/* 2. Latest Blog: HiAnime-style Spotlight Slider */}
      {featuredPost && (
        <FeaturedPost
          post={featuredPost}
          allPosts={[featuredPost, ...gridPosts]}
          onOpenPost={(post) => setActiveModalPost(post)}
        />
      )}

      {/* 3. Trending Section: HiAnime-style Ranked Carousel */}
      <Hero
        posts={[...gridPosts, featuredPost]}
        onOpenPost={(post) => setActiveModalPost(post)}
      />

      {/* 4. Category Submenu ("Browse the blog :") */}
      <CategoryBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 5. 3-Column Post Grid */}
      <PostGrid
        posts={filteredGridPosts}
        onOpenPost={(post) => setActiveModalPost(post)}
      />

      {/* 6. Dedicated Services Section */}
      <ServicesSection onOpenContact={(srv) => handleOpenContactModal(srv)} />

      {/* 7. Dedicated Portfolio Section */}
      <PortfolioSection onOpenContact={(proj) => handleOpenContactModal(`Portfolio: ${proj}`)} />

      {/* 8. Dedicated Contact & Newsletter Section */}
      <ContactSection onOpenContactModal={() => handleOpenContactModal('General Inquiry')} />

      {/* 9. Footer */}
      <Footer />

      {/* Article Reader Modal */}
      <PostModal
        post={activeModalPost}
        onClose={() => setActiveModalPost(null)}
      />

      {/* Client Contact Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialService={contactServicePrefill}
      />
    </div>
  );
};
