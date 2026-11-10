const KOMUNIKAT = "parseDate: nieprawidłowa data";

// Dokładnie DD.MM.RRRR albo RRRR-MM-DD: zera wiodące, rok z 4 cyfr, bez spacji na brzegach.
const POLSKI = /^(\d{2})\.(\d{2})\.(\d{4})$/;
const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parsuje datę „DD.MM.RRRR” albo „RRRR-MM-DD” (W-04) ściśle i zwraca północ UTC tego dnia.
 * Rok ma dokładnie 4 cyfry i jest od 0001; daty nieistniejące (31.02.2026, 29.02.2025) są błędem.
 *
 * @throws {RangeError} „parseDate: nieprawidłowa data” dla innego zapisu albo nieistniejącej daty.
 */
export function parseDate(str: string): Date {
  let rok: number;
  let miesiac: number;
  let dzien: number;

  const polski = POLSKI.exec(str);
  const iso = polski ? null : ISO.exec(str);
  if (polski) {
    dzien = Number(polski[1]);
    miesiac = Number(polski[2]);
    rok = Number(polski[3]);
  } else if (iso) {
    rok = Number(iso[1]);
    miesiac = Number(iso[2]);
    dzien = Number(iso[3]);
  } else {
    throw new RangeError(KOMUNIKAT);
  }

  if (rok < 1 || miesiac < 1 || miesiac > 12 || dzien < 1) {
    throw new RangeError(KOMUNIKAT);
  }

  // setUTCFullYear zamiast Date.UTC, bo Date.UTC przesuwa lata 0–99 o 1900.
  const data = new Date(0);
  data.setUTCFullYear(rok, miesiac - 1, dzien);

  // Nieistniejący dzień (31.02) przelewa się na następny miesiąc, więc porównanie go wykrywa.
  if (data.getUTCMonth() !== miesiac - 1 || data.getUTCDate() !== dzien) {
    throw new RangeError(KOMUNIKAT);
  }

  return data;
}
