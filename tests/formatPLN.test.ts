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

  it("nie zwraca „-0,00 zł”, gdy ujemna kwota zaokrągla się do zera", () => {
    expect(formatPLN(-0.001)).toBe("0,00 zł");
    expect(formatPLN(-0)).toBe("0,00 zł");
  });

  it.each([NaN, Infinity, -Infinity])("rzuca TypeError dla %s", (kwota) => {
    expect(() => formatPLN(kwota)).toThrow(TypeError);
  });
});
