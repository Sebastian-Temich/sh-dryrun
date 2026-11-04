---
zadania_todo: 2
zadania_in_progress: 0
zadania_review: 1
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 3
zadania_anulowane: 6
pr_otwarte: 1
ci_fail: 1
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-13", "pytanie": "Brak `docs/04-architektura/architektura.md` i specyfikacji przywołanej przez issue", "decyzja": "pracowałem wyłącznie według kryteriów issue. Poza „Zakresem” przeczytałem `tests/formatPLN.test.ts`, żeby dopasować styl importów i testów."}, {"data": "2026-11-04", "zrodlo": "T-13", "pytanie": "Jaki jest scenariusz raportu (data + kwota)?", "decyzja": "Wiersz `RRRR-MM-DD: <formatPLN(kwota)>`. Issue nie określa formatu wiersza, więc test sprawdza tylko poprawne złożenie obu funkcji."}, {"data": "2026-11-04", "zrodlo": "T-13", "pytanie": "Jak traktować lata 0000–0099?", "decyzja": "Jako dosłowne lata, przez `setUTCFullYear`. `Date.UTC` przesuwa je do 1900–1999, co dawałoby błędną datę bez błędu."}, {"data": "2026-11-04", "zrodlo": "T-13", "pytanie": "Jak ścisły jest format?", "decyzja": "Dokładnie 2 cyfry dnia i miesiąca oraz 4 cyfry roku, tylko cyfry ASCII, bez spacji na brzegach i bez części czasu. Issue podaje wyłącznie `DD.MM.RRRR` i `RRRR-MM-DD`, a luźne parsowanie (np. `4.11.2026`) łatwo rozszerzyć później bez łamania zgodności."}, {"data": "2026-11-04", "zrodlo": "T-13", "pytanie": "Jaką strefę czasową ma wynik?", "decyzja": "Północ UTC, zgodnie z kryterium issue. Wynik nie zależy od strefy czasowej maszyny."}]
ostatnia_synchronizacja: 2026-11-04T17:57:06Z
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
