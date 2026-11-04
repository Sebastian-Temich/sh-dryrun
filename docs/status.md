---
zadania_todo: 5
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 7
zadania_anulowane: 7
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "T-23", "pytanie": "Dodatkowo przeczytane źródła", "decyzja": "`scripts/sync-status.sh` (jakie pliki i klucze frontmattera czyta), `docs/status.md` i `docs/06-zadania/index.md` z `main` (format fixture'ów), `.github/PULL_REQUEST_TEMPLATE.md`, `docs/_szablony/raport-zadania.md`, `.gitignore`, `docs/konfiguracja.md`, `.claude/roles/worker/settings.json` (sprawdzenie uprawnień), strona wydań `actions/setup-node` (SHA v7.1.0). Specyfikacji i architektury w repo nie ma (`docs/00-intake/specyfikacja.md`, `docs/04-architektura/architektura.md` nie istnieją)."}, {"data": "2026-11-04", "zrodlo": "T-23", "pytanie": "Zmiana `scripts/tests/sync-status.bats` spoza pierwotnego „Zakresu”", "decyzja": "wykonana na polecenie orkiestratora, decyzja w `docs/decyzje.md` na `main` (2026-11-04, rozszerzenie zakresu #23). Fixture'y inline w `setup()` (heredoc) zamiast osobnych plików w `scripts/tests/fixtures/`, żeby zmiana została w jednym pliku objętym decyzją."}, {"data": "2026-11-04", "zrodlo": "T-23", "pytanie": "Pliki spoza „Zakresu”", "decyzja": "`src/index.ts` (test dymny i build potrzebują kodu w `src/`, kryterium „kod w src/”) oraz `tsconfig.build.json` (skrypt `build` emituje tylko `src/` do `dist/`, bez testów i konfiguracji)."}, {"data": "2026-11-04", "zrodlo": "T-23", "pytanie": "Instalacja pnpm w CI", "decyzja": "`npm install -g pnpm@<packageManager>` zamiast `pnpm/action-setup`, bo to jedna akcja zewnętrzna mniej do przypinania SHA, a wersja pnpm ma jedno źródło (`package.json`)."}, {"data": "2026-11-04", "zrodlo": "T-23", "pytanie": "Wersja Node", "decyzja": "`engines.node >=24` i Node 24 w CI, bo to aktywny LTS (kontrakt „Node LTS przez fnm”); lokalnie testowane na Node 26.13."}]
ostatnia_synchronizacja: 2026-11-04T18:34:09Z
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
