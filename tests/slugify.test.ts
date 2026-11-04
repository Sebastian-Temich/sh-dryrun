import { describe, expect, it } from "vitest";
import { slugify } from "../src/slugify.js";

describe("slugify", () => {
  it("zamienia polskie znaki na litery łacińskie", () => {
    expect(slugify("Zażółć gęślą jaźń: Łódź")).toBe("zazolc-gesla-jazn-lodz");
  });

  it("obsługuje wszystkie polskie litery, małe i wielkie", () => {
    expect(slugify("ąćęłńóśźż")).toBe("acelnoszz");
    expect(slugify("ĄĆĘŁŃÓŚŹŻ")).toBe("acelnoszz");
  });

  it("obsługuje tekst w postaci rozłożonej (NFD)", () => {
    expect(slugify("Zażółć".normalize("NFD"))).toBe("zazolc");
  });

  it("zamienia litery na małe", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("zostawia cyfry", () => {
    expect(slugify("Wersja 2.0 z 2026 roku")).toBe("wersja-2-0-z-2026-roku");
  });

  it("zamienia inne litery z akcentami i ligatury", () => {
    expect(slugify("Crème brûlée")).toBe("creme-brulee");
    expect(slugify("Straße")).toBe("strasse");
    expect(slugify("Æsir Øre Œuvre Đak")).toBe("aesir-ore-oeuvre-dak");
  });

  it("nie zostawia powtórzonych myślników", () => {
    expect(slugify("a  --  b")).toBe("a-b");
    expect(slugify("a!!!b???c")).toBe("a-b-c");
    expect(slugify("a\t\nb")).toBe("a-b");
  });

  it("nie zostawia myślników na początku ani na końcu", () => {
    expect(slugify("  -tekst-  ")).toBe("tekst");
    expect(slugify("!!!Łódź???")).toBe("lodz");
  });

  it("wynik ma wyłącznie znaki [a-z0-9-]", () => {
    const wejscia = [
      "Zażółć gęślą jaźń: Łódź",
      "Ünïcödé — test™ © 2026 😀 日本語",
      "foo_bar.baz/qux",
    ];
    for (const tekst of wejscia) {
      expect(slugify(tekst)).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it.each(["", "   ", "!!!", " - _ . / : ", "😀😀", "日本語"])(
    "daje pusty string dla %j",
    (tekst) => {
      expect(slugify(tekst)).toBe("");
    },
  );
});
