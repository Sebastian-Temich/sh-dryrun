---
etap: 06-zadania
status: review
iteracja: 2
akceptacja_wlasciciela: false
---

# DoD: Zadania

## Dokumentacja

- [ ] `zadania.yaml` jest kompletny, a `index.md` zsynchronizowany z issue (spełnia orkiestrator po merge'u: `shctl task create` zakłada T11–T18 i dopisuje mapę; stare T1–T6 → #66–#71 anulowane 2026-11-10, `task ready` ich nie bierze)

## Funkcjonalność

- [x] Każdy kamień planu ma zadania z celem i kryteriami akceptacji
- [x] Kryteria każdego zadania z funkcją obejmują podpięcie do punktu wejścia lub routingu
- [x] Zadania są grube: jedna funkcja albo strona to jedno zadanie
- [-] Zadania z UI wskazują konkretne pliki designu (nie dotyczy: biblioteka bez UI)
- [x] Kamienie milowe są założone jako GitHub Milestones

## Checklisty jakości

- [x] Zadania mają kategorię i stack (warstwy skilli workera)
- [-] Zadania z migracją mają `db:migracja` (nie dotyczy: brak bazy)
- [x] Zadania mają rozłączne zakresy plików albo jawną zależność

## Checkpoint

- [ ] Review etapu dało PASS (zaznacza reviewer, nie autor)
