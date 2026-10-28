import { BlogPost } from '@/types/blog';

export const fallbackFeaturedPost: BlogPost = {
  _id: 'featured-1',
  title: 'THE NHS IN CRISIS: BACKDOOR PRIVATISATION OR UNAVOIDABLE COLLAPSE?',
  slug: 'the-nhs-in-crisis-backdoor-privatisation-or-collapse',
  isFeatured: true,
  category: 'NHS & HEALTH',
  mainImage: {
    url: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80',
    alt: 'British hospital ward and NHS healthcare professionals',
  },
  excerpt:
    'With waiting lists surpassing 7.6 million, junior doctors engaged in historic industrial action, and NHS dentistry virtually extinct across England, Whitehall briefing memos expose the fiercely debated proposals to introduce nominal copayments for emergency care and GP consultations.',
  publishedAt: '2026-10-24T08:00:00Z',
  estimatedReadTime: '7 MIN READ',
};

export const fallbackGridPosts: BlogPost[] = [
  {
    _id: 'post-1',
    title: 'The Small Boats Stalemate: Billions Spent, Zero Solutions on the Channel',
    slug: 'small-boats-stalemate-channel-asylum-policy',
    isFeatured: false,
    category: 'IMMIGRATION',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      alt: 'White Cliffs of Dover overlooking the English Channel',
    },
    excerpt:
      'From emergency barge contracts to contentious third-country deportation treaties, we investigate the spiralling £8m-a-day hotel expenditure and the deep constitutional clash between Westminster and human rights courts.',
    publishedAt: '2026-10-22T09:00:00Z',
    estimatedReadTime: '6 MIN READ',
  },
  {
    _id: 'post-2',
    title: 'The Two-Child Benefit Cap: The Toxic Debate Splitting Parliament Down the Middle',
    slug: 'two-child-benefit-cap-parliament-debate',
    isFeatured: false,
    category: 'POLITICS',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80',
      alt: 'Palace of Westminster and Big Ben clock tower in London',
    },
    excerpt:
      'Charities label it the single biggest driver of child poverty across the UK; fiscal hawks argue removing it blows a multi-billion pound hole in the budget. Inside the escalating rebellion gripping the backbenches.',
    publishedAt: '2026-10-20T11:30:00Z',
    estimatedReadTime: '5 MIN READ',
  },
  {
    _id: 'post-3',
    title: 'London’s Ghost Mansions: Empty Billionaire Towers Amid a Severe Housing Shortage',
    slug: 'londons-ghost-mansions-empty-towers-housing-crisis',
    isFeatured: false,
    category: 'ECONOMY & HOUSING',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      alt: 'London city streetscape and residential townhouses',
    },
    excerpt:
      'Tens of thousands of prime London properties sit dark as capital preservation vehicles for offshore trusts, while council house waiting lists exceed 300,000 families and average rents consume over 50% of local incomes.',
    publishedAt: '2026-10-18T14:00:00Z',
    estimatedReadTime: '8 MIN READ',
  },
  {
    _id: 'post-4',
    title: 'The Crown’s Hidden Billions: Sovereign Wealth, Tax Exemptions & The Republican Movement',
    slug: 'the-crowns-hidden-billions-monarchy-tax-wealth',
    isFeatured: false,
    category: 'MONARCHY',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
      alt: 'Royal palace gates with golden crest in London',
    },
    excerpt:
      'An investigation into the private Duchy portfolios of Lancaster and Cornwall: exempt from corporation and capital gains taxes while generating tens of millions from public infrastructure, NHS hospitals, and schools.',
    publishedAt: '2026-10-15T10:00:00Z',
    estimatedReadTime: '7 MIN READ',
  },
  {
    _id: 'post-5',
    title: 'Sewage in Britain’s Rivers: How Water Privatisation Left Customers With Toxic Bills',
    slug: 'sewage-in-britains-rivers-water-privatisation-scandal',
    isFeatured: false,
    category: 'POLITICS',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
      alt: 'River Thames cutting through central London',
    },
    excerpt:
      'Over £72 billion extracted in shareholder dividends since privatisation while cumulative industry debt hit £64 billion. As storm overflows discharge raw sewage for millions of hours, the debate over re-nationalisation explodes.',
    publishedAt: '2026-10-12T16:00:00Z',
    estimatedReadTime: '6 MIN READ',
  },
  {
    _id: 'post-6',
    title: 'Public Order Acts & Facial Recognition: Is Britain Quietly Criminalising Dissent?',
    slug: 'public-order-act-facial-recognition-criminalising-dissent',
    isFeatured: false,
    category: 'CIVIL LIBERTIES',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
      alt: 'Legal gavel in British court of law',
    },
    excerpt:
      'From pre-emptive arrests of environmental demonstrators to the quiet rollout of live facial recognition vans across shopping high streets, civil liberties groups warn the UK is adopting unprecedented state surveillance powers.',
    publishedAt: '2026-10-09T08:30:00Z',
    estimatedReadTime: '5 MIN READ',
  },
];
