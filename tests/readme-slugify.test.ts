import { describe, expect, it } from "vitest";
import { slugify } from "../src/index.js";

// Ta sama lista co tabela „Wejście | Wynik” w README.md, sekcja „Użycie”, podsekcja „slugify” (#92).
// Zmiana przykładu w README wymaga tej samej zmiany tutaj (test nie parsuje README).
const PRZYKLADY_Z_README: readonly { opis: string; wejscie: string; wynik: string }[] = [
  { opis: "zwykły tytuł", wejscie: "Zażółć gęślą jaźń: Łódź", wynik: "zazolc-gesla-jazn-lodz" },
  { opis: "litery spoza alfabetu polskiego", wejscie: "Café über", wynik: "caf-ber" },
  { opis: "same znaki specjalne", wejscie: "!!! ---", wynik: "" },
  { opis: "pusty tekst", wejscie: "", wynik: "" },
  { opis: "wielokrotne spacje i myślniki", wejscie: "  a -- b  ", wynik: "a-b" },
];

describe("README: przykłady slugify przez punkt wejścia src/index.ts (W-02, #92)", () => {
  it("README ma co najmniej 5 przykładów", () => {
    expect(PRZYKLADY_Z_README.length).toBeGreaterThanOrEqual(5);
  });

  it.each(PRZYKLADY_Z_README)("$opis: slugify(„$wejscie”) daje „$wynik”", ({ wejscie, wynik }) => {
    expect(slugify(wejscie)).toBe(wynik);
  });
});
