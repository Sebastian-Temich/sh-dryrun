---
zadania_todo: 0
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 18
zadania_anulowane: 9
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-05", "zrodlo": "T-51", "pytanie": "Czy kryterium „po pnpm build import zwraca cztery funkcje” sprawdzić testem automatycznym?", "decyzja": "nie, sprawdzam je komendą z raportu. Test vitest wymagałby uruchomienia `pnpm build` przed testami, czyli zmiany skryptów albo CI spoza zakresu."}, {"data": "2026-11-05", "zrodlo": "T-51", "pytanie": "Czy usunąć `NAZWA` i `wersja` z punktu wejścia?", "decyzja": "nie, bo issue tego nie wymaga, a usunięcie zepsułoby `tests/smoke.test.ts` i publiczne API."}, {"data": "2026-11-05", "zrodlo": "qa", "pytanie": "QA-M1-1 jako 🟡 istotne, nie 🔴", "decyzja": "kryteria issue zadań (eksport z src/X.ts) spełnione, brak W-n o punkcie wejścia (PR #50). Cofnięcie: podnieść wagę decyzją właściciela"}, {"data": "2026-11-05", "zrodlo": "qa", "pytanie": "Testy QA biblioteki w vitest (tests/qa/) zamiast Playwright e2e/qa/", "decyzja": "projekt bez UI i bez playwright.config, vitest obejmuje tylko tests/** (PR #50). Cofnięcie: przenieść do e2e/qa/, gdy projekt dostanie UI"}, {"data": "2026-11-04", "zrodlo": "T-43", "pytanie": "Plik spoza „Zakresu”", "decyzja": "`docs/07-realizacja/T-43.md` (raport wymagany przez proces). Projekt nie ma `docs/00-intake/specyfikacja.md` ani `docs/04-architektura/architektura.md`; dodatkowo przeczytane `src/formatPLN.ts`, `src/index.ts`, `tests/formatPLN.test.ts`, `tests/sum.test.ts`, `docs/07-realizacja/T-41.md`, szablony raportu i PR."}]
ostatnia_synchronizacja: 2026-11-04T23:04:48Z
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
- 2026-11-04T23:05Z: M1 zakończony. Zamknięte #38, #39, #40, #41, #43, #51
  (QA-M1-1); #42 anulowane (E-001 zamknięta). QA M1: PR #50, `08-qa` done. Brak zadań i PR w toku,
  brak eskalacji i wstrzymań. `doctor` jak wyżej. Autoryzacja: decyzja właściciela o przebiegu
  dryrun. Następny krok: brak (koniec przebiegu 3), kolejny przebieg przez `shctl reset-dryrun`.

## Otwarte eskalacje

(brak)

## Dziennik etapów

- 2026-11-04 `08-qa`: in-progress
- 2026-11-04 `08-qa`: review
- 2026-11-04 `08-qa`: iteracja 2 (FAIL review PR #50)
- 2026-11-05 `08-qa`: done
