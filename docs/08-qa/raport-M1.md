# Raport QA: M1 Funkcje pomocnicze

Data: 2026-11-04T18:50Z
Commit: 231eb11

## Zakres

Kamień M1 projektu wzorcowego `sh-dryrun` (biblioteka TypeScript bez UI).

Zamknięte issue:

- #23 Szkielet: projekt Node + TypeScript + vitest + CI
- #24 sum(a, b) z testami
- #25 slugify(text) z testami
- #26 formatPLN(kwota) z testami
- #28 parseDate(str) z testami

Poza zakresem („not planned”):

- #27 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe, decyzja właściciela po E-001 w przebiegu 2)

Przepływy między funkcjami (`tests/qa/M1-przeplywy.test.ts`):

- raport: `parseDate` → data, `sum` → `formatPLN` → kwota, `slugify` → nazwa pliku;
- `sum` z błędem zmiennoprzecinkowym (0.1 + 0.2) → `formatPLN` daje poprawne grosze;
- format polski i ISO w `parseDate` → ta sama nazwa pliku ze `slugify`;
- punkt wejścia pakietu (`exports "."` w `package.json`) udostępnia wszystkie funkcje kamienia.

Scenariusze odbioru i wymagania `W-n`: brak, bo etapy `00-intake` i `05-plan` nie były prowadzone
(projekt wzorcowy, decyzja właściciela w `docs/decyzje.md`). Sprawdzono kryteria zamkniętych issue.

## Wyniki testów

| Obszar | Wynik | Uwagi |
|---|---|---|
| E2E chromium | nie dotyczy | Biblioteka bez UI, w projekcie nie ma Playwright ani `e2e/` |
| E2E webkit | nie dotyczy | Jak wyżej |
| Integracja | pass, 6 plików, 74 testy + 1 oczekiwany błąd | `pnpm lint && pnpm typecheck && pnpm test && pnpm build`, Node 26.13.0, pnpm 12.16.1 |
| Testy QA (`tests/qa/`) | pass, 3 testy + 1 `it.fails` (QA-M1-1) | `pnpm test`; testy QA w vitest zamiast `e2e/qa/`, bo projekt nie ma UI |

Niestabilnych testów nie było. `gitleaks git --redact --no-banner .`: brak wycieków.

## Zgodność z wymaganiami

| Wymaganie | Wynik | Dowód |
|---|---|---|
| #23 kryteria szkieletu | spełnione | CI PR #29 zielone; `pnpm lint`, `typecheck`, `test`, `build` lokalnie zielone |
| #24 kryteria sum | spełnione | `tests/sum.test.ts`, przepływ „sum → formatPLN” |
| #25 kryteria slugify | spełnione | `tests/slugify.test.ts`, przepływ „raport” |
| #26 kryteria formatPLN | spełnione | `tests/formatPLN.test.ts`, przepływ „sum → formatPLN” |
| #28 kryteria parseDate | spełnione | `tests/parseDate.test.ts`, przepływ „ISO i polski format” |
| Biblioteka używalna z pakietu | niespełnione | brak `main`/`exports` w `package.json`; `dist/index.js` daje tylko `VERSION`; QA-M1-1 |

## Zgłoszenia

Tylko 🔴 krytyczne i 🟡 istotne; każde staje się issue `typ:qa` przez `shctl task create`.

| Issue | Waga | Opis |
|---|---|---|
| QA-M1-1 | 🟡 istotne | Pakiet nie ma punktu wejścia z funkcjami: `package.json` nie ma `main`, `types` ani `exports`, a `src/index.ts` eksportuje tylko `VERSION`. Kroki: `pnpm build`, `node -e "import('./dist/index.js').then(m=>console.log(Object.keys(m)))"`. Oczekiwane: sum, slugify, formatPLN, parseDate, VERSION. Jest: `[ 'VERSION' ]`. Przyczyna: zadania mają rozłączne listy plików bez wspólnego pliku eksportów (`zadania.yaml`), więc nikt nie dopisał reeksportów do `src/index.ts`. |

## Drobne uwagi

Zgłoszenia ⚪ drobne, bez issue; orkiestrator przenosi je do `docs/backlog-drobne.md`.

- `sum(1e308, 1e308)` zwraca `Infinity` bez błędu, choć `sum` odrzuca nieskończone argumenty; wynik
  przekazany dalej do `formatPLN` rzuca `TypeError`. Kryteria #24 tego nie obejmują.
- `formatPLN(1.005)` daje „1,00 zł” (zaokrąglenie jak `toFixed`, udokumentowane w kodzie); kryteria #26 nie
  określają reguły połówek.
- Testy QA porównują kwoty po zamianie spacji twardej na zwykłą: `formatPLN` używa U+00A0, co dopuszcza
  kryterium #26.

## Werdykt

FAIL: błąd 🟡 QA-M1-1, bo biblioteki nie da się użyć przez punkt wejścia pakietu.
