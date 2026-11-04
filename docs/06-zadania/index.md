# Zadania

Plik wspólny. Tabelę generuje `scripts/sync-status.sh`, nie edytuj jej ręcznie.

<!-- sync-status:start -->
| Zadanie | Tytuł | Status | Iteracja | Kamień milowy | PR | CI |
|---|---|---|---|---|---|---|
| #1 | Szkielet: projekt Node + TypeScript + vitest + CI | todo | 0 | M1 | - | - |
| #2 | sum(a, b) z testami | todo | 0 | M1 | - | - |
| #3 | slugify(text) z testami | todo | 0 | M1 | - | - |
| #4 | formatPLN(kwota) z testami | todo | 0 | M1 | - | - |
| #5 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | todo | 0 | M1 | - | - |
| #6 | parseDate(str) z testami | todo | 0 | M1 | - | - |
<!-- sync-status:end -->

## Mapa zadań z planu

Sekcję uzupełnia `shctl task create`: ID z pliku YAML i numer issue.

<!-- shctl:mapa:start -->
| ID | Issue | Tytuł | Zależności |
|---|---|---|---|
| T1 | #1 | Szkielet: projekt Node + TypeScript + vitest + CI | - |
| T2 | #2 | sum(a, b) z testami | #1 |
| T3 | #3 | slugify(text) z testami | #1 |
| T4 | #4 | formatPLN(kwota) z testami | #1 |
| T6 | #5 | Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | #1 |
| T5 | #6 | parseDate(str) z testami | #1, #4 |
<!-- shctl:mapa:end -->
