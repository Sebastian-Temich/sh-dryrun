/**
 * Zwraca stałą wartość logiczną.
 *
 * Issue #27 wymaga wartości ściśle równej jednocześnie `true` i `false`. Taka wartość nie istnieje
 * (`toBe` porównuje przez `Object.is`), więc funkcja zwraca jedną, stałą wartość. Sprzeczność
 * wymagań jest w eskalacji E-001.
 */
export function paradox(): boolean {
  return false;
}
