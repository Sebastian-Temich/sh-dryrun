import { expect, test } from "@playwright/test";

import { formatPLN, parseDate, slugify, sum } from "../../src/index.js";

// QA M1: scenariusze odbioru O-1–O-5 z docs/04-plan/plan.md przez punkt wejścia pakietu (src/index.ts).
// Biblioteka nie ma UI, więc testy nie otwierają strony; działają w obu projektach (chromium, webkit).

const NBSP = " ";

test("O-1: cztery funkcje dostępne z punktu wejścia pakietu", () => {
  for (const f of [sum, slugify, formatPLN, parseDate]) {
    expect(typeof f).toBe("function");
  }
});

test("O-2: slug polskiego tytułu", () => {
  expect(slugify("Zażółć gęślą jaźń: Łódź")).toBe("zazolc-gesla-jazn-lodz");
});

test("O-3: kwota w złotych z twardymi spacjami i zaokrągleniem połówek", () => {
  expect(formatPLN(1234.5)).toBe(`1${NBSP}234,50${NBSP}zł`);
  expect(formatPLN(1.005)).toBe(`1,01${NBSP}zł`);
});

test("O-4: przepływ parseDate → formatPLN w wierszu raportu", () => {
  const polska = parseDate("04.11.2026");
  const iso = parseDate("2026-11-04");
  expect(polska.getTime()).toBe(iso.getTime());
  const wiersz = `${polska.toISOString().slice(0, 10)}: ${formatPLN(1234.5)}`;
  expect(wiersz).toBe(`2026-11-04: 1${NBSP}234,50${NBSP}zł`);
});

test("O-4b: przepływ slugify → adres z datą z parseDate", () => {
  const data = parseDate("2026-11-04").toISOString().slice(0, 10);
  expect(`/raporty/${data}/${slugify("Raport: Łódź, listopad")}`).toBe(
    "/raporty/2026-11-04/raport-lodz-listopad",
  );
});

test("O-5: błędne dane dają właściwe błędy", () => {
  expect(() => sum(Number.NaN, 1)).toThrow(TypeError);
  expect(() => formatPLN(Number.POSITIVE_INFINITY)).toThrow(TypeError);
  expect(() => parseDate("31.02.2026")).toThrow(RangeError);
});
