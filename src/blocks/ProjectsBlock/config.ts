import type { Block } from 'payload'

import { link } from '../../fields/link'

export const ProjectsBlock: Block = {
  slug: 'projectsBlock',
  interfaceName: 'ProjectsBlock',
  labels: {
    singular: 'Featured Projects',
    plural: 'Featured Projects',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      defaultValue: 'projects',
      admin: {
        description: 'HTML anchor ID for this section (e.g. "projects"). Used for #anchor navigation links.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Eyebrow',
      defaultValue: 'Selected Work',
      admin: {
        description: 'Small category tag above the headline',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Featured Projects',
      admin: {
        description: 'Main section heading',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle / Description',
      defaultValue:
        'A curated showcase of modern web applications, digital products, and engineering solutions built with care.',
      admin: {
        description: 'Brief subtitle beneath the headline',
      },
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects List',
      minRows: 1,
      labels: {
        singular: 'Project',
        plural: 'Projects',
      },
      defaultValue: [
        {
          title: 'Pulse Analytics Engine',
          category: 'Web App',
          description:
            'Real-time metrics platform processing millions of telemetry events with custom data visualizations and low latency.',
          technologies: [{ name: 'Next.js' }, { name: 'TypeScript' }, { name: 'Tailwind CSS' }],
          demoUrl: 'https://example.com/demo',
          githubUrl: 'https://github.com/example/analytics',
        },
        {
          title: 'Aura Commerce & Design',
          category: 'E-Commerce',
          description:
            'High-converting headless storefront powered by Payload CMS and Stripe with instant page navigation and dark mode.',
          technologies: [{ name: 'Payload CMS' }, { name: 'React 19' }, { name: 'Tailwind CSS' }],
          demoUrl: 'https://example.com/store',
        },
        {
          title: 'Apex Design System',
          category: 'UI/UX Design',
          description:
            'Comprehensive design system with over 40 accessible components, token automation, and comprehensive documentation.',
          technologies: [{ name: 'Figma' }, { name: 'Storybook' }, { name: 'CSS Tokens' }],
          githubUrl: 'https://github.com/example/design-system',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Project Title',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category (Used for interactive filters)',
          required: true,
          defaultValue: 'Web App',
          admin: {
            description: 'Filter tag (e.g. "Web App", "E-Commerce", "UI/UX Design", "Mobile", "Full Stack")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Short Description',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Project Showcase Image',
          admin: {
            description: 'Showcase visual or mockup representing the project',
          },
        },
        {
          name: 'technologies',
          type: 'array',
          label: 'Tech Stack Pills',
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
        {
          name: 'demoUrl',
          type: 'text',
          label: 'Live Demo URL (Optional)',
          admin: {
            description: 'URL for the live demo button (e.g. https://myproject.com). Leave empty to hide.',
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub URL (Optional)',
          admin: {
            description: 'URL for the GitHub code button (e.g. https://github.com/user/repo). Leave empty to hide.',
          },
        },
      ],
    },
  ],
}
