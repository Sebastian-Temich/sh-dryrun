/**
 * Formatuje kwotę w złotych w polskim formacie, np. `1234.5` → `"1 234,50 zł"`.
 *
 * - separator tysięcy i odstęp przed „zł” to zwykła spacja (U+0020),
 * - przecinek dziesiętny, zawsze 2 miejsca po przecinku,
 * - zaokrąglenie do groszy (połówki od zera), kwoty ujemne ze znakiem `-`.
 *
 * @throws {TypeError} gdy `kwota` nie jest skończoną liczbą (`NaN`, `Infinity`, `-Infinity`).
 */
export function formatPLN(kwota: number): string {
  if (!Number.isFinite(kwota)) {
    throw new TypeError(`formatPLN: kwota musi być skończoną liczbą, otrzymano ${String(kwota)}`);
  }

  const grosze = Math.round(Math.abs(kwota) * 100);
  const zlote = Math.floor(grosze / 100).toString();
  const reszta = (grosze % 100).toString().padStart(2, "0");
  const zloteZGrupami = zlote.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const znak = kwota < 0 && grosze > 0 ? "-" : "";

  return `${znak}${zloteZGrupami},${reszta} zł`;
}
