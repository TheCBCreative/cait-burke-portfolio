import type { ImageSlot, Project } from './types';

const CB_MEDIA = '/media/work/the-cb-creative';

/** A screen recording from The CB Creative, with its still as the poster. */
const clip = (name: string, alt: string): ImageSlot => ({
  src: `${CB_MEDIA}/${name}.jpg`,
  video: `${CB_MEDIA}/${name}.mp4`,
  alt,
});

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
    thumbnail: { src: '/images/the-cb-creative/thumbnail.jpg', alt: 'The CB Creative studio site homepage' },
    preview: { video: `${CB_MEDIA}/card-flip.mp4`, poster: `${CB_MEDIA}/card-flip.jpg` },
    summary:
      "A solo design studio's brand and site, designed and built from the ground up — logo system, design system, and production code.",
    highlights: {
      design: ['Logo system, palette and type built from scratch', 'WCAG AA contrast across every page'],
      engineering: ['Pre-rendered React Router and TypeScript', 'Serverless contact form, covered by tests'],
    },
    live: { label: 'Live site', href: 'https://www.thecbcreative.com' },
    caseStudy: {
      dek: 'My own studio’s brand and website, designed and built from a blank page — identity, design system, content model and production code.',
      role: 'Brand, design & development, solo',
      stack: 'React Router (pre-rendered) · TypeScript · Tailwind v4 · Motion · Vercel · Resend',
      github: 'https://github.com/TheCBCreative/thecbcreative',
      heroImage: {
        src: '/images/the-cb-creative/homepage.jpg',
        video: `${CB_MEDIA}/hero-entrance.mp4`,
        alt: 'The CB Creative homepage: the hero lines clear in over misty forest footage',
        position: 'center top',
      },
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
          { value: '6', label: 'pages pre-rendered to static HTML — home, contact, three service pages and the 404' },
          { value: '100', label: 'Lighthouse accessibility score on every page tested, mobile and desktop' },
        ],
        statsNote: 'From the repo and PageSpeed Insights',
      },
      design: {
        heading: { lead: 'Earthy, editorial,', emphasis: 'and unmistakably human.' },
        figure: { kind: 'brand-board' },
        decisions: [
          {
            title: 'A palette from the fog line',
            body: 'Pine, Snow and Mist come from the forest footage behind the site, with Brass as the one warm accent. Brass itself is kept to lines, outlines and the button fill; text gets Brass Light on the video (8.8:1) and Brass Deep on cream (4.9:1), so every accent clears WCAG AA. Form errors use Rust at 6.3:1.',
          },
          {
            title: 'Four typefaces, four jobs',
            body: 'Italiana for the big display lines, Aboreto for small-caps eyebrows and the nav, Fraunces italic for the accent lines, and Work Sans for everything you read or tap.',
          },
          {
            title: 'Tokens from Figma, and nothing else',
            body: 'Every color, type size and opacity is a variable in the CB Tokens collection in Figma, mirrored one to one in the Tailwind theme. Tailwind’s own defaults are cleared, so a value that isn’t in Figma can’t be used in code. Email clients can’t read CSS variables, so the inquiry emails carry a copy of the same palette.',
          },
          {
            title: 'Answer the AI question',
            body: 'Small businesses are asking why they shouldn’t just use an AI site builder. A dedicated section answers plainly, including that I use AI tools every day and know when to put them down. The Custom Website page also explains AEO: building so ChatGPT and other AI assistants can find and recommend the business.',
          },
        ],
      },
      motion: {
        heading: { lead: 'Motion that', emphasis: 'guides the eye.' },
        intro:
          'Short loops recorded from the live site. Every movement points somewhere — to the nav, the next point, the next page — and all of it switches off with the system’s reduced-motion setting.',
        clips: [
          {
            title: 'The brand follows you down the page',
            body: 'The hero mark hands off to the nav logo as you scroll, after the button fills with Brass on hover.',
            media: clip('logo-handoff', 'The Let’s talk button filling with Brass, then the hero logo handing off to the nav on scroll'),
          },
          {
            title: 'An introduction that arrives in order',
            body: 'The headshot, then the 01–06 list, arrive one at a time as the section comes into view.',
            media: clip('about-reveal', 'The About section revealing the headshot, then its six points one at a time'),
          },
          {
            title: '“Average,” crossed out as you read it',
            body: 'The line through “average” draws in as the word takes focus, and undraws on the way back up.',
            media: clip('average-strike', 'A line drawing through the word average as the page scrolls'),
          },
          {
            title: 'Browse services without losing your place',
            body: 'Next moves through the three service pages; Close flips back to the card you opened.',
            media: clip('service-next-close', 'Moving through the three service pages, then closing back to the service cards'),
          },
        ],
      },
      engineering: {
        heading: { lead: 'Pre-rendered pages,', emphasis: 'app-like motion.' },
        flow: [
          { name: 'Data files', note: 'copy & services' },
          { name: 'React Router', note: 'pre-renders', highlight: true },
          { name: '6 pages', note: '+ sitemap, llms.txt' },
          { name: 'Static HTML', note: 'what loads' },
        ],
        services: [
          { name: 'API route', note: 'gets the form' },
          { name: 'Resend', note: 'emails me' },
        ],
        decisions: [
          {
            title: 'Pre-rendered, no server',
            body: 'React Router builds every page to static HTML at deploy time, so visitors get finished pages from the CDN and React takes over for the motion. The same build step writes the sitemap, robots.txt and an llms.txt summary for AI crawlers from the same service data the pages use, so they can’t drift apart.',
            code: `const PAGES = ['/', '/contact',
  ...SERVICES.map((s) => \`/services/\${s.slug}\`)];

export default {
  ssr: false,
  prerender: [...PAGES, '/404'],
};`,
          },
          {
            title: 'A video loop with no visible seam',
            body: 'The mountain footage plays behind every page, and a plain loop jumps where it restarts. So two copies take turns: near the end of one, the other starts from the top and crossfades in over 2.5 seconds. Only the first copy downloads up front, phones get a smaller portrait cut with its own poster, and reduced motion shows the still.',
            code: `if (current.duration - current.currentTime
    > VIDEO_CROSSFADE + VIDEO_LEAD) return;
next.currentTime = 0;
next.play();`,
          },
          {
            title: 'The card that becomes the page',
            body: 'Each service card turns over to its cream back, then grows to fill the screen before the service page takes over. Close runs it in reverse and puts keyboard focus back on the card. With reduced motion, it’s a plain page change.',
            code: `// Card → page: turn over, then grow.
export const FLIP = {
  turn: 0.5, grow: 0.6, perspective: 1600,
};`,
            media: clip('card-flip', 'A service card turning over and growing into the Custom Website page'),
          },
          {
            title: 'Spam protection that can’t be skipped',
            body: 'The form carries a hidden field real people never see, plus how long it was open before sending. A bot can skip the page and post straight to the server, so that’s where both are checked. When it catches one, it pretends the message went through, so the bot doesn’t try again.',
            code: `const HONEYPOT_FIELD = 'website';
const MIN_SUBMIT_ELAPSED_MS = 1500;
const MAX_TOTAL_ATTACHMENT_BYTES =
  3.5 * 1024 * 1024;`,
            media: clip('send-to-thank-you', 'Sending the contact form, then the thank-you card filling its place'),
          },
        ],
        testing:
          'The contact form’s server code has 18 tests (63 assertions) in Vitest, and a11y-gate — an accessibility checker I built and published on npm — crawls every page on each push. It checks each one at desktop, mobile and a 320px reflow width, opens menus and modals, tests for keyboard traps and visible focus, and blocks anything serious.',
      },
      leftOut: {
        heading: { lead: 'Smaller on purpose.' },
        intro: 'Every one of these was a choice, not a gap — and each has a clear trigger for when it changes.',
        items: [
          {
            title: 'Not zero JavaScript',
            body: 'The motion runs on React and Motion: the card flip, the logo handoff from hero to nav, and the strike drawn through “average” as you scroll. That’s about 180 KB of JavaScript, compressed. The pages are pre-rendered, so the content arrives as HTML, and the scripts add 0 ms of blocking time on every page tested.',
            tradeoff: 'It’s more to download than the plain-HTML version was, so the next step is a size budget in CI.',
          },
          {
            title: 'No big file uploads',
            body: 'People can attach screenshots of sites they love, but only up to 3.5 MB in total. The host rejects anything over 4.5 MB before my code even runs, so I set the limit lower and show a friendly message instead of a blank error.',
            tradeoff: 'Large files can’t come through the form — so it has a separate field for helpful links, and people can share bigger files that way.',
          },
          {
            title: 'No extra packages on the server',
            body: 'The contact form’s server code uses zero third-party packages — just the web’s built-in form handling and a direct call to the email service. Less to install, less to go out of date, and nothing extra to vet for security.',
            tradeoff: 'If the email service changes how it works, I update my code by hand instead of installing a newer package.',
          },
        ],
      },
      breakImage: clip('closing-cta-to-contact', 'The closing call to action leading into the contact page'),
      outcome: {
        heading: { lead: 'A site that does', emphasis: 'its own pitching.' },
        body: 'The site is live and it’s the link in every piece of outreach I send. It’s also how I build now: design in Figma variables, the same tokens in code, pre-rendered pages and a small, tested backend — the same approach I bring to client work.',
        proof: {
          value: '1 day',
          label: 'Designed in Figma and rebuilt in React Router and TypeScript, from a new brand to a live site.',
        },
        next: [
          {
            title: 'A performance budget in CI',
            body: 'Fail the build if a page’s JavaScript or media grows past a set size, the same way a11y-gate already fails it on accessibility issues.',
          },
          {
            title: 'FAQ schema',
            body: 'Services and breadcrumbs are already marked up. The Why not AI answers could be marked up as an FAQ, so AI assistants can quote them directly.',
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
