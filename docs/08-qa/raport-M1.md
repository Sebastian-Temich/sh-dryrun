# Raport QA: M1 Biblioteka v0.1

Data: 2026-11-10T23:59Z
Commit: fc94c2f

## Zakres

Kamień M1 (W-01–W-06), plan `docs/04-plan/plan.md` (scenariusze O-1–O-7).

Zamknięte issue:

- #75 Szkielet: projekt Node + TypeScript + vitest + CI
- #76 sum(a, b) z testami
- #77 slugify(text) z testami
- #78 formatPLN(kwota) z testami
- #80 parseDate(str) z testami
- #81 Punkt wejścia pakietu: src/index.ts i exports
- #82 Dokumentacja wydania: README z użyciem biblioteki

Pominięte („not planned”): #79 paradox (W-05), niewykonalne z definicji, decyzja właściciela E-001: A.
#66–#71 (zadania z baseline) anulowane jako zastąpione przez #75–#82.

Przepływy i scenariusze: O-1 import z punktu wejścia, O-2 slug, O-3 kwota, O-4 parseDate → formatPLN
(wiersz raportu), O-4b parseDate → slugify (adres z datą), O-5 błędne dane, O-6 eskalacja W-05
(przebieg procesu), O-7 qa-staging.

## Wyniki testów

| Obszar | Wynik | Uwagi |
|---|---|---|
| E2E chromium | pass: 7/7 (job `qa-staging`, `BASE_URL=https://example.com`), 6/6 (job `e2e`, bez `BASE_URL`) | `pnpm exec playwright test --project=chromium --project=webkit`, run 42927828910 |
| E2E webkit | pass: 7/7 (`qa-staging`), 6/6 (`e2e`) | ten sam przebieg; test stagingu w webkit 3,7 s |
| Integracja | pass: joby `test` (vitest), `lint`, `check-dod`, `gitleaks` zielone | testy jednostkowe funkcji z zadań #76–#81 |
| Testy QA (`e2e/qa/`) | pass: `M1-biblioteka.spec.ts` 6 testów × 2 przeglądarki | bez niestabilnych testów (retries 0 użyte) |
| Lighthouse (staging) | performance 1,0, accessibility 1,0, best-practices 1,0, SEO 0,8 | artefakt `qa-staging`, `lighthouse/staging.report.json`; mierzy `example.com`, nie bibliotekę |

Wersja Playwright w `package.json`: `1.61.1`, zgodna z `playwright_version`.

## Zgodność z wymaganiami

| Wymaganie | Wynik | Dowód |
|---|---|---|
| W-01 | spełnione | O-1, O-5 (`sum(NaN, 1)` → TypeError); `tests/sum.test.ts` (#76) |
| W-02 | spełnione | O-2, O-4b; `tests/slugify.test.ts` K1–K5 i test 10 000 znaków (#77) |
| W-03 | spełnione | O-3 (twarde spacje, 1,005 → 1,01 zł), O-5; `tests/formatPLN.test.ts` (#78) |
| W-04 | spełnione | O-4 (ten sam dzień dla obu formatów, wiersz raportu), O-5 (31.02.2026 → RangeError); `tests/parseDate.test.ts` (#80) |
| W-05 | niespełnione (poza zakresem) | #79 zamknięte jako niewykonalne decyzją właściciela (E-001: A); oczekiwany wynik testu procesu (O-6) |
| W-06 | spełnione | CI zielone (lint, typecheck, test, build); O-1 import z `src/index.ts` (#81); O-7: `qa-staging` wykonał e2e i Lighthouse na `staging_url` |

Sekrety: job `gitleaks` zielony. Dane osobowe: biblioteka ich nie przetwarza, testy nie logują danych.

## Zgłoszenia

Tylko 🔴 krytyczne i 🟡 istotne; każde staje się issue `typ:qa` przez `shctl task create`.
Przyczyna: `wymaganie` (luka lub sprzeczność w specyfikacji albo karcie), `kod`, `test` (brak albo zły
test), `design` (brak lub niespójność designu).

| Issue | Waga | Przyczyna | Opis |
|---|---|---|---|
| brak | | | |

## Drobne uwagi

Zgłoszenia ⚪ drobne, bez issue; orkiestrator przenosi je do `docs/backlog-drobne.md`. Każda pozycja
zaczyna się od przyczyny, np. `- (przyczyna: design) odstęp nagłówka`.

- (przyczyna: wymaganie) Lighthouse SEO 0,8 i e2e stagingu mierzą zewnętrzną stronę `example.com`, a nie
  bibliotekę; wynik potwierdza mechanizm `qa-staging`, nie jakość projektu (decyzja z intake, pytanie 1).
- (przyczyna: test) Scenariusz O-1 w `e2e/qa/` importuje `src/index.ts`, a nie zbudowany pakiet przez
  nazwę „sh-dryrun” (`dist/`); import po buildzie sprawdzono tylko ręcznie w #81.

## Przyczyny

Liczba zgłoszeń wszystkich wag; orkiestrator przepisuje ten wiersz do „Przyczyn uwag” w `docs/metryki.md`.

| Źródło | Wymaganie | Kod | Test | Design | Bez przyczyny |
|---|---|---|---|---|---|
| QA M1 | 1 | 0 | 1 | 0 | 0 |

## Werdykt

PASS: brak błędów 🔴 i 🟡; W-01–W-04 i W-06 spełnione, a W-05 jest poza zakresem decyzją właściciela.
