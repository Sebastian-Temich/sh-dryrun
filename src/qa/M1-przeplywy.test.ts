// QA M1 (sh-qa): przepływy między funkcjami biblioteki i scenariusze odbioru O-2–O-7 z planu,
// sprawdzane przez publiczny punkt wejścia src/index.ts. Biblioteka nie ma UI, więc zamiast
// Playwrighta test vitest uruchamiany przez CI (job test, pnpm test).
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as biblioteka from '../index.js';
import { chunk, formatPLN, przelicz, retry, slugify } from '../index.js';

afterEach(() => {
  vi.useRealTimers();
});

describe('QA M1: punkt wejścia (O-7)', () => {
  it('eksportuje wszystkie funkcje M1 poza anulowanym kursNBP (ADR-002)', () => {
    expect(Object.keys(biblioteka).sort()).toEqual(['chunk', 'formatPLN', 'przelicz', 'retry', 'slugify']);
  });
});

describe('QA M1: przepływy między funkcjami', () => {
  it('przelicz → formatPLN: 10 EUR po 4,30 daje „43,00 zł” (W-06 → W-02)', async () => {
    const grosze = await przelicz(10, 'EUR', { kurs: 4.3 });
    expect(formatPLN(grosze)).toBe('43,00 zł');
  });

  it('retry jako źródło kursu przelicz: przejściowy błąd źródła nie psuje wyniku (W-04 → W-06)', async () => {
    vi.useFakeTimers();
    let wywolania = 0;
    const zawodneZrodlo = (): Promise<number> => {
      wywolania += 1;
      return wywolania < 2 ? Promise.reject(new Error('chwilowy błąd')) : Promise.resolve(4.25);
    };
    const wynik = przelicz(2, 'EUR', { zrodloKursu: () => retry(zawodneZrodlo, { proby: 3, przerwa: 200 }) });
    await vi.advanceTimersByTimeAsync(200);
    await expect(wynik).resolves.toBe(850);
    expect(wywolania).toBe(2);
  });

  it('chunk → formatPLN: lista kwot w partiach po 2 (W-03 → W-02)', () => {
    const partie = chunk([123456, 0, -1250], 2).map((partia) => partia.map(formatPLN));
    expect(partie).toEqual([['1 234,56 zł', '0,00 zł'], ['-12,50 zł']]);
  });

  it('slugify nazw walut do kluczy partii (W-01 → W-03)', () => {
    const klucze = chunk(['Złoty Polski', 'Euro', 'Dolar Amerykański'].map(slugify), 2);
    expect(klucze).toEqual([['zloty-polski', 'euro'], ['dolar-amerykanski']]);
  });

  it('przelicz bez kursu i źródła daje błąd „Brak kursu” (stan po anulowaniu W-05)', async () => {
    await expect(przelicz(1, 'EUR')).rejects.toThrow(new RangeError('Brak kursu: podaj kurs albo źródło kursu'));
  });
});
