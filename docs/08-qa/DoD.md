---
etap: 08-qa
status: in-progress
iteracja: 0
akceptacja_wlasciciela: false
---

# DoD: QA zbiorcze

## Dokumentacja

- [x] Raport QA powstał dla każdego kamienia milowego

  M1 jest jedynym kamieniem: `raport-M1.md`.

## Funkcjonalność

- [ ] Testy E2E przechodzą (chromium + webkit)

  Nie dotyczy: biblioteka bez UI, bez Playwright; przepływy w `tests/qa/` (vitest).
- [x] Integracja i zgodność z wymaganiami są sprawdzone
- [ ] Błędy z QA są issue i zostały zamknięte

  QA-M1-1 do założenia po merge'u (`zadania-M1.yaml`).

## Checklisty jakości

- [ ] Nie ma otwartych zgłoszeń krytycznych ani istotnych
- [x] Bezpieczeństwo i sekrety są sprawdzone

## Checkpoint

- [ ] Review etapu dało PASS (zaznacza reviewer, nie autor)
