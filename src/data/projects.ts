import type { Project } from './types';

/** In display order: the home rows, and each case study's "next project" link. */
export const PROJECTS: Project[] = [
  {
    slug: 'blog-composer',
    index: '01',
    category: 'Admin UI · CMS',
    title: 'Blog Composer',
    thumbnail: { src: '/images/blog-composer/dashboard.jpg', alt: 'Blog Composer admin dashboard', position: 'left top' },
    summary:
      "A self-hosted, themeable blog admin that slots into any client site — so publishing doesn't mean wrestling a bloated platform.",
    highlights: {
      design: ['Admin UI themed with each client’s own design tokens', 'Editor, media library and scheduling flows'],
      engineering: ['Framework-agnostic TypeScript core, running on Astro', 'Better-Auth sessions, server-side sanitizing'],
    },
    live: { label: 'Live demo', href: 'https://www.caitburke.dev/work/blog-composer/demo' },
    caseStudy: {
      dek: "A self-hosted, themeable blog admin built to slot into any client site — so publishing doesn't mean wrestling a bloated platform.",
      role: 'Design & development, solo',
      stack: 'TypeScript · Astro · Neon Postgres · Better-Auth · Resend',
      github: 'https://github.com/TheCBCreative/blog-admin',
      heroImage: { src: '/images/blog-composer/dashboard.jpg', alt: 'Blog Composer dashboard overview', position: 'left top' },
      callout: {
        eyebrow: 'Live demo',
        heading: 'See it running, not just described.',
        body: 'Anyone can try it — your changes stay private to you and reset after two hours. Click around the dashboard and the publishing flow yourself.',
        buttonLabel: 'Try the live demo',
        buttonHref: 'https://www.caitburke.dev/work/blog-composer/demo',
      },
      context: {
        heading: { lead: 'Getting found mattered', emphasis: 'more than getting online.' },
        body: 'Through The CB Creative, I was building every site with AEO — answer engine optimization — in mind. A blog is one of the highest-leverage things a small business can add, so I designed one I could drop into any site I build, instead of bolting together a one-off for every client.',
        stats: [
          { value: '45%', label: 'of US consumers used AI tools to find local businesses in the past year — up from 6%' },
          { value: '4.4×', label: 'higher conversion rate from AI-search visitors than from traditional search' },
        ],
        statsNote: 'Sources: BrightLocal 2026, Semrush 2025',
      },
      design: {
        heading: { lead: 'One admin,', emphasis: 'every client’s brand.' },
        figure: {
          kind: 'screenshot',
          image: {
            src: '/images/blog-composer/post-editor.jpg',
            alt: 'Blog Composer post editor: the post body on the left, settings in a side column, and Preview, Save Draft, Schedule and Publish buttons',
          },
          aspectRatio: '1636 / 1500',
          pins: [
            { x: 40, y: 70 },
            { x: 71.8, y: 94.5 },
            { x: 66, y: 3.5 },
            { x: 74.1, y: 71.9 },
          ],
        },
        decisions: [
          {
            title: 'Content first, chrome second',
            body: 'The editor gives the post body the width; settings live in a quieter side column so writing never competes with configuration.',
          },
          {
            title: 'Publishing takes a deliberate click',
            body: 'Save, Schedule and Publish are separate buttons, and the date only counts when you press Schedule. Every post’s status shows as a colored badge, so nothing goes live by accident.',
          },
          {
            title: 'Built from the client’s own tokens',
            body: 'On a client site, the admin uses that site’s existing color, type and spacing tokens instead of a separate set of styles — so it feels like part of their brand, not a bolted-on tool.',
          },
          {
            title: 'Alt text isn’t optional',
            body: 'If a post has a featured image, it can’t be saved without alt text. Accessibility is enforced by the form, not left to memory.',
          },
        ],
      },
      engineering: {
        heading: { lead: 'Built to be swapped,', emphasis: 'not rewritten.' },
        flow: [
          { name: 'Client site', note: 'Astro site' },
          { name: 'Blog Composer', note: 'admin + service', highlight: true },
          { name: 'PostStore', note: 'storage interface' },
          { name: 'Neon adapter', note: 'Postgres today' },
        ],
        services: [
          { name: 'Better-Auth', note: 'sessions + guard' },
          { name: 'Resend', note: 'reset email' },
        ],
        decisions: [
          {
            title: 'Swap the database, keep everything else',
            body: "Nothing in the app talks to the database directly — it all goes through one small storage contract. If a client ever needs something other than Neon, I write one new adapter and the rest of the app doesn't change.",
            code: `interface PostStore {
  list(opts?): Promise<Post[]>;
  listLive(now): Promise<Post[]>;
  get(id): Promise<Post | null>;
}`,
          },
          {
            title: 'Never trust the editor',
            body: "Whatever comes out of the rich-text editor gets cleaned on the server before it's saved. Only an approved list of tags and link types gets through, so a pasted script or sketchy link never reaches the database.",
            code: `sanitizeHtml(dirty, {
  allowedTags: [...ALLOWED_TAGS],
  allowedSchemes: ['http', 'https',
    'mailto', 'tel'],
});`,
          },
          {
            title: "The login limit that wasn't",
            body: 'Testing the login limit, I noticed I could retry right away. Postgres was handing timestamps back as text, so adding the time window glued strings together instead of doing math. One line fixed it — and now the limit actually holds.',
            code: `// read bigint as a number, not text
types.setTypeParser(20,
  (value) => Number(value));`,
          },
          {
            title: 'A public demo nobody can break',
            body: 'Everyone who tries the demo signs in as the same account, so each browser gets its own private sandbox. Editing a sample post saves your own copy, deleting one only hides it for you, and the server refuses to change the originals. Two hours later, it all resets.',
            code: `if (isSeedPost(post.tags)) {
  // copy-on-write: the original never changes
  return base.create({ ...post, ...input });
}`,
          },
        ],
        testing:
          '252 unit tests across the package and 11 for the demo’s visitor sandbox run on every push, plus integration tests against a real Neon database. Client sites install tagged, versioned releases, so nothing changes on a live site until I upgrade it.',
      },
      leftOut: {
        heading: { lead: 'Smaller on purpose.' },
        intro: 'Every one of these was a choice, not a gap — and each has a clear trigger for when it changes.',
        items: [
          {
            title: 'A writing tool, not a page builder',
            body: 'Posts get headings, lists, quotes and links — not drag-and-drop layouts. Every post drops cleanly into each client’s design, and there’s far less HTML to sanitize.',
            tradeoff: 'Clients can’t build one-off layouts inside a post. For a small-business blog, that’s a feature.',
          },
          {
            title: 'One database per site, not a shared platform',
            body: 'Each client’s posts live in their own database. No chance of one client seeing another’s content, and a site can leave without a migration project.',
            tradeoff:
              'Fixes don’t reach every site automatically. Each site is pinned to a tagged release and upgrades when I bump its version — slower, but nothing changes on a client’s site by surprise.',
          },
          {
            title: 'One admin to start',
            body: 'Sign-up is off by default. Most small businesses have one person publishing, and a closed door is safer than an open one.',
            tradeoff: 'A client with a team needs roles and invites — also on the next list.',
          },
        ],
      },
      breakImage: {
        src: '/images/blog-composer/media-library.jpg',
        alt: 'Blog Composer media library: a grid of photos, four across, each with its size, a copy-URL button and a delete button',
        position: 'left top',
      },
      outcome: {
        heading: { lead: 'A CMS layer I can hand off,', emphasis: 'not maintain forever.' },
        body: 'A lightweight publishing tool built to be reused — each new client site gets a tested admin instead of a CMS built from scratch.',
        proof: { value: '~1 day', label: 'Integrated and themed for a client site in about a day.' },
        next: [
          {
            title: 'Built-in AEO',
            body: 'Structured data, RSS and sitemap entries generated for every published post — so each one is findable without extra setup.',
          },
          {
            title: 'Roles and invites',
            body: "An Editor role and email invites, so a client's own team can publish without full admin access.",
          },
          { title: 'Shareable previews', body: 'A private link to an unpublished draft that a client can review before it goes live.' },
          {
            title: 'A ready-made media plug-in',
            body: 'Ship the R2/S3 storage glue with the package, so a new install only needs a bucket name and keys.',
          },
        ],
      },
    },
  },
  {
    slug: 'the-cb-creative',
    index: '02',
    category: 'Brand · Studio Site',
    title: 'The CB Creative',
    thumbnail: { src: '/images/the-cb-creative/homepage.jpg', alt: 'The CB Creative studio site homepage', position: 'left top' },
    summary:
      "A solo design studio's brand and site, designed and built from the ground up — logo system, design system, and production code.",
    highlights: {
      design: ['Logo system, palette and type built from scratch', 'WCAG AA contrast across every page'],
      engineering: ['Custom static site generator in Node', 'Serverless contact form, covered by tests'],
    },
    live: { label: 'Live site', href: 'https://www.thecbcreative.com' },
    caseStudy: {
      dek: 'My own studio’s brand and website, designed and built from a blank page — identity, design system, content model and production code.',
      role: 'Brand, design & development, solo',
      stack: 'Vanilla JavaScript · Custom static site generator · Tailwind v4 · Vercel · Resend',
      github: 'https://github.com/TheCBCreative/thecbcreative',
      heroImage: { src: '/images/the-cb-creative/homepage.jpg', alt: 'The CB Creative homepage', position: 'left top' },
      callout: {
        eyebrow: 'Live site',
        heading: 'See it live, not just described.',
        body: 'The production site — brand, layout and code, all designed, built and deployed by me.',
        buttonLabel: 'View live site',
        buttonHref: 'https://www.thecbcreative.com',
      },
      context: {
        heading: { lead: 'A studio needed a brand', emphasis: 'before it could pitch one.' },
        body: 'After Amazon Prime and AWS, I started The CB Creative to design and build websites for small businesses. A studio’s own site is its first pitch — every cold email I send links to it — so it had to show the craft I was selling before I had a single client project to point to.',
        stats: [
          { value: '4', label: 'pages — home, contact, portfolio and thank-you — built from one content file' },
          { value: '7', label: 'reusable sections, each rendered from a shared template' },
        ],
        statsNote: 'From the repo',
      },
      design: {
        heading: { lead: 'Earthy, editorial,', emphasis: 'and unmistakably human.' },
        figure: { kind: 'brand-board' },
        decisions: [
          {
            title: 'A palette from the Pacific Northwest',
            body: 'Cream paper, near-black ink and two greens — forest for accents on light, sage on dark. Every pairing is checked to WCAG AA; even the form’s error red is 7.5:1 on cream.',
          },
          {
            title: 'Three typefaces, three jobs',
            body: 'Playfair Display for headlines, Cormorant Garamond italic for accents and quote marks, Geist for everything you read or tap. One italic word per headline carries the voice.',
          },
          {
            title: 'One file of brand tokens',
            body: 'Every color, font and spacing value is defined once, in one file, and every page reads from it. Email clients can’t load stylesheets, so the inquiry emails carry a copy of the same values.',
          },
          {
            title: 'Answer the AI question',
            body: 'Small businesses are asking why they shouldn’t just use an AI site builder. A dedicated section answers plainly — including that I use AI tools every day and know where they fall short.',
          },
        ],
      },
      engineering: {
        heading: { lead: 'No framework,', emphasis: 'by choice.' },
        flow: [
          { name: 'content.json', note: 'all the copy' },
          { name: 'build.js', note: 'builds pages', highlight: true },
          { name: '7 sections', note: 'page blocks' },
          { name: 'Static HTML', note: 'what loads' },
        ],
        services: [
          { name: 'API route', note: 'gets the form' },
          { name: 'Resend', note: 'emails me' },
        ],
        decisions: [
          {
            title: 'A tiny page builder I wrote myself',
            body: 'Instead of using a framework like React, I wrote a small template engine (136 lines) that pours the site’s copy into reusable page sections. It only does three things — fill in text, repeat a block, show or hide a block — which is all this site needs. It escapes text by default, so a stray character in the copy can’t break the page.',
            code: `{{#each faq}}
  <h3>{{question}}</h3>
  <p>{{answer}}</p>
{{/each}}`,
          },
          {
            title: 'Spam protection that can’t be skipped',
            body: 'The form blocks bots in the browser with a hidden field real people never see and a minimum time to fill it out. But a bot can skip the page and send data straight to the server, so the server runs the same checks again. When it catches one, it pretends the message went through — so the bot doesn’t try again.',
            code: `const HONEYPOT_FIELD = 'website';
const MIN_SUBMIT_ELAPSED_MS = 1500;
const MAX_TOTAL_ATTACHMENT_BYTES =
  3.5 * 1024 * 1024;`,
          },
          {
            title: 'The bug that only showed up live',
            body: 'The contact form worked on my laptop but failed once it was deployed. The cause was a pair of quotation marks: my local settings file needs them around the sender’s email address and removes them automatically, but the hosting dashboard kept them — and the email service rejected the address. The code now strips extra quotes, so the setting works in both places.',
            code: `// "Name <a@b.com>" → Name <a@b.com>
raw.trim().replace(
  /^(["'])([\\s\\S]*)\\1$/, '$2');`,
          },
        ],
        testing:
          'The contact form has 60 automated checks, and a11y-gate — an accessibility checker I built and published on npm — scans every page on each push and blocks anything serious. Current result: no serious or critical issues on any of the four pages.',
      },
      leftOut: {
        heading: { lead: 'Smaller on purpose.' },
        intro: 'Every one of these was a choice, not a gap — and each has a clear trigger for when it changes.',
        items: [
          {
            title: 'No framework',
            body: 'A marketing site with seven sections doesn’t need React. Pages are plain HTML and CSS, so they load fast and there’s no extra JavaScript for visitors to download.',
            tradeoff: 'Anything interactive has to be written by hand. If the site ever needs app-like features, that’s when I’d move it to a framework.',
          },
          {
            title: 'No big file uploads',
            body: 'People can attach screenshots of sites they love, but only up to 3.5 MB in total. The host rejects anything over 4.5 MB before my code even runs, so I set the limit lower and show a friendly message instead of a blank error.',
            tradeoff: 'Large files can’t come through the form — so it has a separate field for inspiration links, and people can share bigger files that way.',
          },
          {
            title: 'No extra packages on the server',
            body: 'The contact form’s server code uses zero third-party packages — just the web’s built-in form handling and a direct call to the email service. Less to install, less to go out of date, and nothing extra to vet for security.',
            tradeoff: 'If the email service changes how it works, I update my code by hand instead of installing a newer package.',
          },
        ],
      },
      breakImage: {
        src: '/images/the-cb-creative/contact-section.jpg',
        alt: 'The CB Creative contact section with the inquiry form',
      },
      outcome: {
        heading: { lead: 'A site that does', emphasis: 'its own pitching.' },
        body: 'The site is live and it’s the link in every piece of outreach I send. It’s also how I build now: one content file, reusable sections and a small, tested backend — the same approach I bring to client work.',
        proof: {
          value: '2 days',
          label: 'From an empty repo to a working site with a live contact form, then refined over the next three weeks.',
        },
        next: [
          {
            title: 'A performance budget in CI',
            body: 'Fail the build if a page gets too heavy or too slow, the same way a11y-gate already fails it on accessibility issues.',
          },
          {
            title: 'FAQ and service schema',
            body: 'The site already publishes ProfessionalService data; the Why not AI answers and each service could be marked up too, so AI assistants can quote them directly.',
          },
          { title: 'Responsive images in the build', body: 'Generate sizes and modern formats at build time instead of exporting them by hand.' },
          { title: 'Visual regression tests', body: 'Screenshot the key pages in CI so a CSS change can’t quietly break a section.' },
        ],
      },
    },
  },
];

export const getProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);

/** The project after this one, or undefined for the last. */
export const getNextProject = (slug: string) => {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return index === -1 ? undefined : PROJECTS[index + 1];
};
