# Cait Burke — Portfolio

The portfolio site of Cait Burke, a designer and front-end engineer. Live at **[caitburke.dev](https://caitburke.dev)**.

It's a small React single-page app: a full-screen landing page, a homepage (intro, about, selected work, a testimonial, contact) and a case study page for each project.

## Stack

- React 19 + TypeScript, built with Vite
- React Router for pages
- CSS Modules with design tokens (no CSS framework)
- No animation library: scroll reveals use `IntersectionObserver` and CSS transitions
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Project structure

```
src/
  data/          All site content: copy, projects, testimonials, shared types
  pages/         One component per route
  components/
    ui/          Reusable building blocks (Button, Reveal, ImageFrame, Lightbox…)
    layout/      Page chrome (PageContainer, Masthead, ContactFooter, SkipLink)
    sections/    Homepage sections (Hero, About, SelectedWork, Testimonial)
    case-study/  Case study sections (hero, callout, figures, next-project nav)
    landing/     Landing page background
    media/       The fern video clip used across the site
  hooks/         useReveal, useMediaQuery, useDocumentTitle, useScrollToHash
  styles/        tokens.css (design tokens), global.css, shared CSS modules
  utils/         cx() for joining class names
public/
  images/        Case study screenshots, one folder per project
  media/fern/    Fern video and its still frames (desktop + mobile crops)
```

### Routes

| Path          | Page                                   |
| ------------- | -------------------------------------- |
| `/`           | Landing splash                         |
| `/home`       | Homepage                               |
| `/work/:slug` | Case study (one template for all)      |

`vercel.json` rewrites every path to `index.html`, so direct links to any route work.

## Editing content

All text and links live in `src/data/`, so content changes don't touch components.

- **`site.ts`**: name, taglines, bio, capabilities, contact links
- **`projects.ts`**: every project. Order in the array sets the homepage grid order and each case study's "next project" link.
- **`testimonials.ts`**: quotes from real recommendations, each with its source and date

### Adding a project

1. Add screenshots to `public/images/<slug>/` (see [Images](#images)).
2. Add an entry to `PROJECTS` in `src/data/projects.ts`. TypeScript will flag any missing fields.
3. Add the new URL to `public/sitemap.xml`.

The card, the case study page and the next-project link all come from that one entry.

## Images

- **Case study screenshots:** JPEG, at most 2400px wide, around 150KB. They open larger in a lightbox, so they need some resolution.
- **Card thumbnails:** a separate `*-thumb.jpg` at 1200px wide when the full screenshot is larger than that. Cards are cropped to 4:3 from the top left.
- **Names:** lowercase and hyphenated, describing what's shown (`homepage.jpg`, `brand-system.jpg`).
- **`alt` text:** every image needs it in its data entry. Captions are optional.

**Fern video:** H.264 MP4 with no audio, re-encoded with `-movflags +faststart` so it starts playing before it finishes downloading:

```bash
ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 28 -vf "scale=810:-2" -pix_fmt yuv420p -movflags +faststart mobile.mp4
```

Use `scale=810:-2` for the portrait (mobile) crop and leave the landscape one at its native width. Update the matching `.jpg` still frame too.

An image slot with no `src` renders a labeled placeholder of the same size, so a project can go live before its screenshots are ready.

## Design system

`src/styles/tokens.css` defines every color, font size, spacing step and motion timing, and components read from those variables instead of hard-coding values. Shared text styles (display, label) live in `src/styles/typography.module.css` and are pulled in with `composes`.

Colors mirror the "Portfolio Colors" variables in the Figma file. Text colors are chosen to meet WCAG AA contrast (4.5:1) on the background they sit on.

## Motion

- **Landing and page heroes** play an entrance on load: elements appear one after another, and display lines rise out of a mask (`components/ui/entrance.ts`, `EntranceLines`).
- **Everything else** reveals once as it scrolls into view, when its top reaches 15% up from the bottom of the viewport (`useReveal`, `Reveal`). There are three variants: `rise` for headings, `fade` for text, and `wipe` for images.
- A section can reveal all of its pieces on one shared trigger by passing `revealed` (see About and Testimonial).
- Clickable images zoom slightly on hover.

With the reduced-motion setting turned on, all of this is off: content appears without animation, and the fern video shows a still frame.

## Accessibility

- Semantic landmarks, one `h1` per page and a skip link
- A visible focus ring on every interactive element, in a lighter green on dark sections so it keeps 3:1 contrast
- The lightbox is a native `<dialog>`, so focus trapping, Escape and returning focus to the image are handled by the browser
- External links announce that they open in a new tab
- Decorative media (the fern clip, the edge tabs) are hidden from assistive tech
