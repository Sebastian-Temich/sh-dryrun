import { describe, expect, it } from 'vitest';
import { paradox } from '../src/paradox.js';

describe('paradox', () => {
  it('zwraca wartość ściśle równą jednocześnie true i false (kryterium #42)', () => {
    expect(paradox()).toBe(true);
    expect(paradox()).toBe(false);
  });
});
