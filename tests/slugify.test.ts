import { describe, expect, it } from 'vitest';
import { slugify } from '../src/slugify.js';

describe('slugify', () => {
  it('zamienia „Zażółć gęślą jaźń: Łódź” na „zazolc-gesla-jazn-lodz”', () => {
    expect(slugify('Zażółć gęślą jaźń: Łódź')).toBe('zazolc-gesla-jazn-lodz');
  });

  it('transliteruje wszystkie polskie znaki, małe i wielkie', () => {
    expect(slugify('ąćęłńóśźż')).toBe('acelnoszz');
    expect(slugify('ĄĆĘŁŃÓŚŹŻ')).toBe('acelnoszz');
  });

  it('daje małe litery', () => {
    expect(slugify('Hello WORLD')).toBe('hello-world');
  });

  it('zostawia cyfry', () => {
    expect(slugify('Wersja 2.0 z 2026 r.')).toBe('wersja-2-0-z-2026-r');
  });

  it('zawiera tylko znaki [a-z0-9-]', () => {
    const wynik = slugify('Ala_ma@kota! #1 (ü, é, ñ) ~/\\ "cytat" 🙂 Ω');
    expect(wynik).toMatch(/^[a-z0-9-]*$/);
    expect(wynik).toBe('ala-ma-kota-1-u-e-n-cytat');
  });

  it('nie ma powtórzonych myślników', () => {
    expect(slugify('a  --  b')).toBe('a-b');
    expect(slugify('a - - - b')).toBe('a-b');
    expect(slugify('a!!!???b')).toBe('a-b');
  });

  it('nie ma myślników na początku i końcu', () => {
    expect(slugify('  --Łódź--  ')).toBe('lodz');
    expect(slugify('!!! tekst ???')).toBe('tekst');
    expect(slugify('-a-')).toBe('a');
  });

  it('białe znaki (tab, nowa linia, spacja twarda) zamienia na myślnik', () => {
    expect(slugify('a\tb\nc d')).toBe('a-b-c-d');
  });

  it('daje pusty string dla pustego tekstu', () => {
    expect(slugify('')).toBe('');
  });

  it.each(['   ', '---', '!@#$%^&*()', ': ; , . ?', '🙂🙂', '\t\n'])(
    'daje pusty string dla tekstu z samych znaków specjalnych: %j',
    (tekst) => {
      expect(slugify(tekst)).toBe('');
    },
  );
});
