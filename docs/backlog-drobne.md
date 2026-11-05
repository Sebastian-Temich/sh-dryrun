# Backlog drobnych uwag

Plik wspólny, aktualizuje orkiestrator. Zgłoszenia ⚪ z review i „Drobne uwagi” z raportów.

| Data | Źródło | Uwaga | Stan |
|---|---|---|---|
| 2026-11-04 | T-38 | Lokalnie działa Node v26.13.0; CI używa `lts/*`. Warto przypiąć wersję Node (`.node-version` dla fnm i `engines` w `package.json`), żeby lokalnie i w CI była ta sama. | otwarta |
| 2026-11-04 | T-38 | `scripts/` w projekcie różnią się od `main` szablonu także poza `sync-status.bats` (`check-dod.sh`, `sync-status.sh`, `deploy-prod.sh`, `dane-testowe.bats`, `check-dod.bats`, `deploy-prod.bats`, `profil-workera.bats`). Do zsynchronizowania osobnym zadaniem. | otwarta |
| 2026-11-04 | T-41 | `formatPLN` nie jest reeksportowany z `src/index.ts` (punkt wejścia pakietu), bo plik jest poza „Zakresem”. Bez tego funkcja nie jest dostępna przez `import { formatPLN } from 'sh-dryrun'`. Do dodania osobnym zadaniem. | otwarta |
| 2026-11-04 | T-39 | `sum` nie jest reeksportowana z `src/index.ts` (punkt wejścia pakietu), bo plik jest poza „Zakresem”; to samo dotyczy `formatPLN` (uwaga z T-41). Do dodania jednym osobnym zadaniem. | otwarta |
| 2026-11-04 | T-40 | `slugify` nie jest reeksportowany z `src/index.ts` (punkt wejścia pakietu), bo plik jest poza „Zakresem”; tak samo jak `formatPLN` z #41. Do dodania osobnym zadaniem. | otwarta |
| 2026-11-04 | T-43 | `parseDate` nie jest reeksportowany z `src/index.ts` (punkt wejścia pakietu), bo plik jest poza „Zakresem”, tak jak `formatPLN` w T-41. Do dodania osobnym zadaniem. | otwarta |
| 2026-11-04 | T-43 | Brak funkcji odwrotnej (`formatDate`) do raportów; test scenariusza raportu formatuje datę ręcznie. | otwarta |
| 2026-11-04 | QA M1 | `wersja()` w `src/index.ts` zwraca literał `0.0.0` powielony z `package.json`; przy zmianie wersji łatwo o rozjazd | otwarta |
| 2026-11-05 | T-53 | `README.md` wciąż opisuje szablon `sh-template-projekt` (tytuł i treść), a nie bibliotekę `sh-dryrun`; sekcję „Użycie” dodałem bez zmiany reszty. | otwarta |
| 2026-11-05 | T-53 | `main` sh-template-projekt ma nowszy `scripts/check-dod.sh` (`uzasadnienie_pominiecia`, pola `[-]`) i 3 testy do niego; w tym repo ich nie ma. Przeniesienie wymaga osobnego zadania. | otwarta |
