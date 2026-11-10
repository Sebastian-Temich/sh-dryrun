# Lista startowa

Wszystko zewnętrzne, czego realizacja potrzebuje od właściciela: konta, dostępy, domeny, klucze
testowe, limity i płatności usług, materiały. Spisuje ją `sh-intake` na początku zlecenia jedną listą,
a orkiestrator zaznacza pozycję po potwierdzeniu właściciela (na `main`).

`shctl task ready` i `shctl task dispatch` nie startują realizacji, dopóki jest tu choć jedno pole
`- [ ]`. Pole bez zastosowania: `- [-] treść (nie dotyczy: powód)`.

Wartości sekretów nigdy nie trafiają do tego pliku: właściciel wpisuje je do `.env.local` w repo głównym
albo do panelu usługi, a tu tylko potwierdza, że są.

Format pozycji: `- [ ] CO, PO CO (W-NN), JAK: kroki dla właściciela; GDZIE wpisać; JAK sprawdzimy`.

## Konta i dostępy

## Domeny i DNS

- [x] Adres stagingu dla joba qa-staging, PO CO: e2e i Lighthouse w QA kamienia (W-06), JAK: właściciel potwierdza adres https://example.com (stała publiczna strona testowa, bez konta); GDZIE: pole staging_url w docs/konfiguracja.md (wpisuje intake); JAK sprawdzimy: job qa-staging w PR z stage/08-qa wykonuje kroki „E2E na stagingu” i „Lighthouse na stagingu”, a nie notice o braku staging_url

## Klucze testowe i zmienne

## Limity i płatności usług

## Materiały

