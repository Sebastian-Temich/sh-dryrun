# Backlog drobnych uwag

Plik wspólny, aktualizuje orkiestrator. Zgłoszenia ⚪ z review i „Drobne uwagi” z raportów.

| Data | Źródło | Uwaga | Stan |
|---|---|---|---|
| 2026-11-11 | review PR #95 (04-plan) | ADR-002: polecenie `shctl task deps 7 --usun T6` miesza numer issue z ID planu; zapisać opisowo | otwarte |
| 2026-11-11 | review PR #96 (06-zadania) | T8 zależy od T6 (anulowane wg ADR-002): usunąć zależność także z T8 przez shctl task deps | otwarte |
| 2026-11-11 | review PR #96 (06-zadania) | DoD 06-zadania: pola index.md i Milestones bez notatki „(po merge: shctl task create)” | otwarte |
| 2026-11-11 | T-97 | `README.md` ma tytuł `# sh-template-projekt` i opis szablonu zamiast projektu sh-dryrun; poza zakresem T1 (dokumentacja wydania T8). | otwarta |
| 2026-11-11 | T-97 | Job `e2e` i `qa-staging` w `ci.yml` używają `node-version-file: .nvmrc`, którego repo nie ma; dziś bez skutku (e2e i qa-staging pomijane), ale pierwszy projekt z Playwrightem dostanie błąd `setup-node`. | otwarta |
| 2026-11-11 | T-97 | `pnpm-workspace.yaml` ma `allowBuilds.sharp: true`, choć projekt nie używa sharp. | otwarta |
| 2026-11-11 | review PR #106 | Moduł ma już eksport slugify, więc `export {};` na końcu src/index.ts jest zbędne. Można je usunąć, gdy będzie okazja przy kolejnym zadaniu. (`src/index.ts:23`) | otwarta |
| 2026-11-11 | review PR #108 | Wywołanie przelicz(2, 'EUR', {}) sprawdza tylko typ RangeError, a nie komunikat „Brak kursu: podaj kurs albo źródło kursu”. Warto użyć toThrow(new RangeError(BRAK_KURSU)) jak w linii wyżej. (`src/przelicz.test.ts:64`) | otwarta |
| 2026-11-11 | T-99 | Komentarz w nagłówku `src/index.ts` mówi „w pustej linii pod komentarzem”, a test szkieletu z T1 wymagał, żeby ta linia była pusta; T2 i T4–T7 trafią na ten sam problem przy swoich eksportach. | otwarta |
| 2026-11-11 | T-104 | Nagłówek `README.md` to nadal „# sh-template-projekt”, a sekcje od „Jak powstaje projekt” opisują szablon, nie bibliotekę; poza zakresem #104 (tylko sekcja „Użycie”). | otwarta |
| 2026-11-11 | T-104 | Puste pliki `.gitkeep` w `docs/wydanie/techniczna/` i `produktowa/` zostały; można je usunąć teraz, gdy katalogi mają treść. | otwarta |
