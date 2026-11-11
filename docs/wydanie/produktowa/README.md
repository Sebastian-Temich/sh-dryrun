# Dokumentacja produktowa: sh-dryrun

Wydanie M1 „Biblioteka”, krótka forma.

## Czym jest produkt

Mała biblioteka gotowych funkcji pomocniczych w TypeScript, z testami i typami. Zamiast pisać w każdym
projekcie od nowa slug, format ceny czy ponawianie zapytań, programista importuje je z jednego pakietu.

## Dla kogo

Dla programistów TypeScript i JavaScript, którzy budują aplikacje po polsku i potrzebują sprawdzonych
drobnych funkcji.

## Główne funkcje

| Wymaganie | Funkcja | Co robi | Przykład wyniku |
|---|---|---|---|
| W-01 | `slugify` | Zamienia tytuł na fragment adresu strony: małe litery, bez polskich znaków, słowa rozdzielone myślnikiem | „Zażółć Gęślą Jaźń!” → `zazolc-gesla-jazn` |
| W-02 | `formatPLN` | Pokazuje kwotę zapisaną w groszach jako cenę w złotych | 123456 → `1 234,56 zł` |
| W-03 | `chunk` | Dzieli listę na paczki o zadanej wielkości, np. do wysyłki partiami | [1, 2, 3, 4, 5] po 2 → `[[1, 2], [3, 4], [5]]` |
| W-04 | `retry` | Ponawia zapytanie, które chwilowo zawiodło; czeka coraz dłużej (200 ms, potem 400 ms) | zapytanie udane za trzecim razem → wynik zapytania, bez błędu |
| W-05 | `kursNBP` | **Nie ma w tym wydaniu.** Pobieranie kursu z NBP odłożono (zadanie anulowane, ADR-002) | — |
| W-06 | `przelicz` | Przelicza kwotę w walucie obcej na grosze po podanym kursie, z zaokrągleniem do pełnego grosza | 10 EUR po kursie 4,30 → `4300` groszy (43,00 zł) |

## Jak korzystać

1. Zbuduj pakiet: `pnpm install`, potem `pnpm build`.
2. Zaimportuj funkcję z `dist/index.js`, np. `import { formatPLN } from './dist/index.js';`.
3. Przykład wywołania każdej funkcji jest w `README.md`, sekcja „Użycie”.

Kurs waluty do `przelicz` podajesz sam (np. z własnego źródła), bo biblioteka w tym wydaniu nie pobiera
kursów z NBP.

## Obsługa i eksploatacja

Biblioteka nie działa jako usługa, więc nie ma czego utrzymywać na serwerze. Błędy i propozycje zgłaszasz
jako issue w repozytorium projektu na GitHubie. Publikacja w npm jest poza zakresem tego zlecenia.
