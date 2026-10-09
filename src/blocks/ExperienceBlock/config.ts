import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ExperienceBlock: Block = {
  slug: 'experienceBlock',
  interfaceName: 'ExperienceBlock',
  labels: {
    singular: 'Experience Section',
    plural: 'Experience Sections',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      defaultValue: 'experience',
      admin: {
        description: 'HTML anchor ID for this section (e.g. "experience"). Used for #anchor navigation links.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Eyebrow',
      defaultValue: 'Career & Journey',
      admin: {
        description: 'Small category tag above the section headline',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Work Experience & Milestones',
      admin: {
        description: 'Main section heading',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle / Description',
      defaultValue:
        'A chronicle of impactful roles, technical leadership, and engineering achievements across my career.',
      admin: {
        description: 'Brief, clear subtitle beneath the headline',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Items',
      minRows: 1,
      labels: {
        singular: 'Experience Item',
        plural: 'Experience Items',
      },
      defaultValue: [
        {
          role: 'Senior Full-Stack Engineer',
          company: 'Acme Technologies',
          location: 'San Francisco, CA (Remote)',
          period: '2023 - Present',
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Architected scalable headless commerce and content systems. Led migration to Next.js App Router and Payload CMS, reducing build times by 40%.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          technologies: [
            { name: 'Next.js' },
            { name: 'TypeScript' },
            { name: 'Payload CMS' },
            { name: 'Tailwind CSS' },
          ],
        },
        {
          role: 'Frontend Engineer',
          company: 'Nexus Creative Studio',
          location: 'New York, NY',
          period: '2021 - 2023',
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Developed bespoke web applications and interactive editorial experiences for high-profile clients, prioritizing micro-interactions and Core Web Vitals.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          technologies: [
            { name: 'React' },
            { name: 'Node.js' },
            { name: 'PostgreSQL' },
            { name: 'Framer Motion' },
          ],
        },
        {
          role: 'Software Developer',
          company: 'Hyperion Labs',
          location: 'Boston, MA',
          period: '2019 - 2021',
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Engineered performant dashboard interfaces and automated CI/CD deployment pipelines across microservices.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          technologies: [
            { name: 'JavaScript' },
            { name: 'GraphQL' },
            { name: 'Docker' },
            { name: 'Jest' },
          ],
        },
      ],
      fields: [
        {
          name: 'role',
          type: 'text',
          label: 'Job Title / Role',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
          label: 'Company / Organization',
          required: true,
        },
        {
          name: 'period',
          type: 'text',
          label: 'Time Period (e.g. 2023 - Present)',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location (e.g. Remote, City)',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Key Responsibilities & Achievements',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'technologies',
          type: 'array',
          label: 'Technologies Used (Tags)',
          labels: {
            singular: 'Technology',
            plural: 'Technologies',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Technology Name',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
