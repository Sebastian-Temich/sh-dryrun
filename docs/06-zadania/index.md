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
<!-- sync-status:end -->

## Mapa zadań z planu

Sekcję uzupełnia `shctl task create`: ID z pliku YAML i numer issue.

<!-- shctl:mapa:start -->
| ID | Issue | Tytuł | Zależności |
|---|---|---|---|
| T1 | #8 | Szkielet: projekt Node + TypeScript + vitest + CI | - |
| T2 | #9 | sum(a, b) z testami | #8 |
| T3 | #10 | slugify(text) z testami | #8 |
| T4 | #11 | formatPLN(kwota) z testami | #8 |
| T6 | #12 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | #8 |
| T5 | #13 | parseDate(str) z testami | #8, #11 |
| QA-M1-1 | #21 | QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | - |
<!-- shctl:mapa:end -->
