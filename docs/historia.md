# Historia projektu

Punkt przekazania wpisuje orkiestrator po kamieniu milowym, dziennik etapów `shctl stage`, a listę
zadań `scripts/sync-status.sh`.

## Punkt przekazania

2026-11-10T22:17Z, przed pierwszym dispatchem (przebieg dryrun 5):

- Etapy 00-intake, 04-plan, 06-zadania: done (PR #72, #73, #74). Kamień bieżący: M1.
- Zadania: #75–#82 (T11–T18) `status:todo`; #66–#71 anulowane jako zastąpione. Brak PR w toku.
- Eskalacje: brak. Wstrzymania: brak. Lista startowa kompletna (staging example.com).
- `shctl doctor` 2026-11-10T22:16Z: 0 błędów; uwagi: dysk 17 GB (min. 15), Obsidian sh-dryrun różni się od origin.
- Autoryzacja: „Autoryzacja planu PR #73” (decyzje.md, 2026-11-10, wlasciciel).
- Następny krok: dispatch #75 (szkielet), sam do zamknięcia.

## Dziennik etapów

- 2026-11-10 `00-intake`: in-progress
- 2026-11-10 `00-intake`: review
- 2026-11-10 `00-intake`: iteracja 2 (FAIL review PR #72)
- 2026-11-10 `00-intake`: done
- 2026-11-10 `04-plan`: in-progress
- 2026-11-10 `04-plan`: review
- 2026-11-10 `04-plan`: done
- 2026-11-10 `06-zadania`: in-progress
- 2026-11-10 `06-zadania`: review
- 2026-11-10 `06-zadania`: iteracja 2 (FAIL review PR #74)
- 2026-11-10 `06-zadania`: done

<!-- historia:start -->
<!-- Blok generuje scripts/sync-status.sh. Nie edytuj go ręcznie. -->

## Wszystkie zadania zrobione (23)

| Zadanie | Kamień | PR | Zamknięte |
|---|---|---|---|
| #78 formatPLN(kwota) z testami | M1 | #87 | 2026-11-10 |
| #77 slugify(text) z testami | M1 | #86 | 2026-11-10 |
| #76 sum(a, b) z testami | M1 | #84 | 2026-11-10 |
| #75 Szkielet: projekt Node + TypeScript + vitest + CI | M1 | #83 | 2026-11-10 |
| #53 capitalize(text) z testami i przykładem w README | - | #54 | 2026-11-05 |
| #51 QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | M1 | #52 | 2026-11-04 |
| #43 parseDate(str) z testami | M1 | #49 | 2026-11-04 |
| #40 slugify(text) z testami | M1 | #48 | 2026-11-04 |
| #39 sum(a, b) z testami | M1 | #47 | 2026-11-04 |
| #41 formatPLN(kwota) z testami | M1 | #46 | 2026-11-04 |
| #38 Szkielet: projekt Node + TypeScript + vitest + CI | M1 | #44 | 2026-11-04 |
| #36 QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | M1 | #37 | 2026-11-04 |
| #28 parseDate(str) z testami | M1 | #34 | 2026-11-04 |
| #25 slugify(text) z testami | M1 | #33 | 2026-11-04 |
| #24 sum(a, b) z testami | M1 | #32 | 2026-11-04 |
| #26 formatPLN(kwota) z testami | M1 | #31 | 2026-11-04 |
| #23 Szkielet: projekt Node + TypeScript + vitest + CI | M1 | #29 | 2026-11-04 |
| #21 QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | M1 | #22 | 2026-11-04 |
| #10 slugify(text) z testami | M1 | #19 | 2026-11-04 |
| #9 sum(a, b) z testami | M1 | #18 | 2026-11-04 |
| #13 parseDate(str) z testami | M1 | #17 | 2026-11-04 |
| #11 formatPLN(kwota) z testami | M1 | #16 | 2026-11-04 |
| #8 Szkielet: projekt Node + TypeScript + vitest + CI | M1 | #14 | 2026-11-04 |

## Wszystkie zadania anulowane (17)

- #1 Szkielet: projekt Node + TypeScript + vitest + CI
- #2 sum(a, b) z testami
- #3 slugify(text) z testami
- #4 formatPLN(kwota) z testami
- #5 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe)
- #6 parseDate(str) z testami
- #12 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe)
- #27 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe)
- #42 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe)
- #60 test F6: slug (review zwykle)
- #61 test F6: notatki z RLS (review ryzyko)
- #66 Szkielet: projekt Node + TypeScript + vitest + CI
- #67 sum(a, b) z testami
- #68 slugify(text) z testami
- #69 formatPLN(kwota) z testami
- #70 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe)
- #71 parseDate(str) z testami
<!-- historia:end -->
