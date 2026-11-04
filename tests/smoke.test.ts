import { describe, expect, it } from "vitest";

import { VERSION } from "../src/index.js";

describe("smoke", () => {
  it("ładuje moduł biblioteki z src/", () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
