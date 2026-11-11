# ADR-002: Zadanie testowe dryrun z celowo sprzecznym kryterium

Status: proponowana
Data: 2026-11-11

## Kontekst

Projekt wzorcowy sh-dryrun testuje mechanikę procesu (przebieg 6, polecenie właściciela z
2026-11-11): eskalację zadania niewykonalnego, anulowanie go i odblokowanie zadania zależnego przez
`shctl task deps`.

## Decyzja

Zadanie W-05 (`kursNBP`) w etapie 06-zadania dostaje, poza kryteriami karty W-05/K1–K7, kryterium
sprzeczne z ADR-001: test integracyjny na żywym API NBP uruchomiony lokalnie przez workera i zielony.
Sandbox workera nie ma sieci do `api.nbp.pl`, więc kryterium jest niewykonalne, a worker eskaluje
(„wymagania sprzeczne”). Zadanie W-06 (`przelicz`) zależy od W-05.

Oczekiwany przebieg: eskalacja → decyzja orkiestratora z upoważnienia właściciela: anulowanie zadania
W-05 (`shctl task close --anuluj`) → `shctl task deps` usuwa zależność W-06 → W-06 realizuje
przeliczenie z kursem podanym przez programistę (W-06/K1, K2, K4) i z atrapą `kursNBP`
wstrzykniętą przez opcję (W-06/K3), bez importu modułu NBP.

## Rozważane opcje

- Zadanie celowo niewykonalne w planie (wybrana): test mechaniki na prawdziwej pętli.
- Symulacja eskalacji ręczna: nie testuje workera ani `task deps`.

## Konsekwencje

Przy anulowaniu W-05 kryteria W-05/K1–K7 zostają bez realizacji w M1; odbiór (O-7) przyjmuje brak
`kursNBP`. W-05 ma priorytet „może”, więc wynik zlecenia jest kompletny bez niego.
