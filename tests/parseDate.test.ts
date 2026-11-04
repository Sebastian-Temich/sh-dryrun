import { describe, expect, it } from "vitest";
import { formatPLN } from "../src/formatPLN.js";
import { parseDate } from "../src/parseDate.js";

// Spacja twarda U+00A0, której formatPLN używa jako separatora tysięcy i przed „zł”.
const NBSP = " ";

describe("parseDate", () => {
  it("zwraca obiekt Date", () => {
    expect(parseDate("04.11.2026")).toBeInstanceOf(Date);
  });

  it("„04.11.2026” i „2026-11-04” dają ten sam dzień o północy UTC", () => {
    const pl = parseDate("04.11.2026");
    const iso = parseDate("2026-11-04");
    expect(pl.getTime()).toBe(iso.getTime());
    expect(pl.toISOString()).toBe("2026-11-04T00:00:00.000Z");
  });

  it.each([
    ["01.01.2026", "2026-01-01T00:00:00.000Z"],
    ["31.12.1999", "1999-12-31T00:00:00.000Z"],
    ["29.02.2024", "2024-02-29T00:00:00.000Z"],
    ["0001-01-01", "0001-01-01T00:00:00.000Z"],
    ["0099-06-15", "0099-06-15T00:00:00.000Z"],
  ])("parsuje %s jako %s", (wejscie, oczekiwane) => {
    expect(parseDate(wejscie).toISOString()).toBe(oczekiwane);
  });

  it.each(["31.02.2026", "29.02.2026", "2026-02-30", "31.04.2026", "00.01.2026", "01.13.2026", "2026-00-10", "0000-01-01"])(
    "rzuca RangeError dla nieistniejącej daty %s",
    (wejscie) => {
      expect(() => parseDate(wejscie)).toThrow(RangeError);
    },
  );

  it.each([
    "",
    "4.11.2026",
    "04.11.26",
    "04-11-2026",
    "2026/11/04",
    "2026-11-4",
    " 04.11.2026",
    "04.11.2026 ",
    "2026-11-04T00:00:00Z",
    "04.11.2026x",
    "abc",
    "٠٤.١١.٢٠٢٦",
  ])("rzuca RangeError dla złego formatu %j", (wejscie) => {
    expect(() => parseDate(wejscie)).toThrow(RangeError);
  });

  it("rzuca RangeError dla wartości, która nie jest napisem", () => {
    expect(() => parseDate(20261104 as unknown as string)).toThrow(RangeError);
  });

  it("scenariusz raportu: data i kwota razem z formatPLN", () => {
    const wiersze = [
      { data: "04.11.2026", kwota: 1234.5 },
      { data: "2026-11-04", kwota: 100 },
      { data: "03.11.2026", kwota: -20.25 },
    ];

    const sumyDzienne = new Map<string, number>();
    for (const { data, kwota } of wiersze) {
      const dzien = parseDate(data).toISOString().slice(0, 10);
      sumyDzienne.set(dzien, (sumyDzienne.get(dzien) ?? 0) + kwota);
    }

    const raport = [...sumyDzienne.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([dzien, suma]) => `${dzien}: ${formatPLN(suma)}`);

    expect(raport).toEqual([
      `2026-11-03: -20,25${NBSP}zł`,
      `2026-11-04: 1${NBSP}334,50${NBSP}zł`,
    ]);
  });
});
