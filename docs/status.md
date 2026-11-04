---
zadania_todo: 5
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 1
zadania_anulowane: 6
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-8", "pytanie": "Przeczytane źródła spoza „Wejścia”", "decyzja": "`docs/konfiguracja.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.gitignore`, `docs/_szablony/raport-zadania.md`, `.claude/roles/worker/settings.json` (lista dozwolonych komend), API GitHub z tagami akcji (SHA do przypięcia). `docs/00-intake/specyfikacja.md` i `docs/04-architektura/architektura.md` nie istnieją w repo."}, {"data": "2026-11-04", "zrodlo": "T-8", "pytanie": "Gdzie trzymać fixture'y?", "decyzja": "`scripts/tests/fixtures/sync-status/docs/`, obok testów i poza `docs/`, żeby Obsidian i `check-dod.sh` nie traktowały ich jako dokumentacji projektu."}, {"data": "2026-11-04", "zrodlo": "T-8", "pytanie": "Które pliki dostają fixture'y w `sync-status.bats`?", "decyzja": "`status.md`, `decyzje.md` i także `06-zadania/index.md`. Skrypt czyta wszystkie trzy, a indeks na `main` ma już wiersze zadań, więc bez trzeciego fixture'u test „bez zmian” dalej byłby czerwony. Zawartość: stan szablonu z `2eb3af5`, czyli puste tabele i zerowe liczniki, których oczekują testy."}, {"data": "2026-11-04", "zrodlo": "T-8", "pytanie": "Poziom reguł lint", "decyzja": "`strictTypeChecked`, bo szkielet jest pusty i łatwiej zacząć od ostrych reguł niż je później zaostrzać."}, {"data": "2026-11-04", "zrodlo": "T-8", "pytanie": "Instalacja pnpm w CI", "decyzja": "`pnpm/action-setup` czyta wersję z pola `packageManager`, więc wersja pnpm jest w jednym miejscu."}]
ostatnia_synchronizacja: 2026-11-04T17:04:48Z
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

- E-001 (#12): 3 iteracje bez PASS

