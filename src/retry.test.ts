import { afterEach, describe, expect, it, vi } from 'vitest';
import { retry } from './index.js';

afterEach(() => {
  vi.useRealTimers();
});

// Funkcja, która zawodzi `bledy` razy, a potem zwraca `wynik`.
function zawodziRazy<T>(bledy: number, wynik: T) {
  let n = 0;
  return vi.fn(() => {
    n += 1;
    if (n <= bledy) {
      return Promise.reject(new Error(`błąd ${String(n)}`));
    }
    return Promise.resolve(wynik);
  });
}

describe('retry (W-04)', () => {
  it('W-04/K1: zawodzi 2 razy, potem zwraca 42: wynik 42 po 3 wywołaniach', async () => {
    const fn = zawodziRazy(2, 42);
    await expect(retry(fn, { proby: 3, przerwa: 0 })).resolves.toBe(42);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('W-04/K1: z domyślną przerwą (fałszywy zegar) też zwraca 42 po 3 wywołaniach', async () => {
    vi.useFakeTimers();
    const fn = zawodziRazy(2, 42);
    const wynik = retry(fn, { proby: 3 });
    await vi.runAllTimersAsync();
    await expect(wynik).resolves.toBe(42);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('W-04/K2: zawsze zawodzi: odrzucenie ostatnim błędem po 3 wywołaniach', async () => {
    const fn = zawodziRazy(Number.POSITIVE_INFINITY, 0);
    await expect(retry(fn, { proby: 3, przerwa: 0 })).rejects.toThrow('błąd 3');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('W-04/K3: przerwa 200 ms: między próbami czeka 200 i 400 ms', async () => {
    vi.useFakeTimers();
    const fn = zawodziRazy(Number.POSITIVE_INFINITY, 0);
    const wynik = retry(fn, { proby: 3, przerwa: 200 });
    const sprawdzenie = expect(wynik).rejects.toThrow('błąd 3');

    await vi.advanceTimersByTimeAsync(0);
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(199);
    expect(fn).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(399);
    expect(fn).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(3);

    await sprawdzenie;
    // po ostatniej próbie nie ma już przerwy ani kolejnego wywołania
    expect(vi.getTimerCount()).toBe(0);
  });

  it('W-04/K3: domyślnie 3 próby i przerwa 200 ms podwajana (decyzje.md, P4)', async () => {
    vi.useFakeTimers();
    const fn = zawodziRazy(Number.POSITIVE_INFINITY, 0);
    const wynik = retry(fn);
    const sprawdzenie = expect(wynik).rejects.toThrow('błąd 3');

    await vi.advanceTimersByTimeAsync(199);
    expect(fn).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(399);
    expect(fn).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(3);

    await sprawdzenie;
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('W-04/K4: proby 0 daje RangeError „Liczba prób musi być co najmniej 1” bez wywołania', async () => {
    const fn = vi.fn(() => Promise.resolve(1));
    const wynik = retry(fn, { proby: 0 });
    await expect(wynik).rejects.toThrow(RangeError);
    await expect(wynik).rejects.toThrow('Liczba prób musi być co najmniej 1');
    expect(fn).not.toHaveBeenCalled();
  });

  it.each([-1, 1.5, Number.NaN])('liczba prób %s daje RangeError', async (proby) => {
    const fn = vi.fn(() => Promise.resolve(1));
    await expect(retry(fn, { proby })).rejects.toThrow(
      new RangeError('Liczba prób musi być co najmniej 1'),
    );
    expect(fn).not.toHaveBeenCalled();
  });

  it('sukces za pierwszym razem: jedno wywołanie, bez przerwy', async () => {
    vi.useFakeTimers();
    const fn = zawodziRazy(0, 'ok');
    await expect(retry(fn, { proby: 3, przerwa: 200 })).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('błąd rzucony synchronicznie w fn też jest ponawiany', async () => {
    let n = 0;
    const fn = vi.fn((): Promise<string> => {
      n += 1;
      if (n === 1) {
        throw new Error('synchronicznie');
      }
      return Promise.resolve('ok');
    });
    await expect(retry(fn, { proby: 2, przerwa: 0 })).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
