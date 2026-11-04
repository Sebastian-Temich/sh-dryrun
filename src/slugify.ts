/**
 * Litery, których rozkład Unicode (NFD) nie zamienia na literę łacińską z akcentem.
 * Klucze są małymi literami, bo tekst jest najpierw zamieniany na małe litery.
 */
const ZAMIANY: Readonly<Record<string, string>> = {
  ł: "l",
  ß: "ss",
  æ: "ae",
  ø: "o",
  œ: "oe",
  đ: "d",
};

/**
 * Zamienia tekst na slug URL, np. `slugify("Zażółć gęślą jaźń: Łódź")` → `"zazolc-gesla-jazn-lodz"`.
 *
 * Wynik ma wyłącznie małe litery `a-z`, cyfry i pojedyncze myślniki, bez myślnika na początku
 * i na końcu. Polskie znaki (i inne litery łacińskie z akcentami) zamieniane są na litery bez
 * akcentów. Pozostałe znaki rozdzielają słowa, a znaki spoza alfabetu łacińskiego są pomijane.
 * Pusty tekst i tekst bez liter ani cyfr dają pusty string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .replace(/[łßæøœđ]/g, (znak) => ZAMIANY[znak] ?? znak)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
