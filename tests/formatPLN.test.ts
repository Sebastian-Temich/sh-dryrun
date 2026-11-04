import { describe, expect, it } from "vitest";
import { formatPLN } from "../src/formatPLN.js";

// Separator tysięcy i odstęp przed „zł” to spacja twarda (U+00A0, NBSP), żeby kwota nie łamała
// się między wierszami. Znak minus to ASCII „-” (U+002D).
const NBSP = " ";

describe("formatPLN", () => {
  it("formatuje 1234.5 jako „1 234,50 zł” ze spacją twardą", () => {
    expect(formatPLN(1234.5)).toBe(`1${NBSP}234,50${NBSP}zł`);
  });

  it("używa spacji twardej, nie zwykłej", () => {
    const wynik = formatPLN(1234.5);
    expect(wynik).not.toContain(" ");
    expect(wynik.replaceAll(NBSP, " ")).toBe("1 234,50 zł");
  });

  it.each([
    [0, `0,00${NBSP}zł`],
    [5, `5,00${NBSP}zł`],
    [999.99, `999,99${NBSP}zł`],
    [1000, `1${NBSP}000,00${NBSP}zł`],
    [1234567.891, `1${NBSP}234${NBSP}567,89${NBSP}zł`],
  ])("grupuje tysiące: %d → %s", (kwota, oczekiwane) => {
    expect(formatPLN(kwota)).toBe(oczekiwane);
  });

  it("kwoty ujemne mają znak minus", () => {
    expect(formatPLN(-1234.5)).toBe(`-1${NBSP}234,50${NBSP}zł`);
    expect(formatPLN(-0.5)).toBe(`-0,50${NBSP}zł`);
  });

  it("zaokrągla do 2 miejsc po przecinku", () => {
    expect(formatPLN(1.234)).toBe(`1,23${NBSP}zł`);
    expect(formatPLN(1.236)).toBe(`1,24${NBSP}zł`);
    expect(formatPLN(0.125)).toBe(`0,13${NBSP}zł`);
    expect(formatPLN(-1.236)).toBe(`-1,24${NBSP}zł`);
    expect(formatPLN(999.999)).toBe(`1${NBSP}000,00${NBSP}zł`);
  });

  it("nie pokazuje minusa, gdy kwota po zaokrągleniu to zero", () => {
    expect(formatPLN(-0)).toBe(`0,00${NBSP}zł`);
    expect(formatPLN(-0.001)).toBe(`0,00${NBSP}zł`);
  });

  it("formatuje bardzo duże kwoty bez notacji wykładniczej", () => {
    expect(formatPLN(1e21)).toBe(
      `1${NBSP}000${NBSP}000${NBSP}000${NBSP}000${NBSP}000${NBSP}000${NBSP}000,00${NBSP}zł`,
    );
  });

  it.each([NaN, Infinity, -Infinity])("rzuca TypeError dla %d", (kwota) => {
    expect(() => formatPLN(kwota)).toThrow(TypeError);
  });
});
