import type { Block } from 'payload'

export const SkillsBlock: Block = {
  slug: 'skillsBlock',
  interfaceName: 'SkillsBlock',
  labels: {
    singular: 'Skills Section',
    plural: 'Skills Sections',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      defaultValue: 'skills',
      admin: {
        description: 'HTML anchor ID for this section (e.g. "skills"). Used for #anchor navigation links.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Eyebrow',
      defaultValue: 'Expertise & Capabilities',
      admin: {
        description: 'Small category or status tag above the headline',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Technologies & Tools I Craft With',
      admin: {
        description: 'Main section heading',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle / Description',
      defaultValue:
        'A comprehensive toolkit honed through years of architecting scalable applications, refined interfaces, and reliable systems.',
      admin: {
        description: 'Brief, clear subtitle beneath the headline',
      },
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Skill Categories',
      minRows: 1,
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      defaultValue: [
        {
          title: 'Frontend & UI Engineering',
          description: 'Building accessible, fluid, and responsive user interfaces',
          skills: [
            { name: 'React / Next.js', proficiency: 'Advanced' },
            { name: 'TypeScript', proficiency: 'Advanced' },
            { name: 'Tailwind CSS', proficiency: 'Advanced' },
            { name: 'HTML5 / Modern Web APIs', proficiency: 'Advanced' },
            { name: 'CSS / Animations', proficiency: 'Advanced' },
          ],
        },
        {
          title: 'Backend & Architecture',
          description: 'Constructing robust services, databases, and APIs',
          skills: [
            { name: 'Node.js', proficiency: 'Advanced' },
            { name: 'Payload CMS', proficiency: 'Advanced' },
            { name: 'PostgreSQL / MongoDB', proficiency: 'Advanced' },
            { name: 'REST & GraphQL APIs', proficiency: 'Advanced' },
            { name: 'Authentication & Security', proficiency: 'Intermediate' },
          ],
        },
        {
          title: 'DevOps & Tooling',
          description: 'Automating pipelines, testing, and continuous delivery',
          skills: [
            { name: 'Git & GitHub', proficiency: 'Advanced' },
            { name: 'Docker', proficiency: 'Intermediate' },
            { name: 'CI/CD Pipelines', proficiency: 'Intermediate' },
            { name: 'Playwright & Vitest', proficiency: 'Advanced' },
            { name: 'Performance & SEO', proficiency: 'Advanced' },
          ],
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Category Name',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Category Description',
        },
        {
          name: 'skills',
          type: 'array',
          label: 'Skills / Tech List',
          minRows: 1,
          labels: {
            singular: 'Skill',
            plural: 'Skills',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Skill Name',
              required: true,
            },
            {
              name: 'proficiency',
              type: 'select',
              label: 'Proficiency Level (Optional)',
              defaultValue: 'Advanced',
              options: [
                { label: 'Expert', value: 'Expert' },
                { label: 'Advanced', value: 'Advanced' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Familiar', value: 'Familiar' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
