import { describe, expect, it } from 'vitest';
import { formatPLN } from '../src/formatPLN.js';

// Separator tysięcy i odstęp przed „zł” to spacja twarda U+00A0 (NBSP), nie zwykła spacja U+0020.
// Spacja twarda nie pozwala przełamać kwoty między wierszami („1” / „234,50 zł”).
const NBSP = ' ';

/** Zamienia zwykłe spacje w oczekiwanym napisie na spacje twarde, żeby testy były czytelne. */
function kwota(tekst: string): string {
  return tekst.replaceAll(' ', NBSP);
}

describe('formatPLN', () => {
  it('formatuje 1234.5 jako „1 234,50 zł” ze spacją twardą (U+00A0)', () => {
    const wynik = formatPLN(1234.5);
    expect(wynik).toBe(`1${NBSP}234,50${NBSP}zł`);
    expect(wynik).not.toContain(' ');
  });

  it('nie dodaje separatora tysięcy dla kwot poniżej 1000', () => {
    expect(formatPLN(0)).toBe(kwota('0,00 zł'));
    expect(formatPLN(5)).toBe(kwota('5,00 zł'));
    expect(formatPLN(999.99)).toBe(kwota('999,99 zł'));
  });

  it('grupuje tysiące co trzy cyfry', () => {
    expect(formatPLN(1000)).toBe(kwota('1 000,00 zł'));
    expect(formatPLN(1234567.891)).toBe(kwota('1 234 567,89 zł'));
    expect(formatPLN(100000000)).toBe(kwota('100 000 000,00 zł'));
  });

  it('kwoty ujemne mają znak minus (U+002D) na początku', () => {
    expect(formatPLN(-1234.5)).toBe(kwota('-1 234,50 zł'));
    expect(formatPLN(-0.5)).toBe(kwota('-0,50 zł'));
  });

  it('zaokrągla do 2 miejsc po przecinku, połówki od zera', () => {
    expect(formatPLN(0.004)).toBe(kwota('0,00 zł'));
    expect(formatPLN(0.005)).toBe(kwota('0,01 zł'));
    expect(formatPLN(1.005)).toBe(kwota('1,01 zł'));
    expect(formatPLN(2.675)).toBe(kwota('2,68 zł'));
    expect(formatPLN(999.995)).toBe(kwota('1 000,00 zł'));
    expect(formatPLN(-1.005)).toBe(kwota('-1,01 zł'));
    expect(formatPLN(-2.345)).toBe(kwota('-2,35 zł'));
  });

  it('nie pokazuje minusa, gdy kwota ujemna zaokrągla się do zera', () => {
    expect(formatPLN(-0.004)).toBe(kwota('0,00 zł'));
    expect(formatPLN(-0)).toBe(kwota('0,00 zł'));
  });

  it('obsługuje bardzo duże i bardzo małe kwoty', () => {
    expect(formatPLN(1e-7)).toBe(kwota('0,00 zł'));
    expect(formatPLN(1e21)).toBe(kwota('1 000 000 000 000 000 000 000,00 zł'));
  });

  it.each([NaN, Infinity, -Infinity])('rzuca TypeError dla %s', (wartosc) => {
    expect(() => formatPLN(wartosc)).toThrow(TypeError);
  });
});
