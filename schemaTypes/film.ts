import {defineField, defineType} from 'sanity'

export const film = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'year', title: 'Year', type: 'number', validation: (rule) => rule.integer().min(1900).max(2100)}),
    defineField({name: 'runtime', title: 'Runtime', type: 'string', description: 'Example: 10 minutes'}),
    defineField({name: 'roles', title: 'Roles', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'logline', title: 'Logline', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'synopsis', title: 'Synopsis', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'heroImage', title: 'Hero still', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'stills', title: 'Film stills', type: 'array', of: [{type: 'image', options: {hotspot: true}}]}),
    defineField({name: 'videoUrl', title: 'Trailer or film link', type: 'url'}),
    defineField({name: 'festivalNotes', title: 'Festival / screening notes', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'displayOrder', title: 'Display order', type: 'number', initialValue: 10}),
    defineField({name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: true}),
  ],
  preview: {
    select: {title: 'title', year: 'year', media: 'heroImage'},
    prepare({title, year, media}) {
      return {title, subtitle: year ? String(year) : 'Film', media}
    },
  },
})
