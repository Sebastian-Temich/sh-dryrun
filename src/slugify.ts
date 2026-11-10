/** Transliteracja wyłącznie 18 polskich liter (W-02); inne litery spoza ASCII są usuwane. */
const POLSKIE: Readonly<Record<string, string>> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
  Ą: "a",
  Ć: "c",
  Ę: "e",
  Ł: "l",
  Ń: "n",
  Ó: "o",
  Ś: "s",
  Ź: "z",
  Ż: "z",
};

/** Pojedynczy znak będący literą albo znakiem łączącym (akcent) z dowolnego alfabetu. */
const LITERA_LUB_ZNAK_LACZACY = /^[\p{L}\p{M}]$/u;

/**
 * Zamienia tekst na slug URL: małe litery a–z, cyfry 0–9 i pojedyncze myślniki między nimi.
 *
 * - polskie litery (małe i wielkie) są transliterowane na łacińskie odpowiedniki,
 * - inne litery i znaki łączące są usuwane bez śladu (bez dekompozycji NFD), np. „Café” → „caf”,
 * - pozostałe znaki (spacje, interpunkcja, podkreślnik, symbole) rozdzielają słowa jednym myślnikiem,
 * - wynik nie zaczyna się ani nie kończy myślnikiem; tekst bez liter i cyfr daje „”.
 *
 * Jeden przebieg po znakach, bez wyrażeń regularnych na całym tekście: czas liniowy względem
 * długości wejścia (brak katastrofalnego backtrackingu).
 */
export function slugify(text: string): string {
  let wynik = "";
  let separator = false;

  for (const znak of text) {
    const kod = znak.charCodeAt(0);
    let ascii: string | undefined;

    if ((kod >= 0x61 && kod <= 0x7a) || (kod >= 0x30 && kod <= 0x39)) {
      ascii = znak;
    } else if (kod >= 0x41 && kod <= 0x5a) {
      ascii = String.fromCharCode(kod + 0x20);
    } else {
      ascii = POLSKIE[znak];
    }

    if (ascii !== undefined) {
      if (separator && wynik !== "") {
        wynik += "-";
      }
      separator = false;
      wynik += ascii;
    } else if (!LITERA_LUB_ZNAK_LACZACY.test(znak)) {
      separator = true;
    }
  }

  return wynik;
}
