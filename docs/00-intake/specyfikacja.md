# Specyfikacja: sh-dryrun

Zlecenie: `docs/00-intake/zrodlo.md`. Zlecono (UTC): 2026-11-10T20:36Z. Brief i odpowiedzi właściciela
na paczkę 1 (pytania 1–7): 2026-11-10T21:12Z.

## Cel i kontekst

Projekt wzorcowy procesu SH (`sh-dryrun`): mała biblioteka funkcji pomocniczych w TypeScript z testami
vitest. Rezultat: pakiet ESM w repo z pięcioma funkcjami i wspólnym punktem wejścia oraz przebieg
procesu (karty, plan, realizacja, eskalacja, QA ze stagingiem) do pomiaru w `docs/metryki.md`.
Sytuacja wyjściowa: repo z szablonu, bez kodu.

## Użytkownicy

| Grupa | Potrzeba | Uprawnienia |
|---|---|---|
| Programista TypeScript | Gotowe funkcje do sumowania, slugów, kwot w złotych i dat | Import z pakietu, bez kont |
| Właściciel (test procesu) | Pomiar przebiegu i eskalacji | Akceptuje specyfikację, plan i odbiór |

## Zakres

W zakresie:

- funkcje `sum`, `slugify`, `formatPLN`, `parseDate` z testami jednostkowymi;
- funkcja `paradox` (celowo niewykonalna, test pętli review i eskalacji);
- szkielet (pnpm, TypeScript strict, vitest, eslint, CI), punkt wejścia `src/index.ts` z reeksportami
  i `exports` w `package.json` (tylko ESM);
- Playwright z jednym testem dymnym e2e na stagingu (`staging_url`) dla joba `qa-staging`.

Poza zakresem:

- publikacja w npm, wersja CommonJS, dokumentacja API poza README;
- transliteracja znaków spoza alfabetu polskiego w `slugify` (są usuwane);
- strona WWW biblioteki (staging to zewnętrzna strona testowa, sprawdza mechanizm QA, nie bibliotekę).

## Wymagania

### W-01: Suma dwóch liczb (musi)

Jako programista chcę funkcji `sum(a, b)`, aby sumować liczby z kontrolą błędnych argumentów.

- Given liczby 2 i 3, when wywołuję sum, then dostaję 5.
- Given NaN albo Infinity jako argument, when wywołuję sum, then funkcja rzuca TypeError.

### W-02: Slug z tekstu (musi)

Jako programista chcę funkcji `slugify(text)`, aby budować adresy URL z polskich tytułów.

- Given „Zażółć gęślą jaźń: Łódź”, when wywołuję slugify, then dostaję „zazolc-gesla-jazn-lodz”.
- Given pusty tekst, when wywołuję slugify, then dostaję pusty string.

### W-03: Kwota w złotych (musi)

Jako programista chcę funkcji `formatPLN(kwota)`, aby pokazywać kwoty w polskim formacie.

- Given 1234.5, when wywołuję formatPLN, then dostaję „1 234,50 zł” z twardą spacją.
- Given NaN, when wywołuję formatPLN, then funkcja rzuca TypeError.

### W-04: Data z tekstu (musi)

Jako programista chcę funkcji `parseDate(str)`, aby czytać daty w formacie polskim i ISO.

- Given „04.11.2026” i „2026-11-04”, when wywołuję parseDate, then dostaję ten sam dzień (UTC, północ).
- Given „31.02.2026”, when wywołuję parseDate, then funkcja rzuca RangeError.

### W-05: Paradoks (musi)

Jako właściciel procesu chcę zadania celowo niewykonalnego, aby sprawdzić pętlę 3 iteracji review i
eskalację.

- Given funkcja `paradox()`, when test sprawdza wynik ściśle równy true i ściśle równy false, then
  test przechodzi bez pomijania i mockowania (niewykonalne: oczekiwana eskalacja).

### W-06: Szkielet, punkt wejścia i staging QA (musi) (bez karty: wymaganie niefunkcjonalne)

Jako właściciel chcę szkieletu z CI, punktu wejścia pakietu i e2e na stagingu, aby każdy kamień
przechodził bramki jakości i QA uruchamiało job `qa-staging`.

- Given szkielet, when CI na PR, then lint, typecheck, test i build przechodzą.
- Given wszystkie funkcje W-01–W-04, when importuję z pakietu (`import { sum } from "sh-dryrun"`),
  then każda funkcja jest dostępna (ESM, `exports` w `package.json`).
- Given `staging_url` w `konfiguracja.md` i PR z `stage/08-qa`, when CI, then job `qa-staging`
  uruchamia test dymny e2e (chromium, webkit) i Lighthouse na stagingu.

## Karty funkcji

