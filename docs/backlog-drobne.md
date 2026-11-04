# Backlog drobnych uwag

Plik wspólny, aktualizuje orkiestrator. Zgłoszenia ⚪ z review i „Drobne uwagi” z raportów.

| Data | Źródło | Uwaga | Stan |
|---|---|---|---|
| 2026-11-04 | T-38 | Lokalnie działa Node v26.13.0; CI używa `lts/*`. Warto przypiąć wersję Node (`.node-version` dla fnm i `engines` w `package.json`), żeby lokalnie i w CI była ta sama. | otwarta |
| 2026-11-04 | T-38 | `scripts/` w projekcie różnią się od `main` szablonu także poza `sync-status.bats` (`check-dod.sh`, `sync-status.sh`, `deploy-prod.sh`, `dane-testowe.bats`, `check-dod.bats`, `deploy-prod.bats`, `profil-workera.bats`). Do zsynchronizowania osobnym zadaniem. | otwarta |
| 2026-11-04 | T-41 | `formatPLN` nie jest reeksportowany z `src/index.ts` (punkt wejścia pakietu), bo plik jest poza „Zakresem”. Bez tego funkcja nie jest dostępna przez `import { formatPLN } from 'sh-dryrun'`. Do dodania osobnym zadaniem. | otwarta |
