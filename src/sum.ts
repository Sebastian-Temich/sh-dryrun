/**
 * Zwraca sumę dwóch liczb, np. `sum(2, 3)` → `5`.
 *
 * Wynik to zwykłe dodawanie zmiennoprzecinkowe, więc ułamki mogą mieć błąd zaokrąglenia
 * (np. `sum(0.1, 0.2)` → `0.30000000000000004`).
 *
 * @throws {TypeError} gdy `a` albo `b` to `NaN` albo `±Infinity`.
 */
export function sum(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError(
      `sum: argumenty muszą być skończonymi liczbami, otrzymano ${String(a)} i ${String(b)}`,
    );
  }
  return a + b;
}
