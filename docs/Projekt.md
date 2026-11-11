---
projekt: sh-dryrun
tryb: M
etap_opis: "Realizacja, kamień M1 Biblioteka"
postep_etapy: "3/4"
postep_zadania: "1/8"
czeka_na_ciebie: 0
eskalacje: 0
nastepny_krok: "Start #98, #99, #100"
ostatnia_synchronizacja: 2026-11-11T19:28:44Z
---

# sh-dryrun

<!-- Plik generuje scripts/sync-status.sh przy każdej zmianie stanu. Nie edytuj go ręcznie. -->

## Gdzie jesteśmy

- **Etap:** Realizacja, kamień M1 Biblioteka
- **Postęp:** Etapy 3/4 · Zadania 1/8 w bieżącym przebiegu (łącznie 35)
- **Co się dzieje:** nic w toku
- **Następny krok:** Start #98, #99, #100
- **Szacowany czas:** ok. 1 h 24 min pracy agentów (7 zadań, średnio 28 min na zadanie, 3 równolegle; orientacyjnie)

## Czeka na Ciebie

Nic. Agenci pracują sami.

## Zadania

### Gotowe do startu (5)

| Zadanie | Kamień | Zależności |
|---|---|---|
| #98 slugify: slug z tekstu (W-01) | M1 Biblioteka | #97 ✓ |
| #99 formatPLN: kwota w złotych (W-02) | M1 Biblioteka | #97 ✓ |
| #100 chunk: dzielenie tablicy na części (W-03) | M1 Biblioteka | #97 ✓ |
| #101 retry: ponawianie wywołania (W-04) | M1 Biblioteka | #97 ✓ |
| #102 kursNBP: kurs waluty z tabeli NBP (W-05, zadanie testowe dryrun) | M1 Biblioteka | #97 ✓ |

### Zaplanowane (2)

| Zadanie | Kamień | Czeka na |
|---|---|---|
| #103 przelicz: kwota w walucie obcej na grosze (W-06) | M1 Biblioteka | #102 |
| #104 Dokumentacja wydania M1 | M1 Biblioteka | #98, #99, #100, #101, #102, #103 |

### Zrobione w bieżącym przebiegu (1)

| Zadanie | Kamień | PR |
|---|---|---|
| #97 Szkielet pakietu: TypeScript, vitest, tsup, ESLint, CI | M1 Biblioteka | #105 |

Wcześniejsze przebiegi (27 zadań): [Historia](historia.md).

## Eskalacje i pytania

Otwartych brak.

## Dokumenty

- [Specyfikacja](00-intake/specyfikacja.md)
- [Lista startowa](00-intake/lista-startowa.md)
- [Plan](04-plan/plan.md)
- [Decyzje](decyzje.md)
- Karty funkcji: [W-01](00-intake/funkcje/W-01.md), [W-02](00-intake/funkcje/W-02.md), [W-03](00-intake/funkcje/W-03.md), [W-04](00-intake/funkcje/W-04.md), [W-05](00-intake/funkcje/W-05.md), [W-06](00-intake/funkcje/W-06.md)
- [Historia](historia.md): punkt przekazania, dziennik etapów, wszystkie zadania
