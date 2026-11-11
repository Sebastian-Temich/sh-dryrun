import { describe, expect, it } from 'vitest';
import { slugify } from './index.js';

describe('slugify (W-01)', () => {
  it('W-01/K1: polskie znaki zamienia na łacińskie, małe litery, usuwa interpunkcję', () => {
    expect(slugify('Zażółć Gęślą Jaźń!')).toBe('zazolc-gesla-jazn');
  });

  it('W-01/K2: wielokrotne spacje dają jeden myślnik, bez myślników na końcach', () => {
    expect(slugify('  wiele   spacji  ')).toBe('wiele-spacji');
  });

  it('W-01/K3: zostawia cyfry i usuwa emoji („Łódź 2026 🚀”)', () => {
    expect(slugify('Łódź 2026 🚀')).toBe('lodz-2026');
  });

  it.each([
    ['liczba', 42],
    ['null', null],
    ['undefined', undefined],
    ['obiekt', { tekst: 'a' }],
    ['tablica', ['a']],
  ])('W-01/K4: %s zamiast tekstu daje TypeError „Oczekiwano tekstu”', (_nazwa, wartosc) => {
    const wywolaj = (): string => slugify(wartosc as unknown as string);
    expect(wywolaj).toThrow(TypeError);
    expect(wywolaj).toThrow('Oczekiwano tekstu');
  });

  it('stan „Pusty”: pusty tekst i same spacje dają pusty slug', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
  });

  it('stan „Częściowy sukces”: znaki spoza alfabetu łacińskiego są usuwane', () => {
    expect(slugify('Привет мир 🚀')).toBe('');
    expect(slugify('Kraków — Москва')).toBe('krakow');
  });

  it('wszystkie polskie litery, małe i wielkie, mają łacińskie odpowiedniki', () => {
    expect(slugify('ąćęłńóśźż ĄĆĘŁŃÓŚŹŻ')).toBe('acelnoszz-acelnoszz');
  });

  it('podkreślenia, myślniki i twarda spacja rozdzielają słowa jednym myślnikiem', () => {
    expect(slugify('a_b--c d')).toBe('a-b-c-d');
  });
});
