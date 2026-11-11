# Dokumentacja techniczna: sh-dryrun

Wydanie M1 „Biblioteka”. Krótka forma: biblioteka TypeScript (ESM) bez aplikacji, bazy i hostingu
(`docs/04-plan/plan.md`, „Środowiska i droga na produkcję”). Wydanie to scalony `main` z zielonym CI
i zbudowanym `dist/`.

## Instalacja

Wymagania: Node LTS przez fnm i pnpm (wersja z pola `packageManager` w `package.json`).

```bash
pnpm install                   # lokalnie
pnpm install --frozen-lockfile # CI
pnpm build                     # dist/index.js (ESM) i dist/index.d.ts
```

Pakiet nie jest publikowany w npm (`"private": true`). Używasz go po `pnpm build` przez import z
`dist/index.js`; przykłady każdej funkcji są w sekcji „Użycie” w `README.md`.

## Komendy

Z `AGENTS.md`, „Stack (kontrakt)”:

| Cel | Komenda |
|---|---|
| Instalacja | `pnpm install` (CI: `pnpm install --frozen-lockfile`) |
| Lint | `pnpm lint` (ESLint, `eslint.config.js`) |
| Typy | `pnpm typecheck` (`tsc --noEmit`, strict) |
| Testy | `pnpm test` (`vitest run --coverage`, próg 90% linii w `vitest.config.ts`) |
| Jeden plik testów | `pnpm test src/NAZWA.test.ts` |
| Build | `pnpm build` (tsup: `dist/index.js` ESM i `dist/index.d.ts`) |
| Uruchomienie lokalne | nie dotyczy: biblioteka; import z `dist/index.js` po `pnpm build` |

## Struktura src/

| Plik | Zawartość | Wymaganie |
|---|---|---|
| `src/index.ts` | Punkt wejścia: eksporty nazwane, jedna sekcja na wymaganie | W-07 |
| `src/slugify.ts` | `slugify(tekst)`: slug adresu z tekstu | W-01 |
| `src/format-pln.ts` | `formatPLN(grosze)`: kwota w groszach jako tekst w złotych | W-02 |
| `src/chunk.ts` | `chunk(tablica, n)`: podział tablicy na części | W-03 |
| `src/retry.ts` | `retry(fn, opcje?)`: ponawianie z podwajaną przerwą | W-04 |
| `src/przelicz.ts` | `przelicz(kwota, kod, opcje?)`: kwota w walucie obcej na grosze | W-06 |
| `src/*.test.ts` | Testy vitest każdego modułu; `index.test.ts` pilnuje eksportów, `readme.test.ts` przykładów w `README.md` | W-07 |

Konfiguracja: `tsconfig.json`, `tsup.config.ts`, `vitest.config.ts`, `eslint.config.js`.

## Konfiguracja i zmienne środowiskowe

Brak. Biblioteka nie czyta zmiennych środowiskowych ani sekretów.

## CI

`.github/workflows/ci.yml`, na PR, push na `main`, nocą i ręcznie:

| Job | Co robi | Kiedy |
|---|---|---|
| `check-dod` | Zakres zmian (`scripts/ci-zakres.sh`), `scripts/check-dod.sh`; na pushu skan gitleaks | zawsze |
| `lint` | `pnpm lint`, `pnpm typecheck` | PR ze zmianą poza `docs/` i `*.md`, nocą po nowych commitach, ręcznie |
| `test` | `pnpm test` z progiem pokrycia, `pnpm build` | jak `lint` |
| `gitleaks` | Skan historii repo | PR i ręcznie |
| `e2e`, `qa-staging` | Pomijane: brak `playwright.config.*` i `staging_url` (biblioteka bez UI) | nie dotyczy |

## Wdrożenie

Nie dotyczy: brak aplikacji i hostingu. Publikacja w npm jest poza zakresem zlecenia.

## Baza danych i migracje

Nie dotyczy: biblioteka bez bazy. Lista migracji pusta.

## Plan rollbacku

Wydanie to commit na `main`. Cofnięcie: revert commita przez PR, potem `pnpm build`.

## Monitoring

Nie dotyczy: brak usługi działającej w produkcji. Stan jakości pokazuje CI na `main` (scenariusz O-1).

## Znane ograniczenia

- **W-05 (kurs NBP) nie wchodzi do wydania.** Zadanie T6 (#102) anulowano po eskalacji E-001 zgodnie z
  ADR-002: `kursNBP` nie jest eksportowane, a `src/kurs-nbp.ts` nie istnieje. `przelicz` (W-06) nie
  pobiera kursu sam: dostaje `kurs` wprost albo funkcję `zrodloKursu(kod)`; bez obu rzuca
  `RangeError` „Brak kursu: podaj kurs albo źródło kursu”.
- Tylko ESM; brak wersji CommonJS.
- Brak publikacji w npm; import z `dist/index.js` po lokalnym buildzie.
- `slugify` usuwa znaki spoza alfabetu łacińskiego (np. cyrylica, emoji); tekst złożony tylko z nich
  daje pusty slug.
- `formatPLN` przyjmuje wyłącznie bezpieczne liczby całkowite groszy; tysiące rozdziela zwykła spacja
  (U+0020), nie twarda.
- `przelicz` zwraca `number`: wynik powyżej `Number.MAX_SAFE_INTEGER` groszy traci dokładność.
- `retry` nie ma przerwania (`AbortSignal`) ani losowego rozrzutu przerw.
