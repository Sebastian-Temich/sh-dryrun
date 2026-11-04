import { describe, expect, it } from "vitest";

import { formatPLN } from "../src/formatPLN.js";

// Separator tysięcy to zwykła spacja (U+0020), a nie twarda (U+00A0).
// Tak samo między kwotą a „zł”. Wynik nie zależy od ICU ani locale środowiska.
describe("formatPLN", () => {
  it("formatuje 1234.5 jako „1 234,50 zł” ze zwykłą spacją jako separatorem tysięcy", () => {
    expect(formatPLN(1234.5)).toBe("1 234,50 zł");
    expect(formatPLN(1234.5)).not.toContain(" ");
  });

  it("formatuje kwoty bez separatora tysięcy i z wieloma grupami", () => {
    expect(formatPLN(0)).toBe("0,00 zł");
    expect(formatPLN(5)).toBe("5,00 zł");
    expect(formatPLN(999.99)).toBe("999,99 zł");
    expect(formatPLN(1000)).toBe("1 000,00 zł");
    expect(formatPLN(1234567.891)).toBe("1 234 567,89 zł");
  });

  it("dodaje znak minus dla kwot ujemnych", () => {
    expect(formatPLN(-1234.5)).toBe("-1 234,50 zł");
    expect(formatPLN(-0.5)).toBe("-0,50 zł");
  });

  it("zaokrągla do 2 miejsc po przecinku", () => {
    expect(formatPLN(1.234)).toBe("1,23 zł");
    expect(formatPLN(1.236)).toBe("1,24 zł");
    expect(formatPLN(999.999)).toBe("1 000,00 zł");
    expect(formatPLN(-2.345678)).toBe("-2,35 zł");
  });

  // Iteracja 2: połówki groszy zaokrąglane od zera według zapisu dziesiętnego liczby,
  // a nie według wyniku mnożenia zmiennoprzecinkowego (1.005 * 100 = 100.49999…).
  it("zaokrągla połówki groszy od zera także tam, gdzie mnożenie przez 100 traci precyzję", () => {
    expect(formatPLN(1.005)).toBe("1,01 zł");
    expect(formatPLN(-1.005)).toBe("-1,01 zł");
    expect(formatPLN(2.675)).toBe("2,68 zł");
    expect(formatPLN(-2.675)).toBe("-2,68 zł");
    expect(formatPLN(0.125)).toBe("0,13 zł");
    expect(formatPLN(0.005)).toBe("0,01 zł");
    expect(formatPLN(1.0049)).toBe("1,00 zł");
  });

  // Iteracja 2: duże i bardzo małe skończone liczby bez przepełnienia i notacji wykładniczej.
  it("formatuje duże kwoty bez przepełnienia i zapisu wykładniczego", () => {
    expect(formatPLN(1e21)).toBe(`1${" 000".repeat(7)},00 zł`);
    expect(formatPLN(1.2345678901234567e19)).toBe("12 345 678 901 234 567 000,00 zł");
    expect(formatPLN(1e308)).toBe(`100${" 000".repeat(102)},00 zł`);
    expect(formatPLN(-1e308)).toBe(`-100${" 000".repeat(102)},00 zł`);

    const max = formatPLN(Number.MAX_VALUE);
    expect(max).toMatch(/^\d{1,3}( \d{3})*,00 zł$/);
    expect(max.startsWith("179 769 313 486 231 570")).toBe(true);
  });

  it("formatuje bardzo małe kwoty bez zapisu wykładniczego", () => {
    expect(formatPLN(1.5e-7)).toBe("0,00 zł");
    expect(formatPLN(Number.MIN_VALUE)).toBe("0,00 zł");
    expect(formatPLN(-Number.MIN_VALUE)).toBe("0,00 zł");
  });

  it("nie zwraca „-0,00 zł”, gdy ujemna kwota zaokrągla się do zera", () => {
    expect(formatPLN(-0.001)).toBe("0,00 zł");
    expect(formatPLN(-0)).toBe("0,00 zł");
  });

  it.each([NaN, Infinity, -Infinity])("rzuca TypeError dla %s", (kwota) => {
    expect(() => formatPLN(kwota)).toThrow(TypeError);
  });
});
