const MAPA = { ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ź: "z", ż: "z" };

export function slug(tekst) {
  return tekst
    .toLowerCase()
    .replace(/[ąćęłńóźż]/g, (z) => MAPA[z])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
