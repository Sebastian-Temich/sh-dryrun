# Raport QA: M1 Biblioteka

Data: 2026-11-11T19:50Z
Commit: e98c626

## Zakres

Kamień M1 Biblioteka (plan `docs/04-plan/plan.md`). Zamknięte issue:

- #97 Szkielet pakietu: TypeScript, vitest, tsup, ESLint, CI
- #98 slugify: slug z tekstu (W-01)
- #99 formatPLN: kwota w złotych (W-02)
- #100 chunk: dzielenie tablicy na części (W-03)
- #101 retry: ponawianie wywołania (W-04)
- #103 przelicz: kwota w walucie obcej na grosze (W-06)
- #104 Dokumentacja wydania M1

Poza zakresem („not planned”): #102 kursNBP (W-05), anulowane po E-001 zgodnie z ADR-002.

Przepływy: przelicz → formatPLN, retry jako źródło kursu przelicz, chunk → formatPLN, slugify →
chunk, przelicz bez kursu (stan po anulowaniu W-05). Scenariusze odbioru O-1–O-7 i O-9; O-8 pominięty
(warunkowy, T6 anulowane).

## Wyniki testów

| Obszar | Wynik | Uwagi |
|---|---|---|
| E2E chromium | nie dotyczy | Biblioteka bez UI i bez `playwright.config`; job `e2e` pominięty przez CI (run 43091078263) |
| E2E webkit | nie dotyczy | jak wyżej |
| Integracja | pass | `pnpm test` w CI (job test, run 43091078263): 8 plików, 72 testy, pokrycie 100% linii, gałęzi i funkcji; `pnpm lint`, `pnpm typecheck`, `pnpm build` zielone (job lint) |
| Testy QA (`src/qa/`) | pass | `src/qa/M1-przeplywy.test.ts`: 6 testów (punkt wejścia O-7 i 5 przepływów); uruchamia `pnpm test` |
| qa-staging | pass (pominięte) | Job wykonany (6 s), `staging_url` puste: E2E i Lighthouse na stagingu pominięte z notice; biblioteka bez stagingu (plan, Środowiska) |

Niestabilnych testów nie było (jeden przebieg, wszystkie zielone).

## Zgodność z wymaganiami

| Wymaganie | Wynik | Dowód |
|---|---|---|
| W-01 | spełnione | `src/slugify.test.ts` (K1–K4), przepływ slugify → chunk w `src/qa/M1-przeplywy.test.ts` |
| W-02 | spełnione | `src/format-pln.test.ts` (K1–K5), przepływy przelicz → formatPLN i chunk → formatPLN |
| W-03 | spełnione | `src/chunk.test.ts` (K1–K4) |
| W-04 | spełnione | `src/retry.test.ts` (K1–K4), przepływ retry → przelicz na fałszywym zegarze |
| W-05 | nie dotyczy | Zadanie #102 anulowane decyzją z upoważnienia właściciela (ADR-002, E-001, decyzje.md); brak eksportu `kursNBP` sprawdza test O-7 |
| W-06 | spełnione | `src/przelicz.test.ts` (K1–K4, K3 w brzmieniu z decyzje.md), przepływ „Brak kursu” |
| W-07 | spełnione | CI zielone (O-1), build ESM, eksporty z `src/index.ts` (O-7), `docs/wydanie/techniczna/` i `produktowa/` (O-9, #104) |

Sekrety: gitleaks w CI zielony; biblioteka nie loguje danych.

## Zgłoszenia

| Issue | Waga | Przyczyna | Opis |
|---|---|---|---|
| brak | | | |

## Drobne uwagi

- (przyczyna: kod) `src/index.ts` ma po sekcjach zbędne `export {};` i pustą sekcję `// W-05 kurs NBP`
  po anulowaniu #102; do usunięcia przy kolejnej zmianie punktu wejścia.
- (przyczyna: test) `src/przelicz.test.ts`: wywołanie bez kursu z pustymi opcjami sprawdza tylko klasę
  błędu, bez komunikatu „Brak kursu…” (zgłoszone też w review PR #108); test QA sprawdza komunikat.

## Przyczyny

| Źródło | Wymaganie | Kod | Test | Design | Bez przyczyny |
|---|---|---|---|---|---|
| QA M1 | 0 | 1 | 1 | 0 | 0 |

## Werdykt

PASS: brak błędów 🔴 i 🟡; wymagania kamienia spełnione, W-05 poza zakresem decyzją ADR-002.
