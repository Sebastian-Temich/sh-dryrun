---
zadania_todo: 0
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 5
zadania_anulowane: 7
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-10", "pytanie": "Brak `docs/00-intake/specyfikacja.md` i `docs/04-architektura/architektura.md`", "decyzja": "pracowałem według kryteriów issue. Poza „Zakresem” przeczytałem `src/sum.ts`, `tests/sum.test.ts` i `docs/07-realizacja/T-9.md`, żeby dopasować styl kodu, testów i raportu."}, {"data": "2026-11-04", "zrodlo": "T-10", "pytanie": "Czy eksportować `slugify` z `src/index.ts`?", "decyzja": "Nie. Plik nie jest w „Zakresie” issue, a poprzednie zadania (`formatPLN`, `parseDate`, `sum`) też go nie zmieniały."}, {"data": "2026-11-04", "zrodlo": "T-10", "pytanie": "Co z literami spoza alfabetu łacińskiego z diakrytykami i znakami nierozkładalnymi (`ß`, `ø`, cyrylica, emoji)?", "decyzja": "Litery z diakrytykami rozkładalnymi w NFD (np. `ü`, `ç`) tracą diakrytyk, a pozostałe znaki są traktowane jak separatory. Issue wymaga tylko polskich znaków; transliteracja innych alfabetów wykracza poza zakres."}, {"data": "2026-11-04", "zrodlo": "T-10", "pytanie": "Jak zamienić `ł`, którego Unicode nie rozkłada w NFD?", "decyzja": "Jawna zamiana `ł` → `l` po `toLowerCase` (obejmuje też `Ł`); pozostałe polskie litery obsługuje NFD z usunięciem znaków łączących."}, {"data": "2026-11-04", "zrodlo": "T-9", "pytanie": "Brak `docs/00-intake/specyfikacja.md` i `docs/04-architektura/architektura.md`", "decyzja": "pracowałem wyłącznie według kryteriów issue. Poza „Zakresem” przeczytałem `src/parseDate.ts`, `tests/parseDate.test.ts` i `docs/07-realizacja/T-13.md`, żeby dopasować styl kodu, testów i raportu."}]
ostatnia_synchronizacja: 2026-11-04T18:10:14Z
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
