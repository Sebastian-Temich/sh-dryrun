# Historia projektu

Punkt przekazania wpisuje orkiestrator po kamieniu milowym, dziennik etapów `shctl stage`, a listę
zadań `scripts/sync-status.sh`.

## Punkt przekazania

- **2026-11-11T19:18Z** (przebieg dryrun 6, przed pierwszym dispatchem): etapy 00-intake, 04-plan,
  06-zadania done (PR #94, #95, #96). Kamień bieżący: M1 Biblioteka, issue #97–#104 (T1–T8), nic w
  toku. Eskalacje: brak. Wstrzymania: dysk 13 GB < 15 → `min_wolne_gb: 12` (decyzje.md).
  `shctl doctor` 19:17Z: 0 błędów; uwagi: dysk 13 GB, klon Obsidiana sh-dryrun różni się od origin.
  Autoryzacja: wiersz „Autoryzacja planu PR #95” w decyzje.md. Lista startowa: same `[-]`; kryteria
  do potwierdzenia: brak. Następny krok: dispatch #97 (szkielet, sam).

## Dziennik etapów

- 2026-11-11 `00-intake`: in-progress
- 2026-11-11 `00-intake`: review
- 2026-11-11 `00-intake`: iteracja 2 (FAIL review PR #94)
- 2026-11-11 `00-intake`: done
- 2026-11-11 `04-plan`: in-progress
- 2026-11-11 `04-plan`: review
- 2026-11-11 `04-plan`: iteracja 2 (FAIL review PR #95)
- 2026-11-11 `04-plan`: done
- 2026-11-11 `06-zadania`: in-progress
- 2026-11-11 `06-zadania`: review
- 2026-11-11 `06-zadania`: done

<!-- historia:start -->
<!-- Blok generuje scripts/sync-status.sh. Nie edytuj go ręcznie. -->

## Wszystkie zadania zrobione (34)

| Zadanie | Kamień | PR | Zamknięte |
|---|---|---|---|
| #104 Dokumentacja wydania M1 | M1 Biblioteka | #111 | 2026-11-11 |
| #101 retry: ponawianie wywołania (W-04) | M1 Biblioteka | #110 | 2026-11-11 |
| #100 chunk: dzielenie tablicy na części (W-03) | M1 Biblioteka | #109 | 2026-11-11 |
| #99 formatPLN: kwota w złotych (W-02) | M1 Biblioteka | #107 | 2026-11-11 |
| #103 przelicz: kwota w walucie obcej na grosze (W-06) | M1 Biblioteka | #108 | 2026-11-11 |
| #98 slugify: slug z tekstu (W-01) | M1 Biblioteka | #106 | 2026-11-11 |
| #97 Szkielet pakietu: TypeScript, vitest, tsup, ESLint, CI | M1 Biblioteka | #105 | 2026-11-11 |
| #92 slugify: sekcja użycia w README z przypadkami brzegowymi i testem przykładów | M1 | #93 | 2026-11-11 |
| #82 Dokumentacja wydania: README z użyciem biblioteki | M1 | #90 | 2026-11-10 |
| #81 Punkt wejścia pakietu: src/index.ts i exports | M1 | #89 | 2026-11-10 |
| #80 parseDate(str) z testami | M1 | #88 | 2026-11-10 |
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

## Wszystkie zadania anulowane (19)

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
- #79 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe)
- #102 kursNBP: kurs waluty z tabeli NBP (W-05, zadanie testowe dryrun)
<!-- historia:end -->
