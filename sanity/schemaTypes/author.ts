import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Investigative Author / Bureau',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name / Desk Title',
      type: 'string',
      description: 'E.g. "Westminster Investigative Bureau" or "Dr. Alistair Finch"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Journalistic Role / Beat',
      type: 'string',
      description: 'E.g. "Senior Policy & Dark Money Correspondent" or "Healthcare Auditor"',
    }),
    defineField({
      name: 'avatar',
      title: 'Author Photograph / Bureau Badge',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Brief journalistic credentials and investigative background.',
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Journalistic Source Protection',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
});
