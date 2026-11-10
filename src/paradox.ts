/**
 * W-05: paradoks. Kryterium K2 wymaga wartości ściśle równej jednocześnie `true` i `false`,
 * czego żadna wartość typu `boolean` nie spełnia (Object.is). Funkcja zwraca stałą `true`,
 * bez stanu i bez obejść; sprzeczność kryteriów jest eskalowana do właściciela (zob. T-79).
 */
export function paradox(): boolean {
  return true;
}
