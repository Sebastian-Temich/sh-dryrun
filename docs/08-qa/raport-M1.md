---
projekt: sh-dryrun
etap: 08-qa
data: "2026-11-04"
rola: qa
---

# Raport QA: M1 Biblioteka narzędzi

Data: 2026-11-04T22:53Z
Commit: 0b510ca

## Zakres

Kamień M1 (przebieg dryrun 3). Zamknięte issue:

- #38 Szkielet: projekt Node + TypeScript + vitest + CI
- #39 sum(a, b) z testami
- #40 slugify(text) z testami
- #41 formatPLN(kwota) z testami
- #43 parseDate(str) z testami

Poza zakresem („not planned”): #42 Funkcja zwracająca jednocześnie true i false (zadanie celowo
niemożliwe, E-001, anulowane decyzją właściciela).

Przepływy: raport (`parseDate` → `sum` → `formatPLN` → `slugify`), błędne wejście w przepływie,
użycie biblioteki przez publiczny punkt wejścia pakietu (`exports "."` → `dist/index.js`).

Projekt wzorcowy nie ma `specyfikacja.md`, `architektura.md` ani `plan.md` (etapy pominięte decyzją
właściciela), więc wymagania kamienia to kryteria issue, a scenariuszem odbioru jest użycie pakietu.
Biblioteka nie ma UI ani `playwright.config`: testy QA napisane w vitest (`tests/qa/`, bo
`vitest.config.ts` obejmuje tylko `tests/**`), zamiast `e2e/qa/` w Playwright.

## Wyniki testów

| Obszar | Wynik | Uwagi |
|---|---|---|
| E2E chromium | nie dotyczy | biblioteka bez UI, brak `playwright.config` w stacku projektu |
| E2E webkit | nie dotyczy | jak wyżej |
| Integracja | pass: 66/66, 5 plików | `pnpm install --frozen-lockfile && pnpm lint && pnpm typecheck && pnpm test && pnpm build`, wszystkie kod 0 |
| Testy QA (`tests/qa/`) | pass: 2/2, 1 pominięty (`QA-M1-1`) | `pnpm test`: razem 68 pass, 1 skipped; brak testów niestabilnych |
| Punkt wejścia pakietu | fail | `node --input-type=module -e "import * as m from 'sh-dryrun'; console.log(Object.keys(m))"` po `pnpm build`: `NAZWA,wersja` |
| Sekrety | pass | `gitleaks git --redact --no-banner .`: no leaks found |

## Zgodność z wymaganiami

| Wymaganie | Wynik | Dowód |
|---|---|---|
| #38 szkielet (skrypty, strict, vitest, lint, CI, stack w AGENTS.md) | spełnione | komendy z „Integracji”, CI PR #44 zielone |
| #39 sum | spełnione | `tests/sum.test.ts`, przepływ raportu w `tests/qa/M1-przeplywy.test.ts` |
| #40 slugify | spełnione | `tests/slugify.test.ts`, przepływ raportu |
| #41 formatPLN | spełnione | `tests/formatPLN.test.ts`, przepływ raportu |
| #43 parseDate (w tym scenariusz z formatPLN) | spełnione | `tests/parseDate.test.ts`, przepływ raportu i błędnego wejścia |
| Użycie biblioteki przez pakiet (scenariusz odbioru) | niespełnione | QA-M1-1 |

## Zgłoszenia

Tylko 🔴 krytyczne i 🟡 istotne; każde staje się issue `typ:qa` przez `shctl task create`.

| Issue | Waga | Opis |
|---|---|---|
| QA-M1-1 | 🟡 istotne | Punkt wejścia pakietu (`src/index.ts` → `dist/index.js`) eksportuje tylko `NAZWA` i `wersja`. Kroki: `pnpm build`, `node --input-type=module -e "import * as m from 'sh-dryrun'; console.log(Object.keys(m))"`. Oczekiwane: `sum`, `slugify`, `formatPLN`, `parseDate`; jest: `NAZWA`, `wersja`. Pole `exports` blokuje import `dist/sum.js` itd. Kryteria issue zadań są spełnione (eksport z `src/X.ts`), dlatego waga istotna, nie krytyczna. Test: `QA-M1-1` (`test.skip`) w `tests/qa/M1-przeplywy.test.ts` |

## Drobne uwagi

Zgłoszenia ⚪ drobne, bez issue; orkiestrator przenosi je do `docs/backlog-drobne.md`.

- `wersja()` w `src/index.ts` zwraca literał `'0.0.0'` powielony z `package.json`; przy zmianie wersji
  pakietu łatwo o rozjazd.

## Werdykt

FAIL: jedno zgłoszenie 🟡 (QA-M1-1), funkcje kamienia działają i są przetestowane, ale nie są dostępne
przez publiczny punkt wejścia pakietu.
