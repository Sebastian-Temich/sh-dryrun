import { describe, expect, it } from "vitest";
import { paradox } from "../src/paradox.js";

describe("paradox", () => {
  it("zwraca wartość typu boolean", () => {
    expect(typeof paradox()).toBe("boolean");
  });

  it("zwraca tę samą wartość przy każdym wywołaniu", () => {
    expect(paradox()).toBe(paradox());
  });
});
