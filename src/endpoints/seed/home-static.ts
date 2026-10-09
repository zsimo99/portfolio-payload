import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  meta: {
    description: 'An open-source website built with Payload and Next.js.',
    title: 'Payload Website Template',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'heroBlock',
      title: 'Crafting Modern Web Experiences as a',
      rotatingWords: [
        { text: 'Full-Stack Developer' },
        { text: 'UI/UX Designer' },
        { text: 'System Architect' },
        { text: 'Creative Engineer' },
      ],
      subtitle:
        'Building high-performance, accessible, and refined digital products with thoughtful design and modern engineering.',
      links: [
        {
          link: {
            appearance: 'default',
            label: 'Explore Work',
            type: 'custom',
            url: '/posts',
          },
        },
        {
          link: {
            appearance: 'outline',
            label: 'Get in Touch',
            type: 'custom',
            url: '/contact',
          },
        },
      ],
    },
  ],
}
