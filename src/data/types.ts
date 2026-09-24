/** An image, or a placeholder until `src` is set. */
export interface ImageSlot {
  src?: string;
  alt: string;
  caption?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface Capability {
  title: string;
  description: string;
}

export interface CaseStudyMeta {
  role: string;
  stack: string;
  links: LinkItem[];
}

export interface CalloutContent {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref?: string;
}

export interface SectionContent {
  eyebrow: string;
  heading: string;
  body: string;
}

/** One project: its card on the homepage and its case study page. */
export interface Project {
  slug: string;
  index: string; // "01"
  category: string; // "Admin UI · CMS"
  title: string;
  skills: string[];
  thumbnail: ImageSlot;
  summary: string;
  meta: CaseStudyMeta;
  callout: CalloutContent;
  heroImage: ImageSlot;
  sections: [SectionContent, SectionContent, SectionContent];
  imagePair: [ImageSlot, ImageSlot];
}

/** Quoted from a real recommendation; `source` says where it was published. */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  date: string;
  source: string;
}
