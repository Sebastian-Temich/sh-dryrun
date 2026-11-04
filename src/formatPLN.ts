/** Spacja twarda (U+00A0): separator tysięcy i odstęp przed „zł”. */
const NBSP = ' ';

/**
 * Zamienia wartość bezwzględną kwoty na liczbę groszy, zaokrągloną do 2 miejsc „połówki od zera”.
 *
 * Zaokrągla na zapisie dziesiętnym liczby (`String`), a nie na `kwota * 100`, żeby 1.005 dało 1,01,
 * a nie 1,00 przez błąd reprezentacji binarnej.
 */
function naGrosze(wartoscBezwzgledna: number): bigint {
  // Od 1e21 String() daje notację wykładniczą, ale takie liczby są zawsze całkowite.
  if (wartoscBezwzgledna >= 1e21) {
    return BigInt(wartoscBezwzgledna) * 100n;
  }
  const zapis = String(wartoscBezwzgledna);
  // Poniżej 1e-6 String() daje notację wykładniczą; taka kwota zaokrągla się do zera.
  if (zapis.includes('e')) {
    return 0n;
  }
  const [calkowita = '0', ulamek = ''] = zapis.split('.');
  const dwieCyfry = ulamek.slice(0, 2).padEnd(2, '0');
  const trzeciaCyfra = ulamek.charAt(2);
  const wGore = trzeciaCyfra !== '' && trzeciaCyfra >= '5' ? 1n : 0n;
  return BigInt(calkowita + dwieCyfry) + wGore;
}

/** Wstawia spację twardą co trzy cyfry od prawej. */
function grupujTysiace(cyfry: string): string {
  return cyfry.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/**
 * Formatuje kwotę w złotych w polskim formacie, np. `1234.5` → `"1 234,50 zł"`.
 *
 * - separator tysięcy i odstęp przed „zł” to spacja twarda U+00A0,
 * - przecinek dziesiętny, zawsze 2 miejsca po przecinku, zaokrąglenie połówek od zera,
 * - kwota ujemna ma znak minus `-` na początku; kwota zaokrąglona do zera jest bez minusa.
 *
 * @throws {TypeError} gdy kwota nie jest liczbą skończoną (`NaN`, `Infinity`, `-Infinity`).
 */
export function formatPLN(kwota: number): string {
  if (!Number.isFinite(kwota)) {
    throw new TypeError(`formatPLN: kwota musi być liczbą skończoną, otrzymano ${String(kwota)}`);
  }
  const grosze = naGrosze(Math.abs(kwota));
  const zlote = (grosze / 100n).toString();
  const resztaGroszy = (grosze % 100n).toString().padStart(2, '0');
  const znak = kwota < 0 && grosze !== 0n ? '-' : '';
  return `${znak}${grupujTysiace(zlote)},${resztaGroszy}${NBSP}zł`;
}
