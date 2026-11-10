# Plan: sh-dryrun

Źródło: `docs/00-intake/specyfikacja.md` w rewizji 24ae43e. Wymagania przywołujemy numerami `W-NN`.
Etap `04-plan`: krótka architektura i plan kamieni milowych w jednym dokumencie. Zadania rozpisuje
etap `06-zadania` (`docs/06-zadania/zadania.yaml`).

## Architektura

Biblioteka TypeScript, tylko ESM, bez UI, bez bazy i bez usług zewnętrznych. Każda funkcja to osobny
moduł w `src/` z własnym plikiem testów w `tests/`, żeby zadania miały rozłączne listy plików. Wspólny
punkt wejścia `src/index.ts` powstaje w osobnym zadaniu po funkcjach (decyzja właściciela, `decyzje.md`).

### Moduły i punkty wejścia

| Moduł / funkcja | Punkt wejścia (strona, trasa, komenda, endpoint) | Design (pliki) | Wymagania |
|---|---|---|---|
| Szkielet, CI, test dymny stagingu | `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`; `e2e/staging.spec.ts` w CI (`qa-staging`) | nie dotyczy | W-06 |
| sum | `src/sum.ts`, eksport w `src/index.ts` (`import { sum } from "sh-dryrun"`) | nie dotyczy | W-01 |
| slugify | `src/slugify.ts`, eksport w `src/index.ts` | nie dotyczy | W-02 |
| formatPLN | `src/formatPLN.ts`, eksport w `src/index.ts` | nie dotyczy | W-03 |
| parseDate | `src/parseDate.ts`, eksport w `src/index.ts` | nie dotyczy | W-04 |
| paradox | `src/paradox.ts` (bez eksportu w `src/index.ts`: zadanie celowo niewykonalne) | nie dotyczy | W-05 |
| Punkt wejścia pakietu | `src/index.ts`, pole `exports` w `package.json` (`"."` → `dist/index.js` + typy) | nie dotyczy | W-06 |

### Model danych

Nie dotyczy: brak bazy i migracji. Zasada ogólna procesu zostaje: migracje zgodne wstecz
(expand/contract), gdyby projekt dostał bazę w kolejnym zleceniu.

### Integracje

Brak w kodzie biblioteki. CI: job `qa-staging` uruchamia Playwright (wersja `1.61.1`, chromium i
webkit, `workers: 1`) i Lighthouse na `staging_url` (`https://example.com`) tylko dla PR z
`stage/08-qa`. Test dymny e2e sprawdza mechanizm QA, nie bibliotekę.

### Bezpieczeństwo

Brak auth, danych osobowych i sekretów. `slugify` przetwarza dowolny tekst: tylko czyste funkcje, bez
`eval` i wyrażeń regularnych podatnych na katastrofalny backtracking (kategoria bezpieczeństwa w
warstwie skilli zadania slugify).

### Środowiska i droga na produkcję

| Środowisko | Opis w tym projekcie |
|---|---|
| LOCAL | Node LTS (fnm), pnpm; bez Supabase i Dockera |
| PREVIEW | Nie dotyczy: biblioteka bez wdrożenia |
| STAGING | Zewnętrzna strona testowa `https://example.com` tylko dla `qa-staging` (e2e i Lighthouse) |
| PROD | Nie dotyczy: brak publikacji w npm i deployu |

Odstępstwa tego projektu od drogi na produkcję: brak wdrożeń; „wydanie” to merge na `main` i wpis w
`CHANGELOG.md`.

### Decyzje

Brak ADR: stack zgodny z kontraktem `AGENTS.md`, brak obszarów ryzyka (`specyfikacja.md`, „Ryzyka”).
Decyzje intake (ESM, punkt wejścia, staging) są w `decyzje.md` z 2026-11-10.

## Kamienie milowe

Jeden kamień: biblioteka jest mała, a pionowy przekrój „programista importuje funkcję z pakietu”
obejmuje wszystkie funkcje. Kamień zaczyna się sekwencyjnie od szkieletu `T1`, kończy punktem wejścia i
dokumentacją wydania.

| Nr | Kamień milowy | Rezultat | Wymagania | Warunek startu |
|---|---|---|---|---|
| M1 | Biblioteka v0.1 | Szkielet z CI i testem dymnym stagingu, funkcje W-01–W-04 dostępne z `import { … } from "sh-dryrun"`, W-05 zakończone eskalacją, README z użyciem | W-01–W-06 | Plan zaakceptowany, lista startowa kompletna |

