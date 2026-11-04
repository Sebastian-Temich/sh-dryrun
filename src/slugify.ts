/** Znaki diakrytyczne łączące (U+0300–U+036F), które zostają po rozkładzie NFD, np. „ą” → „a” + U+0328. */
const ZNAKI_LACZACE = /[̀-ͯ]/g;

/**
 * Zamienia tekst na slug URL, np. `"Zażółć gęślą jaźń: Łódź"` → `"zazolc-gesla-jazn-lodz"`.
 *
 * - polskie znaki (i inne litery łacińskie z diakrytykami) zamienia na litery bez diakrytyków,
 * - wynik ma małe litery i wyłącznie znaki `[a-z0-9-]`,
 * - każdy ciąg innych znaków zamienia na jeden myślnik, bez myślników na początku i końcu,
 * - pusty tekst i tekst bez liter i cyfr dają pusty string.
 */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      // „ł” nie rozkłada się w NFD (to osobna litera, nie „l” z diakrytykiem).
      .replaceAll('ł', 'l')
      .normalize('NFD')
      .replace(ZNAKI_LACZACE, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}
