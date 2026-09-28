import { describe, expect, it } from 'vitest';
import { PROJECTS, getNextProject, getProject } from './projects';

const PUBLIC_FILES = new Set(Object.keys(import.meta.glob('/public/**/*.{jpg,png,svg,mp4}')).map((path) => path.slice('/public'.length)));
const existsInPublic = (path?: string) => path !== undefined && PUBLIC_FILES.has(path);

describe('getProject', () => {
  it('finds a project by slug', () => {
    expect(getProject('blog-composer')?.title).toBe('Blog Composer');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProject('nope')).toBeUndefined();
  });
});

describe('getNextProject', () => {
  it('returns the project after the current one', () => {
    expect(getNextProject(PROJECTS[0].slug)).toBe(PROJECTS[1]);
  });

  it('returns undefined after the last project', () => {
    expect(getNextProject(PROJECTS[PROJECTS.length - 1].slug)).toBeUndefined();
  });

  it('returns undefined for an unknown slug', () => {
    expect(getNextProject('nope')).toBeUndefined();
  });
});

describe.each(PROJECTS)('$title data', (project) => {
  const study = project.caseStudy;

  it('points every image and clip at a file in public/, with alt text', () => {
    const clips = [...(study.motion?.clips ?? []), ...study.engineering.decisions].flatMap(({ media }) => media ?? []);
    for (const image of [project.thumbnail, study.heroImage, study.breakImage, ...clips]) {
      expect(existsInPublic(image.src)).toBe(true);
      if (image.video) expect(existsInPublic(image.video)).toBe(true);
      expect(image.alt.length).toBeGreaterThan(0);
    }
    if (project.preview) expect(existsInPublic(project.preview)).toBe(true);
  });

  it('keeps figure pins on the figure and one decision per pin', () => {
    const { figure, decisions } = study.design;
    if (figure.kind !== 'screenshot') return;
    expect(figure.pins.length).toBeLessThanOrEqual(decisions.length);
    for (const pin of figure.pins) {
      expect(pin.x).toBeGreaterThanOrEqual(0);
      expect(pin.x).toBeLessThanOrEqual(100);
      expect(pin.y).toBeGreaterThanOrEqual(0);
      expect(pin.y).toBeLessThanOrEqual(100);
    }
  });

  it('links out over https', () => {
    for (const href of [project.live.href, study.github, study.callout.buttonHref]) {
      expect(href).toMatch(/^https:\/\//);
    }
  });
});

describe('PROJECTS', () => {
  it('has unique slugs and indexes', () => {
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((p) => p.index)).size).toBe(PROJECTS.length);
  });
});
