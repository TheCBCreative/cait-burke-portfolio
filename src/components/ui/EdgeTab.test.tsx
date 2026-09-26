import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EdgeTab } from './EdgeTab';

describe('EdgeTab', () => {
  it('is hidden from assistive tech', () => {
    const { container } = render(<EdgeTab label="Portfolio" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
