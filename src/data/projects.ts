import type { Project } from './types';

/** In display order: the home grid, and each case study's "next project" link. */
export const PROJECTS: Project[] = [
  {
    slug: 'blog-composer',
    index: '01',
    category: 'Admin UI · CMS',
    title: 'Blog Composer',
    skills: ['Design', 'Development'],
    thumbnail: { src: '/images/blog-composer/dashboard.jpg', alt: 'Blog Composer admin dashboard', position: 'left top' },
    summary: "A self-hosted, themeable blog admin that slots into any client site — so publishing doesn't mean wrestling a bloated platform.",
    highlights: {
      design: ['Admin UI themed with each client’s own design tokens', 'Editor, media library and scheduling flows'],
      engineering: ['Framework-agnostic TypeScript core, running on Astro', 'Better-Auth sessions, server-side sanitizing'],
    },
    live: { label: 'Live demo', href: 'https://www.caitburke.dev/work/blog-composer/demo' },
    meta: {
      role: 'Design & development, solo',
      stack: 'TypeScript · Astro · Neon Postgres · Better-Auth · Resend',
      links: [
        { label: 'View on GitHub →', href: 'https://github.com/TheCBCreative/blog-admin' },
      ],
    },
    callout: {
      eyebrow: 'Live demo',
      heading: 'See it running, not just described.',
      body: 'A seeded demo — no real client data. Click around the dashboard and the publishing flow yourself.',
      buttonLabel: 'Try the live demo →',
      buttonHref: 'https://www.caitburke.dev/work/blog-composer/demo',
    },
    heroImage: {
      src: '/images/blog-composer/dashboard.jpg',
      alt: 'Blog Composer dashboard overview',
      caption: 'Fig. 01 — Dashboard overview',
    },
    sections: [
      {
        eyebrow: '01 — The context',
        heading: 'Getting found mattered more than getting online.',
        body: "Through The CB Creative, I was building every site with AEO — answer engine optimization — in mind, since getting found today means showing up in AI-generated answers, not just search results. A blog is one of the easiest, highest-leverage things you can add to improve a site's AEO: businesses that blog see 55% more website traffic, and B2B companies publishing blog content generate 67% more leads than those that don't (HubSpot, Fundera). So I designed a way to implement one that I could drop into any site I build, rather than bolting together a one-off blog for every client.",
      },
      {
        eyebrow: '02 — The approach',
        heading: 'Self-hosted, themeable, and built to be reused.',
        body: 'Blog Composer is a self-hosted admin built in TypeScript, with Postgres (via Neon) for storage, better-auth handling authentication, and Resend for transactional email. The post body runs through a rich-text editor, sanitized server-side before anything is stored. Every piece was chosen to be simple to host and easy to theme, so the same admin can sit behind different client brands without a rebuild.',
      },
      {
        eyebrow: '03 — The outcome',
        heading: 'A CMS layer I can hand off, not maintain forever.',
        body: "The result is a lightweight publishing tool that's genuinely reusable — the foundation for how The CB Creative will handle content management across future client work, instead of custom-building a CMS for every new site.",
      },
    ],
    imagePair: [
      {
        src: '/images/blog-composer/post-editor.jpg',
        alt: 'Blog Composer post editor with rich-text formatting',
        caption: 'Fig. 02 — Post editor',
      },
      {
        src: '/images/blog-composer/media-library.jpg',
        alt: 'Blog Composer media library',
        caption: 'Fig. 03 — Media library',
      },
    ],
  },
  {
    slug: 'the-cb-creative',
    index: '02',
    category: 'Brand · Studio Site',
    title: 'The CB Creative',
    skills: ['Branding', 'Design', 'Development'],
    thumbnail: {
      src: '/images/the-cb-creative/homepage.jpg',
      alt: 'The CB Creative studio site homepage',
      position: 'left top',
    },
    summary: "A solo design studio's brand and site, designed and built from the ground up — logo system, design system, and production code.",
    highlights: {
      design: ['Logo system, palette and type built from scratch', 'WCAG AA contrast across every page'],
      engineering: ['Custom static site generator in Node', 'Serverless contact form, covered by tests'],
    },
    live: { label: 'Live site', href: 'https://www.thecbcreative.com' },
    meta: {
      role: 'Brand & web design/development, solo',
      stack: 'Node.js · Custom static site generator · Vercel',
      links: [
        { label: 'View on GitHub →', href: 'https://github.com/TheCBCreative/thecbcreative' },
      ],
    },
    callout: {
      eyebrow: 'Live site',
      heading: 'See it live, not just described.',
      body: 'The actual production site — brand, layout, and code all built and deployed by me.',
      buttonLabel: 'View live site →',
      buttonHref: 'https://www.thecbcreative.com',
    },
    heroImage: {
      src: '/images/the-cb-creative/homepage.jpg',
      alt: 'The CB Creative homepage',
      caption: 'Fig. 01 — Homepage',
    },
    sections: [
      {
        eyebrow: '01 — The context',
        heading: 'A studio needed a brand before it could pitch one.',
        body: "After leaving corporate UX work, I wanted a studio of my own — but a design studio's website is also its first pitch. Before I could take on client work, I needed a brand and a site that actually looked like the craft I was offering to sell.",
      },
      {
        eyebrow: '02 — The approach',
        heading: 'A full identity system, built by hand — not templated.',
        body: 'The site runs on a custom static site generator I built from scratch in vanilla JavaScript on Node — no framework, no page builder. Pages are composed from reusable sections (hero, services, testimonials, a "why work with a human, not AI" section, and more), each rendered from a single content schema so copy and structure stay easy to update without duplicating markup. A serverless function handles contact form submissions, covered by automated tests, all deployed on Vercel.',
      },
      {
        eyebrow: '03 — The outcome',
        heading: 'A site that does its own pitching now.',
        body: "The site holds WCAG AA contrast throughout and now functions as the studio's actual sales tool — the thing that turns cold outreach into signed work. It's also proof, for my own job search, that I can take a brand from a blank page to a shipped, accessible, production site entirely on my own.",
      },
    ],
    imagePair: [
      {
        src: '/images/the-cb-creative/brand-system.jpg',
        alt: 'The CB Creative brand system — logo, palette, and typefaces',
        caption: 'Fig. 02 — Brand system',
      },
      {
        src: '/images/the-cb-creative/contact-section.jpg',
        alt: 'The CB Creative contact section',
        caption: 'Fig. 03 — Contact section',
      },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);

/** The project after this one, or undefined for the last. */
export const getNextProject = (slug: string) => {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[index + 1];
};
