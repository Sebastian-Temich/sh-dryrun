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
| #53 | capitalize(text) z testami i przykładem w README | done | 1 | - | #54 merged | pass |
| #60 | test F6: slug (review zwykle) | anulowane | 1 | - | #62 closed | fail |
| #61 | test F6: notatki z RLS (review ryzyko) | anulowane | 1 | - | #64 closed | pass |
| #66 | Szkielet: projekt Node + TypeScript + vitest + CI | anulowane | 0 | M1 | - | - |
| #67 | sum(a, b) z testami | anulowane | 0 | M1 | - | - |
| #68 | slugify(text) z testami | anulowane | 0 | M1 | - | - |
| #69 | formatPLN(kwota) z testami | anulowane | 0 | M1 | - | - |
| #70 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | anulowane | 0 | M1 | - | - |
| #71 | parseDate(str) z testami | anulowane | 0 | M1 | - | - |
| #75 | Szkielet: projekt Node + TypeScript + vitest + CI | done | 1 | M1 | #83 merged | pass |
| #76 | sum(a, b) z testami | done | 1 | M1 | #84 merged | pass |
| #77 | slugify(text) z testami | done | 1 | M1 | #86 merged | pass |
| #78 | formatPLN(kwota) z testami | done | 1 | M1 | #87 merged | pass |
| #79 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | anulowane | 1 | M1 | #85 closed | fail |
| #80 | parseDate(str) z testami | done | 1 | M1 | #88 merged | pass |
| #81 | Punkt wejścia pakietu: src/index.ts i exports | done | 1 | M1 | #89 merged | pass |
| #82 | Dokumentacja wydania: README z użyciem biblioteki | done | 1 | M1 | #90 merged | pass |
| #92 | slugify: sekcja użycia w README z przypadkami brzegowymi i testem przykładów | todo | 0 | M1 | - | - |
<!-- sync-status:end -->

## Mapa zadań z planu

Sekcję uzupełnia `shctl task create`: ID z pliku YAML i numer issue.

<!-- shctl:mapa:start -->
| ID | Issue | Tytuł | Zależności |
|---|---|---|---|
| T1 | #66 | Szkielet: projekt Node + TypeScript + vitest + CI | - |
| T2 | #67 | sum(a, b) z testami | #66 |
| T3 | #68 | slugify(text) z testami | #66 |
| T4 | #69 | formatPLN(kwota) z testami | #66 |
| T6 | #70 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | #66 |
| T5 | #71 | parseDate(str) z testami | #66, #69 |
| T11 | #75 | Szkielet: projekt Node + TypeScript + vitest + CI | - |
| T12 | #76 | sum(a, b) z testami | #75 |
| T13 | #77 | slugify(text) z testami | #75 |
| T14 | #78 | formatPLN(kwota) z testami | #75 |
| T16 | #79 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | #75 |
| T15 | #80 | parseDate(str) z testami | #75, #78 |
| T17 | #81 | Punkt wejścia pakietu: src/index.ts i exports | #76, #77, #78, #80 |
| T18 | #82 | Dokumentacja wydania: README z użyciem biblioteki | #75, #76, #77, #78, #80, #79, #81 |
| S-20261111-slugify-readme | #92 | slugify: sekcja użycia w README z przypadkami brzegowymi i testem przykładów | - |
<!-- shctl:mapa:end -->
