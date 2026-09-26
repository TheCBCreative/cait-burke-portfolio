import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '../test/renderRoute';
import { PROJECTS, getNextProject } from '../data/projects';

describe.each(PROJECTS)('$title case study', (project) => {
  it('renders every section in order', () => {
    renderRoute(`/work/${project.slug}`);
    const headings = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    const study = project.caseStudy;
    expect(headings).toEqual([
      study.callout.heading,
      ...[study.context, study.design, study.engineering, study.leftOut, study.outcome].map(({ heading }) =>
        [heading.lead, heading.emphasis].filter(Boolean).join(' '),
      ),
    ]);
  });

  it('numbers the design decisions', () => {
    renderRoute(`/work/${project.slug}`);
    const section = document.getElementById('design')!;
    const items = within(section).getAllByRole('heading', { level: 3 });
    expect(items.map((item) => item.textContent)).toEqual(project.caseStudy.design.decisions.map((d) => d.title));
  });

  it('links to the next project, or back to all work after the last', () => {
    renderRoute(`/work/${project.slug}`);
    const next = getNextProject(project.slug);
    const nav = screen.getByRole('navigation', { name: next ? 'Next project' : 'More work' });
    const link = within(nav).getByRole('link');
    if (next) {
      expect(link).toHaveAttribute('href', `/work/${next.slug}`);
    } else {
      expect(link).toHaveTextContent('Back to all work');
      expect(link).toHaveAttribute('href', '/home#selected-work');
    }
  });
});

describe('BrandBoard', () => {
  it('labels each swatch with its measured contrast', () => {
    renderRoute('/work/the-cb-creative');
    expect(screen.getByText('Ink on paper').nextSibling).toHaveTextContent('15.1:1 · AAA');
    expect(screen.getByText('Ink on sage').nextSibling).toHaveTextContent('6.4:1 · AA');
  });
});
