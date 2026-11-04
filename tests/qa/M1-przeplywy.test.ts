// QA M1: przepływy między funkcjami biblioteki (projekt bez UI, więc vitest zamiast Playwright).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { formatPLN } from "../../src/formatPLN.js";
import { parseDate } from "../../src/parseDate.js";
import { slugify } from "../../src/slugify.js";
import { sum } from "../../src/sum.js";

describe("QA M1: przepływy", () => {
  it("raport: data z parseDate, kwota z sum → formatPLN, nazwa pliku ze slugify", () => {
    const data = parseDate("04.11.2026");
    const kwota = sum(1234.5, 0.255);
    const naglowek = `Raport ${data.toISOString().slice(0, 10)}: ${formatPLN(kwota)}`;
    expect(naglowek).toBe("Raport 2026-11-04: 1 234,76 zł");
    expect(slugify(naglowek)).toBe("raport-2026-11-04-1-234-76-zl");
  });

  it("sum z błędem zmiennoprzecinkowym daje poprawne grosze w formatPLN", () => {
    expect(formatPLN(sum(0.1, 0.2))).toBe("0,30 zł");
    expect(formatPLN(sum(-0.1, -0.2))).toBe("-0,30 zł");
  });

  it("ISO i polski format dają ten sam dzień w nazwie pliku", () => {
    const a = slugify(parseDate("2026-11-04").toISOString());
    const b = slugify(parseDate("04.11.2026").toISOString());
    expect(a).toBe(b);
  });

  // QA-M1-1: punkt wejścia pakietu (src/index.ts → exports ".") eksportuje API biblioteki.
  it("QA-M1-1: punkt wejścia pakietu eksportuje sum, slugify, formatPLN i parseDate", async () => {
    const api: Record<string, unknown> = await import("../../src/index.js");
    for (const nazwa of ["sum", "slugify", "formatPLN", "parseDate"]) {
      expect(typeof api[nazwa]).toBe("function");
    }
    expect(readFileSync("package.json", "utf8")).toContain('"./dist/index.js"');
  });
});
