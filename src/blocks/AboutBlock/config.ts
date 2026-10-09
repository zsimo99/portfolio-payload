import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      defaultValue: 'about',
      admin: {
        description: 'HTML anchor ID for this section (e.g. "about"). Used for #anchor navigation links.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Eyebrow',
      defaultValue: 'About Me',
      admin: {
        description: 'Small category or status tag above the headline',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Bridging Design & Engineering with Intention',
      admin: {
        description: 'Main section heading on the left side',
      },
    },
    {
      name: 'paragraphs',
      type: 'richText',
      label: 'Content / Paragraphs',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: 'Paragraphs, story, or bio description on the left side',
      },
    },
    linkGroup({
      overrides: {
        label: 'Action Links / Buttons',
        maxRows: 2,
        admin: {
          description: 'Optional links below the paragraphs (e.g. "Download Resume", "Read More")',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Media (Image or Video)',
      required: true,
      admin: {
        description: 'Showcase visual displayed on the right: supports both images and video uploads',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Media Caption (Optional)',
      admin: {
        description: 'Brief caption or note underneath the media frame',
      },
    },
  ],
}
