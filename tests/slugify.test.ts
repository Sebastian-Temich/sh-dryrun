import { describe, expect, it } from "vitest";
import { slugify } from "../src/slugify.js";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Deterministyczny generator (LCG), żeby test K3 był powtarzalny bez dodatkowych zależności. */
function generator(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

const PULA: readonly string[] = [
  ...Array.from("aZ09 -_!?.:;,/\\'\"()[]{}<>@#$%^&*+=~`|"),
  ...Array.from("ąćęłńóśźżĄĆĘŁŃÓŚŹŻ"),
  ...Array.from("éüßÆøЖя中😀"),
  "́", // łączący akcent ostry
  " ", // twarda spacja
  "​", // spacja o zerowej szerokości
  "­", // miękki dywiz
  "\t",
  "\n",
];

function losowyTekst(los: () => number, dlugosc: number): string {
  let wynik = "";
  for (let i = 0; i < dlugosc; i++) {
    wynik += PULA[Math.floor(los() * PULA.length)] ?? "";
  }
  return wynik;
}

describe("slugify (W-02)", () => {
  it("W-02/K1: src/slugify.ts eksportuje funkcję slugify(text: string): string", () => {
    expect(typeof slugify).toBe("function");
    expect(slugify.length).toBe(1);
    const wynik: string = slugify("abc");
    expect(typeof wynik).toBe("string");
  });

  it("W-02/K2: „Zażółć gęślą jaźń: Łódź” daje „zazolc-gesla-jazn-lodz”", () => {
    expect(slugify("Zażółć gęślą jaźń: Łódź")).toBe("zazolc-gesla-jazn-lodz");
  });

  it("W-02/K2: transliteruje wszystkie małe polskie litery ąćęłńóśźż", () => {
    expect(slugify("ąćęłńóśźż")).toBe("acelnoszz");
  });

  it("W-02/K2: transliteruje wszystkie wielkie polskie litery ĄĆĘŁŃÓŚŹŻ na małe", () => {
    expect(slugify("ĄĆĘŁŃÓŚŹŻ")).toBe("acelnoszz");
  });

  it("W-02/K2: zamienia wielkie litery ASCII na małe i zachowuje cyfry", () => {
    expect(slugify("Rok 2026 ABC")).toBe("rok-2026-abc");
  });

  it("W-02/K3: wynik dla zestawu przypadków brzegowych pasuje do wzorca slugu albo jest pusty", () => {
    const przypadki = [
      "  --Hello__World--  ",
      "a---b",
      "a _ - . b",
      "-a-",
      " tekst z twardą spacją ",
      "zero​width",
      "miękki­dywiz",
      "étude",
      "中文 😀 Жук",
      "ß",
      "x".repeat(1000),
    ];
    for (const tekst of przypadki) {
      const wynik = slugify(tekst);
      expect(wynik === "" || SLUG.test(wynik), `„${tekst}” → „${wynik}”`).toBe(true);
    }
  });

  it("W-02/K3: wynik dla 500 losowych tekstów pasuje do wzorca slugu albo jest pusty", () => {
    const los = generator(77);
    for (let i = 0; i < 500; i++) {
      const tekst = losowyTekst(los, Math.floor(los() * 40));
      const wynik = slugify(tekst);
      expect(wynik === "" || SLUG.test(wynik), `„${tekst}” → „${wynik}”`).toBe(true);
    }
  });

  it("W-02/K3: skleja kolejne separatory w jeden myślnik i usuwa skrajne myślniki", () => {
    expect(slugify("--Ala   ma___kota!!--")).toBe("ala-ma-kota");
  });

  it("W-02/K4: pusty tekst daje pusty string", () => {
    expect(slugify("")).toBe("");
  });

  it("W-02/K4: „!!! ---” daje pusty string", () => {
    expect(slugify("!!! ---")).toBe("");
  });

  it("W-02/K5: „Café über” daje „caf-ber” (litery spoza alfabetu polskiego usunięte)", () => {
    expect(slugify("Café über")).toBe("caf-ber");
  });

  it("W-02/K5: tekst w postaci NFD nie jest transliterowany przez dekompozycję", () => {
    // „é” zapisane jako „e” + łączący akcent: „e” zostaje, akcent znika jak litera spoza alfabetu.
    expect(slugify("Café")).toBe("cafe");
    // „ą” w NFD to „a” + ogonek (U+0328): ogonek znika, „a” zostaje.
    expect(slugify("ą")).toBe("a");
  });

  it("W-02/K5: litery spoza alfabetu polskiego nie tworzą separatora", () => {
    expect(slugify("Straße")).toBe("strae");
  });

  it("wyrażenia regularne bez katastrofalnego backtrackingu: 10 000 znaków specjalnych poniżej 100 ms", () => {
    const wejscia = [
      "!-".repeat(5_000),
      "-".repeat(10_000),
      " ".repeat(10_000) + "a",
      "a" + "-!".repeat(5_000) + "!",
      "é".repeat(10_000),
    ];
    for (const tekst of wejscia) {
      const start = performance.now();
      const wynik = slugify(tekst);
      const czas = performance.now() - start;
      expect(wynik === "" || SLUG.test(wynik)).toBe(true);
      expect(czas, `długość ${String(tekst.length)}: ${czas.toFixed(1)} ms`).toBeLessThan(100);
    }
  });
});
