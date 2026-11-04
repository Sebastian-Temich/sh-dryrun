// QA M1: przepływy między funkcjami biblioteki i publiczny punkt wejścia pakietu.
// Biblioteka bez UI: testy QA w vitest zamiast Playwright (decyzja w raporcie QA M1).
import { describe, expect, test } from 'vitest';
import * as pakiet from '../../src/index.js';
import { formatPLN } from '../../src/formatPLN.js';
import { parseDate } from '../../src/parseDate.js';
import { slugify } from '../../src/slugify.js';
import { sum } from '../../src/sum.js';

describe('QA M1: przepływ raportu (parseDate → sum → formatPLN → slugify)', () => {
  test('data z obu formatów, suma pozycji i slug raportu składają się w jeden wynik', () => {
    const d1 = parseDate('04.11.2026');
    const d2 = parseDate('2026-11-04');
    expect(d1.getTime()).toBe(d2.getTime());
    const kwota = sum(1000, 234.5);
    expect(formatPLN(kwota).replace(/\s/g, ' ')).toBe('1 234,50 zł');
    const slug = slugify(`Raport ${d1.toISOString().slice(0, 10)} Łódź`);
    expect(slug).toBe('raport-2026-11-04-lodz');
  });

  test('błędne wejście zatrzymuje przepływ wyjątkiem z właściwej funkcji', () => {
    expect(() => parseDate('31.02.2026')).toThrow(RangeError);
    expect(() => formatPLN(sum(1, Number.NaN))).toThrow(TypeError);
  });
});

describe('QA M1: publiczny punkt wejścia pakietu', () => {
  // QA-M1-1: src/index.ts (exports "." → dist/index.js) nie reeksportuje funkcji biblioteki.
  // test.fails: oczekiwane niepowodzenie do naprawy; po naprawie zwykły test (kryterium issue).
  test.fails('QA-M1-1: punkt wejścia eksportuje sum, slugify, formatPLN, parseDate', () => {
    const p = pakiet as Record<string, unknown>;
    for (const nazwa of ['sum', 'slugify', 'formatPLN', 'parseDate']) {
      expect(typeof p[nazwa]).toBe('function');
    }
  });
});
