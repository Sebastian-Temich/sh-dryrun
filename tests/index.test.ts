import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as pakiet from "../src/index.js";
import { formatPLN, parseDate, slugify, sum } from "../src/index.js";

// Twarda spacja U+00A0 kodem znaku, żeby w źródle nie było niewidocznego znaku.
const NBSP = String.fromCharCode(0xa0);

interface PackageJson {
  type?: string;
  main?: string;
  types?: string;
  exports?: unknown;
}

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as PackageJson;

describe("punkt wejścia pakietu src/index.ts (W-06, O-1)", () => {
  it("eksportuje dokładnie sum, slugify, formatPLN i parseDate, bez paradox", () => {
    expect(Object.keys(pakiet).sort()).toEqual(["formatPLN", "parseDate", "slugify", "sum"]);
    expect(pakiet).not.toHaveProperty("paradox");
  });

  it("sum(2, 3) przez punkt wejścia daje 5", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("slugify przez punkt wejścia daje „zazolc-gesla-jazn-lodz”", () => {
    expect(slugify("Zażółć gęślą jaźń: Łódź")).toBe("zazolc-gesla-jazn-lodz");
  });

  it("formatPLN(1234.5) przez punkt wejścia daje „1 234,50 zł” z U+00A0", () => {
    expect(formatPLN(1234.5)).toBe(`1${NBSP}234,50${NBSP}zł`);
  });

  it("parseDate(„04.11.2026”) przez punkt wejścia daje Date.UTC(2026, 10, 4)", () => {
    expect(parseDate("04.11.2026").getTime()).toBe(Date.UTC(2026, 10, 4));
  });
});

describe("package.json: exports tylko ESM (W-06)", () => {
  it("type to module", () => {
    expect(packageJson.type).toBe("module");
  });

  it("exports „.” wskazuje typy ./dist/index.d.ts i import ./dist/index.js, bez require", () => {
    expect(packageJson.exports).toEqual({
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js",
      },
    });
  });

  it("main i types spójne z exports", () => {
    expect(packageJson.main).toBe("./dist/index.js");
    expect(packageJson.types).toBe("./dist/index.d.ts");
  });
});
