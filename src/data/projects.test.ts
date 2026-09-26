import { describe, expect, it } from 'vitest';
import { PROJECTS, getNextProject, getProject } from './projects';

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
});

describe('PROJECTS', () => {
  it('has unique slugs', () => {
    const slugs = PROJECTS.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
