# Specyfikacja: sh-dryrun

Zlecenie: `docs/00-intake/zrodlo.md`. Zlecono (UTC): 2026-11-11T18:55Z.

## Cel i kontekst

Projekt wzorcowy procesu AI Software House (przebieg dryrun 6). Zlecenie: mała biblioteka funkcji
pomocniczych w TypeScript z testami w vitest. Problem: zespoły piszą te same funkcje (slug, format
kwoty, dzielenie tablic, ponawianie wywołań, przeliczanie walut) w każdym projekcie od nowa.
Rezultat: jeden pakiet z przetestowanymi funkcjami i typami. Sytuacja wyjściowa: repo z szablonu,
bez kodu.

## Użytkownicy

| Grupa | Potrzeba | Uprawnienia |
|---|---|---|
| Programista TypeScript | Gotowe funkcje z typami i testami, import z jednego pakietu | Odczyt pakietu, brak kont i ról |
| Właściciel | Odbiór biblioteki według scenariuszy | Akceptacja etapów |

## Zakres

W zakresie:

- funkcje W-01–W-06 z testami jednostkowymi vitest i typami;
- build pakietu ESM z deklaracjami typów;
- CI: lint, typy, testy, build.

Poza zakresem:

- publikacja w npm (krok właściciela, odłożony poza zlecenie);
- strona dokumentacji i interfejs użytkownika;
- wersja CommonJS;
- buforowanie kursów walut poza pamięcią procesu.

## Wymagania

### W-01: Slug z tekstu (musi)

Jako programista chcę zamienić dowolny tekst na slug adresu, aby budować adresy z tytułów po polsku.

- Given „Zażółć Gęślą Jaźń!”, when tworzę slug, then wynik to „zazolc-gesla-jazn”.

### W-02: Format kwoty w złotych (musi)

Jako programista chcę sformatować kwotę w groszach jako tekst w złotych, aby pokazywać ceny po polsku.

- Given 123456 groszy, when formatuję, then wynik to „1 234,56 zł”.

### W-03: Dzielenie tablicy na części (musi)

Jako programista chcę podzielić tablicę na części o zadanym rozmiarze, aby wysyłać dane partiami.

- Given tablica 5 elementów i rozmiar 2, when dzielę, then dostaję 3 części: 2, 2 i 1 element.

### W-04: Ponawianie wywołania (powinno)

Jako programista chcę ponawiać wywołanie asynchroniczne z rosnącym odstępem, aby przetrwać chwilowe błędy usług.

- Given funkcja, która zawodzi dwa razy, a za trzecim razem zwraca wynik, when ponawiam z limitem 3 prób, then dostaję wynik.

### W-05: Kurs waluty z tabeli NBP (może)

Jako programista chcę pobrać średni kurs waluty z tabeli A NBP, aby przeliczać kwoty po kursie dnia.

- Given waluta EUR, when pobieram kurs, then dostaję liczbę dodatnią i datę tabeli.

### W-06: Przeliczenie kwoty na złote (może)

Jako programista chcę przeliczyć kwotę w walucie obcej na grosze, aby pokazać cenę w złotych.

- Given 10,00 EUR i kurs 4,30, when przeliczam, then wynik to 4300 groszy.

### W-07: Jakość pakietu (musi) (bez karty: wymaganie niefunkcjonalne)

Jako programista chcę pakietu z typami, bez błędów lint i z pokryciem testami, aby bezpiecznie go używać.

- Given gałąź z PR, when działa CI, then lint, typy, testy z pokryciem co najmniej 90% linii i build przechodzą.

## Karty funkcji

| Wymaganie | Karta | Rodzaj (pelna, skrocona) | Ekrany z designu |
|---|---|---|---|
| W-01 | `funkcje/W-01.md` | skrocona | nie dotyczy (biblioteka bez UI) |
| W-02 | `funkcje/W-02.md` | skrocona | nie dotyczy (biblioteka bez UI) |
| W-03 | `funkcje/W-03.md` | skrocona | nie dotyczy (biblioteka bez UI) |
| W-04 | `funkcje/W-04.md` | skrocona | nie dotyczy (biblioteka bez UI) |
| W-05 | `funkcje/W-05.md` | pelna | nie dotyczy (biblioteka bez UI) |
| W-06 | `funkcje/W-06.md` | skrocona | nie dotyczy (biblioteka bez UI) |

## Lista startowa

