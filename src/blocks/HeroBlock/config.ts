import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      defaultValue: 'hero',
      admin: {
        description: 'HTML anchor ID for this section (e.g. "hero"). Used for #anchor navigation links.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title (Prefix / Static part)',
      required: true,
      defaultValue: 'Crafting Digital Experiences as a',
      admin: {
        description: 'Static prefix of the headline (e.g. "I build things as a" or "Designing the future of")',
      },
    },
    {
      name: 'rotatingWords',
      type: 'array',
      label: 'Rotating Animated Words',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Word / Phrase',
        plural: 'Words / Phrases',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Word / Phrase',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Developer' },
        { text: 'Designer' },
        { text: 'Creator' },
        { text: 'Problem Solver' },
      ],
      admin: {
        description: 'Array of words that appear at the end of the title and switch continuously with animation',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue:
        'Building high-performance, accessible, and refined digital products with thoughtful design and modern engineering.',
      admin: {
        description: 'Brief, clear subtitle beneath the headline',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Visual / Portrait (Right side)',
      admin: {
        description: 'Portrait or showcase visual displayed on the right side of the hero',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Full Backdrop)',
      admin: {
        description: 'Optional full-bleed background image behind the hero section',
      },
    },
    linkGroup({
      overrides: {
        label: 'Action Buttons',
        maxRows: 2,
        admin: {
          description: 'Two call-to-action buttons (e.g. Primary "View Projects" and Secondary "Contact Me")',
        },
      },
    }),
  ],
}
