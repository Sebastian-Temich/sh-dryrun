#!/usr/bin/env bats
# Testy wstrzymań w scripts/sync-status.sh na izolowanym repo, gh zastąpiony atrapą bez zadań.
# Pliki wspólne (status.md, decyzje.md, 06-zadania/index.md) to własne fixture'y w stanie
# „brak zadań i decyzji”, a nie kopia żywego docs/, który orkiestrator zmienia na main.
# Uruchomienie: bats scripts/tests/sync-status.bats

setup() {
  ROOT="$BATS_TEST_TMPDIR/repo"
  mkdir -p "$ROOT/scripts" "$ROOT/docs/06-zadania" "$BATS_TEST_TMPDIR/bin" "$BATS_TEST_TMPDIR/sh"
  cp "$BATS_TEST_DIRNAME/../sync-status.sh" "$ROOT/scripts/"
  cat >"$ROOT/docs/status.md" <<'EOF'
---
zadania_todo: 0
zadania_in_progress: 0
zadania_review: 0
zadania_blocked: 0
zadania_escalated: 0
zadania_done: 0
zadania_anulowane: 0
pr_otwarte: 0
ci_fail: 0
wstrzymania: []
ostatnie_decyzje: []
ostatnia_synchronizacja: brak
---

# Status projektu
EOF
  cat >"$ROOT/docs/decyzje.md" <<'EOF'
# Decyzje projektu

| Data | Źródło | Pytanie | Decyzja |
|---|---|---|---|
EOF
  cat >"$ROOT/docs/06-zadania/index.md" <<'EOF'
# Zadania

<!-- sync-status:start -->
| Zadanie | Tytuł | Status | Iteracja | Kamień milowy | PR | CI |
|---|---|---|---|---|---|---|
<!-- sync-status:end -->
EOF
  printf '#!/bin/sh\necho "[]"\n' >"$BATS_TEST_TMPDIR/bin/gh"
  chmod +x "$BATS_TEST_TMPDIR/bin/gh"
  export PATH="$BATS_TEST_TMPDIR/bin:$PATH" SH_DIR="$BATS_TEST_TMPDIR/sh"
}

fm() { awk -v k="$1" 'index($0, k ": ") == 1 { print substr($0, length(k) + 3) }' "$ROOT/docs/status.md"; }

@test "bez limity.md: pusta lista i bez zmian" {
  run bash "$ROOT/scripts/sync-status.sh"
  [ "$status" -eq 0 ]
  [[ "$output" == *"bez zmian"* ]] || false
  [ "$(fm wstrzymania)" = "[]" ]
}

@test "tabela i lista z limity.md trafiaja do frontmattera" {
  cat >"$SH_DIR/limity.md" <<'EOF'
# Limity

| Wykonawca | Od | Do | Źródło |
|---|---|---|---|
| claude | 2026-11-02 14:05 | 2026-11-02 19:00 | panel worker:sklep:12 |
- codex "do 20:30"
EOF
  run bash "$ROOT/scripts/sync-status.sh"
  [ "$status" -eq 0 ]
  [ "$(fm wstrzymania)" = '["claude · 2026-11-02 14:05 · 2026-11-02 19:00 · panel worker:sklep:12","codex \"do 20:30\""]' ]
  [ "$(fm ostatnia_synchronizacja)" != brak ]
}

@test "wpis brak nie jest wstrzymaniem" {
  printf '# Limity\n\n- (brak)\n' >"$SH_DIR/limity.md"
  run bash "$ROOT/scripts/sync-status.sh"
  [ "$status" -eq 0 ]
  [ "$(fm wstrzymania)" = "[]" ]
}

@test "ostatnie decyzje: 5 najnowszych, najnowsza pierwsza, pipe w komorce" {
  {
    cat "$ROOT/docs/decyzje.md"
    for i in 1 2 3 4 5 6; do echo "| 2026-11-0$i | orkiestrator | pytanie $i | decyzja $i |"; done
    echo '| 2026-11-07 | wlasciciel | a \| b | "tak": ok |'
  } >"$ROOT/docs/decyzje.md.nowy"
  mv "$ROOT/docs/decyzje.md.nowy" "$ROOT/docs/decyzje.md"
  run bash "$ROOT/scripts/sync-status.sh"
  [ "$status" -eq 0 ]
  oczekiwane='[{"data": "2026-11-07", "zrodlo": "wlasciciel", "pytanie": "a | b", "decyzja": "\"tak\": ok"}, {"data": "2026-11-06", "zrodlo": "orkiestrator", "pytanie": "pytanie 6", "decyzja": "decyzja 6"}, {"data": "2026-11-05", "zrodlo": "orkiestrator", "pytanie": "pytanie 5", "decyzja": "decyzja 5"}, {"data": "2026-11-04", "zrodlo": "orkiestrator", "pytanie": "pytanie 4", "decyzja": "decyzja 4"}, {"data": "2026-11-03", "zrodlo": "orkiestrator", "pytanie": "pytanie 3", "decyzja": "decyzja 3"}]'
  [ "$(fm ostatnie_decyzje)" = "$oczekiwane" ]
}

@test "pusta tabela decyzji: pusta lista" {
  run bash "$ROOT/scripts/sync-status.sh"
  [ "$status" -eq 0 ]
  [ "$(fm ostatnie_decyzje)" = "[]" ]
}

@test "dashboard ma tylko DQL" {
  run grep -cE '^```dataview$' "$BATS_TEST_DIRNAME/../../docs/_dashboard.md"
  [ "$output" -ge 6 ]
  run grep -E 'dataviewjs|`\$=' "$BATS_TEST_DIRNAME/../../docs/_dashboard.md"
  [ "$status" -eq 1 ]
}
