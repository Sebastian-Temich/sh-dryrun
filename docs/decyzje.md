# Decyzje projektu

Plik wspólny, aktualizuje orkiestrator. Decyzje workerów przenosi z raportów `T-NR.md`.

| Data | Źródło | Pytanie | Decyzja |
|---|---|---|---|
| 2026-11-04 | wlasciciel | Etapy 00-intake, 04-architektura i 05-plan pominięte (projekt wzorcowy); zadania.yaml podyktowany przez właściciela, zapisany na main bez etapu 06-zadania | projekt wzorcowy: test mechaniki pętli realizacji; shctl stage skip odmawia (kod 4) dla etapów trybu M, a check-dod.sh odrzuca pominiety, więc DoD tych etapów zostaje todo. Cofnięcie: przeprowadzić etapy normalnie albo shctl reset-dryrun |
| 2026-11-04 | wlasciciel | max_local projektu 1 → 2 w przebiegu dryrun 3 | polecenie właściciela: realizacja M1 z max_local=2 (globalny); baseline ma max_local: 1, które obniża limit globalny. Cofnięcie: max_local: 1 w docs/konfiguracja.md albo shctl reset-dryrun |
