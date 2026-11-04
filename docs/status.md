---
zadania_todo: 1
zadania_in_progress: 1
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 15
zadania_anulowane: 9
pr_otwarte: 1
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-39", "pytanie": "Plik spoza „Zakresu”", "decyzja": "`docs/07-realizacja/T-39.md` (raport wymagany przez proces). Projekt nie ma `docs/00-intake/specyfikacja.md` ani `docs/04-architektura/architektura.md`; dodatkowo przeczytane `src/index.ts`, `src/formatPLN.ts`, `tests/*.test.ts`, `docs/07-realizacja/T-41.md` (wzorzec stylu), szablony raportu i PR."}, {"data": "2026-11-04", "zrodlo": "T-39", "pytanie": "Czy sprawdzać wynik, gdy suma dwóch liczb skończonych przekracza zakres (`1e308 + 1e308` = `Infinity`)?", "decyzja": "nie, kryterium dotyczy wyłącznie argumentów; funkcja zwraca wtedy `Infinity` zgodnie z arytmetyką IEEE 754."}, {"data": "2026-11-04", "zrodlo": "T-41", "pytanie": "Plik spoza „Zakresu”", "decyzja": "`docs/07-realizacja/T-41.md` (raport wymagany przez proces). Projekt nie ma `docs/00-intake/specyfikacja.md` ani `docs/04-architektura/architektura.md`; dodatkowo przeczytane `src/index.ts`, `tests/smoke.test.ts`, `package.json`, `vitest.config.ts`, `eslint.config.js`, `docs/07-realizacja/T-38.md`, szablony raportu i PR."}, {"data": "2026-11-04", "zrodlo": "T-41", "pytanie": "Znak minus", "decyzja": "ASCII `-` (U+002D) na początku napisu; kwota ujemna zaokrąglona do zera (`-0.004`, `-0`) bez minusa, bo „-0,00 zł” nie ma sensu księgowego."}, {"data": "2026-11-04", "zrodlo": "T-41", "pytanie": "Sposób zaokrąglania", "decyzja": "„połówki od zera” na zapisie dziesiętnym liczby (`String(kwota)`) z arytmetyką `BigInt`, a nie `Math.round(kwota * 100)`, bo `1.005 * 100` daje `100.49999…` i wynik `1,00`. Kwoty od `1e21` (zawsze całkowite) przez `BigInt(kwota)`, kwoty poniżej `1e-6` dają `0,00 zł`."}]
ostatnia_synchronizacja: 2026-11-04T22:48:45Z
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
