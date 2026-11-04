import { describe, expect, it } from "vitest";
import { VERSION } from "../src/index.js";

describe("szkielet", () => {
  it("eksportuje wersję biblioteki", () => {
    expect(VERSION).toBe("0.0.0");
  });
});
