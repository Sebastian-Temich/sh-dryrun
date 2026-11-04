/** Punkt wejścia pakietu (exports "." → dist/index.js): publiczne API biblioteki. */
export { formatPLN } from "./formatPLN.js";
export { parseDate } from "./parseDate.js";
export { slugify } from "./slugify.js";
export { sum } from "./sum.js";

/** Wersja biblioteki. */
export const VERSION = "0.0.0";
