---
zadania_todo: 0
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 17
zadania_anulowane: 9
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-43", "pytanie": "Plik spoza „Zakresu”", "decyzja": "`docs/07-realizacja/T-43.md` (raport wymagany przez proces). Projekt nie ma `docs/00-intake/specyfikacja.md` ani `docs/04-architektura/architektura.md`; dodatkowo przeczytane `src/formatPLN.ts`, `src/index.ts`, `tests/formatPLN.test.ts`, `tests/sum.test.ts`, `docs/07-realizacja/T-41.md`, szablony raportu i PR."}, {"data": "2026-11-04", "zrodlo": "T-43", "pytanie": "Scenariusz raportu bez funkcji formatującej datę w `src/`", "decyzja": "formatowanie daty `DD.MM.RRRR` z getterów UTC wprost w teście, bo „Zakres” nie obejmuje nowej funkcji `formatDate`, a kryterium wymaga tylko testu zgodności."}, {"data": "2026-11-04", "zrodlo": "T-43", "pytanie": "`Date.UTC` czy `setUTCFullYear`?", "decyzja": "`setUTCFullYear`, bo `Date.UTC` zamienia lata 0–99 na 1900–1999 (`0050-03-01` dałoby rok 1950)."}, {"data": "2026-11-04", "zrodlo": "T-43", "pytanie": "Wykrywanie nieistniejącej daty", "decyzja": "zbudowanie daty przez `setUTCFullYear(rok, miesiac - 1, dzien)` i porównanie składowych UTC z wejściem, bo `Date` przenosi nadmiar (31.02 → 03.03); bez własnej tabeli dni w miesiącu i reguł lat przestępnych."}, {"data": "2026-11-04", "zrodlo": "T-43", "pytanie": "Jak ścisły format?", "decyzja": "dokładnie `\\d{2}.\\d{2}.\\d{4}` albo `\\d{4}-\\d{2}-\\d{2}`, bez spacji, czasu i jednocyfrowych dni/miesięcy, bo issue podaje wzorce DD.MM.RRRR i RRRR-MM-DD; wszystko inne to „zły format” i `RangeError`."}]
ostatnia_synchronizacja: 2026-11-04T22:53:11Z
---

# Status projektu

Plik wspólny, aktualizuje orkiestrator. Frontmatter zapisuje `scripts/sync-status.sh`: liczniki,
`wstrzymania` (wpisy z `~/sh/limity.md`) i `ostatnie_decyzje` (5 najnowszych z `decyzje.md`).
Widok w Obsidianie: `docs/_dashboard.md`.

## Bieżący etap

- `08-qa`: in-progress

## Punkt przekazania

Stan po ostatnim kamieniu milowym, potrzebny do wznowienia po `/clear` i „wznów”.

- 2026-11-04T22:29Z: przebieg dryrun 3 (reset do baseline `624bd6f`, issue #38–#43, M1).
  `shctl doctor`: 0 błędów, 1 uwaga (repo testowe do usunięcia). Następny krok: dispatch szkieletu #38.

## Otwarte eskalacje

(brak)

## Dziennik etapów

- 2026-11-04 `08-qa`: in-progress
