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

- [-] Konta hostingu i bazy (nie dotyczy: biblioteka bez aplikacji i bazy)

## Domeny i DNS

- [-] Domena (nie dotyczy: biblioteka bez strony)

## Klucze testowe i zmienne

- [-] Klucz API NBP, PO CO W-05 (nie dotyczy: publiczne API tabeli A bez klucza i konta; sprawdzimy
  testem z atrapą fetch, a ręcznie zapytaniem o kurs EUR w przeglądarce)

## Limity i płatności usług

- [-] Billing GitHub Actions (nie dotyczy: repo publiczne, Actions bez opłat)

## Materiały

- [-] Design, teksty, logotypy (nie dotyczy: biblioteka bez interfejsu)

<!-- Przykład (iskt-www, E-005–E-007):
- [ ] Vercel: Protection Bypass for Automation dla podglądów PR (W-12), JAK: Project → Settings →
  Deployment Protection → Protection Bypass for Automation → Add; wartość do `.env.local` jako
  VERCEL_AUTOMATION_BYPASS_SECRET; sprawdzimy: curl -sI na podgląd PR zwraca 200, nie 302
- [ ] Resend: domena nadawcy zweryfikowana albo CONTACT_TO = adres właściciela konta (W-04), JAK:
  Resend → Domains → Add domain, rekordy SPF i DKIM w DNS; sprawdzimy: wysyłka testowa na CONTACT_TO
- [ ] GitHub Actions: płatności konta aktywne i limit wydatków > 0 (CI, wszystkie W), JAK: Settings →
  Billing and plans → Payment information i Spending limits; sprawdzimy: job e2e startuje na PR
-->
