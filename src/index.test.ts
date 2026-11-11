import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const SEKCJE = [
  '// W-01 slug',
  '// W-02 format kwoty',
  '// W-03 dzielenie tablicy',
  '// W-04 ponawianie',
  '// W-05 kurs NBP',
  '// W-06 przeliczenie',
];

describe('src/index.ts (szkielet, W-07)', () => {
  it('importuje się jako moduł ESM, a każdy eksport jest funkcją', async () => {
    const modul: Record<string, unknown> = await import('./index.js');
    const inne = Object.values(modul).filter((v) => typeof v !== 'function');
    expect(inne).toEqual([]);
  });

  it('ma sekcje W-01–W-06 w kolejności, pod każdym komentarzem pusta linia albo eksport', () => {
    const zrodlo = readFileSync(new URL('./index.ts', import.meta.url), 'utf8');
    const linie = zrodlo.split('\n');
    const pozycje = SEKCJE.map((s) => linie.indexOf(s));

    expect(pozycje.every((p) => p >= 0)).toBe(true);
    expect([...pozycje].sort((a, b) => a - b)).toEqual(pozycje);
    for (const p of pozycje) {
      expect(linie[p + 1]).toMatch(/^(export \{ \w+(, \w+)* \} from '\.\/[\w-]+\.js';)?$/);
    }
    // komentarz, pusta linia na eksport, pusta linia odstępu przed kolejną sekcją
    const odstepy = pozycje.slice(1).map((p, i) => p - (pozycje[i] ?? 0));
    expect(odstepy.every((o) => o >= 3)).toBe(true);
  });
});
