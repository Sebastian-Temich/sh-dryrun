# Decyzje projektu

Plik wspólny, aktualizuje orkiestrator. Decyzje workerów przenosi z raportów `T-NR.md`.

| Data | Źródło | Pytanie | Decyzja |
|---|---|---|---|
| 2026-11-10 | wlasciciel | Etapy 00-intake i 04-plan pominięte (projekt wzorcowy, proces v2); zadania.yaml podyktowany przez właściciela, zapisany w baseline bez etapu 06-zadania | projekt wzorcowy: test mechaniki pętli realizacji; DoD etapów zostaje todo. Zadania mają kategorię, stack i skille (warstwy skilli workera). Cofnięcie: przeprowadzić etapy normalnie albo shctl reset-dryrun |
| 2026-11-10 | wlasciciel | Akceptacja specyfikacji PR #72 (W-01–W-05, Z1–Z5 jak proponowano) | właściciel w rozmowie: akceptuję. Cofnięcie: poprawka specyfikacji nowym PR |
| 2026-11-10 | intake | Tryb M dla sh-dryrun | nowy projekt w procesie z kamieniem M1, bez obszarów ryzyka (PR #72). Cofnięcie: zmiana tryb_procesu przed planem |
| 2026-11-10 | intake | Hosting: brak (biblioteka); staging_url https://example.com z testem dymnym e2e dla qa-staging | odpowiedź właściciela 1 w intake (PR #72). Cofnięcie: zmiana staging_url w konfiguracja.md |
| 2026-11-10 | intake | Punkt wejścia pakietu (src/index.ts, exports) jako osobne zadanie po funkcjach; pakiet tylko ESM | odpowiedzi właściciela 2 i 3 w intake; QA-M1-1 z przebiegów 2-3 (PR #72). Cofnięcie: usunięcie zadania z planu; wyjście CJS w kolejnym zleceniu |
| 2026-11-10 | intake | Reguły funkcji: formatPLN twarda spacja, grupy od 1000, połówki od zera; parseDate tylko ścisłe DD.MM.RRRR i RRRR-MM-DD; slugify transliteracja tylko polskich liter | odpowiedzi właściciela 4-7 w intake (PR #72). Cofnięcie: zmiana kart W-02, W-03, W-04 |
| 2026-11-10 | intake | Założenia Z1-Z5 kart W-01-W-05 (ułamki z tolerancją, myślniki w slugify, duże kwoty bez gwarancji groszy, rok 4 cyfry, W-05 do zamknięcia po eskalacji) | luki bez pytania, drobne i odwracalne; zaakceptowane przez właściciela z PR #72. Cofnięcie: zmiana karty |
| 2026-11-10 | review | Zmiany po akceptacji (README cel i zakres, stack w AGENTS.md, hosting zaakceptowany) w iteracji 2 bez zgłoszeń review | przyjęte bez kolejnej iteracji review (limit 1 iteracji etapu), PR #72; krok 12 sh-intake. Cofnięcie: poprawka w kolejnym etapie albo zadaniu |
