const FORMAT_PL = /^(\d{2})\.(\d{2})\.(\d{4})$/;
const FORMAT_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parsuje datę w formacie polskim `DD.MM.RRRR` albo ISO `RRRR-MM-DD`.
 *
 * Wynik to północ UTC danego dnia, np. `"04.11.2026"` i `"2026-11-04"` → `2026-11-04T00:00:00.000Z`.
 * Format jest ścisły: dokładnie 2 cyfry dnia i miesiąca, 4 cyfry roku, bez spacji i godziny.
 *
 * @throws {RangeError} gdy napis ma zły format albo data nie istnieje (np. `31.02.2026`, rok `0000`).
 */
export function parseDate(str: string): Date {
  if (typeof str !== "string") {
    throw new RangeError(`parseDate: oczekiwano napisu, otrzymano ${typeof str}`);
  }

  let rok: number;
  let miesiac: number;
  let dzien: number;

  const pl = FORMAT_PL.exec(str);
  const iso = pl ? null : FORMAT_ISO.exec(str);
  if (pl) {
    [dzien, miesiac, rok] = [Number(pl[1]), Number(pl[2]), Number(pl[3])];
  } else if (iso) {
    [rok, miesiac, dzien] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  } else {
    throw new RangeError(`parseDate: zły format daty „${str}”, oczekiwano DD.MM.RRRR albo RRRR-MM-DD`);
  }

  const data = new Date(0);
  // setUTCFullYear, bo Date.UTC traktuje lata 0–99 jako 1900–1999.
  data.setUTCFullYear(rok, miesiac - 1, dzien);

  if (
    rok < 1 ||
    data.getUTCFullYear() !== rok ||
    data.getUTCMonth() !== miesiac - 1 ||
    data.getUTCDate() !== dzien
  ) {
    throw new RangeError(`parseDate: data „${str}” nie istnieje`);
  }

  return data;
}
