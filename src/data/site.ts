import type { Capability, Heading, ImageSlot, LabeledValue, LinkItem } from './types';

export const SITE = {
  name: 'Cait Burke',
  roleTagline: 'Design + Front-End Engineering',
  location: 'Greater Seattle Area',
  availability: 'Available for work',
  email: 'hello@caitburke.dev',

  landingTagline: { lead: 'Design that holds up.', emphasis: 'Code that ships.' } satisfies Heading,

  heroEyebrow: 'Portfolio — Design + Front-End Engineering',
  heroStatement: { lead: "I'm Cait. I design it,", emphasis: 'then I build it.' } satisfies Heading,
  heroBio:
    'I close the gap between design and code, so good design survives the build. Front end development and technical product management at Amazon Prime, then React and TypeScript at AWS — and now The CB Creative, where I design and build websites for small businesses start to finish while exploring new technologies that take the work further.',

  workHeading: { lead: 'Different projects,', emphasis: 'one throughline.' } satisfies Heading,

  aboutHeading: { lead: 'Good design', emphasis: 'should survive the build.' } satisfies Heading,
  aboutBio:
    'Front end and technical product management at Amazon Prime, then React and TypeScript at AWS, taught me what makes an interface hold up in production — and what it takes to ship it. Now I take work from first sketch to shipped code: the design decisions and the engineering ones, made by the same person.',
  portrait: { src: '/images/about/portrait.jpg', alt: 'Portrait of Cait Burke' } satisfies ImageSlot,

  contactHeading: {
    lead: 'Currently open to',
    emphasis: 'front-end, design engineer and UX engineer roles.',
  } satisfies Heading,

  footerTagline: 'Design · Development · Accessibility-minded',
} as const;

/** The home hero's meta list. */
export const HERO_META: LabeledValue[] = [
  { label: 'Previously', value: 'Amazon Prime · AWS' },
  { label: 'Stack', value: 'Figma · React · TypeScript · Node.js' },
  { label: 'AI', value: 'Claude Code · Figma AI' },
  { label: 'Based', value: SITE.location },
  { label: 'Status', value: 'Front-end, design & UX roles' },
];

/** The landing page's credential strip. */
export const CREDENTIALS: LabeledValue[] = [
  { label: 'Previously', value: 'Amazon Prime · AWS' },
  { label: 'Now', value: 'The CB Creative' },
  { label: 'Focus', value: 'Design systems · React · Accessibility' },
];

/** Add a résumé by dropping the PDF in public/ and listing it here. */
export const SOCIAL_LINKS: LinkItem[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thecaitburke' },
  { label: 'GitHub', href: 'https://github.com/TheCBCreative' },
];

export const CAPABILITIES: Capability[] = [
  {
    title: 'Interface Design',
    description:
      'Figma-to-code fluency — wireframes through high-fidelity UI, built to translate directly into shipped components.',
  },
  {
    title: 'Front-End Engineering',
    description:
      'Customer-facing front end at Amazon Prime (HTML, CSS, JavaScript, FreeMarker), including a feature that reached 30M+ customers, then React + TypeScript at AWS — accessible and performant.',
  },
  {
    title: 'Systems & Accessibility',
    description:
      'Reusable components for a shared design system, and accessibility checks built into the pipeline — not bolted on after.',
  },
  {
    title: 'AI-Assisted Development',
    description: 'Claude Code, daily — prototyping and shipping faster without cutting corners on quality.',
  },
];
