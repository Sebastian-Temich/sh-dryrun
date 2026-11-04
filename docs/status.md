---
zadania_todo: 0
zadania_in_progress: 1
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 16
zadania_anulowane: 9
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-40", "pytanie": "Plik spoza „Zakresu”", "decyzja": "`docs/07-realizacja/T-40.md` (raport wymagany przez proces). Projekt nie ma `docs/00-intake/specyfikacja.md` ani `docs/04-architektura/architektura.md`; dodatkowo przeczytane `src/formatPLN.ts`, `src/index.ts`, `tests/formatPLN.test.ts`, `docs/07-realizacja/T-41.md` (wzór konwencji), szablony raportu i PR."}, {"data": "2026-11-04", "zrodlo": "T-40", "pytanie": "Podkreślnik `_`", "decyzja": "zamieniany na myślnik jak każdy inny znak spoza `[a-z0-9]`, zgodnie z kryterium."}, {"data": "2026-11-04", "zrodlo": "T-40", "pytanie": "Znaki spoza alfabetu łacińskiego (np. „Ω”, emoji) i litery bez rozkładu NFD (np. „ø”, „ß”)", "decyzja": "traktowane jak separator i usuwane, bo kryterium dopuszcza wyłącznie `[a-z0-9-]`, a issue wymaga tylko polskich znaków."}, {"data": "2026-11-04", "zrodlo": "T-40", "pytanie": "Sposób transliteracji", "decyzja": "`toLowerCase()`, ręczna zamiana „ł” → „l”, potem `normalize('NFD')` i usunięcie znaków łączących U+0300–U+036F, bo „ł” jako jedyna polska litera nie rozkłada się w NFD; bez zewnętrznej zależności."}, {"data": "2026-11-04", "zrodlo": "T-39", "pytanie": "Plik spoza „Zakresu”", "decyzja": "`docs/07-realizacja/T-39.md` (raport wymagany przez proces). Projekt nie ma `docs/00-intake/specyfikacja.md` ani `docs/04-architektura/architektura.md`; dodatkowo przeczytane `src/index.ts`, `src/formatPLN.ts`, `tests/*.test.ts`, `docs/07-realizacja/T-41.md` (wzorzec stylu), szablony raportu i PR."}]
ostatnia_synchronizacja: 2026-11-04T22:50:18Z
---

# Status projektu

Plik wspólny, aktualizuje orkiestrator. Frontmatter zapisuje `scripts/sync-status.sh`: liczniki,
`wstrzymania` (wpisy z `~/sh/limity.md`) i `ostatnie_decyzje` (5 najnowszych z `decyzje.md`).
Widok w Obsidianie: `docs/_dashboard.md`.

## Bieżący etap

- `00-intake`: todo (następny)

## Punkt przekazania

Stan po ostatnim kamieniu milowym, potrzebny do wznowienia po `/clear` i „wznów”.

- 2026-11-04T22:29Z: przebieg dryrun 3 (reset do baseline `624bd6f`, issue #38–#43, M1).
  `shctl doctor`: 0 błędów, 1 uwaga (repo testowe do usunięcia). Następny krok: dispatch szkieletu #38.

## Otwarte eskalacje

(brak)
