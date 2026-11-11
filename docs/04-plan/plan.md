# Plan: sh-dryrun

Źródło: `docs/00-intake/specyfikacja.md` w rewizji 9b0e059. Wymagania przywołujemy numerami `W-NN`.
Etap `04-plan`: krótka architektura i plan kamieni milowych w jednym dokumencie. Zadania rozpisuje
etap `06-zadania` (`docs/06-zadania/zadania.yaml`).

## Architektura

Biblioteka ESM w TypeScript (strict). Jeden pakiet, jeden punkt wejścia `src/index.ts` z eksportami
nazwanymi; każda funkcja w osobnym pliku `src/NAZWA.ts` z testem `src/NAZWA.test.ts`. Build tsup do
`dist/` (ESM i `.d.ts`). Bez stanu, bez bazy, bez UI.

### Moduły i punkty wejścia

| Moduł / funkcja | Punkt wejścia (strona, trasa, komenda, endpoint) | Design (pliki) | Wymagania |
|---|---|---|---|
| Szkielet pakietu | `src/index.ts`, `pnpm build` → `dist/index.js`, `dist/index.d.ts` | nie dotyczy | W-07 |
| Slug | eksport `slugify` z `src/index.ts` (`src/slugify.ts`) | nie dotyczy | W-01 |
| Format kwoty | eksport `formatPLN` z `src/index.ts` (`src/format-pln.ts`) | nie dotyczy | W-02 |
| Dzielenie tablicy | eksport `chunk` z `src/index.ts` (`src/chunk.ts`) | nie dotyczy | W-03 |
| Ponawianie | eksport `retry` z `src/index.ts` (`src/retry.ts`) | nie dotyczy | W-04 |
| Kurs NBP | eksport `kursNBP` z `src/index.ts` (`src/kurs-nbp.ts`) | nie dotyczy | W-05 |
| Przeliczenie | eksport `przelicz` z `src/index.ts` (`src/przelicz.ts`), używa `kursNBP` | nie dotyczy | W-06 |

`src/index.ts` jest plikiem wspólnym zadań funkcji: każde dopisuje jedną linię eksportu. Konflikty są
trywialne; zadania funkcji zależą tylko od szkieletu, a `T7` od `T6`.

### Model danych

Nie dotyczy: biblioteka bez bazy i bez trwałego stanu. Zasada projektu (migracje zgodne wstecz,
expand/contract) obowiązuje, gdyby pojawiła się baza.

### Integracje

API NBP, tabela A, bez klucza (ADR-001). Testy bez sieci przez wstrzykiwany `fetch`.

### Bezpieczeństwo

Brak auth, danych osobowych i sekretów. Jedyne wejście z zewnątrz to odpowiedź NBP: walidacja
kształtu i wartości (W-05, ADR-001). Zależności: tylko deweloperskie, `gitleaks` w CI.

### Środowiska i droga na produkcję

| Środowisko | Opis w tym projekcie |
|---|---|
| LOCAL | `pnpm install`, `pnpm test`, `pnpm build`; bez Supabase (brak bazy) |
| PREVIEW | nie dotyczy: brak aplikacji |
| STAGING | nie dotyczy: brak aplikacji; `staging_url` puste, job `qa-staging` pomija testy |
| PROD | nie dotyczy: publikacja npm poza zakresem zlecenia |

Odstępstwa od drogi na produkcję z `proces.md`: brak deployu; „wydanie” to scalony `main` z zielonym
CI i zbudowanym `dist/`.

### Decyzje

- ADR-001: integracja z API NBP (limit czasu, błędy, testy bez sieci).
- ADR-002: zadanie testowe dryrun z celowo sprzecznym kryterium (T6).

## Kamienie milowe

| Nr | Kamień milowy | Rezultat | Wymagania | Warunek startu |
|---|---|---|---|---|
| 1 | M1 Biblioteka | Szkielet z CI, funkcje W-01–W-06 z testami, eksport z `src/index.ts`, build ESM, dokumentacja wydania w `README.md` | W-01–W-07 | Plan zaakceptowany |

