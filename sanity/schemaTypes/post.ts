import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Investigative Article / Inquest Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content & Editorial', default: true },
    { name: 'inquest', title: 'Inquest & Evidence' },
    { name: 'media', title: 'Photographs & Captions' },
    { name: 'metadata', title: 'Author & Placement' },
    { name: 'seo', title: 'SEO & Social Sharing' },
  ],
  fields: [
    // -----------------------------------------------------------------
    // 1. CONTENT & EDITORIAL
    // -----------------------------------------------------------------
    defineField({
      name: 'title',
      title: 'Broadsheet Headline *',
      type: 'string',
      group: 'content',
      description: 'The authoritative, high-contrast Didone headline (e.g. "THE NHS IN CRISIS: BACKDOOR PRIVATISATION OR UNAVOIDABLE COLLAPSE?")',
      validation: (Rule) => Rule.required().min(5).max(140),
    }),
    defineField({
      name: 'headlineDeck',
      title: 'Sub-Headline / Deck',
      type: 'string',
      group: 'content',
      description: 'Secondary investigative briefing kicker (e.g. "A forensic audit of £60bn debt repayments and private locum agency markups")',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug *',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Debate Category *',
      type: 'string',
      group: 'content',
      description: 'Populates the vertical typography watermark and debate filtering tabs.',
      options: {
        list: [
          { title: 'Politics & Parliament', value: 'POLITICS' },
          { title: 'Immigration & Borders', value: 'IMMIGRATION' },
          { title: 'NHS & Healthcare', value: 'NHS & HEALTH' },
          { title: 'Economy & Housing', value: 'ECONOMY & HOUSING' },
          { title: 'Civil Liberties & Law', value: 'CIVIL LIBERTIES' },
          { title: 'Monarchy & State', value: 'MONARCHY' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Article Excerpt / Teaser *',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A crisp, hard-hitting teaser paragraph displayed under the headline and in preview cards.',
      validation: (Rule) => Rule.required().max(350),
    }),
    defineField({
      name: 'body',
      title: 'Full Investigative Body & Evidence *',
      type: 'array',
      group: 'content',
      description: 'The complete report with forensic paragraphs, subheadings, leaked documents, callout quotes, and statistical highlights.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal Paragraph', value: 'normal' },
            { title: 'Section Heading (H2)', value: 'h2' },
            { title: 'Sub-section Heading (H3)', value: 'h3' },
            { title: 'Investigative Pull Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet Points', value: 'bullet' },
            { title: 'Numbered Evidence', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong Bold', value: 'strong' },
              { title: 'Emphasis Italic', value: 'em' },
              { title: 'Code / Statutory Reference', value: 'code' },
            ],
            annotations: [
              {
                title: 'External Link / Reference',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        // Rich Inline Callout Box
        {
          type: 'object',
          name: 'calloutBox',
          title: 'Whistleblower / Audit Callout Box',
          fields: [
            {
              name: 'type',
              title: 'Callout Nature',
              type: 'string',
              options: {
                list: [
                  { title: 'Whistleblower Dossier Alert', value: 'whistleblower' },
                  { title: 'Official Government Denial', value: 'official_denial' },
                  { title: 'Key Statutory Data', value: 'statutory_data' },
                  { title: 'Legal & Constitutional Warning', value: 'legal_warning' },
                ],
              },
              initialValue: 'whistleblower',
            },
            {
              name: 'title',
              title: 'Box Header',
              type: 'string',
              description: 'E.g. "INTERNAL WHITEHALL MEMO: UNREDACTED"',
            },
            {
              name: 'text',
              title: 'Detailed Content',
              type: 'text',
              rows: 3,
            },
          ],
        },
        // Key Statistical Highlight Box
        {
          type: 'object',
          name: 'keyStat',
          title: 'Key Metric / Financial Figure',
          fields: [
            {
              name: 'stat',
              title: 'Metric Figure',
              type: 'string',
              description: 'E.g. "£78B" or "400+" or "52%"',
            },
            {
              name: 'label',
              title: 'Metric Description',
              type: 'string',
              description: 'E.g. "Private Dividends Extracted Since 1989"',
            },
            {
              name: 'source',
              title: 'Verification Source',
              type: 'string',
              description: 'E.g. "Ofwat Regulatory Filings & Companies House"',
            },
          ],
        },
        // Photo with editorial caption
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Editorial Caption',
            },
            {
              name: 'photoCredit',
              type: 'string',
              title: 'Photo Credit / Bureau Agency',
            },
          ],
        },
      ],
    }),

    // -----------------------------------------------------------------
    // 2. INQUEST & EVIDENCE
    // -----------------------------------------------------------------
    defineField({
      name: 'inquestStatus',
      title: 'Inquest Status Badge',
      type: 'string',
      group: 'inquest',
      description: 'Visual status indicator displayed on the post header.',
      options: {
        list: [
          { title: 'Active Ongoing Inquest', value: 'ONGOING INQUEST' },
          { title: 'Verified Whistleblower Leak', value: 'VERIFIED LEAK' },
          { title: 'Special Investigative Dossier', value: 'SPECIAL DOSSIER' },
          { title: 'Parliamentary & NAO Audit', value: 'PARLIAMENTARY AUDIT' },
          { title: 'Archived Public Report', value: 'ARCHIVED REPORT' },
        ],
      },
      initialValue: 'ONGOING INQUEST',
    }),
    defineField({
      name: 'citationsCount',
      title: 'Citations / Evidence Counter',
      type: 'string',
      group: 'inquest',
      description: 'E.g. "94.2K CITATIONS", "14 FOI REQUESTS", "£8.2M AUDIT"',
      initialValue: 'VERIFIED EVIDENCE',
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Inquest Findings (Bullet Points)',
      type: 'array',
      group: 'inquest',
      description: 'Quick-reference executive summary of the investigation findings for parliamentary researchers and readers.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sourceDocuments',
      title: 'Source Documents & Leaked Files',
      type: 'array',
      group: 'inquest',
      description: 'Downloadable or external references validating the story (PDFs, Hansard debates, Companies House filings).',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'documentName', title: 'Document Title', type: 'string' },
            { name: 'documentType', title: 'Type', type: 'string', description: 'E.g. "FOI Release", "Unredacted PDF", "Audit Ledger"' },
            { name: 'externalUrl', title: 'External URL / Verification Link', type: 'url' },
          ],
        },
      ],
    }),

    // -----------------------------------------------------------------
    // 3. PHOTOGRAPHS & CAPTIONS
    // -----------------------------------------------------------------
    defineField({
      name: 'mainImage',
      title: 'Hero Cover Image *',
      type: 'image',
      group: 'media',
      description: 'High-resolution broadsheet photograph for the headline card, trending carousel, and social previews.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text for Accessibility',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Editorial Caption',
          description: 'E.g. "Protest outside Westminster following the contentious parliamentary vote."',
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Photographer / Wire Agency',
          description: 'E.g. "Reuters / Gainleadx Bureau Archive"',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // -----------------------------------------------------------------
    // 4. AUTHOR & PLACEMENT
    // -----------------------------------------------------------------
    defineField({
      name: 'author',
      title: 'Investigative Author / Bureau',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'metadata',
      description: 'Link an existing author profile or bureau desk.',
    }),
    defineField({
      name: 'authorName',
      title: 'Byline Override / Desk Attribution',
      type: 'string',
      group: 'metadata',
      description: 'Direct byline name (e.g. "Westminster Inquest Desk" or "Editorial Board")',
      initialValue: 'Gainleadx Inquest Desk',
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated Read Time',
      type: 'string',
      group: 'metadata',
      description: 'E.g. "6 MIN READ"',
      initialValue: '6 MIN READ',
    }),
    defineField({
      name: 'isFeatured',
      title: '★ Feature in Lead Spotlight Slider?',
      type: 'boolean',
      group: 'metadata',
      description: 'If toggled ON, this post appears prominently in the top spotlight banner.',
      initialValue: false,
    }),
    defineField({
      name: 'isTrending',
      title: '⚡ Feature in Trending Controversies Carousel?',
      type: 'boolean',
      group: 'metadata',
      description: 'If toggled ON, this post appears in the continuous 60fps auto-sliding carousel.',
      initialValue: true,
    }),
    defineField({
      name: 'trendingRank',
      title: 'Trending Rank Priority',
      type: 'number',
      group: 'metadata',
      description: 'Priority order in the trending carousel (1 to 10).',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Timestamp *',
      type: 'datetime',
      group: 'metadata',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    // -----------------------------------------------------------------
    // 5. SEO & SOCIAL SHARING
    // -----------------------------------------------------------------
    defineField({
      name: 'seoTitle',
      title: 'Meta Title (Search Engines)',
      type: 'string',
      group: 'seo',
      description: 'Optimal length: 50-60 characters for Google UK rankings.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description (Search Engines)',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: 'Optimal length: 140-160 characters for high click-through rates.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'mainImage',
      isFeatured: 'isFeatured',
      isTrending: 'isTrending',
      inquestStatus: 'inquestStatus',
    },
    prepare(selection) {
      const { title, category, media, isFeatured, isTrending, inquestStatus } = selection;
      const badges = [
        isFeatured ? '★ SPOTLIGHT' : '',
        isTrending ? '⚡ TRENDING' : '',
        inquestStatus ? `[${inquestStatus}]` : '',
      ]
        .filter(Boolean)
        .join(' ');

      return {
        title,
        subtitle: `${badges} ${category ? `• ${category}` : ''}`,
        media,
      };
    },
  },
});
