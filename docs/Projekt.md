---
projekt: sh-dryrun
tryb: M
etap_opis: "Realizacja, kamień M1 Biblioteka"
postep_etapy: "3/4"
postep_zadania: "2/7"
czeka_na_ciebie: 0
eskalacje: 0
nastepny_krok: "Dokończenie #99, #103, potem #100, #101"
ostatnia_synchronizacja: 2026-11-11T19:35:52Z
---

# sh-dryrun

<!-- Plik generuje scripts/sync-status.sh przy każdej zmianie stanu. Nie edytuj go ręcznie. -->

## Gdzie jesteśmy

- **Etap:** Realizacja, kamień M1 Biblioteka
- **Postęp:** Etapy 3/4 · Zadania 2/7 w bieżącym przebiegu (łącznie 34)
- **Co się dzieje:** #99 formatPLN: kwota w złotych (W-02) (worker, od 6 min); #103 przelicz: kwota w walucie obcej na grosze (W-06) (worker, od 4 min)
- **Następny krok:** Dokończenie #99, #103, potem #100, #101
- **Szacowany czas:** ok. 54 min pracy agentów (5 zadań, średnio 27 min na zadanie, 3 równolegle; orientacyjnie)

## Czeka na Ciebie

Nic. Agenci pracują sami.

## Zadania

### W realizacji (2)

| Zadanie | Kamień | Kto | Iteracja | PR | CI | Od |
|---|---|---|---|---|---|---|
| #99 formatPLN: kwota w złotych (W-02) | M1 Biblioteka | worker | 1 | #107 | pass | 6 min |
| #103 przelicz: kwota w walucie obcej na grosze (W-06) | M1 Biblioteka | worker | 1 | #108 | pass | 4 min |

### Gotowe do startu (2)

| Zadanie | Kamień | Zależności |
|---|---|---|
| #100 chunk: dzielenie tablicy na części (W-03) | M1 Biblioteka | #97 ✓ |
| #101 retry: ponawianie wywołania (W-04) | M1 Biblioteka | #97 ✓ |

### Zaplanowane (1)

| Zadanie | Kamień | Czeka na |
|---|---|---|
| #104 Dokumentacja wydania M1 | M1 Biblioteka | #99, #100, #101, #103 |

### Zrobione w bieżącym przebiegu (2)

| Zadanie | Kamień | PR |
|---|---|---|
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
