# Backlog drobnych uwag

Plik wspólny, aktualizuje orkiestrator. Zgłoszenia ⚪ z review i „Drobne uwagi” z raportów.

| Data | Źródło | Uwaga | Stan |
|---|---|---|---|
| 2026-11-04 | T-23 | `scripts/check-dod.sh` i bats w CI nie zależą od Node; job `testy-skryptow` bez zmian. | otwarta |
| 2026-11-04 | T-26 | `src/index.ts` nie reeksportuje `formatPLN`; do rozważenia osobnym zadaniem, gdy biblioteka dostanie publiczne API. | otwarta |
| 2026-11-04 | T-24 | `src/index.ts` nie reeksportuje `sum` ani `formatPLN`; do rozważenia osobnym zadaniem przy ustalaniu publicznego API. | otwarta |
| 2026-11-04 | T-25 | `src/index.ts` nadal nie reeksportuje `sum`, `formatPLN` ani `slugify`; do rozważenia osobnym zadaniem przy ustalaniu publicznego API. | otwarta |
| 2026-11-04 | T-28 | `src/index.ts` nie reeksportuje `parseDate` ani `formatPLN`; do rozważenia osobnym zadaniem przy publicznym API biblioteki. | otwarta |
| 2026-11-04 | QA M1 | `sum(1e308, 1e308)` zwraca `Infinity` bez błędu, a `formatPLN` na takim wyniku rzuca `TypeError`; kryteria #24 tego nie obejmują. | otwarta |
| 2026-11-04 | QA M1 | `formatPLN(1.005)` daje „1,00 zł” (zaokrąglenie jak `toFixed`); kryteria #26 nie określają reguły połówek. | otwarta |
| 2026-11-04 | QA M1 | Testy QA porównują kwoty po zamianie spacji twardej na zwykłą (`formatPLN` używa U+00A0). | otwarta |
