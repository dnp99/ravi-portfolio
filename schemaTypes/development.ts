import {defineField, defineType} from 'sanity'

export const development = defineType({
  name: 'development',
  title: 'In Development',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'format', title: 'Format', type: 'string', description: 'Example: Feature screenplay or short film'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 5}),
    defineField({name: 'image', title: 'Reference image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'status', title: 'Status', type: 'string', options: {list: ['Concept', 'Writing', 'Pre-production', 'Seeking partners']}}),
    defineField({name: 'displayOrder', title: 'Display order', type: 'number', initialValue: 10}),
  ],
  preview: {select: {title: 'title', subtitle: 'format', media: 'image'}},
})
