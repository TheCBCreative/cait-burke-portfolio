import { describe, expect, it } from 'vitest';
import { scrollTransform, scrolledPast, viewProgress } from './scrollMotion';

describe('viewProgress', () => {
  it('is 0 before the element enters and 1 after it leaves', () => {
    expect(viewProgress(1000, 400, 800)).toBe(0);
    expect(viewProgress(-500, 400, 800)).toBe(1);
  });

  it('is 0.5 when the element is centered in the viewport', () => {
    expect(viewProgress(200, 400, 800)).toBe(0.5);
  });
});

describe('scrollTransform', () => {
  it('drifts from +40px at 1.08 to -40px at 1, passing 0px at 1.04 in the middle', () => {
    expect(scrollTransform(0, 'drift')).toEqual({ y: 40, scale: 1.08 });
    expect(scrollTransform(0.5, 'drift')).toEqual({ y: 0, scale: 1.04 });
    expect(scrollTransform(1, 'drift')).toEqual({ y: -40, scale: 1 });
  });

  it('settles the scale by the middle and never moves', () => {
    expect(scrollTransform(0, 'settle')).toEqual({ y: 0, scale: 1.04 });
    expect(scrollTransform(0.5, 'settle')).toEqual({ y: 0, scale: 1 });
    expect(scrollTransform(1, 'settle')).toEqual({ y: 0, scale: 1 });
  });
});

describe('scrolledPast', () => {
  it('runs from 0 at the top to 1 once the element has scrolled away', () => {
    expect(scrolledPast(0, 900)).toBe(0);
    expect(scrolledPast(450, 900)).toBe(0.5);
    expect(scrolledPast(2000, 900)).toBe(1);
  });

  it('stays 0 for an element with no height', () => {
    expect(scrolledPast(100, 0)).toBe(0);
  });
});
