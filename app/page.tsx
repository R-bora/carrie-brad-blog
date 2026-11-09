import { client, isSanityConfigured } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import { fallbackFeaturedPost, fallbackGridPosts } from '@/lib/fallback-data';
import { BlogView } from '@/components/BlogView';
import { BlogPost } from '@/types/blog';

export const revalidate = 60; // revalidate every 60 seconds

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
    const allSanity = await client.fetch<BlogPost[]>(allPostsQuery);

    if (allSanity && allSanity.length > 0) {
      const featured = allSanity.find((p) => p.isFeatured) || allSanity[0];
      const grid = allSanity.filter((p) => p._id !== featured._id);

      return {
        featuredPost: featured,
        gridPosts: grid,
        isSanityConnected: true,
      };
    }

    return {
      featuredPost: null,
      gridPosts: [],
      isSanityConnected: true,
    };
  } catch (error) {
    console.warn('Sanity fetch encountered an error:', error);
    return {
      featuredPost: null,
      gridPosts: [],
      isSanityConnected: false,
    };
  }
}

export default async function HomePage() {
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
