import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from './test/renderRoute';
import { CREDENTIALS, HERO_META, SITE } from './data/site';
import { PROJECTS } from './data/projects';

describe('landing page', () => {
  it('shows the name, tagline and credential strip', () => {
    renderRoute('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(SITE.name);
    expect(screen.getByText(SITE.landingTagline.emphasis)).toBeInTheDocument();
    for (const { value } of CREDENTIALS) expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Check it out' })).toHaveAttribute('href', '/home');
  });
});

describe('home page', () => {
  it('opens with the two-tone statement and the meta list', () => {
    renderRoute('/home');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(`${SITE.heroStatement.lead} ${SITE.heroStatement.emphasis}`);
    for (const { value } of HERO_META) expect(screen.getAllByText(value).length).toBeGreaterThan(0);
  });

  it('lists every project as a work row, in order', () => {
    renderRoute('/home');
    const work = document.getElementById('selected-work')!;
    const titles = within(work).getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(PROJECTS.map((p) => p.title));
  });
});

describe('unknown routes', () => {
  it('renders the 404 page for unknown paths and slugs', () => {
    for (const path of ['/nope', '/work/nope']) {
      const { unmount } = renderRoute(path);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("This page doesn't exist.");
      unmount();
    }
  });
});
