/** Absolute base URL, without a trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ventprime.md"
).replace(/\/$/, "");

/** Brand constants shared by metadata, structured data and the Devalon credit. */
export const site = {
  name: "VentPrime",
  phone: "+37379717214",
  email: "contact@ventprime.md",
  street: "33/2 Nicolae Zelinski St.",
  city: "Chișinău",
  country: "MD",
} as const;
