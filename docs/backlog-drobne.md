# Backlog drobnych uwag

Plik wspólny, aktualizuje orkiestrator. Zgłoszenia ⚪ z review i „Drobne uwagi” z raportów.

| Data | Źródło | Uwaga | Stan |
|---|---|---|---|
| 2026-11-04 | T-8 | Brak pliku `.node-version` / `.nvmrc` dla fnm; warto dodać w osobnym zadaniu, żeby lokalna wersja Node była przypięta. | otwarta |
| 2026-11-04 | T-8 | `README.md` nie opisuje jeszcze komend projektu (poza zakresem). | otwarta |
| 2026-11-04 | T-11 | `src/index.ts` nie reeksportuje `formatPLN`; publiczne API paczki (`dist/index.js`) jej nie zawiera. Warto dodać reeksport w osobnym zadaniu. | otwarta |
| 2026-11-04 | T-9 | `src/index.ts` nie reeksportuje funkcji biblioteki (`formatPLN`, `parseDate`, `sum`); publiczne API pakietu warto uzupełnić osobnym zadaniem. | otwarta |
| 2026-11-04 | review PR #18 | Raport deklaruje testy ±Infinity na każdej pozycji, ale testy nie obejmują -Infinity jako pierwszego argumentu ani +Infinity jako drugiego. Dopasuj opis do rzeczywistego pokrycia. (`docs/07-realizacja/T-9.md:13`) | otwarta |
