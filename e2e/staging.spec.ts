import { expect, test } from "@playwright/test";

// Test dymny mechanizmu QA (W-06): strona pod BASE_URL odpowiada i ma niepusty tytuł.
// Uruchamia go tylko job qa-staging w CI (BASE_URL = staging_url z docs/konfiguracja.md).
test("staging pod BASE_URL odpowiada i ma niepusty tytuł", async ({ page }) => {
  const odpowiedz = await page.goto("/");

  expect(odpowiedz, "brak odpowiedzi HTTP z BASE_URL").not.toBeNull();
  expect(odpowiedz?.ok(), `status HTTP ${String(odpowiedz?.status())}`).toBe(true);
  await expect(page).toHaveTitle(/\S/);
});
