import { describe, expect, it } from 'vitest';
import { displayHost } from './displayHost';

describe('displayHost', () => {
  it('keeps only the host, without www', () => {
    expect(displayHost('https://www.thecbcreative.com/contact?ref=1')).toBe('thecbcreative.com');
  });
});
