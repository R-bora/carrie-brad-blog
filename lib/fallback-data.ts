import { BlogPost } from '@/types/blog';

export const fallbackFeaturedPost: BlogPost = {
  _id: 'featured-1',
  title: 'DREADING TAX SEASON? THESE STRATEGIES WILL HELP YOU PREPARE EARLY',
  slug: 'dreading-tax-season-strategies-to-prepare-early',
  isFeatured: true,
  category: 'BUSINESS',
  mainImage: {
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    alt: 'Top down flatlay of hands holding open book with coffee and glasses',
  },
  excerpt:
    "Tax season can be a stressful time for business owners, especially if you're not prepared. Filing taxes can feel like a daunting task, and if you don't plan ahead, you may end up scrambling to gather all of the necessary documents at the last minute. However, with a bit of preparation, tax",
  publishedAt: '2024-04-12T10:00:00Z',
};

export const fallbackGridPosts: BlogPost[] = [
  {
    _id: 'post-1',
    title: "What Your Analytics are Trying to Tell You About Your Business' ACTUAL Results",
    slug: 'what-your-analytics-are-trying-to-tell-you',
    isFeatured: false,
    category: 'SMALL BUSINESS',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      alt: 'Woman holding a white wine glass in a cozy setting',
    },
    excerpt:
      'As a business owner, you have access to TONS of analytical data about your business. But, are you actually looking at it? Or, just finding comfort that it\'s there if/when you',
    publishedAt: '2024-04-10T09:00:00Z',
  },
  {
    _id: 'post-2',
    title: 'Common Copywriting Mistakes that are Making Your Ideal Customers Click Away',
    slug: 'common-copywriting-mistakes-ideal-customers-click-away',
    isFeatured: false,
    category: 'COPYWRITING',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      alt: 'Open bedroom window looking out to Mediterranean buildings with pink pillow on bed',
    },
    excerpt:
      'Copywriting is an art, not a science. And, what works sometimes (or worked in the past) won\'t work forever. Even the most naturally gifted copywriter make these mistakes!',
    publishedAt: '2024-04-08T09:00:00Z',
  },
  {
    _id: 'post-3',
    title: '5 IG Stories Strategies to Boost Your Social Media Engagement',
    slug: '5-ig-stories-strategies-boost-social-media-engagement',
    isFeatured: false,
    category: 'SOCIAL MEDIA',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      alt: 'Casual lifestyle shot sitting on floor with sneakers and denim jeans',
    },
    excerpt:
      'Want to increase your audience engagement on social media? In the changing landscape of social media, it is harder than it used to be to get people\'s attention. Strategies that used to',
    publishedAt: '2024-04-05T09:00:00Z',
  },
  {
    _id: 'post-4',
    title: 'Why Embracing Slow Living Made My Creative Work 10x More Impactful',
    slug: 'slow-living-creative-impact',
    isFeatured: false,
    category: 'PERSONAL',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      alt: 'Stylish woman in camel blazer holding laptop',
    },
    excerpt:
      'In a world that celebrates relentless hustle, learning when to pause was the single most lucrative decision I ever made for both my mental health and my business revenue.',
    publishedAt: '2024-04-02T09:00:00Z',
  },
  {
    _id: 'post-5',
    title: 'The Ultimate Guide to Pitching Yourself for Top-Tier Podcasts',
    slug: 'ultimate-guide-pitching-top-tier-podcasts',
    isFeatured: false,
    category: 'MARKETING',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      alt: 'Woman smiling and speaking into a podcast studio microphone',
    },
    excerpt:
      'Getting booked on relevant industry podcasts gives you immediate authority and access to warm leads who already trust your voice. Here is the exact email pitch that got me 90% yeses.',
    publishedAt: '2024-03-29T09:00:00Z',
  },
  {
    _id: 'post-6',
    title: 'Designing an Inspiring Home Office That Actually Drives Productivity',
    slug: 'designing-inspiring-home-office-productivity',
    isFeatured: false,
    category: 'REAL ESTATE',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      alt: 'Woman styling magazines and coffee table decor in warm living space',
    },
    excerpt:
      'Your environment directly dictates your cognitive focus. Discover the tactile textures, natural lighting principles, and intentional styling rituals that cultivate deep flow.',
    publishedAt: '2024-03-25T09:00:00Z',
  },
];
