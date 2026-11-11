# Metryki

Plik wspólny, aktualizuje orkiestrator. Pomiar poglądowy, służy też do porównań w `sh-dryrun`.

Układ: porównanie przebiegów na górze, potem przebiegi od najstarszego. Każdy przebieg ma te same
podsekcje: konfiguracja, zadania (wiersze dopisuje `shctl task close` do ostatniej tabeli
`| Zlecenie |` w pliku), miary, kontrole. Nową sekcję przebiegu dopisuje na końcu `shctl reset-dryrun`.

Mac: Intel i5-3470S, 4 rdzenie, 24 GB RAM, swap 4 GB. Próbki co 30 s (`vm.loadavg`, `df -g /`).

## Porównanie przebiegów

| Miara | Przebieg 1 (max_local=1) | Przebieg 2 (max_local=2) | Przebieg 3 (max_local=2, z builderem) | Przebieg 5 (max_local=3, M z kartami) |
|---|---|---|---|---|
| Realizacja planu M1 (reset → ostatnie zadanie) | 77 min (ok. 58 min bez 16 min kolejki CI GitHuba i 3 min błędu skryptu) | 28 min | 26 min | 36 min (6 zadań 22:17–22:47 + #82 po decyzji E-001; 8 zadań planu, 1 anulowane) |
| QA M1 | 11 min | 43 min (ok. 18 min bez konfliktu DoD) | 11 min (2 iteracje review etapu, bez konfliktu) | 7 min (PASS bez błędów, bez iteracji; qa-staging z e2e i Lighthouse) |
| Czas całkowity | 87 min | 71 min | 37 min | ok. 71 min pracy agentów (z etapami 00-intake, 04-plan, 06-zadania), 212 min zegarowo z 162 min czekania na właściciela |
| Czas pracy workera na zadanie (z `task close`) | 4–26 min, mediana 9 | 3–7 min, mediana 4 | 3–8 min, mediana 4,5 | 3–8 min, mediana 5 |
| Load 1 min w realizacji: średnia / maks. | 6,2 / 32,1 | 4,9 / 9,2 | brak próbkowania (6,73 na końcu) | brak (sysctl zablokowany w sandboxie orkiestratora) |
| Dysk (wolne) | 26 → 25 GB | 25 → 24 GB | 32 → 31 GB | 17 → 18 GB |
| Swap na końcu | 3,2 z 4 GB | 2,7 z 4 GB | 2,5 z 4 GB | brak (sysctl zablokowany w sandboxie) |

Wnioski z przebiegów 1 i 2 (przebieg 3 to test regresji, wnioski w jego „Kontrolach”):

- Przy zadaniach tej wielkości obciążenie CPU zależy od startu workera (`claude`, `pnpm install`) i
  review Codexa, a nie od liczby workerów: średni load przy 2 workerach 5,3, przy 1 5,2. Szczyty 31–32 w
  przebiegu 1 to zbieg końca review, startu iteracji i dispatchu.
- Dwa sloty skracają realizację o ok. 50% (58 → 28 min netto); część różnicy to mniej iteracji (#26 PASS
  w 1. iteracji, #27 z zielonym CI), więc zysk z samej równoległości to ok. 30–40%.
- Dysk i swap nie są ograniczeniem dla biblioteki; pnpm używa wspólnego magazynu.
- **Docelowy limit na tym Macu: `max_local: 2`.** Wartość 3 dopiero po pomiarze na projekcie z
  Playwright (webkit) i Supabase w Dockerze: 4 rdzenie i 4 GB swapu zajęte w 2,7–3,2 GB przy obecnych
  zadaniach to mały zapas, a `min_wolne_gb: 15` przy 24 GB wolnego zostawia ok. 9 GB na obrazy Dockera.

## Przebieg dryrun 1: max_local=1 (2026-11-04)

Konfiguracja: `max_local=1`, issue #8–#13, zadanie celowo niemożliwe #12.

### Zadania

Brak wierszy zadań w pliku dla tego przebiegu (miary niżej zebrane ręcznie).

| Zlecenie | Tryb | Czas | Zadania | Iteracje | Eskalacje | Uwagi |
|---|---|---|---|---|---|---|

### Miary

| Miara | Wartość |
|---|---|
| Start (reset-dryrun, issue #8–#13) | 16:53 UTC |
| Koniec realizacji planu (#10) | 18:10 UTC, 77 min |
| QA M1 (raport, review etapu, #21, stage done) | 18:10–18:21, 11 min |
| Koniec M1 (realizacja + QA + błąd QA) | 18:21 UTC |
| Czas całkowity | 87 min |
| Przestoje spoza systemu | ok. 16 min CI GitHuba w kolejce (#11, 17:24–17:42), ok. 3 min błąd skryptu monitorującego |
| Load 1 min: średnia / maks. | 6,1 / 32,1 |
| Load przy aktywnym workerze: średnia | 6,1 |
| Wolne miejsce na dysku | 26 → 25 GB (min. 15) |
| Swap na końcu | 3,2 z 4 GB |

### Kontrole

| Kontrola | Wynik |
|---|---|
| Kolejność | OK: `task ready` dał tylko #8; #9–#13 zablokowane „zależność #8 otwarta” do jego zamknięcia |
| Równoległość | 1 worker naraz (`sloty.wolne` = 0 przy aktywnym); sloty liczone dla wszystkich projektów |
| Review Codex | 11 review: 5 zadań PASS w 1. iteracji, #11 FAIL (2× 🟡) → PASS w 2., #12 3× FAIL, review etapu 08-qa PASS; 45–100 s na review |
| Zależność | OK: #13 zablokowane „zależność #11 otwarta”, gotowe od razu po zamknięciu #11 |
| Pętla i eskalacja (#12) | Worker sam eskalował (E-001 na gałęzi `task/12`), CI czerwone; review mimo czerwonego CI → FAIL ×3; `task iter` po 3. FAIL: `eskalowano:true`, E-001 na `main`, powiadomienie. Panel eskalowanego zadania blokował jedyny slot, zamknięty ręcznie. Właściciel: #12 niewykonalne |
| QA po M1 | `sh-qa`: FAIL, 1× 🟡 QA-M1-1 (pakiet nie eksportuje funkcji), 2× ⚪; PR #20, review PASS, `task create` → #21, PASS, `stage done 08-qa` |
| Pliki wspólne | Brak konfliktów merge'a. Odstępstwa: worker #12 przez `shctl escalate` zmienił `docs/status.md` w worktree i dodał `escalations/E-001.md` na gałęzi (kolizja numeru z E-001 na `main`); `stage review` zmienia `DoD.md` na `main` równolegle z PR etapu (bez konfliktu, inne fragmenty) |
| Szablon CI | `testy-skryptow` czerwony od baseline (`sync-status.bats` czyta żywe `docs/`), naprawiony w #8 decyzją orkiestratora |

## Przebieg dryrun 2: max_local=2 (2026-11-04)

Konfiguracja: `max_local=2`, issue #23–#28, zadanie celowo niemożliwe #27.

### Zadania

| Zlecenie | Tryb | Czas | Zadania | Iteracje | Eskalacje | Uwagi |
|---|---|---|---|---|---|---|
| #23 Szkielet: projekt Node + TypeScript + vitest + CI | M | 7min | 1 | 1 | 0 | PR #29 |
| #26 formatPLN(kwota) z testami | M | 4min | 1 | 1 | 0 | PR #31 |
| #24 sum(a, b) z testami | M | 4min | 1 | 1 | 0 | PR #32 |
| #25 slugify(text) z testami | M | 3min | 1 | 1 | 0 | PR #33 |
| #28 parseDate(str) z testami | M | 4min | 1 | 1 | 0 | PR #34 |
| #36 QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | M | 6min | 1 | 1 | 0 | PR #37 |

### Miary

| Miara | Wartość |
|---|---|
| Start (reset-dryrun, issue #23–#28) | 18:22 UTC |
| Koniec realizacji planu (#28) | 18:50 UTC, 28 min |
| QA M1 (raport, 2 iteracje review etapu, #36, stage done) | 18:50–19:33, 43 min, w tym ok. 25 min konflikt frontmattera DoD w PR #35 (CI nie startowało, błędna diagnoza E-002) |
| Czas całkowity | 71 min |
| Load 1 min w realizacji: średnia / maks. | 4,9 / 9,2 |
| Load przy 2 aktywnych workerach / przy 1: średnia | 5,3 / 5,2 |
| Wolne miejsce na dysku | 25 → 24 GB |
| Swap na końcu | 2,7 z 4 GB |

### Kontrole

| Kontrola | Wynik |
|---|---|
| Kolejność | OK: #23 sam; harmonogram dispatchował #27 i #26 razem dopiero po zamknięciu #23 |
| Równoległość | 2 workery naraz (`sloty.wolne` 0 przy dwóch), trzeci dispatch dopiero po zwolnieniu slotu |
| Review Codex | 11 review: 5 zadań i #36 PASS w 1. iteracji, #27 3× FAIL, review etapu FAIL → PASS (2 równoległe review tego samego commita przez błąd orkiestratora, oba PASS); 37–60 s na review |
| Zależność | OK: #28 dopiero po zamknięciu #26 (18:39 → dispatch 18:45, gdy zwolnił się slot po eskalacji #27) |
| Pętla i eskalacja (#27) | Worker tym razem nie dodał sprzecznego testu (CI zielone, kryterium 2 niespełnione); Codex 3× 🔴, `task iter` → `eskalowano:true`, E-001; zamknięcie jak w przebiegu 1 |
| QA po M1 | FAIL 1× 🟡 QA-M1-1 (brak `exports` w `package.json` i reeksportów; inna przyczyna niż w przebiegu 1), 3× ⚪ → #36 PASS, `stage done 08-qa` |
| Pliki wspólne | Brak konfliktów w PR zadań przy 2 workerach (zamknięcia z blokadą po stronie orkiestratora). Konflikt w `docs/08-qa/DoD.md` (plik etapu): `status` na `main` z `stage review`/`escalate` obok `iteracja` na gałęzi etapu |
| Szablon CI | Ten sam czerwony `testy-skryptow` w #23, naprawiony tym samym poleceniem |

## Przebieg dryrun 3: max_local=2 (2026-11-04)

Reset do baseline `624bd6f` o 22:27 UTC. Wiersze zadań dopisuje `shctl task close`, miary przebiegu orkiestrator.

Konfiguracja: `max_local=2` (globalny z `/Users/Shared/sh/konfiguracja.md`; baseline miał w projekcie
`max_local: 1`, podniesione do 2 decyzją właściciela), issue #38–#43, zadanie celowo niemożliwe #42.
Test regresji po sh-system#44, #45, #47, #48, #49 i sh-template-projekt#13, #14. **Równolegle
pracowała sesja buildera** (w trakcie przebiegu zmergowano sh-system#50, 22:32 UTC), więc load i czasy
nie są w pełni porównywalne z przebiegami 1 i 2.

### Zadania

| Zlecenie | Tryb | Czas | Zadania | Iteracje | Eskalacje | Uwagi |
|---|---|---|---|---|---|---|
| #38 Szkielet: projekt Node + TypeScript + vitest + CI | M | 8min | 1 | 1 | 0 | PR #44 |
| #41 formatPLN(kwota) z testami | M | 5min | 1 | 1 | 0 | PR #46 |
| #39 sum(a, b) z testami | M | 3min | 1 | 1 | 0 | PR #47 |
| #40 slugify(text) z testami | M | 5min | 1 | 1 | 0 | PR #48 |
| #43 parseDate(str) z testami | M | 4min | 1 | 1 | 0 | PR #49 |
| #51 QA M1: punkt wejścia pakietu nie eksportuje funkcji biblioteki | M | 4min | 1 | 1 | 0 | PR #52 |
| #53 capitalize(text) z testami i przykładem w README | S | 25min | 1 | 1 | 0 | PR #54 |

### Miary

Bez próbkowania co 30 s (brak skryptu monitorującego w tym przebiegu): load, dysk i swap to odczyty
punktowe.

| Miara | Wartość |
|---|---|
| Start (reset-dryrun, issue #38–#43) | 22:27 UTC |
| Koniec realizacji planu (#43) | 22:53 UTC, 26 min |
| QA M1 (raport, 2 iteracje review etapu, #51, stage done) | 22:53–23:04, 11 min |
| Czas całkowity | 37 min |
| Przestoje spoza systemu | ok. 5 min: naprawa czerwonego `testy-skryptow` w #38 (baseline bez sh-template-projekt#12) |
| Review Codex | 8: 5 zadań PASS w 1. iteracji, review etapu FAIL → PASS, #51 PASS; #42 bez review (eskalacja workera w 1. iteracji) |
| Load 1 min na końcu (odczyt punktowy) | 6,73 (5 min 5,41, 15 min 6,43) |
| Wolne miejsce na dysku | 32 → 31 GB |
| Swap na końcu | 2,5 z 4 GB |

### Kontrole

| Kontrola | Wynik |
|---|---|
| Reset | OK: `reset-dryrun` bez ręcznych obejść; issue #38–#43 założone od nowa z `zadania.yaml`, stare zarchiwizowane; klon w Obsidianie `odtworzony` (HEAD = commit resetu); układ metryk z przebiegów 1–2 zachowany |
| Zielone CI od szkieletu | NIE: `testy-skryptow` czerwony w #38 (`sync-status.bats` 53, 57 czyta żywe `docs/`). Poprawka jest w szablonie (sh-template-projekt#12), ale baseline `624bd6f` jej nie ma (przeniesiono tylko profile ról z #13). Worker przeniósł ją na polecenie, 1 nieudana naprawa CI w liczniku |
| Kolejność i zależność | OK: #38 sam; #43 zablokowane „zależność #41 otwarta”, gotowe po zamknięciu #41 |
| Równoległość | OK: 2 workery naraz (#42 + #41, potem #39 + #40), `max_local_globalny` 2 |
| DoD przy FAIL review etapu | OK: `stage review` → FAIL → `stage iter` (iteracja 2 na `main`) → poprawka na `stage/08-qa` → `stage review` → `pr check --czekaj` bez konfliktu (`MERGEABLE`), PASS; gałąź etapu nie zmieniała frontmattera |
| Eskalacja zwalnia slot | OK: po eskalacji #42 `sloty.wolne` 2 przy żywym panelu z etykietą `eskalacja:sh-dryrun:42`; #39 i #40 wystartowały |
| Eskalacja z worktree | OK: worker #42 przez `shctl escalate` założył E-001 na `main` w `/Users/Shared/sh/projekty/sh-dryrun`, worktree czysty, jedna numeracja (E-001) |
| `task cancel` po eskalacji | OK: E-001 zamknięta, #42 `NOT_PLANNED` bez etykiety `status:*`, PR #45 zamknięty, gałąź usunięta lokalnie i na `origin`, worktree usunięty, panel zamknięty, wpis znika z `stan/sh-dryrun.json`. Drobne: `stan` miał wcześniej etykietę `worker:` zamiast `eskalacja:` |
| `task wait` | Częściowo: działa dla nowej pracy (`gotowe` po 68–201 s), ale po poleceniu naprawy CI zwraca `gotowe` od razu (PR z raportem już jest), choć worker pracuje; użyto raz `herdr agent wait --timeout`. `pr check` policzył przy tym commit raportu jako nieudaną naprawę CI |
| Propozycje workerów | OK: T-38, T-41, T-43 jako commity w zbiorczym PR sh-system#46 (`propozycje-2026-11`), bez nowych PR; T-39, T-40 bez propozycji |
| QA po M1 | FAIL 1× 🟡 QA-M1-1 (punkt wejścia bez reeksportów, jak w przebiegu 2), 1× ⚪; review etapu FAIL (`test.skip`) → PASS (`test.fails`); #51 PASS, `stage done 08-qa` |
| Zgody właściciela | 0 próśb o zgodę widocznych w sesji (tryb Auto, sh-system#49) |

## Przebieg dryrun 5: M1 z kartami funkcji, max_local=3 (2026-11-10)

W numeracji `shctl reset-dryrun` to przebieg 4 (commit `reset-dryrun: przebieg 4`); właściciel liczy go jako 5.

Reset do baseline `2ded36e` o 20:34 UTC. Wiersze zadań dopisuje `shctl task close`, miary przebiegu orkiestrator.

### Konfiguracja

`max_local: 3` globalnie (`/Users/Shared/sh/konfiguracja.md`, projekt bez nadpisania), review `zwykle` Claude opus medium, `ryzyko` Codex gpt-6-astra high (próg 400 linii), `staging_url: https://example.com`. Pełny tryb M: 00-intake z kartami W-01–W-05 i pytaniami, 04-plan, 06-zadania, realizacja #75–#82, QA M1; potem zlecenie S #92. Zadanie celowo niemożliwe: #79 (W-05 paradox).

### Zadania

| Zlecenie | Tryb | Czas | Zadania | Iteracje | Eskalacje | Uwagi |
|---|---|---|---|---|---|---|
| #75 Szkielet: projekt Node + TypeScript + vitest + CI | M | 8min | 1 | 1 | 0 | PR #83 |
| #76 sum(a, b) z testami | M | 4min | 1 | 1 | 0 | PR #84 |
| #77 slugify(text) z testami | M | 6min | 1 | 1 | 0 | PR #86 |
| #78 formatPLN(kwota) z testami | M | 5min | 1 | 1 | 0 | PR #87 |
| #80 parseDate(str) z testami | M | 5min | 1 | 1 | 0 | PR #88 |
| #81 Punkt wejścia pakietu: src/index.ts i exports | M | 4min | 1 | 1 | 0 | PR #89 |
| #82 Dokumentacja wydania: README z użyciem biblioteki | M | 3min | 1 | 1 | 0 | PR #90 |
| #92 slugify: sekcja użycia w README z przypadkami brzegowymi i testem przykładów | S | 8h 19min | 1 | 1 | 0 | PR #93; praca 5 min (00:15–00:20), reszta to czekanie na odbiór |
| #79 paradox (W-05, celowo niemożliwe) | M | 1 min do eskalacji | 1 | 0 | 1 | PR #85 zamknięty, `task close --anuluj` po E-001: A |


### Miary

Czasy UTC. Czekanie na właściciela liczone od pytania albo powiadomienia do odpowiedzi.

| Miara | Wartość |
|---|---|
| Start (reset-dryrun, issue #66–#71 z baseline) | 20:34 |
| 00-intake: brief, lista startowa i 7 pytań → PR #72 PASS | 20:36 pytania; 21:12 odpowiedzi; 21:20 PASS (FAIL → PASS); akceptacja 21:57 |
| 04-plan: PR #73 PASS → akceptacja | 22:03 → 22:04 |
| 06-zadania: PR #74 (FAIL → PASS), anulowanie #66–#71, issue #75–#82 | 22:04–22:16 |
| Realizacja: #75 szkielet → #81 | 22:17–22:47 (30 min, 6 zadań, do 3 workerów naraz) |
| E-001 (#79) → decyzja właściciela | 22:28 → 23:53 (85 min); #82 czekało na nią |
| #82 dokumentacja | 23:54–23:59 |
| QA M1 (PR #91, qa-staging, merge, `stage done`) | 23:59–00:06 (7 min) |
| Zlecenie S #92 (pytanie o duplikat, issue, worker, review) | 00:12–00:20 (praca 5 min); odbiór 08:36 |
| Czas pracy agentów bez czekania na właściciela | M1 z etapami ok. 71 min (intake 10, plan 6, zadania 12, realizacja 36, QA 7); S 5 min |
| Czekanie na właściciela | 162 min w M1 (pytania 36, specyfikacja 37, plan 1, E-001 85, wybór wariantu S 3) + odbiór S przez noc |
| Review | 14 z modelem: Codex 5 (PR #72 ×3, #83 ×2: diff > 400 linii albo pliki CI), Claude 9; PR #90 (sama dokumentacja) PASS bez modelu. FAIL: #72 (1× 🟡), #74 (2× 🟡); zadania kodu: 0 FAIL |
| Load, swap | brak: `sysctl` zablokowany w sandboxie orkiestratora |
| Wolne miejsce na dysku | 17 → 18 GB (min. 15) |

### Kontrole

| Kontrola | Wynik |
|---|---|
| Sandbox: worker | OK: `pnpm install`, lint, typecheck, vitest i build u wszystkich workerów bez próśb o zgodę. E2E lokalnie nieuruchamiane (T-75: „sandbox bez przeglądarek”), robi je CI. Problem: `git merge origin/main` w worktree pada w sandboxie, gdy `main` zmienia pliki wspólne (T-78, T-80), i zostawia połowiczny merge, który worker cofa ręcznie |
| Sandbox: orkiestrator | OK: push, fetch, `worktree add/remove`, `gh pr create/merge`, `gh issue edit` i shctl bez próśb o zgodę. Odmowy: `git worktree remove --force` (deny, użyto `shctl sprzataj`); hook blokuje `--body-file` z scratchpada (plik musi leżeć w `/Users/Shared/sh`). Komenda złożona z `shctl` traci wyjątek sandboxa (sync-status: HTTP 401) |
| Pytania przed planem | 1 paczka, 7 pytań, każde z proponowaną odpowiedzią i skutkiem, w kolejności wpływu na architekturę; właściciel przyjął 6 propozycji, 1 zmienił (pytanie 7). 5 luk jako założenia Z1–Z5. Pytanie 2 (punkt wejścia) usunęło QA-M1-1 z przebiegów 1–3 |
| Karty funkcji | 5 kart skróconych W-01–W-05 + W-06 bez karty; `check-dod.sh` OK. Codex w review intake znalazł obejście W-05/K2 (funkcja ze stanem), poprawione w iteracji 2 |
| Aktualność `Projekt.md` | Częściowo: odświeżany przy `task close`, `stage iter/done`, `decision add`. Bez odświeżenia po `stage review 08-qa` i po pierwszym `stage review 00-intake` (tam przez komendę złożoną). Po resecie „Zadania 19/25” liczyło stare przebiegi; od realizacji poprawnie „6/8 w bieżącym przebiegu (łącznie 27)”. „Wpisz: E-001: Zamknąć” ucina tekst opcji |
| Review według konfiguracji | OK: `review.zwykle` Claude opus medium dla PR < 400 linii, `review.ryzyko` Codex gpt-6-astra high dla diff > 400 i plików CI, PR samej dokumentacji bez modelu (`tylko_docs`) |
| Skille według kategorii | Częściowo: dispatch składa bazowe 3 + kategoria + stack, ale istnieją tylko `sh-kat-baza`, `sh-kat-bezpieczenstwo`, `sh-kat-frontend`, `sh-stack-astro`; brak `sh-kat-ci`, `sh-kat-backend`, `sh-kat-testy`, `sh-kat-refaktoryzacja`, `sh-stack-node`, `sh-stack-typescript` (ostrzeżenia przy każdym dispatchu). `sh-kat-bezpieczenstwo` z pola `skille` (#77) dołączony; reviewer #77 sprawdził ReDoS |
| Eskalacja | OK: worker #79 eskalował po 1 min (E-001 na `main`, powiadomienie, slot zwolniony: `aktywne` 3 → 2, #78 wystartowało). Bez prób obejścia i bez review |
| `task close --anuluj` | OK dla #79 (PR #85 zamknięty, gałąź usunięta, worktree i panel `eskalacja:` zamknięte, issue `not planned`) i #66–#71. Problem: zadanie zależne (#82) blokowane „zależność #79 anulowana”; usunięte ręcznie `gh issue edit`, a notatka z „#79” w sekcji Zależności nadal blokowała |
| `task create` po zmianie planu | Problem: nie aktualizuje istniejących issue. Issue #66–#71 z `reset-dryrun` (bez kart) zostały zastąpione nowymi ID T11–T18 (#75–#82) |
| `qa-staging` | OK: job wykonał e2e (14/14, chromium + webkit, z testem dymnym stagingu) i Lighthouse (1,0 / 1,0 / 1,0 / SEO 0,8) na `https://example.com`; artefakt `qa-staging` pobrany |
| Fałszywe alarmy CI | 2: `pr check --czekaj` zwrócił `pass` przy jobie `e2e` w stanie pending (PR #83), więc `task close` odmówił „CI pending”; `task ready` liczył 3 przykładowe pola `- [ ]` z komentarza HTML w `lista-startowa.md` jako niepotwierdzone (blokada `lista_startowa`). Czerwonego CI z przyczyn spoza zadania: 0; szkielet zielony za pierwszym razem |
| `task wait` | Częściowo: zwrócił `gotowe` przy pierwszym commicie #75, a worker dopisał potem raport (nowy head, drugie review) |
| Prośby o zgodę | 0 próśb o zgodę widocznych w sesji orkiestratora i u workerów (`dontAsk`) |
| Zlecenie S | OK: duplikat (slugify istniał) wykryty przed założeniem issue, właściciel wybrał wariant B; `task close` bez `--odbior` → kod 4, po „odbieram” merge |

## Przyczyny uwag

| Źródło | Wymaganie | Kod | Test | Design | Bez przyczyny |
|---|---|---|---|---|---|
| review PR #84 (#76 sum(a, b) z testami) | 0 | 0 | 1 | 0 | 0 |
| review PR #86 (#77 slugify(text) z testami) | 1 | 0 | 1 | 0 | 0 |
| review PR #88 (#80 parseDate(str) z testami) | 0 | 0 | 1 | 0 | 0 |
| QA M1 (raport-M1.md, PR #91) | 1 | 0 | 1 | 0 | 0 |

## Przebieg dryrun 6 (2026-11-11)

Reset do baseline `1045b0b` o 18:54 UTC. Wiersze zadań dopisuje `shctl task close`, miary przebiegu orkiestrator.

| Zlecenie | Tryb | Czas | Zadania | Iteracje | Eskalacje | Uwagi |
|---|---|---|---|---|---|---|
