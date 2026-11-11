const KOMUNIKAT_ROZMIAR = 'Rozmiar części musi być dodatnią liczbą całkowitą';

/**
 * Dzieli tablicę na części o rozmiarze `n` (W-03). Ostatnia część może być mniejsza.
 * Tablica wejściowa nie jest zmieniana.
 *
 * @throws {RangeError} gdy `n` nie jest dodatnią liczbą całkowitą.
 */
export function chunk<T>(a: readonly T[], n: number): T[][] {
  if (!Number.isInteger(n) || n <= 0) {
    throw new RangeError(KOMUNIKAT_ROZMIAR);
  }
  const czesci: T[][] = [];
  for (let i = 0; i < a.length; i += n) {
    czesci.push(a.slice(i, i + n));
  }
  return czesci;
}
