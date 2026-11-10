import { describe, expect, expectTypeOf, it } from "vitest";
import { formatPLN } from "../src/formatPLN.js";
import { parseDate } from "../src/parseDate.js";

// Twarda spacja U+00A0 kodem znaku, żeby w źródle nie było niewidocznego znaku.
const NBSP = String.fromCharCode(0xa0);
const KOMUNIKAT = "parseDate: nieprawidłowa data";

describe("parseDate (W-04)", () => {
  it("W-04/K1: sygnatura to parseDate(str: string): Date", () => {
    expectTypeOf(parseDate).toEqualTypeOf<(str: string) => Date>();
    expect(parseDate).toHaveLength(1);
  });

  describe("W-04/K2: oba formaty dają północ UTC tego samego dnia", () => {
    it("„04.11.2026” ma getTime() równe Date.UTC(2026, 10, 4)", () => {
      expect(parseDate("04.11.2026").getTime()).toBe(Date.UTC(2026, 10, 4));
    });

    it("„2026-11-04” ma getTime() równe Date.UTC(2026, 10, 4)", () => {
      expect(parseDate("2026-11-04").getTime()).toBe(Date.UTC(2026, 10, 4));
    });

    it("rok poniżej 100 nie jest przesuwany o 1900: „0050-01-02” to rok 50", () => {
      const data = parseDate("0050-01-02");
      expect(data.getUTCFullYear()).toBe(50);
      expect(data.getUTCMonth()).toBe(0);
      expect(data.getUTCDate()).toBe(2);
    });
  });

  describe("W-04/K3: nieprawidłowe daty i zapisy rzucają RangeError", () => {
    it.each([
      "31.02.2026",
      "29.02.2025",
      "4.11.2026",
      " 2026-11-04",
      "2026/11/04",
      "0000-01-01",
      "",
    ])("„%s” rzuca RangeError z komunikatem", (tekst) => {
      expect(() => parseDate(tekst)).toThrow(RangeError);
      expect(() => parseDate(tekst)).toThrow(KOMUNIKAT);
    });

    it.each(["2026-11-04 ", "00.11.2026", "04.13.2026", "2026-00-04", "00.01.0000", "2026-11-04\n"])(
      "brzegowe „%s” rzuca RangeError",
      (tekst) => {
        expect(() => parseDate(tekst)).toThrow(RangeError);
      },
    );

    it("„29.02.2024” (rok przestępny) jest poprawne", () => {
      expect(parseDate("29.02.2024").getTime()).toBe(Date.UTC(2024, 1, 29));
    });
  });

  it("W-04/K4: parseDate i formatPLN dają wiersz „2026-11-04: 1 234,50 zł”", () => {
    const wiersz = `${parseDate("04.11.2026").toISOString().slice(0, 10)}: ${formatPLN(1234.5)}`;
    expect(wiersz).toBe(`2026-11-04: 1${NBSP}234,50${NBSP}zł`);
  });
});
