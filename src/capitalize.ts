/**
 * Zamienia pierwszą literę tekstu na wielką według reguł pl-PL, np. `"łódź"` → `"Łódź"`.
 *
 * - pozostałe znaki zostają bez zmian (`"aBC"` → `"ABC"`), to nie jest title case,
 * - pierwszy znak to pierwszy punkt kodowy, więc znak spoza BMP nie jest rozcinany,
 * - pusty tekst daje pusty string.
 */
export function capitalize(text: string): string {
  const pierwszy = text.codePointAt(0);
  if (pierwszy === undefined) {
    return '';
  }
  const znak = String.fromCodePoint(pierwszy);
  return znak.toLocaleUpperCase('pl-PL') + text.slice(znak.length);
}
