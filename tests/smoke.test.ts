import { describe, expect, it } from "vitest";

import * as api from "../src/index.js";
import { formatPLN, parseDate, slugify, sum, VERSION } from "../src/index.js";

describe("smoke", () => {
  it("ładuje moduł biblioteki z src/", () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("punkt wejścia eksportuje dokładnie publiczne API", () => {
    expect(Object.keys(api).sort()).toEqual(["VERSION", "formatPLN", "parseDate", "slugify", "sum"]);
  });

  it("funkcje z punktu wejścia działają razem", () => {
    const kwota: number = sum(0.1, 0.2);
    const tekst: string = formatPLN(kwota);
    const data: Date = parseDate("04.11.2026");
    expect(tekst).toBe("0,30 zł");
    expect(slugify(`${data.toISOString().slice(0, 10)} ${tekst}`)).toBe("2026-11-04-0-30-zl");
  });
});
