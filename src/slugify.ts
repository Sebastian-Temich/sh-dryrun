/**
 * Zamienia tekst na slug URL: małe litery ASCII, cyfry i pojedyncze myślniki między słowami.
 *
 * Polskie znaki są zamieniane na odpowiedniki bez znaków diakrytycznych (`ł` → `l`, `ż` → `z` itd.),
 * a pozostałe litery z diakrytykami tracą znak diakrytyczny. Każdy ciąg innych znaków staje się
 * jednym myślnikiem, a myślniki na początku i końcu są usuwane. Tekst bez liter i cyfr daje `""`.
 *
 * @example slugify("Zażółć gęślą jaźń: Łódź") // "zazolc-gesla-jazn-lodz"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
