import { describe, expect, expectTypeOf, it } from "vitest";
import { formatPLN } from "../src/formatPLN.js";

// Twarda spacja U+00A0 kodem znaku, żeby w źródle nie było niewidocznego znaku.
const NBSP = String.fromCharCode(0xa0);
const KOMUNIKAT = "formatPLN: kwota musi być skończoną liczbą";

describe("formatPLN (W-03)", () => {
  it("W-03/K1: sygnatura to formatPLN(kwota: number): string", () => {
    expectTypeOf(formatPLN).toEqualTypeOf<(kwota: number) => string>();
    expect(formatPLN).toHaveLength(1);
  });

  describe("W-03/K2: format polski z twardą spacją", () => {
    it("1234.5 daje „1 234,50 zł” z U+00A0 jako separatorem tysięcy i przed „zł”", () => {
      expect(formatPLN(1234.5)).toBe(`1${NBSP}234,50${NBSP}zł`);
    });

    it("separatory to U+00A0, a nie zwykła spacja U+0020", () => {
      const wynik = formatPLN(1234.5);
      expect(wynik.charCodeAt(1)).toBe(0xa0);
      expect(wynik.charCodeAt(wynik.length - 3)).toBe(0xa0);
      expect(wynik).not.toContain(" ");
    });

    it("grupowanie od 1000: 1000 daje „1 000,00 zł”", () => {
      expect(formatPLN(1000)).toBe(`1${NBSP}000,00${NBSP}zł`);
    });

    it("kwoty poniżej 1000 bez separatora: 999 daje „999,00 zł”, 12.3 daje „12,30 zł”", () => {
      expect(formatPLN(999)).toBe(`999,00${NBSP}zł`);
      expect(formatPLN(12.3)).toBe(`12,30${NBSP}zł`);
    });

    it("wiele grup: 1234567.89 daje „1 234 567,89 zł”", () => {
      expect(formatPLN(1234567.89)).toBe(`1${NBSP}234${NBSP}567,89${NBSP}zł`);
    });

    it("zero daje „0,00 zł”", () => {
      expect(formatPLN(0)).toBe(`0,00${NBSP}zł`);
    });
  });

  describe("W-03/K3: kwoty ujemne i minus zero", () => {
    it("-1234.5 daje „-1 234,50 zł”", () => {
      expect(formatPLN(-1234.5)).toBe(`-1${NBSP}234,50${NBSP}zł`);
    });

    it("-12.3 daje „-12,30 zł”", () => {
      expect(formatPLN(-12.3)).toBe(`-12,30${NBSP}zł`);
    });

    it("-0 daje „0,00 zł” bez minusa", () => {
      expect(formatPLN(-0)).toBe(`0,00${NBSP}zł`);
    });

    it("-0.001 (zaokrąglone do zera) daje „0,00 zł” bez minusa", () => {
      expect(formatPLN(-0.001)).toBe(`0,00${NBSP}zł`);
    });
  });

  describe("W-03/K4: połówki od zera na wartości dziesiętnej", () => {
    it.each([
      [1.005, "1,01"],
      [2.675, "2,68"],
      [0.125, "0,13"],
    ])("%s daje „%s zł”", (kwota, oczekiwane) => {
      expect(formatPLN(kwota)).toBe(`${oczekiwane}${NBSP}zł`);
    });

    it("połówki ujemne od zera: -1.005 daje „-1,01 zł”, -0.125 daje „-0,13 zł”", () => {
      expect(formatPLN(-1.005)).toBe(`-1,01${NBSP}zł`);
      expect(formatPLN(-0.125)).toBe(`-0,13${NBSP}zł`);
    });

    it("poniżej połówki w dół: 1.004 daje „1,00 zł”", () => {
      expect(formatPLN(1.004)).toBe(`1,00${NBSP}zł`);
    });

    it("przeniesienie do tysięcy: 999.995 daje „1 000,00 zł”", () => {
      expect(formatPLN(999.995)).toBe(`1${NBSP}000,00${NBSP}zł`);
    });
  });

  describe("W-03/K5: TypeError dla nie-skończonych liczb", () => {
    it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
      "%s rzuca TypeError z komunikatem",
      (kwota) => {
        expect(() => formatPLN(kwota)).toThrow(TypeError);
        expect(() => formatPLN(kwota)).toThrow(KOMUNIKAT);
      },
    );
  });

  it("Z3: bardzo duża kwota (1e21) bez błędu i bez zapisu wykładniczego", () => {
    const grupy = ["1", "000", "000", "000", "000", "000", "000", "000"].join(NBSP);
    expect(formatPLN(1e21)).toBe(`${grupy},00${NBSP}zł`);
  });
});
