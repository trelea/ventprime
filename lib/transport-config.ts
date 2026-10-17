/**
 * Transport tariff configuration (§8: "posibilitatea de modificare a tarifului
 * per kilometru și a suplimentelor fixe ... fără refacerea formularului").
 *
 * Change the tariff via environment variables and redeploy — no code change needed:
 * - `NEXT_PUBLIC_TRANSPORT_RATE_PER_KM` (default 6 lei/km, round trip)
 * - `NEXT_PUBLIC_TRANSPORT_ROUND_STEP` (default 50 lei rounding step)
 * - `NEXT_PUBLIC_TRANSPORT_MIN_FEE` (default 150 lei minimum outside Chișinău)
 * - `NEXT_PUBLIC_FIXED_TRANSPORT_FEES_JSON` (optional JSON override, e.g.
 *   `{"orhei":600,"balti":1650}` — merged over the defaults below)
 *
 * `NEXT_PUBLIC_` prefix keeps the values available in the client-side
 * calculator (`components/forms/contact-form.tsx`) and in server code
 * (`lib/calculator.ts`) from a single source of truth.
 */

function parseEnvInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Round-trip tariff: lei per travelled km (Chișinău → locality → Chișinău). */
export const TRANSPORT_RATE_PER_KM = parseEnvInt(
  "NEXT_PUBLIC_TRANSPORT_RATE_PER_KM",
  6,
);

/** Round the supplement UP to the next multiple of this step (lei). */
export const TRANSPORT_ROUND_STEP = parseEnvInt(
  "NEXT_PUBLIC_TRANSPORT_ROUND_STEP",
  50,
);

/** Minimum supplement for localities outside Chișinău (lei). */
export const TRANSPORT_MIN_FEE = parseEnvInt(
  "NEXT_PUBLIC_TRANSPORT_MIN_FEE",
  150,
);

/**
 * FIXED supplements for the customer-table localities (§13:
 * "Pentru localitățile enumerate mai jos, utilizați sumele fixe din listă").
 * These win over the formula — the table distances are approximate and only
 * explain the calculation, the sums are what gets billed.
 */
const DEFAULT_FIXED_TRANSPORT_FEES: Record<string, number> = {
  chisinau: 0,
  ialoveni: 200,
  scoreni: 300,
  straseni: 400,
  hincesti: 450,
  "anenii-noi": 450,
  orhei: 600,
  cimislia: 800,
  causeni: 900,
  comrat: 1200,
  "stefan-voda": 1200,
  ungheni: 1350,
  balti: 1650,
  cahul: 2000,
};

function parseFixedFeesOverride(): Record<string, number> {
  const raw = process.env.NEXT_PUBLIC_FIXED_TRANSPORT_FEES_JSON;
  if (!raw) return DEFAULT_FIXED_TRANSPORT_FEES;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return DEFAULT_FIXED_TRANSPORT_FEES;
    }
    const merged = { ...DEFAULT_FIXED_TRANSPORT_FEES };
    for (const [key, value] of Object.entries(
      parsed as Record<string, unknown>,
    )) {
      if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
        merged[key] = value;
      }
    }
    return merged;
  } catch {
    return DEFAULT_FIXED_TRANSPORT_FEES;
  }
}

export const FIXED_TRANSPORT_FEES: Record<string, number> =
  parseFixedFeesOverride();
