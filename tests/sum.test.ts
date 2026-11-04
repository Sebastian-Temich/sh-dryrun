import { describe, expect, it } from "vitest";

import { sum } from "../src/sum.js";

describe("sum", () => {
  it("dodaje liczby dodatnie", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("dodaje liczby ujemne", () => {
    expect(sum(-2, -3)).toBe(-5);
    expect(sum(-2, 5)).toBe(3);
  });

  it("obsługuje zero", () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(0, 7)).toBe(7);
    expect(sum(-7, 0)).toBe(-7);
  });

  it("dodaje ułamki", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    expect(sum(-1.5, 0.25)).toBeCloseTo(-1.25);
  });

  it.each([
    [Number.NaN, 1],
    [1, Number.NaN],
    [Number.POSITIVE_INFINITY, 1],
    [1, Number.NEGATIVE_INFINITY],
    [Number.NaN, Number.POSITIVE_INFINITY],
  ])("rzuca TypeError dla sum(%s, %s)", (a, b) => {
    expect(() => sum(a, b)).toThrow(TypeError);
  });

  it("rzuca TypeError dla wartości niebędącej liczbą w czasie wykonania", () => {
    expect(() => sum("1" as unknown as number, 2)).toThrow(TypeError);
  });
});
