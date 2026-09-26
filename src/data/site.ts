import type { Capability, Heading, LabeledValue, LinkItem } from './types';

export const SITE = {
  name: 'Cait Burke',
  roleTagline: 'Design + Front-End Engineering',
  location: 'Greater Seattle Area',
  availability: 'Available for work',
  status: 'Open to design + frontend roles',
  stackSummary: 'Figma · React · TypeScript · Node.js',
  aiSummary: 'Claude Code · Figma AI',

  landingTagline: { lead: 'Design that holds up.', emphasis: 'Code that ships.' } satisfies Heading,

  heroLede:
    'Building thoughtful, user-centered interfaces at the intersection of design and front-end engineering.',
  heroBio:
    "I'm a designer and frontend developer with 5 years at Amazon, building user-focused web experiences in React and TypeScript — partnering closely with UX and product teams to turn complex requirements into interfaces that feel simple. I'm especially drawn to the intersection of design and engineering: designing in Figma and translating that work directly into production code. Outside of that, I run The CB Creative and use Claude Code daily to move from concept to shipped fast.",

  aboutHeadingLead: 'I design in Figma —',
  aboutHeadingEmphasis: 'then build it in code.',

  contactHeading: 'Currently open to design + frontend roles.',

  footerTagline: 'Design · Development · Accessibility-minded',
} as const;

/** The landing page's credential strip. */
export const CREDENTIALS: LabeledValue[] = [
  { label: 'Previously', value: 'Amazon Prime · AWS' },
  { label: 'Now', value: 'The CB Creative' },
  { label: 'Focus', value: 'Design systems · React · Accessibility' },
];

export const SOCIAL_LINKS: LinkItem[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thecaitburke' },
  { label: 'GitHub', href: 'https://github.com/TheCBCreative' },
  { label: 'Email', href: 'mailto:hello@caitburke.dev' },
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
      'Production React and TypeScript, shipped at scale at Amazon and AWS — accessible and performant.',
  },
  {
    title: 'Systems & Accessibility',
    description:
      'Reusable component libraries and WCAG-audited, accessibility-minded builds — not bolted on after.',
  },
  {
    title: 'AI-Assisted Development',
    description:
      'Claude Code, daily — prototyping and shipping faster without cutting corners on quality.',
  },
];
