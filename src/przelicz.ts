// W-06: przeliczenie kwoty w walucie obcej na grosze (ADR-002). Moduł nie zależy od W-05:
// kurs NBP programista przekazuje jako `zrodloKursu`, np. async (k) => (await kursNBP(k)).kurs.

export interface OpcjePrzelicz {
  /** Kurs podany wprost (złote za jednostkę waluty). Ma pierwszeństwo przed `zrodloKursu`. */
  kurs?: number;
  /** Źródło kursu używane, gdy `kurs` nie jest podany. */
  zrodloKursu?: (kod: string) => Promise<number>;
}

const BLAD_DANYCH = 'Nieprawidłowa kwota albo kurs';
const BRAK_KURSU = 'Brak kursu: podaj kurs albo źródło kursu';

/** Liczba dziesiętnie: wartość = mantysa × 10^wykladnik. */
interface Dziesietna {
  mantysa: bigint;
  wykladnik: number;
}

/**
 * Najkrótszy zapis dziesiętny liczby (String(x)) jako mantysa i wykładnik, bez błędu binarnego:
 * 4.225 to 4225 × 10^-3, a nie 4.22499999….
 */
function naDziesietna(x: number): Dziesietna {
  const [czesc = '0', wyk = '0'] = String(x).split('e');
  const [calkowita = '0', ulamek = ''] = czesc.split('.');
  return {
    mantysa: BigInt(calkowita + ulamek),
    wykladnik: Number(wyk) - ulamek.length,
  };
}

function czyPoprawna(x: unknown, dopuscZero: boolean): x is number {
  return typeof x === 'number' && Number.isFinite(x) && (dopuscZero ? x >= 0 : x > 0);
}

/** kwota × kurs × 100, zaokrąglone do pełnego grosza, połówki w górę (P6). Obie liczby nieujemne. */
function naGrosze(kwota: number, kurs: number): number {
  const a = naDziesietna(kwota);
  const b = naDziesietna(kurs);
  const mantysa = a.mantysa * b.mantysa;
  const wykladnik = a.wykladnik + b.wykladnik + 2;
  if (wykladnik >= 0) {
    return Number(mantysa * 10n ** BigInt(wykladnik));
  }
  const dzielnik = 10n ** BigInt(-wykladnik);
  const iloraz = mantysa / dzielnik;
  const reszta = mantysa % dzielnik;
  return Number(2n * reszta >= dzielnik ? iloraz + 1n : iloraz);
}

/**
 * Przelicza kwotę w walucie `kod` na grosze. Kurs bierze z `opcje.kurs`, a bez niego z
 * `opcje.zrodloKursu(kod)`. Błąd źródła kursu przechodzi bez zmian.
 *
 * @throws RangeError „Nieprawidłowa kwota albo kurs” dla kwoty ujemnej, nieskończonej albo nie liczby
 *   i dla kursu niedodatniego albo nie liczby.
 * @throws RangeError „Brak kursu: podaj kurs albo źródło kursu”, gdy brak `kurs` i `zrodloKursu`.
 */
export async function przelicz(kwota: number, kod: string, opcje: OpcjePrzelicz = {}): Promise<number> {
  if (!czyPoprawna(kwota, true)) {
    throw new RangeError(BLAD_DANYCH);
  }
  let kurs: unknown = opcje.kurs;
  if (kurs === undefined) {
    if (opcje.zrodloKursu === undefined) {
      throw new RangeError(BRAK_KURSU);
    }
    kurs = await opcje.zrodloKursu(kod);
  }
  if (!czyPoprawna(kurs, false)) {
    throw new RangeError(BLAD_DANYCH);
  }
  return naGrosze(kwota, kurs);
}
