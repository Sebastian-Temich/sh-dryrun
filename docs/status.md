---
zadania_todo: 3
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 1
zadania_done: 2
zadania_anulowane: 6
pr_otwarte: 1
ci_fail: 1
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-11", "pytanie": "Przeczytane źródła spoza „Wejścia”", "decyzja": "`docs/07-realizacja/T-8.md` (wzór raportu), `docs/_szablony/raport-zadania.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `src/index.ts`, `tests/smoke.test.ts` (konwencja importów). `docs/00-intake/specyfikacja.md` i `docs/04-architektura/architektura.md` nie istnieją w repo."}, {"data": "2026-11-04", "zrodlo": "T-11", "pytanie": "Eksport z `src/index.ts`", "decyzja": "nie dodany, bo plik jest poza „Zakresem” issue; funkcja jest dostępna z `src/formatPLN.ts`."}, {"data": "2026-11-04", "zrodlo": "T-11", "pytanie": "Ujemna kwota zaokrąglona do zera (np. -0.001, -0)", "decyzja": "„0,00 zł” bez minusa, bo „-0,00 zł” myli czytelnika."}, {"data": "2026-11-04", "zrodlo": "T-11", "pytanie": "(Iteracja 2) Literał w teście dużej kwoty", "decyzja": "`1.2345678901234567e19` zamiast `12345678901234567890`, bo eslint (`no-loss-of-precision`) odrzuca literał, który traci precyzję; wartość w runtime jest ta sama."}, {"data": "2026-11-04", "zrodlo": "T-11", "pytanie": "(Iteracja 2) Według czego rozstrzygać połówki groszy?", "decyzja": "według najkrótszego zapisu dziesiętnego liczby (`String(kwota)`), a nie dokładnej wartości binarnej. 1.005 jako double to 1.00499999…, ale w kodzie i w danych użytkownik pisze „1.005”, a review oczekuje „1,01 zł”. Arytmetyka na `bigint`, bo usuwa też przepełnienie dla dużych wartości."}]
ostatnia_synchronizacja: 2026-11-04T17:44:37Z
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

## Otwarte eskalacje

(brak)
