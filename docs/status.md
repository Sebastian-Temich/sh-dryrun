---
zadania_todo: 0
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 11
zadania_anulowane: 8
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-28", "pytanie": "-", "decyzja": "Specyfikacji i architektury nie ma w repo (`docs/00-intake/specyfikacja.md`, `docs/04-architektura/architektura.md`), pracowałem z issue. Dodatkowo przeczytane: `src/formatPLN.ts` i `tests/formatPLN.test.ts` (kryterium zgodności z formatPLN), `docs/07-realizacja/T-26.md` (format raportu), `.github/PULL_REQUEST_TEMPLATE.md`."}, {"data": "2026-11-04", "zrodlo": "T-28", "pytanie": "Raport `docs/07-realizacja/T-28.md` spoza listy plików issue", "decyzja": "wymagany przez proces (AGENTS.md, „Raport zadania”)."}, {"data": "2026-11-04", "zrodlo": "T-28", "pytanie": "Eksport z `src/index.ts`", "decyzja": "nie dodany, bo `src/index.ts` nie jest w „Zakresie” issue (tak samo jak w T-26)."}, {"data": "2026-11-04", "zrodlo": "T-28", "pytanie": "Wartość niebędąca napisem (wywołanie z JS)", "decyzja": "RangeError jak zły format, żeby funkcja miała jeden typ błędu wejścia."}, {"data": "2026-11-04", "zrodlo": "T-28", "pytanie": "Rok 0000", "decyzja": "RangeError (nieistniejąca data), bo kalendarz gregoriański nie ma roku zerowego."}]
ostatnia_synchronizacja: 2026-11-04T18:50:18Z
---

# Status projektu

Plik wspólny, aktualizuje orkiestrator. Frontmatter zapisuje `scripts/sync-status.sh`: liczniki,
`wstrzymania` (wpisy z `~/sh/limity.md`) i `ostatnie_decyzje` (5 najnowszych z `decyzje.md`).
Widok w Obsidianie: `docs/_dashboard.md`.

## Bieżący etap

- `08-qa`: in-progress

## Punkt przekazania

Stan po ostatnim kamieniu milowym, potrzebny do wznowienia po `/clear` i „wznów”.

(brak)

## Otwarte eskalacje

(brak)

## Dziennik etapów

- 2026-11-04 `08-qa`: in-progress
