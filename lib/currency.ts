/**
 * Formats an amount in Moldovan Leu (`MDL`) using native `Intl.NumberFormat`
 * for the active locale:
 * - `ro`: `"1.500 MDL"`
 * - `ru`: `"1 500 MDL"`
 * - `en`: `"MDL 1,500"`
 */
export function formatMDLCurency(amount: number, locale = "ro"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "MDL",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const formatMDLCurrency = formatMDLCurency;
