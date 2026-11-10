# Backlog drobnych uwag

Plik wspólny, aktualizuje orkiestrator. Zgłoszenia ⚪ z review i „Drobne uwagi” z raportów.

| Data | Źródło | Uwaga | Stan |
|---|---|---|---|
| 2026-11-10 | review PR #73 (04-plan) | O-4 w planie: format wiersza „2026-11-04: …” składa test (toISOString().slice(0,10)), nie funkcja biblioteki | otwarte |
| 2026-11-10 | review PR #73 (04-plan) | Plan, zadania właściciela: jawny wiersz „Publikacja w npm: nie dotyczy (poza zakresem)” | otwarte |
| 2026-11-10 | review PR #73 (04-plan) | zadania.yaml (baseline) T4 dopuszcza zwykłą spację, sprzeczne z W-03/K2; wyrównać w 06-zadania | otwarte |
| 2026-11-10 | T-75 | `pnpm-workspace.yaml` z szablonu ma `allowBuilds` dla `esbuild` i `sharp`, których projekt nie używa (vitest 5 działa na rolldown); wpisy nieszkodliwe, zostawione. | otwarta |
| 2026-11-10 | T-75 | Test dymny `tests/smoke.test.ts` napisany przed `package.json`, ale jego czerwony stan nie został uruchomiony (pierwszy przebieg po instalacji zależności był już zielony). | otwarta |
| 2026-11-10 | T-76 | Karta W-01 ma w „Do potwierdzenia” Z1 (arytmetyka zmiennoprzecinkowa ułamków) ze statusem „do potwierdzenia”, choć issue rozstrzyga ją (`toBeCloseTo`). Warto zaktualizować status w karcie. | otwarta |
| 2026-11-10 | review PR #84 | Test „Infinity i -Infinity razem” sprawdza tylko typ TypeError, a nie komunikat. Dla spójności z pozostałymi testami K3 warto dodać toThrow(KOMUNIKAT). (`tests/sum.test.ts:50`) | otwarta |
| 2026-11-10 | review PR #86 | Niewidoczne znaki (U+0301, U+00A0, U+200B, U+00AD) są wpisane w źródło dosłownie, także w przypadkach K3 (linie 65–67) i w teście NFD (linia 107). Lepiej zapisać je jako sekwencje \u, np. "́", żeby test był czytelny i odporny na normalizację przez edytor. (`tests/slugify.test.ts:19`) | otwarta |
| 2026-11-10 | review PR #86 | Ten sam tekst w NFC i NFD daje różne slugi: „Café” w NFC daje „caf”, a w NFD „cafe”. Jest to zgodne z K5 („bez dekompozycji NFD”), ale karta W-02 tego nie rozstrzyga. Warto dopisać to zachowanie do karty jako świadomą decyzję. (`src/slugify.ts:44`) | otwarta |
| 2026-11-10 | T-78 | Karta W-03 ma Z3 (bardzo duże kwoty) ze statusem „do potwierdzenia”; implementacja przyjmuje proponowaną odpowiedź (bez błędu). Warto zaktualizować status w karcie. | otwarta |
| 2026-11-10 | T-80 | Karta W-04 ma Z4 (lata przed 1000) ze statusem „do potwierdzenia”; implementacja przyjmuje proponowaną odpowiedź. Warto zaktualizować status w karcie. | otwarta |
| 2026-11-10 | review PR #88 | Testy przypadków brzegowych sprawdzają tylko typ RangeError, a nie komunikat „parseDate: nieprawidłowa data”. Warto dodać toThrow(KOMUNIKAT), tak jak w teście K3. (`tests/parseDate.test.ts:46`) | otwarta |
