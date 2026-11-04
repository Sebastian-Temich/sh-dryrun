# Raport QA: M1 Funkcje pomocnicze

Data: 2026-11-04T18:10Z
Commit: 6fc908c

## Zakres

Kamień M1 projektu wzorcowego `sh-dryrun` (biblioteka TypeScript bez UI).

Zamknięte issue:

- #8 Szkielet: projekt Node + TypeScript + vitest + CI
- #9 sum(a, b) z testami
- #10 slugify(text) z testami
- #11 formatPLN(kwota) z testami
- #13 parseDate(str) z testami

Poza zakresem („not planned”):

- #12 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe, decyzja właściciela po E-001)

Przepływy między funkcjami (`tests/qa/M1-przeplywy.test.ts`):

- raport: `parseDate` → data, `sum` → `formatPLN` → kwota, `slugify` → nazwa pliku;
- `sum` z błędem zmiennoprzecinkowym (0.1 + 0.2) → `formatPLN` daje poprawne grosze;
- format polski i ISO w `parseDate` → ta sama nazwa pliku ze `slugify`;
- punkt wejścia pakietu (`exports "."`) udostępnia wszystkie funkcje kamienia.

Scenariusze odbioru i wymagania `W-n`: brak, bo etapy `00-intake` i `05-plan` nie były prowadzone
(projekt wzorcowy, decyzja właściciela w `docs/decyzje.md`). Sprawdzono kryteria zamkniętych issue.

## Wyniki testów

| Obszar | Wynik | Uwagi |
|---|---|---|
| E2E chromium | nie dotyczy | Biblioteka bez UI, w projekcie nie ma Playwright ani `e2e/` |
| E2E webkit | nie dotyczy | Jak wyżej |
| Integracja | pass, 6 plików, 65 testów + 1 oczekiwany błąd | `pnpm lint && pnpm typecheck && pnpm test && pnpm build`, Node 26.13.0, pnpm 12.16.1 |
| Testy QA (`tests/qa/`) | pass, 3 testy + 1 `it.fails` (QA-M1-1) | `pnpm test`; testy QA w vitest zamiast `e2e/qa/`, bo projekt nie ma UI |

Niestabilnych testów nie było. `gitleaks git --redact --no-banner .`: brak wycieków.

## Zgodność z wymaganiami

| Wymaganie | Wynik | Dowód |
|---|---|---|
| #8 kryteria szkieletu | spełnione | CI PR #14 zielone; `pnpm lint`, `typecheck`, `test`, `build` lokalnie zielone |
| #9 kryteria sum | spełnione | `tests/sum.test.ts`, przepływ „sum → formatPLN” |
| #10 kryteria slugify | spełnione | `tests/slugify.test.ts`, przepływ „raport” |
| #11 kryteria formatPLN | spełnione | `tests/formatPLN.test.ts`, przepływ „sum → formatPLN” |
| #13 kryteria parseDate | spełnione | `tests/parseDate.test.ts`, przepływ „ISO i polski format” |
| Biblioteka używalna z pakietu | niespełnione | `node -e "import('./dist/index.js')…"` daje tylko `VERSION`; QA-M1-1 |

## Zgłoszenia

Tylko 🔴 krytyczne i 🟡 istotne; każde staje się issue `typ:qa` przez `shctl task create`.

| Issue | Waga | Opis |
|---|---|---|
| QA-M1-1 | 🟡 istotne | Punkt wejścia pakietu nie eksportuje funkcji. Kroki: `pnpm build`, `node -e "import('./dist/index.js').then(m=>console.log(Object.keys(m)))"`. Oczekiwane: sum, slugify, formatPLN, parseDate, VERSION. Jest: `[ 'VERSION' ]`. Przyczyna: zadania miały rozłączne listy plików bez wspólnego pliku eksportów (`zadania.yaml`), więc nikt nie dopisał reeksportów do `src/index.ts`. |

## Drobne uwagi

Zgłoszenia ⚪ drobne, bez issue; orkiestrator przenosi je do `docs/backlog-drobne.md`.

- `sum(1e308, 1e308)` zwraca `Infinity` bez błędu, choć `sum` odrzuca nieskończone argumenty; wynik
  przekazany dalej do `formatPLN` rzuca `TypeError`. Kryteria #9 tego nie obejmują.
- `slugify("Straße")` daje `"stra-e"`: `ß` nie jest transliterowane (kryteria #10 dotyczą polskich znaków).

## Werdykt

FAIL: błąd 🟡 QA-M1-1, bo biblioteki nie da się użyć przez punkt wejścia pakietu.
