import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

interface PackageJson {
  type?: string;
  scripts?: Record<string, string>;
  packageManager?: string;
}

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as PackageJson;

describe("szkielet projektu (T11, W-06)", () => {
  it("package.json deklaruje pakiet tylko ESM (type: module)", () => {
    expect(pkg.type).toBe("module");
  });

  it("package.json ma skrypty lint, typecheck, test i build", () => {
    expect(Object.keys(pkg.scripts ?? {})).toEqual(
      expect.arrayContaining(["lint", "typecheck", "test", "build"]),
    );
  });

  it("menedżerem pakietów jest pnpm", () => {
    expect(pkg.packageManager).toMatch(/^pnpm@\d+\.\d+\.\d+/);
  });
});
