---
zadania_todo: 6
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 12
zadania_anulowane: 8
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-04", "zrodlo": "wlasciciel", "pytanie": "Etapy 00-intake, 04-architektura i 05-plan pominięte (projekt wzorcowy); zadania.yaml podyktowany przez właściciela, zapisany na main bez etapu 06-zadania", "decyzja": "projekt wzorcowy: test mechaniki pętli realizacji; shctl stage skip odmawia (kod 4) dla etapów trybu M, a check-dod.sh odrzuca pominiety, więc DoD tych etapów zostaje todo. Cofnięcie: przeprowadzić etapy normalnie albo shctl reset-dryrun"}]
ostatnia_synchronizacja: 2026-11-04T22:27:59Z
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
