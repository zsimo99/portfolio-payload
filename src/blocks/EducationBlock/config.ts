import type { Block } from 'payload'

export const EducationBlock: Block = {
  slug: 'educationBlock',
  interfaceName: 'EducationBlock',
  labels: {
    singular: 'Education & Certifications',
    plural: 'Education & Certifications',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      defaultValue: 'education',
      admin: {
        description: 'HTML anchor ID for this section (e.g. "education"). Used for #anchor navigation links.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Eyebrow',
      defaultValue: 'Academic & Credentials',
      admin: {
        description: 'Small category tag above the headline',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Education & Certifications',
      admin: {
        description: 'Main section heading',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle / Description',
      defaultValue:
        'Formal education, continuous professional development, and verified industry credentials.',
      admin: {
        description: 'Subtitle beneath the headline',
      },
    },
    {
      name: 'education',
      type: 'array',
      label: 'Degrees & Formal Education',
      labels: {
        singular: 'Degree / Program',
        plural: 'Degrees & Programs',
      },
      defaultValue: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'University of Technology',
          period: '2017 - 2021',
          grade: 'First Class Honours (GPA 3.8/4.0)',
          location: 'Boston, MA',
          description:
            'Focus on Software Engineering, Distributed Systems, Data Structures & Algorithms, and Human-Computer Interaction.',
          highlights: [
            { item: "Dean's Honor List for 6 consecutive semesters" },
            { item: 'President of Computer Science Society & Hackathon Organizer' },
          ],
        },
      ],
      fields: [
        {
          name: 'degree',
          type: 'text',
          label: 'Degree or Field of Study',
          required: true,
        },
        {
          name: 'institution',
          type: 'text',
          label: 'School / University',
          required: true,
        },
        {
          name: 'period',
          type: 'text',
          label: 'Years Attended (e.g. 2017 - 2021)',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location (Optional)',
        },
        {
          name: 'grade',
          type: 'text',
          label: 'Grade / Honors / GPA (Optional)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Overview / Focus Area',
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Key Honors / Achievements (Optional)',
          labels: {
            singular: 'Achievement',
            plural: 'Achievements',
          },
          fields: [
            {
              name: 'item',
              type: 'text',
              label: 'Honor / Achievement',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Professional Certifications & Badges',
      labels: {
        singular: 'Certification',
        plural: 'Certifications',
      },
      defaultValue: [
        {
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services (AWS)',
          issueDate: '2024',
          credentialId: 'AWS-PSA-94821',
          credentialUrl: 'https://aws.amazon.com/verification',
          skills: [{ skill: 'Cloud Architecture' }, { skill: 'Serverless' }, { skill: 'DevOps' }],
        },
        {
          name: 'Meta Front-End Developer Professional Certificate',
          issuer: 'Meta / Coursera',
          issueDate: '2023',
          credentialId: 'META-FE-55829',
          credentialUrl: 'https://coursera.org/verify/professional-cert',
          skills: [{ skill: 'React' }, { skill: 'UX Principles' }, { skill: 'Web Standards' }],
        },
        {
          name: 'Certified Kubernetes Application Developer (CKAD)',
          issuer: 'The Linux Foundation & CNCF',
          issueDate: '2023',
          credentialId: 'CKAD-92014',
          credentialUrl: 'https://www.cncf.io/certification/ckad/',
          skills: [{ skill: 'Kubernetes' }, { skill: 'Containers' }, { skill: 'CI/CD' }],
        },
      ],
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Certificate Name',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
          label: 'Issuing Organization',
          required: true,
        },
        {
          name: 'issueDate',
          type: 'text',
          label: 'Issue Date / Year',
          required: true,
        },
        {
          name: 'credentialId',
          type: 'text',
          label: 'Credential ID / License Number (Optional)',
        },
        {
          name: 'credentialUrl',
          type: 'text',
          label: 'Verification Link (Optional)',
          admin: {
            description: 'Link to certificate verification page. Leave empty to hide button.',
          },
        },
        {
          name: 'skills',
          type: 'array',
          label: 'Covered Competencies / Topics',
          labels: {
            singular: 'Competency',
            plural: 'Competencies',
          },
          fields: [
            {
              name: 'skill',
              type: 'text',
              label: 'Skill / Topic',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
