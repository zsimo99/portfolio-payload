import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Contact & CTA Section',
    plural: 'Contact & CTA Sections',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      defaultValue: 'contact',
      admin: {
        description: 'HTML anchor ID for this section (e.g. "contact"). Used for #anchor navigation links.',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Select Form (Form Builder)',
      admin: {
        description:
          'Select a form built with Payload Form Builder. If selected, it will render your custom form. Leave empty for the default quick contact form.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Eyebrow',
      defaultValue: "Let's Talk",
      admin: {
        description: 'Small tag pill above the main headline',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading',
      required: true,
      defaultValue: "Have an ambitious project in mind? Let's bring it to life.",
      admin: {
        description: 'Bold, conversion-focused headline',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle / Value Proposition',
      defaultValue:
        'I help startups and businesses build modern, high-performance web applications and digital experiences. Reach out directly or send a message below.',
      admin: {
        description: 'Supporting paragraph outlining how you help clients',
      },
    },
    {
      name: 'availabilityStatus',
      type: 'text',
      label: 'Live Availability Status',
      defaultValue: 'Available for new client projects & select contracts',
      admin: {
        description: 'Pulsing indicator text showing current capacity',
      },
    },
    {
      name: 'responseTime',
      type: 'text',
      label: 'Typical Response Time',
      defaultValue: 'Responds within 24 hours',
      admin: {
        description: 'Guarantees fast response and builds trust',
      },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Direct Email Address',
      required: true,
      defaultValue: 'hello@developer.com',
      admin: {
        description: 'Primary contact email for quick copying and mailto fallback',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone / WhatsApp (Optional)',
      admin: {
        description: 'Optional phone or WhatsApp contact number',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location / Base (Optional)',
      defaultValue: 'San Francisco, CA • UTC-7 (Available Worldwide)',
      admin: {
        description: 'Your location or timezone context',
      },
    },
    {
      name: 'scheduleMeetingUrl',
      type: 'text',
      label: 'Schedule Meeting Link (Optional)',
      defaultValue: 'https://cal.com',
      admin: {
        description: 'URL to Cal.com or Calendly booking page',
      },
    },
    {
      name: 'scheduleMeetingLabel',
      type: 'text',
      label: 'Schedule Meeting Button Label',
      defaultValue: 'Book a 15-min Discovery Call',
    },
    {
      name: 'servicesList',
      type: 'array',
      label: 'Quick Project Inquiries / Service Tags',
      labels: {
        singular: 'Service / Topic',
        plural: 'Services / Topics',
      },
      defaultValue: [
        { label: 'Full-Stack Web App' },
        { label: 'Headless CMS / Payload' },
        { label: 'UI/UX Redesign' },
        { label: 'Performance Audit' },
        { label: 'Contract / Full-time' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Service or Project Type',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Profiles',
      labels: {
        singular: 'Social Link',
        plural: 'Social Links',
      },
      defaultValue: [
        { platform: 'GitHub', url: 'https://github.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
        { platform: 'X / Twitter', url: 'https://twitter.com' },
      ],
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Platform Name',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
          required: true,
        },
      ],
    },
  ],
}
