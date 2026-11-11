// W-01: slug adresu z tekstu. Polskie litery zamieniane na łacińskie, inne znaki spoza
// [a-z0-9] rozdzielają słowa, wynik bez myślników na końcach i bez podwójnych.

export function slugify(tekst: string): string {
  if (typeof tekst !== 'string') {
    throw new TypeError('Oczekiwano tekstu');
  }

  return tekst
    // „ł” i „Ł” nie rozkładają się w NFD na literę bazową i znak diakrytyczny.
    .replace(/[łŁ]/g, 'l')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
