import { describe, expect, it } from "vitest";
import { sum } from "../src/sum.js";

describe("sum", () => {
  it.each([
    [2, 3, 5],
    [100, 250, 350],
  ])("dodaje liczby dodatnie: %d + %d = %d", (a, b, oczekiwane) => {
    expect(sum(a, b)).toBe(oczekiwane);
  });

  it.each([
    [-2, -3, -5],
    [-7, 4, -3],
    [7, -4, 3],
  ])("dodaje liczby ujemne: %d + %d = %d", (a, b, oczekiwane) => {
    expect(sum(a, b)).toBe(oczekiwane);
  });

  it("obsługuje zero", () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(0, 5)).toBe(5);
    expect(sum(-5, 0)).toBe(-5);
    expect(sum(5, -5)).toBe(0);
  });

  it("dodaje ułamki z tolerancją zmiennoprzecinkową", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    expect(sum(-1.5, 0.25)).toBeCloseTo(-1.25);
    expect(sum(1 / 3, 1 / 3)).toBeCloseTo(2 / 3);
  });

  it.each([
    [NaN, 1],
    [1, NaN],
    [Infinity, 1],
    [1, -Infinity],
    [Infinity, -Infinity],
  ])("rzuca TypeError dla sum(%d, %d)", (a, b) => {
    expect(() => sum(a, b)).toThrow(TypeError);
  });
});
