import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', initialValue: 'Ravi Rekhi', validation: (rule) => rule.required()}),
    defineField({name: 'roles', title: 'Roles', type: 'string', initialValue: 'Writer / Director / Producer'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 4}),
    defineField({name: 'about', title: 'About', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'portraitIntro', title: 'Portraits introduction', type: 'text', rows: 3}),
    defineField({name: 'portraitCaption', title: 'Portraits caption', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'email', validation: (rule) => rule.required()}),
    defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
    defineField({name: 'imdb', title: 'IMDb URL', type: 'url'}),
  ],
})
