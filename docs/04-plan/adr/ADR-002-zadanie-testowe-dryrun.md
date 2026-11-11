# ADR-002: Zadanie testowe dryrun z celowo sprzecznym kryterium

Status: proponowana
Data: 2026-11-11

## Kontekst

Projekt wzorcowy sh-dryrun testuje mechanikę procesu (przebieg 6, polecenie właściciela z
2026-11-11): eskalację zadania niewykonalnego, anulowanie go i odblokowanie zadania zależnego przez
`shctl task deps`.

## Decyzja

Zadanie W-05 (`kursNBP`) w etapie 06-zadania dostaje, poza kryteriami karty W-05/K1–K7, kryterium
sprzeczne z ADR-001: test integracyjny na żywym API NBP uruchomiony lokalnie przez workera i zielony.
Sandbox workera nie ma sieci do `api.nbp.pl`, więc kryterium jest niewykonalne, a worker eskaluje
(„wymagania sprzeczne”). Zadanie W-06 (`przelicz`) zależy od W-05.

Identyfikatory: zadanie W-05 to T6, zadanie W-06 to T7 (`plan.md`, „Planowane zadania”).

Oczekiwany przebieg: eskalacja T6 → decyzja orkiestratora z upoważnienia właściciela (zakres
autoryzacji planu): anulowanie T6 (`shctl task close --anuluj`) → `shctl task deps 7 --usun T6`
usuwa zależność → T7 realizuje przeliczenie bez modułu NBP.

Kontrakt `przelicz` niezależny od W-05 (obowiązuje także, gdy T6 nie zostanie anulowane):

```ts
przelicz(kwota: number, kod: string, opcje?: {
  kurs?: number;                                  // kurs podany wprost
  zrodloKursu?: (kod: string) => Promise<number>; // np. async k => (await kursNBP(k)).kurs
}): Promise<number>                               // grosze
```

- `kurs` podany: przeliczenie bez źródła (W-06/K1, K2, K4).
- `kurs` brak, `zrodloKursu` podane: kurs ze źródła; W-06/K3 sprawdza to atrapą źródła zwracającą 4.25.
- Oba brak: `RangeError` „Brak kursu: podaj kurs albo źródło kursu”. `przelicz` nie importuje
  `src/kurs-nbp.ts`; krok 2 przebiegu karty W-06 („bez kursu pobiera go z NBP”) realizuje programista,
  przekazując `kursNBP` jako źródło. To zawężenie karty W-06 zapisuje orkiestrator w `decyzje.md`.

## Rozważane opcje

- Zadanie celowo niewykonalne w planie (wybrana): test mechaniki na prawdziwej pętli.
- Symulacja eskalacji ręczna: nie testuje workera ani `task deps`.

## Konsekwencje

Przy anulowaniu W-05 kryteria W-05/K1–K7 zostają bez realizacji w M1; odbiór (O-7) przyjmuje brak
`kursNBP`. W-05 ma priorytet „może”, więc wynik zlecenia jest kompletny bez niego.
