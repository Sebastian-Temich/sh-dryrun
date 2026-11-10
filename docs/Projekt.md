---
projekt: sh-dryrun
tryb: M
etap_opis: "Realizacja, kamień M1"
postep_etapy: "3/4"
postep_zadania: "1/8"
czeka_na_ciebie: 0
eskalacje: 0
nastepny_krok: "Dokończenie #76, #77, #79, potem #78"
ostatnia_synchronizacja: 2026-11-10T22:27:14Z
---

# sh-dryrun

<!-- Plik generuje scripts/sync-status.sh przy każdej zmianie stanu. Nie edytuj go ręcznie. -->

## Gdzie jesteśmy

- **Etap:** Realizacja, kamień M1
- **Postęp:** Etapy 3/4 · Zadania 1/8 w bieżącym przebiegu (łącznie 27)
- **Co się dzieje:** #76 sum(a, b) z testami (worker, od 0 min); #77 slugify(text) z testami (worker, od 0 min); #79 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) (worker, od 0 min)
- **Następny krok:** Dokończenie #76, #77, #79, potem #78
- **Szacowany czas:** ok. 18 min pracy agentów (7 zadań, średnio 6 min na zadanie, 3 równolegle; orientacyjnie)

## Czeka na Ciebie

Nic. Agenci pracują sami.

## Zadania

### W realizacji (3)

| Zadanie | Kamień | Kto | Iteracja | PR | CI | Od |
|---|---|---|---|---|---|---|
| #76 sum(a, b) z testami | M1 | worker | 1 | - | - | 0 min |
| #77 slugify(text) z testami | M1 | worker | 1 | - | - | 0 min |
| #79 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | M1 | worker | 0 | - | - | 0 min |

### Gotowe do startu (1)

| Zadanie | Kamień | Zależności |
|---|---|---|
| #78 formatPLN(kwota) z testami | M1 | #75 ✓ |

### Zaplanowane (3)

| Zadanie | Kamień | Czeka na |
|---|---|---|
| #80 parseDate(str) z testami | M1 | #78 |
| #81 Punkt wejścia pakietu: src/index.ts i exports | M1 | #76, #77, #78, #80 |
| #82 Dokumentacja wydania: README z użyciem biblioteki | M1 | #76, #77, #78, #80, #79, #81 |

### Zrobione w bieżącym przebiegu (1)

| Zadanie | Kamień | PR |
|---|---|---|
| #75 Szkielet: projekt Node + TypeScript + vitest + CI | M1 | #83 |

Wcześniejsze przebiegi (19 zadań): [Historia](historia.md).

### Anulowane w bieżącym przebiegu (6)

- #66 Szkielet: projekt Node + TypeScript + vitest + CI
- #67 sum(a, b) z testami
- #68 slugify(text) z testami
- #69 formatPLN(kwota) z testami
- #70 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe)
- #71 parseDate(str) z testami

## Eskalacje i pytania

Otwartych brak.

## Dokumenty

- [Specyfikacja](00-intake/specyfikacja.md)
- [Lista startowa](00-intake/lista-startowa.md)
- [Plan](04-plan/plan.md)
- [Decyzje](decyzje.md)
- Karty funkcji: [W-01](00-intake/funkcje/W-01.md), [W-02](00-intake/funkcje/W-02.md), [W-03](00-intake/funkcje/W-03.md), [W-04](00-intake/funkcje/W-04.md), [W-05](00-intake/funkcje/W-05.md)
- [Historia](historia.md): punkt przekazania, dziennik etapów, wszystkie zadania
