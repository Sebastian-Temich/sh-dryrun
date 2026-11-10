# Backlog drobnych uwag

Plik wspólny, aktualizuje orkiestrator. Zgłoszenia ⚪ z review i „Drobne uwagi” z raportów.

| Data | Źródło | Uwaga | Stan |
|---|---|---|---|
| 2026-11-10 | review PR #73 (04-plan) | O-4 w planie: format wiersza „2026-11-04: …” składa test (toISOString().slice(0,10)), nie funkcja biblioteki | otwarte |
| 2026-11-10 | review PR #73 (04-plan) | Plan, zadania właściciela: jawny wiersz „Publikacja w npm: nie dotyczy (poza zakresem)” | otwarte |
| 2026-11-10 | review PR #73 (04-plan) | zadania.yaml (baseline) T4 dopuszcza zwykłą spację, sprzeczne z W-03/K2; wyrównać w 06-zadania | otwarte |
| 2026-11-10 | T-75 | `pnpm-workspace.yaml` z szablonu ma `allowBuilds` dla `esbuild` i `sharp`, których projekt nie używa (vitest 5 działa na rolldown); wpisy nieszkodliwe, zostawione. | otwarta |
| 2026-11-10 | T-75 | Test dymny `tests/smoke.test.ts` napisany przed `package.json`, ale jego czerwony stan nie został uruchomiony (pierwszy przebieg po instalacji zależności był już zielony). | otwarta |
