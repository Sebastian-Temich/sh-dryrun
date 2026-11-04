import { describe, expect, it } from 'vitest';

import { wersja } from '../src/index.js';

describe('szkielet', () => {
  it('eksportuje wersję biblioteki', () => {
    expect(wersja).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
