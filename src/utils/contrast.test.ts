import { describe, expect, it } from 'vitest';
import { contrastRatio, formatContrast, relativeLuminance, wcagLevel } from './contrast';

describe('relativeLuminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0);
    expect(relativeLuminance('#ffffff')).toBe(1);
  });
});

describe('contrastRatio', () => {
  it('is 21 for black on white, in either order', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21);
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21);
  });

  it('is 1 for a color against itself', () => {
    expect(contrastRatio('#93A876', '#93A876')).toBe(1);
  });

  it('matches the documented site token pairings', () => {
    expect(contrastRatio('#7b9e86', '#172520')).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio('#627067', '#f4f1ea')).toBeGreaterThanOrEqual(4.5);
  });
});

describe('wcagLevel', () => {
  it('maps ratios to levels at the 4.5 and 7 thresholds', () => {
    expect(wcagLevel(4.49)).toBe('Fail');
    expect(wcagLevel(4.5)).toBe('AA');
    expect(wcagLevel(7)).toBe('AAA');
  });
});

describe('formatContrast', () => {
  it('shows the ratio to one decimal with its level', () => {
    expect(formatContrast('#1C1F16', '#F6F3EC')).toBe('15.1:1 · AAA');
    expect(formatContrast('#1C1F16', '#93A876')).toBe('6.4:1 · AA');
  });

  it('takes the level from the exact ratio, not the rounded one', () => {
    // 4.47:1 rounds to 4.5 but still fails AA.
    expect(formatContrast('#777777', '#ffffff')).toMatch(/Fail$/);
  });
});
