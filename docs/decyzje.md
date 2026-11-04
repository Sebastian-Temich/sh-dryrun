# Decyzje projektu

Plik wspólny, aktualizuje orkiestrator. Decyzje workerów przenosi z raportów `T-NR.md`.

| Data | Źródło | Pytanie | Decyzja |
|---|---|---|---|
| 2026-11-04 | wlasciciel | Etapy 00-intake, 04-architektura i 05-plan pominięte (projekt wzorcowy); zadania.yaml podyktowany przez właściciela, zapisany na main bez etapu 06-zadania | projekt wzorcowy: test mechaniki pętli realizacji; shctl stage skip odmawia (kod 4) dla etapów trybu M, a check-dod.sh odrzuca pominiety, więc DoD tych etapów zostaje todo. Cofnięcie: przeprowadzić etapy normalnie albo shctl reset-dryrun |
| 2026-11-04 | orkiestrator | Zakres #8 rozszerzony o scripts/tests/sync-status.bats: testy mają używać własnych fixture'ów status.md i decyzje.md zamiast kopii żywego docs/ | job testy-skryptow jest czerwony od baseline (testy 53 i 57 zakładają pusty szablon), a task close merguje tylko przy zielonym CI; cel szkieletu obejmuje działające CI. Cofnięcie: revert commita w PR #14; poprawka docelowo w sh-template-projekt |
| 2026-11-04 | T-8 | Wersja TypeScript | 6.0.3, nie najnowsza 7.0.2, bo `typescript-eslint` 8.72.1 wymaga `typescript >=4.8.4 <6.1.0`; kryterium wymaga eslint z typescript-eslint. |
| 2026-11-04 | T-8 | Pliki spoza „Zakresu” | dodane `src/index.ts` i `tsconfig.build.json`. Kryterium „kod w src/” wymaga choć jednego pliku w `src/` (inaczej `tsc` nie ma czego sprawdzać ani budować), a osobny `tsconfig.build.json` pozwala budować tylko `src/` do `dist/`, gdy `tsconfig.json` sprawdza typy także w `tests/`. |
| 2026-11-04 | T-8 | Format modułów | ESM (`"type": "module"`, `NodeNext`), importy z rozszerzeniem `.js`; to obecny standard dla bibliotek Node. |
| 2026-11-04 | T-8 | Wersja Node w CI | `lts/*` w `actions/setup-node`, zgodnie z kontraktem „Node LTS”; `engines.node >=24`. Brak `.node-version` dla fnm, bo plik jest poza zakresem. |
| 2026-11-04 | T-8 | Instalacja pnpm w CI | `pnpm/action-setup` czyta wersję z pola `packageManager`, więc wersja pnpm jest w jednym miejscu. |
| 2026-11-04 | T-8 | Poziom reguł lint | `strictTypeChecked`, bo szkielet jest pusty i łatwiej zacząć od ostrych reguł niż je później zaostrzać. |
| 2026-11-04 | T-8 | Które pliki dostają fixture'y w `sync-status.bats`? | `status.md`, `decyzje.md` i także `06-zadania/index.md`. Skrypt czyta wszystkie trzy, a indeks na `main` ma już wiersze zadań, więc bez trzeciego fixture'u test „bez zmian” dalej byłby czerwony. Zawartość: stan szablonu z `2eb3af5`, czyli puste tabele i zerowe liczniki, których oczekują testy. |
| 2026-11-04 | T-8 | Gdzie trzymać fixture'y? | `scripts/tests/fixtures/sync-status/docs/`, obok testów i poza `docs/`, żeby Obsidian i `check-dod.sh` nie traktowały ich jako dokumentacji projektu. |
| 2026-11-04 | T-8 | Przeczytane źródła spoza „Wejścia” | `docs/konfiguracja.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.gitignore`, `docs/_szablony/raport-zadania.md`, `.claude/roles/worker/settings.json` (lista dozwolonych komend), API GitHub z tagami akcji (SHA do przypięcia). `docs/00-intake/specyfikacja.md` i `docs/04-architektura/architektura.md` nie istnieją w repo. |
