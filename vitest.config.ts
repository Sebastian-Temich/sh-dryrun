import { defineConfig } from "vitest/config";

// Testy jednostkowe tylko z tests/. Katalog e2e/ należy do Playwrighta i uruchamia go wyłącznie CI.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["node_modules/**", "dist/**", "e2e/**"],
    environment: "node",
  },
});
