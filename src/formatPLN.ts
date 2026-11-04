const NBSP = " ";

/**
 * Formatuje kwotę w złotych w polskim formacie, np. `1234.5` → `"1 234,50 zł"`.
 *
 * - separator tysięcy i odstęp przed „zł” to spacja twarda (U+00A0),
 * - separator dziesiętny to przecinek, zawsze 2 miejsca po przecinku,
 * - zaokrąglenie do 2 miejsc jak w `Number.prototype.toFixed` (połówki w górę, liczone od dokładnej
 *   wartości liczby zmiennoprzecinkowej),
 * - kwoty ujemne mają znak `-`; kwota, która po zaokrągleniu wynosi zero, nie ma znaku.
 *
 * @throws {TypeError} gdy kwota to `NaN` albo `±Infinity`.
 */
export function formatPLN(kwota: number): string {
  if (!Number.isFinite(kwota)) {
    throw new TypeError(`formatPLN: kwota musi być skończoną liczbą, otrzymano ${String(kwota)}`);
  }

  const modul = Math.abs(kwota);
  // toFixed przechodzi na notację wykładniczą od 1e21; takie liczby są i tak całkowite.
  const stala = modul < 1e21 ? modul.toFixed(2) : `${BigInt(modul).toString()}.00`;
  const [calkowita = "0", ulamkowa = "00"] = stala.split(".");

  const zGrupami = calkowita.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  const zero = /^[0.]+$/.test(stala);
  const znak = kwota < 0 && !zero ? "-" : "";

  return `${znak}${zGrupami},${ulamkowa}${NBSP}zł`;
}