| Wymaganie | Karta | Rodzaj (pelna, skrocona) | Ekrany z designu |
|---|---|---|---|
| W-01 | `funkcje/W-01.md` | skrocona | nie dotyczy: biblioteka bez UI |
| W-02 | `funkcje/W-02.md` | skrocona | nie dotyczy: biblioteka bez UI |
| W-03 | `funkcje/W-03.md` | skrocona | nie dotyczy: biblioteka bez UI |
| W-04 | `funkcje/W-04.md` | skrocona | nie dotyczy: biblioteka bez UI |
| W-05 | `funkcje/W-05.md` | skrocona | nie dotyczy: biblioteka bez UI |

## Lista startowa

Rzeczy zewnętrzne od właściciela: `docs/00-intake/lista-startowa.md` (jedna pozycja: adres stagingu).
Realizacja nie startuje, dopóki lista nie jest kompletna.

## Typ projektu

Typ: inny (biblioteka TypeScript, bez UI).

| Konsekwencja | Ustalenie |
|---|---|
| Narzędzia testowe | vitest (jednostkowe); Playwright tylko jako test dymny stagingu w CI (`qa-staging`) |
| Dodatkowe punkty DoD | Punkt wejścia pakietu eksportuje wszystkie funkcje |
| Ograniczenia runnera | Workery w sandboxie nie uruchamiają e2e lokalnie; e2e i Lighthouse tylko w CI |
| Kroki ręczne właściciela | Potwierdzenie adresu stagingu (lista startowa) |

## Stack

| | Wybór | Uzasadnienie |
|---|---|---|
| Rekomendacja | Node LTS, TypeScript strict, pnpm, vitest, eslint (typescript-eslint), tylko ESM | Kontrakt `AGENTS.md`; ESM decyzją właściciela (pytanie 3) |
| Alternatywa | tsup z podwójnym ESM + CJS | Szerszy zasięg, ale więcej konfiguracji; poza zakresem |

## Hosting

Nie dotyczy: biblioteka bez wdrożenia. Staging dla QA: `https://example.com` (pytanie 1), w
`staging_url` w `konfiguracja.md`.

## Design

Nie dotyczy: biblioteka bez interfejsu. Właściciel nie dostarcza materiałów do `docs/00-intake/zrodla/`.

## Kroki ręczne właściciela

- Potwierdzenie adresu stagingu (`lista-startowa.md`).
- Decyzja po eskalacji W-05 (zadanie niewykonalne).
- Akceptacja specyfikacji, planu i odbioru.

## Ryzyka

| Obszar | Ocena (tak, nie, do ustalenia) | Skutek |
|---|---|---|
| Auth i RLS, role użytkowników | nie | brak |
| Płatności | nie | brak (formatPLN tylko formatuje) |
| Dane osobowe | nie | brak |
| AI przetwarzające dane użytkowników | nie | brak |
| Migracje bazy produkcyjnej | nie | brak |
| Upload plików, integracje zewnętrzne | nie | staging to zewnętrzna strona tylko do odczytu w CI |
| Płatne usługi, sekrety, nowe konta | nie | brak |

## Szacunek poglądowy

| Miara | Wartość |
|---|---|
| Zadania | 7 (szkielet, 4 funkcje, paradox, punkt wejścia) + błędy QA |
| Czas kalendarzowy | ok. 1 h pracy agentów |
| Czas właściciela | ok. 20 min (pytania, 3 checkpointy, decyzja po eskalacji) |

## Tryb procesu

Tryb M: nowy projekt w procesie z kilkoma funkcjami i kamieniem M1, bez obszarów ryzyka. Zlecono
2026-11-10T20:36Z.

## Do potwierdzenia

| Nr | Karta | Pytanie albo założenie | Proponowana odpowiedź | Źródło (zdecyduj sam, luka bez pytania) |
|---|---|---|---|---|
| Z1 | W-01 | Wynik sumy ułamków | Zwykła arytmetyka liczb zmiennoprzecinkowych, testy z toBeCloseTo | luka bez pytania |
| Z2 | W-02 | Znaki inne niż litery i cyfry (spacje, interpunkcja, podkreślnik) | Zamieniane na jeden myślnik, myślniki skrajne usuwane | luka bez pytania |
| Z3 | W-03 | Bardzo duże kwoty (powyżej bezpiecznej liczby całkowitej) | Formatowane bez gwarancji groszy, bez błędu | luka bez pytania |
| Z4 | W-04 | Lata przed 1000 i po 9999 | Format wymaga dokładnie 4 cyfr roku, rok 0000 to błąd | luka bez pytania |
| Z5 | W-05 | Co po eskalacji | Decyzja właściciela; proponowane zamknięcie jako niewykonalne | luka bez pytania |

Odpowiedzi właściciela z paczki 1 (2026-11-10T21:12Z), wpisane do kart: staging example.com i test
dymny e2e (1), osobne zadanie punktu wejścia (2), tylko ESM (3), twarda spacja i grupowanie od 1000
(4), zaokrąglenie połówek od zera (5), ścisłe formaty dat (6), transliteracja tylko polskich znaków (7).
