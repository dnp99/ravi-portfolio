import {defineField, defineType} from 'sanity'

export const portrait = defineType({
  name: 'portrait',
  title: 'Film Portrait',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({name: 'displayOrder', title: 'Display order', type: 'number', initialValue: 10}),
  ],
  preview: {
    select: {title: 'title', media: 'image', caption: 'caption'},
    prepare({title, media, caption}) {
      return {title: title || caption || 'Untitled portrait', media}
    },
  },
})
