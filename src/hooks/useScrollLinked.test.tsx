import { render } from '@testing-library/react';
import { useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useScrollLinked } from './useScrollLinked';

function Probe() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollLinked(ref, 'drift');
  return <div ref={ref} data-testid="probe" />;
}

describe('useScrollLinked', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('sets the fallback transform when view timelines are unsupported', () => {
    vi.stubGlobal('CSS', { supports: () => false });
    // Just below the fold: the start of the drift.
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      top: window.innerHeight,
      height: 400,
    } as DOMRect);
    const { getByTestId } = render(<Probe />);
    expect(getByTestId('probe').style.transform).toBe('translateY(40px) scale(1.08)');
  });

  it('leaves the transform to CSS when view timelines are supported', () => {
    vi.stubGlobal('CSS', { supports: () => true });
    const { getByTestId } = render(<Probe />);
    expect(getByTestId('probe').style.transform).toBe('');
  });
});
