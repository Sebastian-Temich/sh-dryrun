import { describe, expect, it } from 'vitest';
import { formatPLN } from '../src/formatPLN.js';
import { parseDate } from '../src/parseDate.js';

// Spacja twarda U+00A0, której formatPLN używa jako separatora tysięcy i odstępu przed „zł”.
const NBSP = ' ';

describe('parseDate', () => {
  it('parsuje format polski DD.MM.RRRR jako północ UTC', () => {
    const data = parseDate('04.11.2026');
    expect(data).toBeInstanceOf(Date);
    expect(data.toISOString()).toBe('2026-11-04T00:00:00.000Z');
  });

  it('parsuje format ISO RRRR-MM-DD jako północ UTC', () => {
    expect(parseDate('2026-11-04').toISOString()).toBe('2026-11-04T00:00:00.000Z');
  });

  it('„04.11.2026” i „2026-11-04” dają ten sam dzień', () => {
    expect(parseDate('04.11.2026').getTime()).toBe(parseDate('2026-11-04').getTime());
  });

  it('obsługuje 29 lutego w roku przestępnym i granice roku', () => {
    expect(parseDate('29.02.2024').toISOString()).toBe('2024-02-29T00:00:00.000Z');
    expect(parseDate('2000-02-29').toISOString()).toBe('2000-02-29T00:00:00.000Z');
    expect(parseDate('01.01.2026').toISOString()).toBe('2026-01-01T00:00:00.000Z');
    expect(parseDate('31.12.2026').toISOString()).toBe('2026-12-31T00:00:00.000Z');
  });

  it('obsługuje lata 0000–0099 bez przesunięcia na 19xx', () => {
    expect(parseDate('0050-03-01').getUTCFullYear()).toBe(50);
    expect(parseDate('01.03.0050').getUTCFullYear()).toBe(50);
  });

  it.each([
    '31.02.2026',
    '29.02.2026',
    '1900-02-29',
    '31.04.2026',
    '2026-04-31',
    '00.11.2026',
    '04.00.2026',
    '04.13.2026',
    '2026-13-01',
    '2026-11-00',
    '32.01.2026',
  ])('rzuca RangeError dla nieistniejącej daty %s', (wejscie) => {
    expect(() => parseDate(wejscie)).toThrow(RangeError);
  });

  it.each([
    '',
    '4.11.2026',
    '04.11.26',
    '04/11/2026',
    '04-11-2026',
    '2026.11.04',
    '2026-11-4',
    '2026-11-04T00:00:00Z',
    ' 04.11.2026',
    '04.11.2026 ',
    '04.11-2026',
    'abc',
    '٠٤.١١.٢٠٢٦',
  ])('rzuca RangeError dla złego formatu %j', (wejscie) => {
    expect(() => parseDate(wejscie)).toThrow(RangeError);
  });

  it('scenariusz raportu: data i kwota formatowana przez formatPLN', () => {
    const pozycje = [
      { data: '04.11.2026', kwota: 1234.5 },
      { data: '2026-11-04', kwota: -0.5 },
    ];

    const wiersze = pozycje.map(({ data, kwota }) => {
      const dzien = parseDate(data);
      const dd = String(dzien.getUTCDate()).padStart(2, '0');
      const mm = String(dzien.getUTCMonth() + 1).padStart(2, '0');
      return `${dd}.${mm}.${String(dzien.getUTCFullYear())}: ${formatPLN(kwota)}`;
    });

    expect(wiersze).toEqual([
      `04.11.2026: 1${NBSP}234,50${NBSP}zł`,
      `04.11.2026: -0,50${NBSP}zł`,
    ]);
  });
});
