# Metryki

Plik wspólny, aktualizuje orkiestrator. Pomiar poglądowy, służy też do porównań w `sh-dryrun`.

| Zlecenie | Tryb | Czas | Zadania | Iteracje | Eskalacje | Uwagi |
|---|---|---|---|---|---|---|

## Przebieg dryrun 1: max_local=1 (2026-11-04)

Mac: Intel i5-3470S, 4 rdzenie, 24 GB RAM, swap 4 GB. Próbki co 30 s (`vm.loadavg`, `df -g /`).

| Miara | Wartość |
|---|---|
| Start (reset-dryrun, issue #8–#13) | 16:53 UTC |
| Koniec M1 (realizacja + QA + błąd QA) | 18:21 UTC |
| Czas całkowity | 87 min |
| Realizacja M1 do ostatniego zadania planu (#10) | 16:53–18:10, 77 min |
| QA M1 (raport, review etapu, #21, stage done) | 18:10–18:21, 11 min |
| Przestoje spoza systemu | ok. 16 min CI GitHuba w kolejce (#11, 17:24–17:42), ok. 3 min błąd skryptu monitorującego |
| Load 1 min: średnia / maks. | 6,1 / 32,1 |
| Load przy aktywnym workerze: średnia | 6,1 |
| Wolne miejsce na dysku | 26 → 25 GB (min. 15) |
| Swap na końcu | 3,2 z 4 GB |

Przebieg:

| Kontrola | Wynik |
|---|---|
| Kolejność | OK: `task ready` dał tylko #8; #9–#13 zablokowane „zależność #8 otwarta” do jego zamknięcia |
| Równoległość | 1 worker naraz (`sloty.wolne` = 0 przy aktywnym); sloty liczone dla wszystkich projektów |
| Review Codex | 11 review: 5 zadań PASS w 1. iteracji, #11 FAIL (2× 🟡) → PASS w 2., #12 3× FAIL, review etapu 08-qa PASS; 45–100 s na review |
| Zależność | OK: #13 zablokowane „zależność #11 otwarta”, gotowe od razu po zamknięciu #11 |
| Pętla i eskalacja #12 | Worker sam eskalował (E-001 na gałęzi `task/12`), CI czerwone; review mimo czerwonego CI → FAIL ×3; `task iter` po 3. FAIL: `eskalowano:true`, E-001 na `main`, powiadomienie. Panel eskalowanego zadania blokował jedyny slot, zamknięty ręcznie. Właściciel: #12 niewykonalne |
| QA po M1 | `sh-qa`: FAIL, 1× 🟡 QA-M1-1 (pakiet nie eksportuje funkcji), 2× ⚪; PR #20, review PASS, `task create` → #21, PASS, `stage done 08-qa` |
| Pliki wspólne | Brak konfliktów merge'a. Odstępstwa: worker #12 przez `shctl escalate` zmienił `docs/status.md` w worktree i dodał `escalations/E-001.md` na gałęzi (kolizja numeru z E-001 na `main`); `stage review` zmienia `DoD.md` na `main` równolegle z PR etapu (bez konfliktu, inne fragmenty) |
| Szablon CI | `testy-skryptow` czerwony od baseline (`sync-status.bats` czyta żywe `docs/`), naprawiony w #8 decyzją orkiestratora |
| #23 Szkielet: projekt Node + TypeScript + vitest + CI | M | 7min | 1 | 1 | 0 | PR #29 |
| #26 formatPLN(kwota) z testami | M | 4min | 1 | 1 | 0 | PR #31 |
| #24 sum(a, b) z testami | M | 4min | 1 | 1 | 0 | PR #32 |
| #25 slugify(text) z testami | M | 3min | 1 | 1 | 0 | PR #33 |
| #28 parseDate(str) z testami | M | 4min | 1 | 1 | 0 | PR #34 |
