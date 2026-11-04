/**
 * Zwraca sumę dwóch liczb skończonych.
 *
 * @throws {TypeError} gdy `a` lub `b` nie jest liczbą skończoną (`NaN`, `Infinity`, `-Infinity`).
 */
export function sum(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError(
      `sum: argumenty muszą być liczbami skończonymi, otrzymano ${String(a)} i ${String(b)}`,
    );
  }
  return a + b;
}
