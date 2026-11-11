# Decyzje projektu

Plik wspólny, aktualizuje orkiestrator. Decyzje workerów przenosi z raportów `T-NR.md`.

| Data | Źródło | Pytanie | Decyzja |
|---|---|---|---|
| 2026-11-10 | wlasciciel | Etapy 00-intake i 04-plan pominięte (projekt wzorcowy, proces v2); zadania.yaml podyktowany przez właściciela, zapisany w baseline bez etapu 06-zadania | projekt wzorcowy: test mechaniki pętli realizacji; DoD etapów zostaje todo. Zadania mają kategorię, stack i skille (warstwy skilli workera). Cofnięcie: przeprowadzić etapy normalnie albo shctl reset-dryrun |
| 2026-11-11 | wlasciciel | Akceptacja specyfikacji PR #94 (00-intake) | właściciel zaakceptował specyfikację z góry w poleceniu przebiegu 6 (2026-11-11); review PASS iteracja 2 dla 0864229. Cofnięcie: poprawka specyfikacji nowym PR i ponowne review |
| 2026-11-11 | intake | Tryb M dla zlecenia biblioteki TS | nowy projekt z integracją NBP i więcej niż 3 zadaniami (PR #94). Cofnięcie: zmiana tryb_procesu przed planem |
| 2026-11-11 | intake | Hosting: brak (aplikacja i baza nie dotyczy) | biblioteka bez aplikacji i bazy (PR #94). Cofnięcie: ADR w 04-plan, gdy pojawi się aplikacja |
| 2026-11-11 | intake | Stack: TypeScript strict, vitest, tsup, ESLint, pnpm | zlecenie wskazuje TS i vitest; tsup daje ESM i deklaracje typów (PR #94). Cofnięcie: ADR w 04-plan |
| 2026-11-11 | wlasciciel | Założenia P1-P6 i Z1 z kart W-01..W-06: znaki spoza łacinki usuwane; kwota w groszach całkowita; rozmiar części <1 to błąd; retry 3 próby 200 ms podwajane; waluty tabeli A NBP; zaokrąglenie do grosza połówki w górę; limit NBP 5 s | zdecyduj sam: właściciel polecił nie czekać na odpowiedzi (6 pytań w paczce 1), proponowane odpowiedzi przyjęte jako założenia (PR #94). Cofnięcie: poprawka karty i zadania |
