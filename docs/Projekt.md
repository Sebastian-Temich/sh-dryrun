---
projekt: sh-dryrun
tryb: M
etap_opis: "Realizacja, kamień M1"
postep_etapy: "3/4"
postep_zadania: "4/8"
czeka_na_ciebie: 1
eskalacje: 1
nastepny_krok: "Twoja odpowiedź: E-001 (#79): W-05: kryteria K2 i K3 są sprzeczne. Żadna wartość boolean nie jest jednocześnie toBe(true) i toBe(false) (Object.is), a K3 zabrania obejść. K1 zrobione, test K2 napisany dokładnie wg karty i jest czerwony."
ostatnia_synchronizacja: 2026-11-10T22:37:49Z
---

# sh-dryrun

<!-- Plik generuje scripts/sync-status.sh przy każdej zmianie stanu. Nie edytuj go ręcznie. -->

## Gdzie jesteśmy

- **Etap:** Realizacja, kamień M1
- **Postęp:** Etapy 3/4 · Zadania 4/8 w bieżącym przebiegu (łącznie 27)
- **Co się dzieje:** #79 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) (eskalacja, od 10 min); #80 parseDate(str) z testami (worker, od 0 min)
- **Następny krok:** Twoja odpowiedź: E-001 (#79): W-05: kryteria K2 i K3 są sprzeczne. Żadna wartość boolean nie jest jednocześnie toBe(true) i toBe(false) (Object.is), a K3 zabrania obejść. K1 zrobione, test K2 napisany dokładnie wg karty i jest czerwony.
- **Szacowany czas:** ok. 12 min pracy agentów (4 zadań, średnio 6 min na zadanie, 3 równolegle; orientacyjnie)

## Czeka na Ciebie

1. E-001 (#79): W-05: kryteria K2 i K3 są sprzeczne. Żadna wartość boolean nie jest jednocześnie toBe(true) i toBe(false) (Object.is), a K3 zabrania obejść. K1 zrobione, test K2 napisany dokładnie wg karty i jest czerwony. (czeka 9 min)  
   Wpisz orkiestratorowi: `E-001: Zamknąć`  
   Zamknąć #79 jako niewykonalne (proponowane, zgodnie z Z5 karty W-05); Zmienić kryterium K2 na wykonalne

## Zadania

### W realizacji (2)

| Zadanie | Kamień | Kto | Iteracja | PR | CI | Od |
|---|---|---|---|---|---|---|
| #79 Funkcja zwracająca jednocześnie true i false (zadanie celowo niemożliwe) | M1 | eskalacja | 1 | #85 | fail | 10 min |
| #80 parseDate(str) z testami | M1 | worker | 0 | - | - | 0 min |

### Zaplanowane (2)

| Zadanie | Kamień | Czeka na |
|---|---|---|
| #81 Punkt wejścia pakietu: src/index.ts i exports | M1 | #80 |
| #82 Dokumentacja wydania: README z użyciem biblioteki | M1 | #80, #79, #81 |

### Zrobione w bieżącym przebiegu (4)

| Zadanie | Kamień | PR |
|---|---|---|
| #78 formatPLN(kwota) z testami | M1 | #87 |
| #77 slugify(text) z testami | M1 | #86 |
| #76 sum(a, b) z testami | M1 | #84 |
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

| Nr | Rodzaj | Dotyczy | Powód |
|---|---|---|---|
| E-001 | eskalacja | #79 | W-05: kryteria K2 i K3 są sprzeczne. Żadna wartość boolean nie jest jednocześnie toBe(true) i toBe(false) (Object.is), a K3 zabrania obejść. K1 zrobione, test K2 napisany dokładnie wg karty i jest czerwony. |

## Dokumenty

- [Specyfikacja](00-intake/specyfikacja.md)
- [Lista startowa](00-intake/lista-startowa.md)
- [Plan](04-plan/plan.md)
- [Decyzje](decyzje.md)
- Karty funkcji: [W-01](00-intake/funkcje/W-01.md), [W-02](00-intake/funkcje/W-02.md), [W-03](00-intake/funkcje/W-03.md), [W-04](00-intake/funkcje/W-04.md), [W-05](00-intake/funkcje/W-05.md)
- [Historia](historia.md): punkt przekazania, dziennik etapów, wszystkie zadania
