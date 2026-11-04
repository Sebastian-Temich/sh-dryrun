---
zadania_todo: 5
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 13
zadania_anulowane: 8
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-38", "pytanie": "Czerwony job `testy-skryptow` (testy 53 i 57 w `sync-status.bats` czytały żywe `docs/` repo)", "decyzja": "na polecenie orkiestratora przeniesiona poprawka z `main` szablonu `sh-template-projekt` (PR #12, commit f6a59c0): `scripts/tests/sync-status.bats` i nowy katalog `scripts/tests/dane/`, w niezmienionej postaci. Testy kopiują teraz `scripts/tests/dane/docs` zamiast `docs/`. Pliki spoza „Zakresu”, zmiana konieczna, żeby CI PR było zielone. Pozostałe różnice `scripts/` względem szablonu (`check-dod.sh`, `sync-status.sh`, `deploy-prod.sh`, `dane-testowe.bats`, inne pliki `.bats`) świadomie nieprzeniesione, bo są poza poleceniem. Zmiana w `sync-status.sh` w szablonie to tylko domyślna ścieżka `limity.md`, a testy ustawiają własne `SH_DIR`. Szablon pobrany przez `git fetch`, bo profil workera blokuje `gh api`."}, {"data": "2026-11-04", "zrodlo": "T-38", "pytanie": "Projekt bez `docs/00-intake/specyfikacja.md` i `docs/04-architektura/architektura.md`", "decyzja": "typ projektu „biblioteka Node (ESM)” przyjęty z celu issue; dodatkowo przeczytane `docs/konfiguracja.md`, `.gitignore`, `.github/PULL_REQUEST_TEMPLATE.md`, `docs/_szablony/raport-zadania.md`."}, {"data": "2026-11-04", "zrodlo": "T-38", "pytanie": "Wersja Node w CI", "decyzja": "`lts/*` w `actions/setup-node`, zgodnie z kontraktem „Node LTS”; wersja pnpm z pola `packageManager`."}, {"data": "2026-11-04", "zrodlo": "T-38", "pytanie": "Kod w `src/`", "decyzja": "dodany `src/index.ts` spoza listy plików „Zakresu”, bo kryterium „kod w src/” i test dymny wymagają modułu źródłowego."}, {"data": "2026-11-04", "zrodlo": "T-38", "pytanie": "Build bez bundlera", "decyzja": "`tsc -p tsconfig.build.json`; dodany plik `tsconfig.build.json` spoza „Zakresu”, bo główny `tsconfig.json` obejmuje `tests/` i pliki konfiguracyjne (typecheck), a build ma emitować tylko `src/` do `dist/`."}]
ostatnia_synchronizacja: 2026-11-04T22:38:33Z
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
