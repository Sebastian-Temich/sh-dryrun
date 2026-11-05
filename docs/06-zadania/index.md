# Zadania

Plik wspólny. Tabelę generuje `scripts/sync-status.sh`, nie edytuj jej ręcznie.

<!-- sync-status:start -->
| Zadanie | Tytuł | Status | Iteracja | Kamień milowy | PR | CI |
|---|---|---|---|---|---|---|
| #1 | Szkielet: projekt Node + TypeScript + vitest + CI | anulowane | 1 | M1 | #7 closed | pass |
| #2 | sum(a, b) z testami | anulowane | 0 | M1 | - | - |
| #3 | slugify(text) z testami | anulowane | 0 | M1 | - | - |
| #4 | formatPLN(kwota) z testami | anulowane | 0 | M1 | - | - |
| #5 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | anulowane | 0 | M1 | - | - |
| #6 | parseDate(str) z testami | anulowane | 0 | M1 | - | - |
| #8 | Szkielet: projekt Node + TypeScript + vitest + CI | done | 1 | M1 | #14 merged | pass |
| #9 | sum(a, b) z testami | done | 1 | M1 | #18 merged | pass |
| #10 | slugify(text) z testami | done | 1 | M1 | #19 merged | pass |
| #11 | formatPLN(kwota) z testami | done | 2 | M1 | #16 merged | pass |
| #12 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | anulowane | 3 | M1 | #15 closed | fail |
| #13 | parseDate(str) z testami | done | 1 | M1 | #17 merged | pass |
| #21 | QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | done | 1 | M1 | #22 merged | pass |
| #23 | Szkielet: projekt Node + TypeScript + vitest + CI | done | 1 | M1 | #29 merged | pass |
| #24 | sum(a, b) z testami | done | 1 | M1 | #32 merged | pass |
| #25 | slugify(text) z testami | done | 1 | M1 | #33 merged | pass |
| #26 | formatPLN(kwota) z testami | done | 1 | M1 | #31 merged | pass |
| #27 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | anulowane | 3 | M1 | #30 closed | pass |
| #28 | parseDate(str) z testami | done | 1 | M1 | #34 merged | pass |
| #36 | QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | done | 1 | M1 | #37 merged | pass |
| #38 | Szkielet: projekt Node + TypeScript + vitest + CI | done | 1 | M1 | #44 merged | pass |
| #39 | sum(a, b) z testami | done | 1 | M1 | #47 merged | pass |
| #40 | slugify(text) z testami | done | 1 | M1 | #48 merged | pass |
| #41 | formatPLN(kwota) z testami | done | 1 | M1 | #46 merged | pass |
| #42 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | anulowane | 1 | M1 | #45 closed | fail |
| #43 | parseDate(str) z testami | done | 1 | M1 | #49 merged | pass |
| #51 | QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | done | 1 | M1 | #52 merged | pass |
| #53 | capitalize(text) z testami i przykładem w README | todo | 0 | - | - | - |
<!-- sync-status:end -->

## Mapa zadań z planu

Sekcję uzupełnia `shctl task create`: ID z pliku YAML i numer issue.

<!-- shctl:mapa:start -->
| ID | Issue | Tytuł | Zależności |
|---|---|---|---|
| T1 | #38 | Szkielet: projekt Node + TypeScript + vitest + CI | - |
| T2 | #39 | sum(a, b) z testami | #38 |
| T3 | #40 | slugify(text) z testami | #38 |
| T4 | #41 | formatPLN(kwota) z testami | #38 |
| T6 | #42 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | #38 |
| T5 | #43 | parseDate(str) z testami | #38, #41 |
| QA-M1-1 | #51 | QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | - |
| S-20261105-capitalize | #53 | capitalize(text) z testami i przykładem w README | - |
<!-- shctl:mapa:end -->
