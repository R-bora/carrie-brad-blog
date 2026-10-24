export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  isFeatured?: boolean;
  category: string;
  mainImage: {
    asset?: {
      _id?: string;
      url: string;
    };
    alt?: string;
    url?: string; // helper for local/Unsplash fallback
  };
  excerpt: string;
  publishedAt?: string;
  body?: any[];
}

export type CategoryFilter =
  | 'ALL'
  | 'SOCIAL MEDIA'
  | 'WELLNESS'
  | 'BUSINESS'
  | 'COPYWRITING'
  | 'SMALL BUSINESS'
  | 'PERSONAL'
  | 'MARKETING'
  | 'REAL ESTATE';
