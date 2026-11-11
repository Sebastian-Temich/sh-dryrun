import { describe, expect, expectTypeOf, it } from 'vitest';
import { chunk } from './index.js';

const KOMUNIKAT = 'Rozmiar części musi być dodatnią liczbą całkowitą';

describe('chunk (W-03)', () => {
  it('W-03/K1: [1,2,3,4,5] i 2 daje [[1,2],[3,4],[5]]', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('W-03/K2: [] i 3 daje []', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it.each([0, -1, 1.5])(
    'W-03/K3: rozmiar %s daje RangeError „Rozmiar części musi być dodatnią liczbą całkowitą”',
    (rozmiar) => {
      const wywolaj = (): number[][] => chunk([1, 2, 3], rozmiar);
      expect(wywolaj).toThrow(RangeError);
      expect(wywolaj).toThrow(KOMUNIKAT);
    },
  );

  it.each([Number.NaN, Number.POSITIVE_INFINITY])(
    'W-03/K3: rozmiar %s (nie liczba całkowita) daje RangeError',
    (rozmiar) => {
      expect(() => chunk([1], rozmiar)).toThrow(new RangeError(KOMUNIKAT));
    },
  );

  it('W-03/K3: błędny rozmiar daje RangeError także dla pustej tablicy', () => {
    expect(() => chunk([], 0)).toThrow(new RangeError(KOMUNIKAT));
  });

  it('W-03/K4: tablica wejściowa jest niezmieniona', () => {
    const wejscie = Object.freeze([1, 2, 3, 4, 5]);
    const kopia = [...wejscie];
    const wynik = chunk(wejscie, 2);
    expect(wejscie).toEqual(kopia);
    expect(wynik[0]).not.toBe(wejscie);
  });

  it('W-03/K4: sygnatura chunk<T>(a: readonly T[], n: number): T[][] zachowuje typ elementów', () => {
    expectTypeOf(chunk).toEqualTypeOf<<T>(a: readonly T[], n: number) => T[][]>();
    const slowa: readonly string[] = ['a', 'b', 'c'];
    expectTypeOf(chunk(slowa, 2)).toEqualTypeOf<string[][]>();
    expect(chunk(slowa, 2)).toEqual([['a', 'b'], ['c']]);
  });

  it('stan „Sukces”: rozmiar większy niż długość daje jedną część, kolejność zachowana', () => {
    expect(chunk(['x', 'y', 'z'], 10)).toEqual([['x', 'y', 'z']]);
    expect(chunk([3, 1, 2], 1)).toEqual([[3], [1], [2]]);
  });

  it('stan „Sukces”: lista dzieląca się równo daje części jednakowego rozmiaru', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
