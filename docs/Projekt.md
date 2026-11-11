---
projekt: sh-dryrun
tryb: M
etap_opis: "Realizacja, kamień M1 Biblioteka"
postep_etapy: "3/4"
postep_zadania: "4/7"
czeka_na_ciebie: 0
eskalacje: 0
nastepny_krok: "Dokończenie #100, #101"
ostatnia_synchronizacja: 2026-11-11T19:40:34Z
---

# sh-dryrun

<!-- Plik generuje scripts/sync-status.sh przy każdej zmianie stanu. Nie edytuj go ręcznie. -->

## Gdzie jesteśmy

- **Etap:** Realizacja, kamień M1 Biblioteka
- **Postęp:** Etapy 3/4 · Zadania 4/7 w bieżącym przebiegu (łącznie 34)
- **Co się dzieje:** #100 chunk: dzielenie tablicy na części (W-03) (worker, od 4 min); #101 retry: ponawianie wywołania (W-04) (worker, od 1 min)
- **Następny krok:** Dokończenie #100, #101
- **Szacowany czas:** ok. 25 min pracy agentów (3 zadań, średnio 25 min na zadanie, 3 równolegle; orientacyjnie)

## Czeka na Ciebie

Nic. Agenci pracują sami.

## Zadania

### W realizacji (2)

| Zadanie | Kamień | Kto | Iteracja | PR | CI | Od |
|---|---|---|---|---|---|---|
| #100 chunk: dzielenie tablicy na części (W-03) | M1 Biblioteka | worker | 1 | #109 | pass | 4 min |
| #101 retry: ponawianie wywołania (W-04) | M1 Biblioteka | worker | 1 | - | - | 1 min |

### Zaplanowane (1)

| Zadanie | Kamień | Czeka na |
|---|---|---|
| #104 Dokumentacja wydania M1 | M1 Biblioteka | #100, #101 |

### Zrobione w bieżącym przebiegu (4)

| Zadanie | Kamień | PR |
|---|---|---|
| #99 formatPLN: kwota w złotych (W-02) | M1 Biblioteka | #107 |
| #103 przelicz: kwota w walucie obcej na grosze (W-06) | M1 Biblioteka | #108 |
| #98 slugify: slug z tekstu (W-01) | M1 Biblioteka | #106 |
| #97 Szkielet pakietu: TypeScript, vitest, tsup, ESLint, CI | M1 Biblioteka | #105 |

Wcześniejsze przebiegi (27 zadań): [Historia](historia.md).

### Anulowane w bieżącym przebiegu (1)

- #102 kursNBP: kurs waluty z tabeli NBP (W-05, zadanie testowe dryrun)

## Eskalacje i pytania

Otwartych brak.

Zamknięte (1): [E-001](07-realizacja/escalations/E-001.md).

## Dokumenty

- [Specyfikacja](00-intake/specyfikacja.md)
- [Lista startowa](00-intake/lista-startowa.md)
- [Plan](04-plan/plan.md)
- [Decyzje](decyzje.md)
- Karty funkcji: [W-01](00-intake/funkcje/W-01.md), [W-02](00-intake/funkcje/W-02.md), [W-03](00-intake/funkcje/W-03.md), [W-04](00-intake/funkcje/W-04.md), [W-05](00-intake/funkcje/W-05.md), [W-06](00-intake/funkcje/W-06.md)
- [Historia](historia.md): punkt przekazania, dziennik etapów, wszystkie zadania
