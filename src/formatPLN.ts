// Twarda spacja U+00A0 kodem znaku, żeby w źródle nie było niewidocznego znaku.
const NBSP = String.fromCharCode(0xa0);

/** Cyfry złotych pogrupowane po trzy od prawej, oddzielone twardą spacją (także od 1000). */
function grupuj(cyfry: string): string {
  return cyfry.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/**
 * Formatuje kwotę w złotych po polsku (W-03): „1 234,50 zł”, z twardą spacją U+00A0 jako
 * separatorem tysięcy i przed „zł”. Zaokrągla do groszy połówkami od zera na wartości dziesiętnej
 * (1.005 daje „1,01 zł”). Kwota zaokrąglona do zera nie ma minusa.
 *
 * @throws {TypeError} gdy kwota to NaN, Infinity albo -Infinity.
 */
export function formatPLN(kwota: number): string {
  if (!Number.isFinite(kwota)) {
    throw new TypeError("formatPLN: kwota musi być skończoną liczbą");
  }

  const wartosc = Math.abs(kwota);
  let grosze: bigint;
  if (Number.isInteger(wartosc)) {
    // Liczby całkowite (także powyżej 2^53) bez mnożenia, żeby nie tracić dokładności złotych.
    grosze = BigInt(wartosc) * 100n;
  } else {
    // toPrecision(15) usuwa błąd reprezentacji binarnej (1.005 * 100 = 100.49999999999999 → 100.5),
    // a Math.round na wartości nieujemnej zaokrągla połówki w górę, czyli od zera.
    grosze = BigInt(Math.round(Number((wartosc * 100).toPrecision(15))));
  }

  const zlote = grupuj((grosze / 100n).toString());
  const resztaGroszy = (grosze % 100n).toString().padStart(2, "0");
  const znak = kwota < 0 && grosze > 0n ? "-" : "";

  return `${znak}${zlote},${resztaGroszy}${NBSP}zł`;
}
