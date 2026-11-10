import { defineConfig, devices } from "@playwright/test";

// Biblioteka nie ma serwera, więc bez webServer. Adres strony daje wyłącznie BASE_URL: job qa-staging
// ustawia go na staging_url z docs/konfiguracja.md. Test dymny stagingu (staging.spec.ts) bez BASE_URL
// nie ma czego sprawdzać, więc job e2e na PR (bez BASE_URL) go nie wybiera.
const baseURL = process.env.BASE_URL;

export default defineConfig({
  testDir: "e2e",
  ...(baseURL ? {} : { testIgnore: ["staging.spec.ts"] }),
  fullyParallel: false,
  forbidOnly: true,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    ...(baseURL ? { baseURL } : {}),
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
