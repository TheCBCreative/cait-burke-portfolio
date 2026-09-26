# Cait Burke — Portfolio

The portfolio site of Cait Burke, a front-end engineer and designer. Live at **[caitburke.dev](https://caitburke.dev)**.

It's a small React single-page app: a full-screen landing page, a homepage (statement intro, selected work, about, a testimonial, contact) and a case study page for each project. The design lives in Figma first; tokens and layout here mirror the v2 comps.

## Stack

- React 19 + TypeScript, built with Vite
- React Router (data router, so links can use the View Transitions API)
- CSS Modules with design tokens (no CSS framework, no animation library)
- Vitest + Testing Library for unit and component tests
- [a11y-gate](https://www.npmjs.com/package/a11y-gate) for automated accessibility checks
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev          # local dev server
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build
npm run lint         # oxlint
npm test             # unit and component tests
npm run a11y         # axe-core audit of every route (build first)
```

## Project structure

```
src/
  data/          All site content: copy, projects, testimonials, shared types
  pages/         One component per route
  routes.tsx     The route table
  components/
    ui/          Reusable building blocks (Button, Reveal, TwoTone, EdgeTab, Lightbox…)
    layout/      Page chrome (PageContainer, Masthead, ContactFooter, SkipLink)
    sections/    Homepage sections (Hero, SelectedWork + WorkRow, About, Testimonial)
    case-study/  Case study sections (hero, demo band, stats, design and engineering
                 decisions, brand board, tradeoffs, outcome, next project)
    media/       The fern footage: FernClip, and FernBackground for full-bleed use
  hooks/         useReveal, useScrollLinked, useMediaQuery, useDocumentTitle, useScrollToHash
  styles/        tokens.css, global.css and shared CSS modules (typography, surfaces, scrollLinked)
  utils/         cx(), WCAG contrast math, scroll-motion math
  test/          Test setup and render helpers
public/
  images/        Screenshots and portrait, one folder per project
  media/         Fern footage, and optional hover preview clips for the work rows
```

### Routes

| Path          | Page                              |
| ------------- | --------------------------------- |
| `/`           | Landing splash                    |
| `/home`       | Homepage                          |
| `/work/:slug` | Case study (one template for all) |
| anything else | 404, over the fern footage        |

`vercel.json` rewrites every path to `index.html`, so direct links to any route work.

## Editing content

All text and links live in `src/data/`, so content changes don't touch components.

- **`site.ts`**: name, statements, bio, hero meta, landing credentials, capabilities, contact links
- **`projects.ts`**: every project. Array order sets the homepage order and each case study's "next project" link (the last wraps to the first).
- **`testimonials.ts`**: quotes from real recommendations, each with its source and date

Headings with an accent-italic second half are `{ lead, emphasis }` objects, rendered by `TwoTone`.

### Adding a project

1. Add screenshots to `public/images/<slug>/` (see [Images](#images)).
2. Add an entry to `PROJECTS` in `src/data/projects.ts`. TypeScript flags any missing fields. The `caseStudy` object holds the page, section by section: context and stats, design decisions with a figure (an annotated screenshot with pin positions in percent, or a custom component), engineering decisions with code, tradeoffs, a full-bleed break image and the outcome.
3. Add the new URL to `public/sitemap.xml`.

The home row, the case study page and the next-project link all come from that one entry. `npm test` checks the data: image paths, alt text, pin positions and https links.

### Adding a résumé

Drop the PDF in `public/` and add `{ label: 'Résumé', href: '/<file>.pdf' }` to `SOCIAL_LINKS` in `site.ts`.

## Images

- **Screenshots:** JPEG, at most 2400px wide, around 150KB. Heroes and break images are full-bleed and cropped with `object-fit: cover`; set `position` on the image to choose what stays in frame.
- **Home rows:** use the project's `thumbnail`, cropped to 4:3 from the top left.
- **Hover previews (optional):** a short, silent MP4 loop of the real UI, set as `preview` on the project. The row plays it on hover and focus, and shows a "Hover to preview" hint only when one exists.
- **Portrait:** `public/images/about/portrait.jpg`, 10:13, at least 800px wide.
- **Names:** lowercase and hyphenated, describing what's shown (`homepage.jpg`, `post-editor.jpg`).
- **`alt` text:** every image needs it in its data entry.

**Fern video:** H.264 MP4 with no audio, re-encoded with `-movflags +faststart` so it starts playing before it finishes downloading:

```bash
ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 28 -vf "scale=810:-2" -pix_fmt yuv420p -movflags +faststart mobile.mp4
```

Use `scale=810:-2` for the portrait (mobile) crop and leave the landscape one at its native width. Update the matching `.jpg` still frame too.

## Design system

`src/styles/tokens.css` defines every color, font size, spacing step and motion timing, and components read from those variables instead of hard-coding values. Display sizes are `clamp()`s that scale from the 390px mobile comp to the 1440px desktop comp. Shared text styles live in `typography.module.css`, and `surfaces.module.css` holds the section backgrounds, including the ink surface with its film grain.

Colors mirror the "Portfolio Colors" variables in the Figma file. Text colors meet WCAG AA contrast (4.5:1) on the background they sit on.

The CB Creative case study's brand board is a live component built from that studio's own tokens and fonts (loaded only on that page). Its contrast labels are calculated with `utils/contrast.ts`, not typed in.

## Motion

- **Entrances:** heroes play an entrance on load. Elements appear one after another, and display lines rise out of a mask (`entrance.ts`, `EntranceLines`).
- **Reveals:** everything else reveals once as it scrolls into view (`useReveal`, `Reveal`): `rise` for headings, `fade` for text, `wipe` for images.
- **Card to case study:** a project's home row image morphs into its case study hero with the View Transitions API (the two share a `view-transition-name`), while the page crossfades.
- **Scroll-linked images:** the full-bleed break image and the home row images drift and settle as they cross the viewport. The About portrait only settles from 1.04 to 1. Browsers with scroll-driven animations run it in CSS (`animation-timeline: view()`); others use `useScrollLinked`.
- **Fern edge strip:** as the hero scrolls away, the footage pans from its top to its base and a thin line grows down the strip.
- **One hover language:** boxed CTAs fill from the left, text links draw an underline from the left, and arrows nudge. Hover and keyboard focus behave the same.

With the reduced-motion setting turned on, all of this is off except the edge strip's line: content appears without animation, page changes are a short crossfade, and the fern video shows a still frame.

## Accessibility

- Semantic landmarks, one `h1` per page, labeled sections and a skip link
- A visible focus ring on every interactive element, in a lighter green on dark sections so it keeps 3:1 contrast
- The lightbox is a native `<dialog>`, so focus trapping, Escape and returning focus to the image are handled by the browser
- External links announce that they open in a new tab
- Decorative media (the fern footage, edge strips, figure pins) are hidden from assistive tech
- `npm run a11y` runs axe-core against every route with a11y-gate and fails on anything serious or critical. It audits with reduced motion so text isn't measured mid-fade. Config: `a11y.config.cjs`.

## Testing and CI

`npm test` runs Vitest in jsdom: data checks, the contrast and scroll-motion math, and component and route tests with Testing Library. On every push and pull request, GitHub Actions (`.github/workflows/ci.yml`) runs lint, tests, the production build and the accessibility audit.