Rzeczy zewnętrzne od właściciela: `docs/00-intake/lista-startowa.md`. Biblioteka nie potrzebuje kont
ani kluczy; jedyna pozycja to potwierdzenie, że publiczne API NBP nie wymaga klucza.

## Typ projektu

Inny: biblioteka TypeScript bez interfejsu.

| Konsekwencja | Ustalenie |
|---|---|
| Narzędzia testowe | Vitest z pokryciem (v8); bez Playwrighta i Lighthouse (brak UI) |
| Dodatkowe punkty DoD | Build ESM z deklaracjami typów; pokrycie co najmniej 90% linii |
| Ograniczenia runnera | Testy bez sieci: wywołania NBP w testach przez atrapę fetch |
| Kroki ręczne właściciela | Brak w zleceniu; publikacja npm poza zakresem |

## Stack

| | Wybór | Uzasadnienie |
|---|---|---|
| Rekomendacja | TypeScript (strict), vitest, tsup do buildu ESM, ESLint, pnpm | Zlecenie wskazuje TypeScript i vitest; tsup daje ESM i deklaracje jedną komendą |
| Alternatywa | TypeScript, vitest, sam tsc do buildu | Mniej zależności, ale ręczna konfiguracja wyjścia i deklaracji |

## Hosting

Nie dotyczy: biblioteka bez aplikacji i bazy. `konfiguracja.md` ma `hosting.aplikacja: brak`,
`baza: brak`, `region` i `konta: nie_dotyczy` oraz `zaakceptowany: true` (właściciel zaakceptował
specyfikację z góry). Job `qa-staging` bez `staging_url` pomija testy.

## Design

Nie dotyczy: biblioteka bez interfejsu. Właściciel nie dostarcza materiałów do
`docs/00-intake/zrodla/`.

## Kroki ręczne właściciela

- Akceptacja specyfikacji, planu i odbioru (trzy checkpointy).
- Publikacja w npm: poza zakresem tego zlecenia.

## Ryzyka

| Obszar | Ocena (tak, nie, do ustalenia) | Skutek |
|---|---|---|
| Auth i RLS, role użytkowników | nie | — |
| Płatności | nie | — |
| Dane osobowe | nie | — |
| AI przetwarzające dane użytkowników | nie | — |
| Migracje bazy produkcyjnej | nie | — |
| Upload plików, integracje zewnętrzne | tak (API NBP, W-05) | ADR w 04-plan: integracja z API NBP. Wiadomo: publiczne API tabeli A bez klucza. Plan rozstrzyga: limit czasu, obsługę błędów, sposób testowania bez sieci |
| Płatne usługi, sekrety, nowe konta | nie | — |

## Szacunek poglądowy

| Miara | Wartość |
|---|---|
| Zadania | 7–8 (szkielet, 6 funkcji, QA) |
| Czas kalendarzowy | ok. 2–3 h pracy agentów |
| Czas właściciela | ok. 15 min (checkpointy) |

## Tryb procesu

Tryb M: nowy projekt z integracją zewnętrzną (API NBP) i więcej niż 3 zadaniami. Zlecono
2026-11-11T18:55Z.

## Do potwierdzenia

Właściciel polecił nie czekać na odpowiedzi: proponowane odpowiedzi to założenia (zdecyduj sam).
Paczka 1 miała 6 pytań.

| Nr | Karta | Pytanie albo założenie | Proponowana odpowiedź | Źródło (zdecyduj sam, luka bez pytania) |
|---|---|---|---|---|
| P1 | W-01 | Jak traktować znaki spoza alfabetu łacińskiego (np. emoji, cyrylica)? | Usuwamy je; pusty wynik daje pusty slug | zdecyduj sam |
| P2 | W-02 | Wejście w groszach (liczba całkowita) czy w złotych (ułamek)? | W groszach, liczba całkowita; ułamek to błąd | zdecyduj sam |
| P3 | W-03 | Rozmiar części 0 albo ujemny: błąd czy pusta lista? | Błąd z komunikatem | zdecyduj sam |
| P4 | W-04 | Domyślna liczba prób i odstęp? | 3 próby, odstęp 200 ms podwajany | zdecyduj sam |
| P5 | W-05 | Które waluty? | Wszystkie z tabeli A NBP, kod trzyliterowy | zdecyduj sam |
| Z1 | W-05 | Limit czasu odpowiedzi NBP | 5 s | luka bez pytania |
| P6 | W-06 | Zaokrąglanie przy przeliczeniu? | Do pełnego grosza, połówki w górę | zdecyduj sam |