Kolejność w M1: `T1` szkielet (sam) → `T2` sum, `T3` slugify, `T4` formatPLN, `T6` paradox
(równolegle) → `T5` parseDate (po `T4`) → `T7` punkt wejścia (po `T2`–`T5`) → `T8` dokumentacja
wydania (po wszystkich). Poza zakresem M1: publikacja w npm, CJS.

## Zadania właściciela

| Zadanie | Przed | Uwagi |
|---|---|---|
| Konta prod na kontach klienta: Vercel, Supabase prod (UE) | nie dotyczy | biblioteka bez wdrożenia |
| Projekt Supabase staging | nie dotyczy | brak bazy |
| Sekret `STAGING_DB_URL` w GitHub Secrets | nie dotyczy | brak bazy |
| Domena i DNS | nie dotyczy | staging to `https://example.com` |
| Zmienne prod w panelu Vercel | nie dotyczy | brak wdrożenia |
| Potwierdzenie `staging_url` (lista startowa) | `T1` | zrobione 2026-11-10 |
| Decyzja po eskalacji W-05 | zamknięciem M1 | proponowane: zamknięcie jako niewykonalne |

## Ryzyka

| Ryzyko | Skutek | Działanie (ADR, spike, dowody) | Właściciel |
|---|---|---|---|
| `example.com` niedostępne albo zmieni treść | Czerwony `qa-staging` niezależny od kodu | Test dymny sprawdza tylko odpowiedź i niepusty tytuł; przy awarii QA opisuje fałszywy alarm | orkiestrator |
| Playwright webkit nie instaluje się w CI | `qa-staging` pada | Wersja przypięta `1.61.1`, `timeout 8m` w CI | orkiestrator |
| W-05 przechodzi obejściem | Brak testu eskalacji | W-05/K2–K3 zawężone w review intake; review kodu odrzuca obejścia | reviewer |
| Zaokrąglenia float w formatPLN | Złe grosze | Kryteria W-03/K4 z przypadkami 1.005, 2.675, 0.125 | worker `T4` |

## Scenariusze odbioru

| Nr | Scenariusz | Kroki | Oczekiwany wynik | Wymagania | Kamień |
|---|---|---|---|---|---|
| O-1 | Import z pakietu | `pnpm build`, w teście `import { sum, slugify, formatPLN, parseDate } from "sh-dryrun"` | Cztery funkcje dostępne, typy w `dist/index.d.ts` | W-01–W-04, W-06 | M1 |
| O-2 | Slug polskiego tytułu | `slugify("Zażółć gęślą jaźń: Łódź")` | `zazolc-gesla-jazn-lodz` | W-02 | M1 |
| O-3 | Kwota w złotych | `formatPLN(1234.5)`, `formatPLN(1.005)` | `1 234,50 zł` (twarde spacje), `1,01 zł` | W-03 | M1 |
| O-4 | Raport data + kwota | `parseDate("04.11.2026")` i `formatPLN(1234.5)` | Ten sam dzień co `2026-11-04`; wiersz `2026-11-04: 1 234,50 zł` | W-03, W-04 | M1 |
| O-5 | Błędne dane | `sum(NaN, 1)`, `formatPLN(Infinity)`, `parseDate("31.02.2026")` | TypeError, TypeError, RangeError | W-01, W-03, W-04 | M1 |
| O-6 | Eskalacja zadania niewykonalnego | Realizacja W-05 | Eskalacja w „Czeka na Ciebie”, decyzja właściciela, zadanie zamknięte | W-05 | M1 |
| O-7 | QA na stagingu (QA po merge'u) | PR raportu QA z `stage/08-qa` | Job `qa-staging` wykonuje e2e (chromium, webkit) i Lighthouse na `https://example.com`, artefakt `qa-staging` | W-06 | M1 |

## Zakres autoryzacji

Po akceptacji orkiestrator zapisuje go w `decyzje.md` przez `shctl decision add --rola wlasciciel`.

- Na co: kamień M1 (zadania `T1`–`T8` i błędy z QA M1)
- Zakres: W-01–W-06; bez kont, dostępów i płatnych usług; GitHub Actions w ramach konta właściciela
- Do kiedy: do odbioru zlecenia
- Wymaga nowej decyzji właściciela: decyzja po eskalacji W-05, zmiana `staging_url`, publikacja w npm,
  nowy kamień

## Gotowość środowiska

`shctl doctor --json` 2026-11-10T22:02Z: 0 błędów. Uwagi: wolne 17 GB przy `min_wolne_gb: 15` (mały
zapas, dla biblioteki wystarczy); klon Obsidiana sh-dryrun „różni się od origin” (widok, nie blokuje).

## Następny krok

Właściciel akceptuje plan w PR etapu `04-plan`.
