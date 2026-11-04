---
zadania_todo: 0
zadania_in_progress: 1
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 10
zadania_anulowane: 8
pr_otwarte: 1
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-25", "pytanie": "-", "decyzja": "Specyfikacji i architektury nie ma w repo (`docs/00-intake/specyfikacja.md`, `docs/04-architektura/architektura.md`), pracowałem z issue. Dodatkowo przeczytane: `src/sum.ts`, `tests/sum.test.ts`, `src/index.ts` (wzorzec stylu), `docs/07-realizacja/T-24.md` (format raportu), `.github/PULL_REQUEST_TEMPLATE.md`."}, {"data": "2026-11-04", "zrodlo": "T-25", "pytanie": "Eksport z `src/index.ts`", "decyzja": "nie dodany, bo `src/index.ts` nie jest w „Zakresie” issue (jak w T-24 i T-26)."}, {"data": "2026-11-04", "zrodlo": "T-25", "pytanie": "Apostrof i podkreślnik", "decyzja": "separator jak każdy inny znak (`don't` → `don-t`, `foo_bar` → `foo-bar`); kryterium nie wyróżnia tych znaków."}, {"data": "2026-11-04", "zrodlo": "T-25", "pytanie": "Co ze znakami spoza alfabetu łacińskiego (CJK, cyrylica, emoji)", "decyzja": "działają jak separator i znikają, bo kryterium dopuszcza tylko `[a-z0-9-]`; transliteracja byłaby nową zależnością poza zakresem."}, {"data": "2026-11-04", "zrodlo": "T-25", "pytanie": "Co z literami łacińskimi spoza polskiego alfabetu", "decyzja": "litery z akcentami tracą akcent przez NFD (`Crème` → `creme`), a litery bez rozkładu mają małą mapę: `ß → ss`, `æ → ae`, `ø → o`, `œ → oe`, `đ → d`; bez tego „Straße” dawałoby „stra-e”."}]
ostatnia_synchronizacja: 2026-11-04T18:48:36Z
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
