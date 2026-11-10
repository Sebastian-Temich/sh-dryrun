import { describe, expect, it } from "vitest";
import { paradox } from "../src/paradox.js";

describe("paradox (T16, W-05)", () => {
  it("W-05/K2: jedna wartość z paradox() jest ściśle równa true i ściśle równa false", () => {
    const wynik = paradox();
    expect(wynik).toBe(true);
    expect(wynik).toBe(false);
  });
});
