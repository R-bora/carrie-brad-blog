import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The editorial title of the blog post (e.g. "What Your Analytics are Trying to Tell You About Your Business\' ACTUAL Results")',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured Post?',
      type: 'boolean',
      description: 'If toggled on, this post displays in the prominent overlapping hero section with the "READ THE LATEST" badge.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category (Vertical Text Label)',
      type: 'string',
      description: 'Populates the vertical typography label running along the left edge of the thumbnail (e.g. POLITICS, IMMIGRATION, NHS & HEALTH, ECONOMY & HOUSING, CIVIL LIBERTIES, MONARCHY).',
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
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Thumbnail image for post card or featured header.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short teaser paragraph appearing below the title in clean sans-serif font.',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
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
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'mainImage',
      isFeatured: 'isFeatured',
    },
    prepare(selection) {
      const { title, category, media, isFeatured } = selection;
      return {
        title,
        subtitle: `${isFeatured ? '★ [FEATURED] ' : ''}[${category || 'Uncategorized'}]`,
        media,
      };
    },
  },
});
