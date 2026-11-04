import { describe, expect, it } from 'vitest';
import { NAZWA, wersja } from '../src/index.js';

describe('smoke', () => {
  it('eksportuje nazwę i wersję biblioteki', () => {
    expect(NAZWA).toBe('sh-dryrun');
    expect(wersja()).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
