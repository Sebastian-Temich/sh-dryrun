import { describe, expect, it } from 'vitest';
import { capitalize } from '../src/capitalize.js';
import { capitalize as capitalizeZPakietu } from '../src/index.js';

describe('capitalize', () => {
  it('zamienia „ala ma kota” na „Ala ma kota”', () => {
    expect(capitalize('ala ma kota')).toBe('Ala ma kota');
  });

  it('zamienia „łódź” na „Łódź” (wielka litera według pl-PL)', () => {
    expect(capitalize('łódź')).toBe('Łódź');
  });

  it('zostawia pozostałe znaki bez zmian', () => {
    expect(capitalize('aBC')).toBe('ABC');
  });

  it('daje pusty string dla pustego tekstu', () => {
    expect(capitalize('')).toBe('');
  });

  it('nie zmienia tekstu, który zaczyna się od wielkiej litery albo znaku bez wielkiej formy', () => {
    expect(capitalize('Ala')).toBe('Ala');
    expect(capitalize(' ala')).toBe(' ala');
    expect(capitalize('1. punkt')).toBe('1. punkt');
  });

  it('jest reeksportowana z punktu wejścia pakietu', () => {
    expect(capitalizeZPakietu).toBe(capitalize);
  });
});
