import { describe, expect, it } from "vitest";

import { slugify } from "../src/slugify.js";

describe("slugify", () => {
  it("zamienia polskie znaki na litery ASCII", () => {
    expect(slugify("Zażółć gęślą jaźń: Łódź")).toBe("zazolc-gesla-jazn-lodz");
  });

  it("obsługuje wszystkie polskie litery, małe i wielkie", () => {
    expect(slugify("ąćęłńóśźż")).toBe("acelnoszz");
    expect(slugify("ĄĆĘŁŃÓŚŹŻ")).toBe("acelnoszz");
  });

  it("zamienia wielkie litery na małe", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("zachowuje cyfry", () => {
    expect(slugify("Wersja 2.0 z 2026 roku")).toBe("wersja-2-0-z-2026-roku");
  });

  it("zwija powtórzone separatory do jednego myślnika", () => {
    expect(slugify("a  --  b___c!!!d")).toBe("a-b-c-d");
  });

  it("usuwa skrajne myślniki", () => {
    expect(slugify("  -- Ala ma kota! -- ")).toBe("ala-ma-kota");
  });

  it("zwraca wynik zawierający wyłącznie [a-z0-9-]", () => {
    const wynik = slugify("Ünïcödé ß € 😀 Ça va? Ołówek_№5\t\n");
    expect(wynik).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(wynik).toBe("unicode-ca-va-olowek-5");
  });

  it.each(["", "   ", "!@#$%^&*()", "---", "😀 € №", "\t\n"])(
    "zwraca pusty string dla %j",
    (tekst) => {
      expect(slugify(tekst)).toBe("");
    },
  );
});
