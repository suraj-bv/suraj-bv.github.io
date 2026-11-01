import {defineType, defineField} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'icon', title: 'Icon Name', type: 'string'}),
                    defineField({name: 'text', title: 'Text', type: 'string'}),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Me'}
    },
  },
})
