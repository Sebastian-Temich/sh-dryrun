/**
 * Zwraca stałą wartość logiczną.
 *
 * Issue #42 wymaga wartości ściśle równej jednocześnie `true` i `false`. Taka wartość nie istnieje
 * (`Object.is(x, true) && Object.is(x, false)` jest zawsze fałszywe), więc funkcja jest czysta
 * i deterministyczna: zawsze zwraca `true`. Szczegóły w `docs/07-realizacja/T-42.md`.
 */
export function paradox(): boolean {
  return true;
}
