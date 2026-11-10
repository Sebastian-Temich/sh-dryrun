/**
 * Zwraca sumę dwóch skończonych liczb (W-01).
 *
 * @throws {TypeError} gdy którykolwiek argument to NaN, Infinity albo -Infinity.
 */
export function sum(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("sum: argumenty muszą być skończonymi liczbami");
  }
  return a + b;
}
