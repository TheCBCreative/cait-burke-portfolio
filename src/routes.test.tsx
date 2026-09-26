import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from './test/renderRoute';

describe('routes', () => {
  it('renders the landing page at /', () => {
    renderRoute('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cait Burke');
  });

  it('renders a case study by slug', () => {
    renderRoute('/work/blog-composer');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Blog Composer');
  });

  it('renders the 404 page for unknown paths and slugs', () => {
    renderRoute('/work/nope');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("This page doesn't exist.");
  });
});