Jeden kamień: projekt wzorcowy dryrun mierzy pętlę realizacji na jednym kamieniu. Kamień zaczyna
szkielet (T1), kończy dokumentacja wydania. Poza zakresem M1: publikacja npm, CommonJS.

## Zadania właściciela

| Zadanie | Przed | Uwagi |
|---|---|---|
| Konta prod (Vercel, Supabase) | — | nie dotyczy: biblioteka bez hostingu |
| Projekt Supabase staging, `STAGING_DB_URL` | — | nie dotyczy: brak bazy |
| Domena i DNS, zmienne prod w Vercel | — | nie dotyczy: brak aplikacji |
| Publikacja w npm | — | poza zakresem zlecenia |
| Decyzja po eskalacji T6 (anulować albo zmienić kryterium) | dalszą pracą nad T7 | test dryrun, ADR-002 |

## Ryzyka

| Ryzyko | Skutek | Działanie (ADR, spike, dowody) | Właściciel |
|---|---|---|---|
| API NBP niedostępne albo zmienia format | błąd W-05, W-06 | ADR-001: walidacja odpowiedzi, limit czasu, testy z atrapą | orkiestrator |
| T6 niewykonalne (celowo, ADR-002) | T7 zablokowane | eskalacja, anulowanie T6, `shctl task deps` dla T7 | właściciel |
| Wolne miejsce na dysku 14 GB < 15 GB (`doctor`) | blokada dispatchu | sprzątanie przed realizacją | właściciel |
| Błędy zaokrągleń zmiennoprzecinkowych (W-06/K2) | zły wynik w groszach | arytmetyka dziesiętna w testach brzegowych | worker T7 |

## Scenariusze odbioru

| Nr | Scenariusz | Kroki | Oczekiwany wynik | Wymagania | Kamień |
|---|---|---|---|---|---|
| O-1 | CI zielone | Otwórz ostatni run CI na `main` | lint, typecheck, test z pokryciem ≥ 90%, build zielone | W-07 | M1 |
| O-2 | Slug | `pnpm test src/slugify` | testy W-01/K1–K4 przechodzą | W-01 | M1 |
| O-3 | Kwota | `pnpm test src/format-pln` | „1 234,56 zł” dla 123456 | W-02 | M1 |
| O-4 | Dzielenie | `pnpm test src/chunk` | `[[1,2],[3,4],[5]]` | W-03 | M1 |
| O-5 | Ponawianie | `pnpm test src/retry` | wynik po 3 próbach, przerwy 200 i 400 ms | W-04 | M1 |
| O-6 | Przeliczenie | `pnpm test src/przelicz` | 4300 groszy dla 10 EUR po 4,30 | W-06 | M1 |
| O-7 | Import z pakietu | `pnpm build`, potem `node -e "import('./dist/index.js').then(m=>console.log(Object.keys(m)))"` | eksporty `slugify`, `formatPLN`, `chunk`, `retry`, `przelicz` (i `kursNBP`, jeśli T6 nieanulowane) | W-07 | M1 |

## Zakres autoryzacji

Po akceptacji orkiestrator zapisuje go w `decyzje.md` przez `shctl decision add --rola wlasciciel`.

- Na co: kamień M1
- Zakres: W-01–W-07, bez kont, dostępów i płatnych usług
- Do kiedy: do odbioru zlecenia
- Wymaga nowej decyzji właściciela: każda płatna usługa, publikacja npm, nowe wymaganie; decyzja po eskalacji T6

## Gotowość środowiska

`shctl doctor --json` o 2026-11-11T19:07Z: 0 błędów; uwagi: dysk 14 GB wolne przy minimum 15 GB
(właściciel), klon Obsidiana sh-dryrun różni się od origin (odświeży synchronizacja).

## Następny krok

Orkiestrator: review etapu 04-plan i akceptacja planu (z góry), potem etap 06-zadania.
