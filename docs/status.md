---
zadania_todo: 3
zadania_in_progress: 1
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 8
zadania_anulowane: 7
pr_otwarte: 1
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-26", "pytanie": "-", "decyzja": "Specyfikacji i architektury nie ma w repo (`docs/00-intake/specyfikacja.md`, `docs/04-architektura/architektura.md`), pracowałem z issue. Dodatkowo przeczytane: `src/index.ts`, `tests/smoke.test.ts`, `eslint.config.js`, `vitest.config.ts`, `docs/07-realizacja/T-23.md` (format raportu)."}, {"data": "2026-11-04", "zrodlo": "T-26", "pytanie": "Eksport z `src/index.ts`", "decyzja": "nie dodany, bo `src/index.ts` nie jest w „Zakresie” issue; funkcja dostępna z `src/formatPLN.ts`."}, {"data": "2026-11-04", "zrodlo": "T-26", "pytanie": "Minus przy kwocie, która po zaokrągleniu wynosi zero", "decyzja": "bez minusa („0,00 zł”), bo „-0,00 zł” myli czytelnika."}, {"data": "2026-11-04", "zrodlo": "T-26", "pytanie": "Reguła zaokrąglenia", "decyzja": "jak `Number.prototype.toFixed(2)`: połówki w górę liczone od dokładnej wartości liczby zmiennoprzecinkowej (np. 0.125 → 0,13, ale 1.005 → 1,00, bo 1.005 w binarnym zapisie jest mniejsze)."}, {"data": "2026-11-04", "zrodlo": "T-26", "pytanie": "Znak minus", "decyzja": "ASCII `-` (U+002D), a nie U+2212, bo łatwiej go parsować i porównywać."}]
ostatnia_synchronizacja: 2026-11-04T18:39:43Z
---

# Status projektu

Plik wspólny, aktualizuje orkiestrator. Frontmatter zapisuje `scripts/sync-status.sh`: liczniki,
`wstrzymania` (wpisy z `~/sh/limity.md`) i `ostatnie_decyzje` (5 najnowszych z `decyzje.md`).
Widok w Obsidianie: `docs/_dashboard.md`.

## Bieżący etap

- `00-intake`: todo (następny)

## Punkt przekazania

Stan po ostatnim kamieniu milowym, potrzebny do wznowienia po `/clear` i „wznów”.

(brak)
