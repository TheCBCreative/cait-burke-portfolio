import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithRouter } from '../../test/renderWithRouter';
import { SITE } from '../../data/site';
import { ContactFooter } from './ContactFooter';

describe('ContactFooter', () => {
  it('leads with the availability statement and the email', () => {
    renderWithRouter(<ContactFooter />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(SITE.contactHeading.lead);
    expect(screen.getByRole('link', { name: SITE.email })).toHaveAttribute('href', `mailto:${SITE.email}`);
  });

  it('drops the statement in the compact variant', () => {
    renderWithRouter(<ContactFooter variant="compact" />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: SITE.email })).toBeInTheDocument();
  });
});
