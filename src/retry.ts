// W-04: ponawianie wywołania asynchronicznego. Po każdym błędzie czeka, a przerwa rośnie
// dwukrotnie z próby na próbę. Domyślnie 3 próby i 200 ms (decyzje.md, P4).

export interface OpcjeRetry {
  /** Łączna liczba wywołań `fn`, liczba całkowita co najmniej 1. Domyślnie 3. */
  proby?: number;
  /** Przerwa w ms po pierwszym błędzie, podwajana po każdym kolejnym. Domyślnie 200. */
  przerwa?: number;
}

const DOMYSLNE_PROBY = 3;
const DOMYSLNA_PRZERWA = 200;

function czekaj(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(fn: () => Promise<T>, opcje: OpcjeRetry = {}): Promise<T> {
  const { proby = DOMYSLNE_PROBY, przerwa = DOMYSLNA_PRZERWA } = opcje;
  if (!Number.isInteger(proby) || proby < 1) {
    throw new RangeError('Liczba prób musi być co najmniej 1');
  }

  let ostatniBlad: unknown;
  for (let proba = 1; proba <= proby; proba += 1) {
    try {
      return await fn();
    } catch (blad) {
      ostatniBlad = blad;
    }
    if (proba < proby) {
      await czekaj(przerwa * 2 ** (proba - 1));
    }
  }
  throw ostatniBlad;
}
