import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { przelicz } from './index.js';

const BLAD_DANYCH = 'Nieprawidłowa kwota albo kurs';
const BRAK_KURSU = 'Brak kursu: podaj kurs albo źródło kursu';

describe('przelicz (W-06)', () => {
  it('jest eksportowane z src/index.ts w sekcji // W-06', () => {
    expect(typeof przelicz).toBe('function');
    const linie = readFileSync(new URL('./index.ts', import.meta.url), 'utf8').split('\n');
    const sekcja = linie.indexOf('// W-06 przeliczenie');
    expect(sekcja).toBeGreaterThanOrEqual(0);
    expect(linie[sekcja + 1]).toBe("export { przelicz } from './przelicz.js';");
  });

  it('src/przelicz.ts nie importuje src/kurs-nbp.ts', () => {
    const zrodlo = readFileSync(new URL('./przelicz.ts', import.meta.url), 'utf8');
    expect(zrodlo).not.toMatch(/kurs-nbp/);
    expect(zrodlo).not.toMatch(/^\s*import\s/m);
  });

  it('W-06/K1: 10 EUR po kursie 4.3 daje 4300 groszy', async () => {
    await expect(przelicz(10, 'EUR', { kurs: 4.3 })).resolves.toBe(4300);
  });

  it('W-06/K2: 1 po kursie 4.225 (dokładnie 422,5 gr) daje 423, połówka w górę liczona dziesiętnie', async () => {
    await expect(przelicz(1, 'USD', { kurs: 4.225 })).resolves.toBe(423);
  });

  it('W-06/K2: 1 po kursie 4.2249 daje 422', async () => {
    await expect(przelicz(1, 'USD', { kurs: 4.2249 })).resolves.toBe(422);
  });

  it('zaokrągla dziesiętnie także dla kwoty z groszami (1.005 po kursie 1 to 101)', async () => {
    // 1.005 * 100 w binarnej arytmetyce daje 100.49999999999999
    await expect(przelicz(1.005, 'EUR', { kurs: 1 })).resolves.toBe(101);
  });

  it('obsługuje liczby w notacji wykładniczej (kwota 1e-7 daje 0, 1e21 po kursie 1 daje 1e23)', async () => {
    await expect(przelicz(1e-7, 'EUR', { kurs: 4.3 })).resolves.toBe(0);
    await expect(przelicz(1e21, 'EUR', { kurs: 1 })).resolves.toBe(1e23);
  });

  it('kwota zero daje zero groszy (stan „Pusty”)', async () => {
    await expect(przelicz(0, 'EUR', { kurs: 4.3 })).resolves.toBe(0);
  });

  it('W-06/K3: bez kursu bierze kurs ze źródła: 2 EUR przy atrapie 4.25 daje 850', async () => {
    const zrodloKursu = vi.fn((kod: string) => Promise.resolve(kod === 'EUR' ? 4.25 : 0));
    await expect(przelicz(2, 'EUR', { zrodloKursu })).resolves.toBe(850);
    expect(zrodloKursu).toHaveBeenCalledWith('EUR');
  });

  it('kurs podany wprost ma pierwszeństwo przed źródłem kursu', async () => {
    const zrodloKursu = vi.fn(() => Promise.resolve(4.25));
    await expect(przelicz(2, 'EUR', { kurs: 4.3, zrodloKursu })).resolves.toBe(860);
    expect(zrodloKursu).not.toHaveBeenCalled();
  });

  it('W-06/K3: bez kursu i bez źródła daje RangeError „Brak kursu: podaj kurs albo źródło kursu”', async () => {
    await expect(przelicz(2, 'EUR')).rejects.toThrow(new RangeError(BRAK_KURSU));
    await expect(przelicz(2, 'EUR', {})).rejects.toBeInstanceOf(RangeError);
  });

  it('błąd źródła kursu (np. „Usługa NBP niedostępna”) przechodzi bez zmian', async () => {
    const blad = new Error('Usługa NBP niedostępna');
    await expect(przelicz(2, 'EUR', { zrodloKursu: () => Promise.reject(blad) })).rejects.toBe(blad);
  });

  it('W-06/K4: kwota -1 daje RangeError „Nieprawidłowa kwota albo kurs”', async () => {
    await expect(przelicz(-1, 'EUR', { kurs: 4.3 })).rejects.toThrow(new RangeError(BLAD_DANYCH));
  });

  it('W-06/K4: kurs 0 daje RangeError „Nieprawidłowa kwota albo kurs”', async () => {
    await expect(przelicz(1, 'EUR', { kurs: 0 })).rejects.toThrow(new RangeError(BLAD_DANYCH));
  });

  it('kwota albo kurs nie będące skończoną liczbą dają RangeError „Nieprawidłowa kwota albo kurs”', async () => {
    const zle: [unknown, unknown][] = [
      [Number.NaN, 4.3],
      [Number.POSITIVE_INFINITY, 4.3],
      ['10', 4.3],
      [10, -4.3],
      [10, Number.NaN],
      [10, '4.3'],
    ];
    for (const [kwota, kurs] of zle) {
      await expect(przelicz(kwota as number, 'EUR', { kurs: kurs as number })).rejects.toThrow(
        new RangeError(BLAD_DANYCH),
      );
    }
  });

  it('kurs 0 ze źródła kursu daje RangeError „Nieprawidłowa kwota albo kurs”', async () => {
    await expect(przelicz(1, 'EUR', { zrodloKursu: () => Promise.resolve(0) })).rejects.toThrow(
      new RangeError(BLAD_DANYCH),
    );
  });

  it('kwota ujemna jest odrzucana przed pytaniem źródła kursu', async () => {
    const zrodloKursu = vi.fn(() => Promise.resolve(4.25));
    await expect(przelicz(-1, 'EUR', { zrodloKursu })).rejects.toThrow(new RangeError(BLAD_DANYCH));
    expect(zrodloKursu).not.toHaveBeenCalled();
  });
});
