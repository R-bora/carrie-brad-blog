import { client, isSanityConfigured } from '@/sanity/lib/client';
import { featuredPostQuery, postsGridQuery } from '@/sanity/lib/queries';
import { fallbackFeaturedPost, fallbackGridPosts } from '@/lib/fallback-data';
import { BlogView } from '@/components/BlogView';
import { BlogPost } from '@/types/blog';

export const revalidate = 60;

async function getBlogData() {
  const isConnected = isSanityConfigured();
  if (!isConnected) {
    return {
      featuredPost: fallbackFeaturedPost,
      gridPosts: fallbackGridPosts,
      isSanityConnected: false,
    };
  }

  try {
    const [sanityFeatured, sanityGrid] = await Promise.all([
      client.fetch<BlogPost>(featuredPostQuery),
      client.fetch<BlogPost[]>(postsGridQuery),
    ]);

    const hasSanityPosts = Boolean(sanityFeatured) || (Boolean(sanityGrid) && sanityGrid.length > 0);

    // If real Sanity posts exist, do NOT pollute the site with dummy fallback posts
    if (hasSanityPosts) {
      const featured = sanityFeatured || sanityGrid[0];
      const grid = sanityFeatured
        ? (sanityGrid || [])
        : sanityGrid.slice(1);

      return {
        featuredPost: featured,
        gridPosts: grid,
        isSanityConnected: true,
      };
    }

    return {
      featuredPost: fallbackFeaturedPost,
      gridPosts: fallbackGridPosts,
      isSanityConnected: true,
    };
  } catch (error) {
    return {
      featuredPost: fallbackFeaturedPost,
      gridPosts: fallbackGridPosts,
      isSanityConnected: false,
    };
  }
}

export default async function BlogPage() {
  const { featuredPost, gridPosts, isSanityConnected } = await getBlogData();

  return (
    <main>
      <BlogView
        initialFeaturedPost={featuredPost}
        initialGridPosts={gridPosts}
        isSanityConnected={isSanityConnected}
      />
    </main>
  );
}
