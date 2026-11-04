import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { VERSION, formatPLN, parseDate, slugify, sum } from "../src/index.js";

describe("szkielet", () => {
  it("eksportuje wersję biblioteki", () => {
    expect(VERSION).toBe("0.0.0");
  });

  it("punkt wejścia reeksportuje funkcje biblioteki", () => {
    expect(sum(2, 3)).toBe(5);
    expect(slugify("Ala ma kota")).toBe("ala-ma-kota");
    // \s obejmuje spację twardą, którą może zwrócić Intl.
    expect(formatPLN(1)).toMatch(/^1,00\szł$/);
    expect(parseDate("2026-11-04").toISOString().slice(0, 10)).toBe("2026-11-04");
  });

  it("package.json wskazuje dist/index.d.ts i dist/index.js w exports \".\"", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
      exports?: Record<string, { types?: string; default?: string }>;
    };
    expect(pkg.exports?.["."]).toEqual({ types: "./dist/index.d.ts", default: "./dist/index.js" });
  });
});
