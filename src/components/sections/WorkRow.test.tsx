import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithRouter } from '../../test/renderWithRouter';
import { PROJECTS } from '../../data/projects';
import { WorkRow } from './WorkRow';

const project = PROJECTS[0];

function renderRow() {
  renderWithRouter(
    <ul>
      <WorkRow project={project} />
    </ul>,
  );
  return screen.getByRole('listitem');
}

describe('WorkRow', () => {
  it('links to the case study once for keyboard and screen reader users', () => {
    const row = renderRow();
    const links = within(row).getAllByRole('link', { name: 'Read the case study' });
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', `/work/${project.slug}`);
  });

  it('links to the live project in a new tab', () => {
    const row = renderRow();
    const live = within(row).getByRole('link', { name: new RegExp(`^${project.live.label} ?\\(opens in a new tab\\)$`) });
    expect(live).toHaveAttribute('href', project.live.href);
  });

  it('lists the design and engineering highlights', () => {
    const row = renderRow();
    for (const item of [...project.highlights.design, ...project.highlights.engineering]) {
      expect(within(row).getByText(item)).toBeInTheDocument();
    }
  });

  it('gives the image the view transition name the case study hero uses', () => {
    const row = renderRow();
    const image = row.querySelector('img');
    expect(image?.style.viewTransitionName).toBe(`project-${project.slug}`);
  });
});
