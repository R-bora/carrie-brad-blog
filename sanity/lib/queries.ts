import { groq } from 'next-sanity';

// Query for the prominent Featured Post that renders with the overlapping card & circular badge
export const featuredPostQuery = groq`
  *[_type == "post" && isFeatured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    isFeatured,
    category,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    excerpt,
    publishedAt,
    body
  }
`;

// Query for standard posts displayed in the 3-column grid
export const postsGridQuery = groq`
  *[_type == "post" && (isFeatured == false || !defined(isFeatured))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    isFeatured,
    category,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    excerpt,
    publishedAt
  }
`;

// Query for all posts (used for category filtering or fallback)
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    isFeatured,
    category,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    excerpt,
    publishedAt
  }
`;

// Query for a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    isFeatured,
    category,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    excerpt,
    publishedAt,
    body
  }
`;
