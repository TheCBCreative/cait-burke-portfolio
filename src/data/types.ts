/** A heading whose second half is set in the accent italic. */
export interface Heading {
  lead: string;
  emphasis?: string;
}

/** An image, or a placeholder until `src` is set. */
export interface ImageSlot {
  src?: string;
  alt: string;
  caption?: string;
  /** CSS object-position for crops, e.g. "left top". */
  position?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface LabeledValue {
  label: string;
  value: string;
}

export interface Capability {
  title: string;
  description: string;
}

export interface CalloutContent {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface Stat {
  value: string;
  label: string;
}

/** A numbered design decision, keyed to a pin on the figure. */
export interface Decision {
  title: string;
  body: string;
}

/** A pin's center, as percentages of the figure's width and height. */
export interface Pin {
  x: number;
  y: number;
}

export type DesignFigure =
  | { kind: 'screenshot'; image: ImageSlot; pins: Pin[] }
  | { kind: 'brand-board' };

export interface ArchitectureNode {
  name: string;
  note: string;
  highlight?: boolean;
}

export interface CodeDecision extends Decision {
  code: string;
}

export interface Tradeoff extends Decision {
  tradeoff: string;
}

export interface CaseStudy {
  dek: string;
  role: string;
  stack: string;
  github: string;
  heroImage: ImageSlot;
  callout: CalloutContent;
  context: { heading: Heading; body: string; stats: Stat[]; statsNote: string };
  design: { heading: Heading; figure: DesignFigure; decisions: Decision[] };
  engineering: {
    heading: Heading;
    /** The main flow, drawn with arrows between nodes. */
    flow: ArchitectureNode[];
    /** Supporting services, set apart after the flow. */
    services: ArchitectureNode[];
    decisions: CodeDecision[];
    testing: string;
  };
  leftOut: { heading: Heading; intro: string; items: Tradeoff[] };
  breakImage: ImageSlot;
  outcome: { heading: Heading; body: string; proof: Stat; next: Decision[] };
}

/** One project: its row on the homepage and its case study page. */
export interface Project {
  slug: string;
  index: string; // "01"
  category: string; // "Admin UI · CMS"
  title: string;
  thumbnail: ImageSlot;
  /** Short muted clip of the real UI, played when the home row is hovered. */
  preview?: string;
  summary: string;
  highlights: { design: string[]; engineering: string[] };
  live: LinkItem;
  caseStudy: CaseStudy;
}

/** Quoted from a real recommendation; `source` says where it was published. */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  date: string;
  source: string;
}
