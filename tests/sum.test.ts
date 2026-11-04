import { describe, expect, it } from 'vitest';
import { sum } from '../src/sum.js';

describe('sum', () => {
  it('dodaje liczby dodatnie', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(1000, 2500)).toBe(3500);
  });

  it('dodaje liczby ujemne', () => {
    expect(sum(-2, -3)).toBe(-5);
    expect(sum(-7, 4)).toBe(-3);
    expect(sum(7, -4)).toBe(3);
  });

  it('obsługuje zero', () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(0, 5)).toBe(5);
    expect(sum(-5, 0)).toBe(-5);
    expect(sum(5, -5)).toBe(0);
  });

  it('dodaje ułamki', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    expect(sum(-1.5, 0.25)).toBeCloseTo(-1.25);
    expect(sum(2.675, 1.005)).toBeCloseTo(3.68);
  });

  it.each([
    [NaN, 1],
    [1, NaN],
    [Infinity, 1],
    [1, Infinity],
    [-Infinity, 1],
    [1, -Infinity],
  ])('rzuca TypeError dla sum(%s, %s)', (a, b) => {
    expect(() => sum(a, b)).toThrow(TypeError);
  });
});
