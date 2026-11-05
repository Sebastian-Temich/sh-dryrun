---
zadania_todo: 0
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 19
zadania_anulowane: 9
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: [{"data": "2026-11-05", "zrodlo": "T-53", "pytanie": "Czerwone `testy-skryptow` w CI (`check-dod.bats` test 8 kopiował żywe `docs/`, gdzie `08-qa` ma już `done`)", "decyzja": "decyzja orkiestratora, wariant B: w `scripts/tests/check-dod.bats` zmieniony tylko `setup()` na kopiowanie `scripts/tests/dane/docs`, jak w `main` sh-template-projekt; bez nowych testów z szablonu i bez zmian `scripts/check-dod.sh`. Plik spoza „Zakresu”, zmiana na polecenie orkiestratora."}, {"data": "2026-11-05", "zrodlo": "T-53", "pytanie": "Plik spoza „Zakresu”", "decyzja": "`docs/07-realizacja/T-53.md`, raport wymagany przez proces."}, {"data": "2026-11-05", "zrodlo": "T-53", "pytanie": "Tekst zaczynający się od spacji lub cyfry", "decyzja": "bez zmian (wielka litera tylko dla pierwszego znaku, bez szukania pierwszej litery dalej), bo kryterium mówi o pierwszym znaku tekstu, a reszta ma zostać bez zmian."}, {"data": "2026-11-05", "zrodlo": "T-53", "pytanie": "Co jest „pierwszą literą”, gdy tekst zaczyna się od znaku spoza BMP?", "decyzja": "pierwszy punkt kodowy (`codePointAt`), żeby nie rozcinać pary surogatów; zgodne z „pozostałe znaki bez zmian”."}, {"data": "2026-11-05", "zrodlo": "wlasciciel", "pytanie": "Odbiór zlecenia S #53 (PR #54, commit 6009021)", "decyzja": "kto: właściciel w rozmowie Remote Control („akceptuje 53”); na co: merge PR #54 capitalize z README i poprawką setup() check-dod.bats; zakres: #53. Cofnięcie: revert squash commita #53 na main"}]
ostatnia_synchronizacja: 2026-11-05T08:49:20Z
---

# Status projektu

Plik wspólny, aktualizuje orkiestrator. Frontmatter zapisuje `scripts/sync-status.sh`: liczniki,
`wstrzymania` (wpisy z `~/sh/limity.md`) i `ostatnie_decyzje` (5 najnowszych z `decyzje.md`).
Widok w Obsidianie: `docs/_dashboard.md`.

## Bieżący etap

- `00-intake`: todo (następny)

## Punkt przekazania

Stan po ostatnim kamieniu milowym, potrzebny do wznowienia po `/clear` i „wznów”.

- 2026-11-04T22:29Z: przebieg dryrun 3 (reset do baseline `624bd6f`, issue #38–#43, M1).
  `shctl doctor`: 0 błędów, 1 uwaga (repo testowe do usunięcia). Następny krok: dispatch szkieletu #38.
- 2026-11-04T23:05Z: M1 zakończony. Zamknięte #38, #39, #40, #41, #43, #51
  (QA-M1-1); #42 anulowane (E-001 zamknięta). QA M1: PR #50, `08-qa` done. Brak zadań i PR w toku,
  brak eskalacji i wstrzymań. `doctor` jak wyżej. Autoryzacja: decyzja właściciela o przebiegu
  dryrun. Następny krok: brak (koniec przebiegu 3), kolejny przebieg przez `shctl reset-dryrun`.

## Otwarte eskalacje

(brak)

## Dziennik etapów

- 2026-11-04 `08-qa`: in-progress
- 2026-11-04 `08-qa`: review
- 2026-11-04 `08-qa`: iteracja 2 (FAIL review PR #50)
- 2026-11-05 `08-qa`: done
