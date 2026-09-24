/**
 * Shared content types. Keeping these in one place means every page reads
 * project/case-study content through the same shape, so adding a new
 * project later is a data change, not a component change.
 */

/** A single image slot. `src` is left undefined until real screenshots are
 * ready — components render a placeholder in that case, but always render
 * `alt` so the page stays meaningful to screen readers either way. */
export interface ImageSlot {
  src?: string;
  alt: string;
  caption?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

/** One "Selected Work" card on the homepage. */
export interface ProjectSummary {
  slug: string;
  index: string; // display index, e.g. "01"
  title: string;
  tag: string; // short category line, e.g. "Admin UI · CMS"
  skills: string[]; // what kind of work this demonstrates, e.g. ["Design", "Development"]
  thumbnail: ImageSlot;
}

export interface CaseStudyMeta {
  role: string;
  stack: string;
  links: LinkItem[];
}

export interface CaseStudyCallout {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref?: string;
  note?: string;
  noteHref?: string;
}

export interface CaseStudySection {
  eyebrow: string;
  heading: string;
  body: string;
}

export interface CaseStudyContent {
  slug: string;
  index: string;
  category: string;
  title: string;
  dek: string;
  meta: CaseStudyMeta;
  callout: CaseStudyCallout;
  heroImage: ImageSlot;
  sections: [CaseStudySection, CaseStudySection, CaseStudySection];
  imagePair: [ImageSlot, ImageSlot];
  nextProjectSlug: string;
}
