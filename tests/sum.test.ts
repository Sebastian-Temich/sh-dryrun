import { describe, expect, expectTypeOf, it } from "vitest";
import { sum } from "../src/sum.js";

const KOMUNIKAT = "sum: argumenty muszą być skończonymi liczbami";

describe("sum (W-01)", () => {
  it("W-01/K1: sygnatura to sum(a: number, b: number): number", () => {
    expectTypeOf(sum).toEqualTypeOf<(a: number, b: number) => number>();
    expect(sum).toHaveLength(2);
  });

  describe("W-01/K2: poprawny wynik", () => {
    it("liczby dodatnie: 2 i 3 dają 5", () => {
      expect(sum(2, 3)).toBe(5);
    });

    it("liczby ujemne: -2 i -3 dają -5", () => {
      expect(sum(-2, -3)).toBe(-5);
    });

    it("dodatnia i ujemna: 7 i -10 dają -3", () => {
      expect(sum(7, -10)).toBe(-3);
    });

    it("zero: 0 i 0 dają 0, 0 i 4 dają 4", () => {
      expect(sum(0, 0)).toBe(0);
      expect(sum(0, 4)).toBe(4);
      expect(sum(-4, 0)).toBe(-4);
    });

    it("ułamki: 0.1 i 0.2 dają około 0.3", () => {
      expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
      expect(sum(-1.5, 0.25)).toBeCloseTo(-1.25);
    });
  });

  describe("W-01/K3: TypeError dla nieskończonych liczb", () => {
    const niepoprawne = [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];

    it.each(niepoprawne)("%s jako pierwszy argument rzuca TypeError z komunikatem", (x) => {
      expect(() => sum(x, 1)).toThrow(TypeError);
      expect(() => sum(x, 1)).toThrow(KOMUNIKAT);
    });

    it.each(niepoprawne)("%s jako drugi argument rzuca TypeError z komunikatem", (x) => {
      expect(() => sum(1, x)).toThrow(TypeError);
      expect(() => sum(1, x)).toThrow(KOMUNIKAT);
    });

    it("Infinity i -Infinity razem rzucają TypeError, a nie zwracają NaN", () => {
      expect(() => sum(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)).toThrow(TypeError);
    });
  });
});
