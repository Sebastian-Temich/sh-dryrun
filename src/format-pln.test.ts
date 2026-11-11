import { describe, expect, it } from 'vitest';
import { formatPLN } from './index.js';

const BLAD = 'Kwota musi być całkowitą liczbą groszy';

const kodyZnakow = (tekst: string): number[] =>
  Array.from({ length: tekst.length }, (_, i) => tekst.charCodeAt(i));

describe('formatPLN (W-02)', () => {
  it('W-02/K1: 123456 groszy daje „1 234,56 zł” ze zwykłą spacją U+0020', () => {
    const wynik = formatPLN(123456);
    expect(wynik).toBe('1 234,56 zł');
    // spacje to U+0020 (0x20), bez twardej U+00A0 (0xa0) i wąskiej U+202F (0x202f)
    expect(wynik.charCodeAt(1)).toBe(0x20);
    expect(kodyZnakow(wynik)).not.toContain(0xa0);
    expect(kodyZnakow(wynik)).not.toContain(0x202f);
  });

  it('W-02/K2: 0 groszy daje „0,00 zł”', () => {
    expect(formatPLN(0)).toBe('0,00 zł');
  });

  it('W-02/K3: -1250 groszy daje „-12,50 zł”', () => {
    expect(formatPLN(-1250)).toBe('-12,50 zł');
  });

  it('-0 groszy daje „0,00 zł” bez minusa', () => {
    expect(formatPLN(-0)).toBe('0,00 zł');
  });

  it('kwoty poniżej złotówki i na granicy tysięcy mają poprawne zera i separatory', () => {
    expect(formatPLN(5)).toBe('0,05 zł');
    expect(formatPLN(-99)).toBe('-0,99 zł');
    expect(formatPLN(100000)).toBe('1 000,00 zł');
    expect(formatPLN(99999)).toBe('999,99 zł');
    expect(formatPLN(-100000000)).toBe('-1 000 000,00 zł');
  });

  it('W-02/K4: 12.5 daje RangeError „Kwota musi być całkowitą liczbą groszy”', () => {
    expect(() => formatPLN(12.5)).toThrow(RangeError);
    expect(() => formatPLN(12.5)).toThrow(BLAD);
  });

  it('W-02/K4: NaN daje RangeError „Kwota musi być całkowitą liczbą groszy”', () => {
    expect(() => formatPLN(NaN)).toThrow(RangeError);
    expect(() => formatPLN(NaN)).toThrow(BLAD);
  });

  it('nieskończoność, kwota spoza bezpiecznego zakresu i wartość niebędąca liczbą dają RangeError', () => {
    expect(() => formatPLN(Infinity)).toThrow(new RangeError(BLAD));
    expect(() => formatPLN(Number.MAX_SAFE_INTEGER + 1)).toThrow(new RangeError(BLAD));
    expect(() => formatPLN('100' as unknown as number)).toThrow(new RangeError(BLAD));
  });

  it('W-02/K5: Number.MAX_SAFE_INTEGER daje „90 071 992 547 409,91 zł” bez utraty cyfr', () => {
    expect(formatPLN(Number.MAX_SAFE_INTEGER)).toBe('90 071 992 547 409,91 zł');
    expect(formatPLN(-Number.MAX_SAFE_INTEGER)).toBe('-90 071 992 547 409,91 zł');
  });
});
