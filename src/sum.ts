/**
 * Zwraca sumę dwóch liczb.
 *
 * @throws {TypeError} gdy którykolwiek argument nie jest skończoną liczbą (np. `NaN`, `Infinity`).
 */
export function sum(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError(`sum: oczekiwano skończonych liczb, otrzymano ${String(a)} i ${String(b)}`);
  }
  return a + b;
}
