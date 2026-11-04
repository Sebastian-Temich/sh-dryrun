/**
 * Zwraca wartość logiczną.
 *
 * Issue #12 wymaga wartości ściśle równej jednocześnie `true` i `false`. Typ `boolean` ma dwie
 * rozłączne wartości, a `Object.is(x, true) && Object.is(x, false)` jest zawsze fałszywe, więc
 * funkcja zwraca `true` bez obejść (bez podmiany `Object.is` ani `expect`).
 */
export function paradox(): boolean {
  return true;
}
