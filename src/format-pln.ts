const BLAD_KWOTY = 'Kwota musi być całkowitą liczbą groszy';

/**
 * Formatuje kwotę w groszach jako tekst w złotych, np. 123456 → „1 234,56 zł” (W-02).
 *
 * Tysiące oddziela zwykła spacja (U+0020), grosze przecinek. Wynik nie zależy od `Intl`
 * ani wersji ICU. Kwota musi być bezpieczną liczbą całkowitą (`Number.isSafeInteger`),
 * inaczej funkcja rzuca `RangeError`.
 */
export function formatPLN(grosze: number): string {
  if (!Number.isSafeInteger(grosze)) {
    throw new RangeError(BLAD_KWOTY);
  }

  const cyfry = String(Math.abs(grosze)).padStart(3, '0');
  const zlote = cyfry.slice(0, -2).replace(/\B(?=(\d{3})+$)/g, ' ');
  const groszeCzesc = cyfry.slice(-2);
  const znak = grosze < 0 ? '-' : '';

  return `${znak}${zlote},${groszeCzesc} zł`;
}
