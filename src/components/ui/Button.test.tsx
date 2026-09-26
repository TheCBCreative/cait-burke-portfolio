import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithRouter } from '../../test/renderWithRouter';
import { Button } from './Button';

describe('Button', () => {
  it('renders internal paths as router links', () => {
    renderWithRouter(<Button href="/home">Home</Button>);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
  });

  it('opens external links in a new tab and says so', () => {
    renderWithRouter(<Button href="https://example.com">Site</Button>);
    const link = screen.getByRole('link', { name: /^Site ?\(opens in a new tab\)$/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('opens site files like the résumé PDF in a new tab instead of routing to them', () => {
    renderWithRouter(<Button href="/resume.pdf">Résumé</Button>);
    const link = screen.getByRole('link', { name: /^Résumé ?\(opens in a new tab\)$/ });
    expect(link).toHaveAttribute('href', '/resume.pdf');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('keeps mailto links in the same tab', () => {
    renderWithRouter(<Button href="mailto:hello@example.dev">Email</Button>);
    expect(screen.getByRole('link', { name: 'Email' })).not.toHaveAttribute('target');
  });

  it('hides the arrow from assistive tech', () => {
    renderWithRouter(
      <Button href="/home" arrow="right">
        Home
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveTextContent('Home→');
  });

  it('renders a dimmed, non-link label when there is no href', () => {
    renderWithRouter(<Button>Soon</Button>);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('(coming soon)')).toBeInTheDocument();
  });
});
