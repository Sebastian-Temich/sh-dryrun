import { describe, expect, it } from "vitest";

import { formatPLN } from "../src/formatPLN.js";
import { parseDate } from "../src/parseDate.js";

describe("parseDate", () => {
  it("parsuje format polski DD.MM.RRRR na północ UTC", () => {
    const data = parseDate("04.11.2026");
    expect(data).toBeInstanceOf(Date);
    expect(data.toISOString()).toBe("2026-11-04T00:00:00.000Z");
  });

  it("parsuje format ISO RRRR-MM-DD na północ UTC", () => {
    expect(parseDate("2026-11-04").toISOString()).toBe("2026-11-04T00:00:00.000Z");
  });

  it("„04.11.2026” i „2026-11-04” dają ten sam dzień", () => {
    expect(parseDate("04.11.2026").getTime()).toBe(parseDate("2026-11-04").getTime());
  });

  it("akceptuje 29 lutego w roku przestępnym i skrajne dni miesiąca", () => {
    expect(parseDate("29.02.2024").toISOString()).toBe("2024-02-29T00:00:00.000Z");
    expect(parseDate("2026-12-31").toISOString()).toBe("2026-12-31T00:00:00.000Z");
    expect(parseDate("01.01.2026").toISOString()).toBe("2026-01-01T00:00:00.000Z");
  });

  it("nie przesuwa lat 0–99 do XX wieku", () => {
    expect(parseDate("0050-06-15").getUTCFullYear()).toBe(50);
    expect(parseDate("15.06.0050").getUTCFullYear()).toBe(50);
  });

  it.each(["31.02.2026", "2026-02-31", "29.02.2026", "31.04.2026", "00.01.2026", "01.13.2026", "2026-00-10", "2026-11-00"])(
    "rzuca RangeError dla nieistniejącej daty %s",
    (wejscie) => {
      expect(() => parseDate(wejscie)).toThrow(RangeError);
    },
  );

  it.each([
    "",
    "4.11.2026",
    "04.11.26",
    "04/11/2026",
    "2026/11/04",
    "2026-11-4",
    "20261104",
    " 04.11.2026",
    "2026-11-04 ",
    "2026-11-04T00:00:00Z",
    "04.11.2026\n",
    "dzisiaj",
    "０４.１１.２０２６",
  ])("rzuca RangeError dla złego formatu %j", (wejscie) => {
    expect(() => parseDate(wejscie)).toThrow(RangeError);
  });
});

describe("parseDate z formatPLN w scenariuszu raportu", () => {
  it("składa pozycję raportu z daty i kwoty", () => {
    const pozycje = [
      { data: "04.11.2026", kwota: 1234.5 },
      { data: "2026-11-04", kwota: -99.999 },
    ];

    const wiersze = pozycje.map(({ data, kwota }) => {
      const dzien = parseDate(data).toISOString().slice(0, 10);
      return `${dzien}: ${formatPLN(kwota)}`;
    });

    expect(wiersze).toEqual(["2026-11-04: 1 234,50 zł", "2026-11-04: -100,00 zł"]);
  });
});
