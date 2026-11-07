export interface SanityImage {
  asset?: {
    _id?: string;
    url: string;
  };
  alt?: string;
  caption?: string;
  credit?: string;
  url?: string; // helper for local/Unsplash fallback
}

export interface SourceDocument {
  documentName?: string;
  documentType?: string;
  externalUrl?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  headlineDeck?: string;
  slug: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  inquestStatus?: string;
  citationsCount?: string;
  category: string;
  mainImage: SanityImage;
  excerpt: string;
  publishedAt?: string;
  estimatedReadTime?: string;
  authorName?: string;
  keyTakeaways?: string[];
  sourceDocuments?: SourceDocument[];
  seoTitle?: string;
  seoDescription?: string;
  body?: any[];
}

export type CategoryFilter =
  | 'ALL'
  | 'POLITICS'
  | 'IMMIGRATION'
  | 'NHS & HEALTH'
  | 'ECONOMY & HOUSING'
  | 'CIVIL LIBERTIES'
  | 'MONARCHY';
