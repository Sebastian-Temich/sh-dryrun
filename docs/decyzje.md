# Decyzje projektu

Plik wspólny, aktualizuje orkiestrator. Decyzje workerów przenosi z raportów `T-NR.md`.

| Data | Źródło | Pytanie | Decyzja |
|---|---|---|---|
| 2026-11-04 | wlasciciel | Etapy 00-intake, 04-architektura i 05-plan pominięte (projekt wzorcowy); zadania.yaml podyktowany przez właściciela, zapisany na main bez etapu 06-zadania | projekt wzorcowy: test mechaniki pętli realizacji; shctl stage skip odmawia (kod 4) dla etapów trybu M, a check-dod.sh odrzuca pominiety, więc DoD tych etapów zostaje todo. Cofnięcie: przeprowadzić etapy normalnie albo shctl reset-dryrun |
| 2026-11-04 | wlasciciel | Przebieg 2 dryrun: max_local=2 w konfiguracja.md; metryki przebiegu 1 przeniesione z tagu przebieg-1 | polecenie właściciela: porównanie max_local 1 i 2; reset-dryrun cofa main do baseline i kasuje metryki. Cofnięcie: max_local: 1 |
| 2026-11-04 | orkiestrator | reset-dryrun powtórzony po ręcznej archiwizacji znaczników shctl:id w zamkniętych issue #8-#13 i #21 | reset-dryrun archiwizuje tylko otwarte issue, więc task create przypisał T1-T6 do zamkniętych issue i nie założył nowych. Cofnięcie: brak potrzeby; poprawka w reset-dryrun (propozycja) |
| 2026-11-04 | orkiestrator | Zakres #23 rozszerzony o scripts/tests/sync-status.bats: testy mają używać własnych fixture'ów status.md i decyzje.md zamiast kopii żywego docs/ | job testy-skryptow czerwony od baseline; task close merguje tylko przy zielonym CI; cel szkieletu obejmuje CI. Cofnięcie: revert commita w PR #29; poprawka docelowo w sh-template-projekt |
