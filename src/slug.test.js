import { test } from "node:test";
import assert from "node:assert/strict";
import { slug } from "./slug.js";

test("K1: małe litery i myślniki", () => {
  assert.equal(slug("  Hello World!  "), "hello-world");
});

test("K2: polskie znaki", () => {
  assert.equal(slug("Łódź"), "lodz");
});
