const FORMAT_POLSKI = /^(\d{2})\.(\d{2})\.(\d{4})$/;
const FORMAT_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parsuje datę w formacie polskim `DD.MM.RRRR` albo ISO `RRRR-MM-DD`.
 *
 * Zwraca północ UTC danego dnia, więc `"04.11.2026"` i `"2026-11-04"` dają ten sam `Date`.
 * Format jest ścisły: dokładnie 2 cyfry dnia i miesiąca, 4 cyfry roku, bez spacji i godziny.
 *
 * @throws {RangeError} gdy napis ma zły format albo data nie istnieje (np. `31.02.2026`).
 */
export function parseDate(str: string): Date {
  const polski = FORMAT_POLSKI.exec(str);
  const iso = polski === null ? FORMAT_ISO.exec(str) : null;

  let rok: number;
  let miesiac: number;
  let dzien: number;
  if (polski !== null) {
    [dzien, miesiac, rok] = [Number(polski[1]), Number(polski[2]), Number(polski[3])];
  } else if (iso !== null) {
    [rok, miesiac, dzien] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  } else {
    throw new RangeError(`parseDate: oczekiwano DD.MM.RRRR albo RRRR-MM-DD, otrzymano ${JSON.stringify(str)}`);
  }

  // setUTCFullYear, a nie Date.UTC, bo Date.UTC zamienia lata 0–99 na 1900–1999.
  const data = new Date(0);
  data.setUTCFullYear(rok, miesiac - 1, dzien);

  if (data.getUTCFullYear() !== rok || data.getUTCMonth() !== miesiac - 1 || data.getUTCDate() !== dzien) {
    throw new RangeError(`parseDate: data ${JSON.stringify(str)} nie istnieje`);
  }
  return data;
}
