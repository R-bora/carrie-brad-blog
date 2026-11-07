import { groq } from 'next-sanity';

const postFields = groq`
  _id,
  title,
  headlineDeck,
  "slug": slug.current,
  isFeatured,
  isTrending,
  trendingRank,
  inquestStatus,
  citationsCount,
  category,
  mainImage {
    asset-> {
      _id,
      url
    },
    alt,
    caption,
    credit
  },
  excerpt,
  publishedAt,
  estimatedReadTime,
  authorName,
  keyTakeaways,
  sourceDocuments,
  seoTitle,
  seoDescription
`;

// Query for the prominent Featured Post that renders with the overlapping card & circular badge
export const featuredPostQuery = groq`
  *[_type == "post" && isFeatured == true] | order(publishedAt desc)[0] {
    ${postFields},
    body
  }
`;

// Query for standard posts displayed in the 3-column grid
export const postsGridQuery = groq`
  *[_type == "post" && (isFeatured == false || !defined(isFeatured))] | order(publishedAt desc) {
    ${postFields},
    body
  }
`;

// Query for all posts (used for category filtering or fallback)
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields},
    body
  }
`;

// Query for trending posts specifically
export const trendingPostsQuery = groq`
  *[_type == "post" && isTrending == true] | order(trendingRank asc, publishedAt desc) {
    ${postFields}
  }
`;

// Query for a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;
