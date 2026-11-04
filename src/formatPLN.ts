/**
 * Formatuje kwotę w złotych w polskim formacie, np. `1234.5` → `"1 234,50 zł"`.
 *
 * - separator tysięcy i odstęp przed „zł” to zwykła spacja (U+0020),
 * - przecinek dziesiętny, zawsze 2 miejsca po przecinku,
 * - zaokrąglenie do groszy (połówki od zera), kwoty ujemne ze znakiem `-`.
 *
 * Zaokrąglenie liczy się na najkrótszym zapisie dziesiętnym liczby (tym z `String(kwota)`),
 * arytmetyką całkowitą na `bigint`. Dzięki temu `1.005` daje „1,01 zł”, a każda skończona
 * liczba, także `Number.MAX_VALUE`, jest zapisana w całości, bez notacji wykładniczej.
 *
 * @throws {TypeError} gdy `kwota` nie jest skończoną liczbą (`NaN`, `Infinity`, `-Infinity`).
 */
export function formatPLN(kwota: number): string {
  if (!Number.isFinite(kwota)) {
    throw new TypeError(`formatPLN: kwota musi być skończoną liczbą, otrzymano ${String(kwota)}`);
  }

  const grosze = naGrosze(Math.abs(kwota));
  const zlote = (grosze / 100n).toString();
  const reszta = (grosze % 100n).toString().padStart(2, "0");
  const zloteZGrupami = zlote.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const znak = kwota < 0 && grosze > 0n ? "-" : "";

  return `${znak}${zloteZGrupami},${reszta} zł`;
}

/** Zamienia skończoną liczbę nieujemną na grosze, zaokrąglając połówki w górę. */
function naGrosze(wartosc: number): bigint {
  // String() dla skończonej liczby nieujemnej daje np. "1.005", "1e+308" albo "1.5e-7".
  const dopasowanie = /^(\d+)(?:\.(\d+))?(?:e([+-]\d+))?$/.exec(String(wartosc));
  if (dopasowanie === null) {
    throw new TypeError(`formatPLN: nieobsługiwany zapis liczby ${String(wartosc)}`);
  }
  const [, calkowita = "0", ulamek = "", wykladnik = "0"] = dopasowanie;

  // wartosc = cyfry * 10^potega, a grosze = wartosc * 10^2.
  const cyfry = BigInt(calkowita + ulamek);
  const potega = Number(wykladnik) - ulamek.length + 2;

  if (potega >= 0) {
    return cyfry * 10n ** BigInt(potega);
  }
  const dzielnik = 10n ** BigInt(-potega);
  const iloraz = cyfry / dzielnik;
  return 2n * (cyfry % dzielnik) >= dzielnik ? iloraz + 1n : iloraz;
}
