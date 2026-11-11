# ADR-001: Integracja z API NBP

Status: proponowana
Data: 2026-11-11

## Kontekst

W-05 pobiera średni kurs z tabeli A NBP (`https://api.nbp.pl/api/exchangerates/rates/a/{KOD}/?format=json`).
Specyfikacja ocenia integrację zewnętrzną na „tak”. API jest publiczne, bez klucza. Worker i CI
testują bez sieci do NBP (sandbox workera ma sieć tylko do GitHuba i npm).

## Decyzja

- `kursNBP(kod, { fetch, timeoutMs })`: `fetch` wstrzykiwany (domyślnie globalny), limit czasu 5000 ms
  przez `AbortController`.
- Walidacja wejścia (`/^[A-Za-z]{3}$/`) przed zapytaniem; walidacja odpowiedzi (`rates[0].mid` > 0 i
  skończona, `effectiveDate` w formacie daty).
- Błędy: `NieznanaWalutaError` (zły kod, 404), `NbpNiedostepneError` (inne statusy, limit czasu, zły
  JSON) z `cause`.
- Testy wyłącznie z atrapą `fetch` i fałszywym zegarem vitest.

Minimalne dowody (integracje): testy walidacji wejścia, obsługi błędów (404, 503, zły JSON) i limitu
czasu, wszystkie bez sieci (W-05/K1–K7).

## Rozważane opcje

- Wstrzykiwany `fetch` (wybrana): testy bez sieci, brak zależności.
- Biblioteka HTTP (np. ky): niepotrzebna zależność.
- Testy na żywym API: niedeterministyczne i niemożliwe w sandboxie workera (ADR-002).

## Konsekwencje

Brak buforowania i ponawiania w `kursNBP`; programista łączy z `retry` (W-04), gdy chce.
