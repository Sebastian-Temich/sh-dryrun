import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// W-07 (#104): sekcja „Użycie” w README.md ma przykład importu z dist/index.js każdej funkcji
// eksportowanej z src/index.ts.

const README = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

/** Treść sekcji drugiego poziomu `## tytul` do następnego nagłówka `## ` albo końca pliku. */
function sekcja(markdown: string, tytul: string): string {
  const linie = markdown.split('\n');
  const start = linie.indexOf(`## ${tytul}`);
  if (start < 0) {
    return '';
  }
  const koniec = linie.findIndex((l, i) => i > start && l.startsWith('## '));
  return linie.slice(start + 1, koniec < 0 ? undefined : koniec).join('\n');
}

/** Bloki kodu ```ts i ```js z tekstu. */
function blokiKodu(markdown: string): string[] {
  return [...markdown.matchAll(/^```(?:ts|js)\n([\s\S]*?)^```$/gm)].map((m) => m[1] ?? '');
}

/** Nazwy importowane w bloku z modułu kończącego się na dist/index.js. */
function importyZDist(blok: string): string[] {
  return [...blok.matchAll(/import\s*\{([^}]*)\}\s*from\s*'[^']*dist\/index\.js'/g)].flatMap((m) =>
    (m[1] ?? '')
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n !== ''),
  );
}

const uzycie = sekcja(README, 'Użycie');
const bloki = blokiKodu(uzycie);

describe('README.md, sekcja Użycie (W-07)', () => {
  it('istnieje i ma bloki kodu', () => {
    expect(uzycie.trim()).not.toBe('');
    expect(bloki.length).toBeGreaterThan(0);
  });

  it('każdy eksport z src/index.ts ma blok z importem z dist/index.js i wywołaniem', async () => {
    const eksporty = Object.keys(await import('./index.js'));
    expect(eksporty.length).toBeGreaterThan(0);

    const bezPrzykladu = eksporty.filter(
      (nazwa) =>
        !bloki.some((b) => importyZDist(b).includes(nazwa) && new RegExp(`\\b${nazwa}\\(`).test(b)),
    );
    expect(bezPrzykladu).toEqual([]);
  });

  it('importuje z dist/index.js tylko nazwy, które src/index.ts eksportuje', async () => {
    const eksporty = Object.keys(await import('./index.js'));
    const zaimportowane = bloki.flatMap(importyZDist);
    expect(zaimportowane.filter((n) => !eksporty.includes(n))).toEqual([]);
  });
});
