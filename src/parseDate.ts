/** Format polski DD.MM.RRRR. */
const FORMAT_PL = /^(\d{2})\.(\d{2})\.(\d{4})$/;
/** Format ISO RRRR-MM-DD (sama data, bez czasu). */
const FORMAT_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parsuje datę w formacie polskim `DD.MM.RRRR` albo ISO `RRRR-MM-DD` na `Date` o północy UTC,
 * np. `"04.11.2026"` i `"2026-11-04"` → `2026-11-04T00:00:00.000Z`.
 *
 * Format jest ścisły: dokładnie 2 cyfry dnia i miesiąca, 4 cyfry roku, bez spacji i czasu.
 *
 * @throws {RangeError} gdy napis nie pasuje do żadnego formatu albo data nie istnieje
 *   (np. `31.02.2026`, miesiąc `13`, dzień `00`).
 */
export function parseDate(str: string): Date {
  let rok: number;
  let miesiac: number;
  let dzien: number;

  const pl = FORMAT_PL.exec(str);
  const iso = pl ? null : FORMAT_ISO.exec(str);
  if (pl) {
    dzien = Number(pl[1]);
    miesiac = Number(pl[2]);
    rok = Number(pl[3]);
  } else if (iso) {
    rok = Number(iso[1]);
    miesiac = Number(iso[2]);
    dzien = Number(iso[3]);
  } else {
    throw new RangeError(
      `parseDate: oczekiwano formatu DD.MM.RRRR albo RRRR-MM-DD, otrzymano ${JSON.stringify(str)}`,
    );
  }

  const data = new Date(0);
  // setUTCFullYear zamiast Date.UTC: Date.UTC zamienia lata 0–99 na 1900–1999.
  data.setUTCFullYear(rok, miesiac - 1, dzien);

  // Date przenosi nadmiar (31.02 → 03.03), więc nieistniejąca data zmienia składowe.
  if (
    data.getUTCFullYear() !== rok ||
    data.getUTCMonth() !== miesiac - 1 ||
    data.getUTCDate() !== dzien
  ) {
    throw new RangeError(`parseDate: data nie istnieje: ${JSON.stringify(str)}`);
  }
  return data;
}
