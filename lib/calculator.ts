/**
 * Preliminary Cost Calculator & Form Options (Customer Requirements §11–§14).
 */

export const FORM_PREMISES = [
  "apartment",
  "house",
  "basement",
  "commercial",
  "other",
] as const;

export type FormPremise = (typeof FORM_PREMISES)[number];

export const FORM_PROBLEMS = [
  "highHumidity",
  "mold",
  "moldAndHumidity",
  "newVentilation",
  "smell",
  "allOfAbove",
] as const;

export type FormProblem = (typeof FORM_PROBLEMS)[number];

export const FORM_SERVICES = [
  "consultation",
  "ventilatie-pasiva",
  "ventilatie-pasiva-ozonizare",
  "ventilatie-pasiva-mucegai",
  "ventilatie-fortata",
  "tratare-mucegai",
  "ozonizare-incaperi",
  "foraj-diamantat",
  "inspectie",
] as const;

export type FormService = (typeof FORM_SERVICES)[number];

export const ROOM_COUNTS = ["1", "2", "3", "4", "5", "moreThan5"] as const;

export type RoomCountOption = (typeof ROOM_COUNTS)[number];

export const MOLD_ROOM_COUNTS = ["1", "2", "3", "4", "5"] as const;

export type MoldRoomCountOption = (typeof MOLD_ROOM_COUNTS)[number];

export const PROBLEM_ROOMS = [
  "bedroom",
  "living",
  "children",
  "kitchen",
  "bathroom",
  "basement",
  "other",
] as const;

export type ProblemRoom = (typeof PROBLEM_ROOMS)[number];

import { getLocalityOneWayKm, isChisinau } from "./localities";
import {
  FIXED_TRANSPORT_FEES,
  TRANSPORT_MIN_FEE,
  TRANSPORT_RATE_PER_KM,
  TRANSPORT_ROUND_STEP,
} from "./transport-config";

/** Pricing constants in MDL (Section 12). */
export const CALCULATOR_PRICES = {
  /** 1 point = 1.500 lei */
  pointPrice: 1500,
  /** 1 standard room = 2 points × 1.500 lei = 3.000 lei */
  standardRoomPrice: 3000,
  /** Standard points per room */
  pointsPerRoom: 2,
  /** Optional separate kitchen intake point where exhaust already exists = 1.500 lei */
  kitchenIntakePrice: 1500,
  /** Mold treatment per room where 2 ventilation points are installed = 400 lei */
  moldTreatmentPerRoomPrice: 400,
  /** Standalone inspection visit = 400 lei (transport is a separate item, §13) */
  inspectionOnlyPrice: 400,
} as const;

/** Reference table for 1–5 rooms (Section 12). */
export const STANDARD_VENTILATION_TABLE = [
  { rooms: 1, points: 2, cost: 3000 },
  { rooms: 2, points: 4, cost: 6000 },
  { rooms: 3, points: 6, cost: 9000 },
  { rooms: 4, points: 8, cost: 12000 },
  { rooms: 5, points: 10, cost: 15000 },
] as const;

export type TransportKind = "chisinau" | "other";

export type CalculationMode =
  | "standard"
  | "withMoldTreatment"
  | "withOzonation"
  | "inspectionOnly"
  | "customQuote";

export interface CalculatorInput {
  service: FormService | "";
  roomsCount: RoomCountOption | "";
  /** Separate room count for mold treatment when `ventilatie-pasiva-mucegai` is selected (§12). */
  moldTreatmentRooms: MoldRoomCountOption | "";
  /** Optional separate intake point in kitchen with existing exhaust — 1.500 lei (§12). */
  kitchenIntakePoint: boolean;
  /** Locality `Select` value (see `lib/localities.ts`) driving transport (§13). */
  localityValue: string;
}

export interface PreliminaryCalculation {
  mode: CalculationMode;
  service: FormService;
  rooms: number | null;
  basePoints: number;
  kitchenIntakePoint: boolean;
  kitchenCost: number;
  totalPoints: number;
  ventilationCost: number;
  moldTreatmentRooms: number;
  moldTreatmentCost: number;
  inspectionCost: number;
  /**
   * Present only when a total preliminary cost may be shown.
   * `null` for `withOzonation` (per §12: do not present ventilation sum as total package cost),
   * for `customQuote`, and whenever the transport fee is unknown (`null`) —
   * COMPLETARE §3: the shown sum must NOT be presented as the final total.
   */
  totalPreliminaryCost: number | null;
  transportKind: TransportKind;
  /**
   * Transport supplement in MDL (§13: round trip from Chișinău × 6 lei/km,
   * rounded up to the next 50 lei, minimum 150 lei outside Chișinău).
   * `0` for Chișinău, `null` when no locality is selected / unknown value.
   */
  transportFee: number | null;
  /** Approximate one-way distance from Chișinău in km (`null` when no locality selected). */
  oneWayKm: number | null;
  /** Approximate round-trip distance in km (`null` when no locality selected). */
  roundTripKm: number | null;
}

/**
 * FIXED transport supplements — re-exported from the env-configurable
 * `lib/transport-config.ts` (§8: editable without rebuilding the form).
 * Kept here for backwards-compatible imports.
 */
export { FIXED_TRANSPORT_FEES } from "./transport-config";

/**
 * Transport supplement (§13 + COMPLETARE §1–§5): the fixed sum for
 * customer-table localities, otherwise round trip × rate/km, rounded UP to
 * the next step, minimum fee outside Chișinău. `null` when no locality is
 * selected — the UI must then show
 * "Costul transportului va fi confirmat la validarea solicitării" and must
 * NOT present any total as final.
 */
export function calculateTransportFee(
  localityValue: string,
  oneWayKm: number | null,
): number | null {
  const fixed = FIXED_TRANSPORT_FEES[localityValue];
  if (fixed !== undefined) return fixed;
  if (oneWayKm == null) return null;
  if (oneWayKm <= 0) return 0;
  const raw = oneWayKm * 2 * TRANSPORT_RATE_PER_KM;
  const rounded =
    Math.ceil(raw / TRANSPORT_ROUND_STEP) * TRANSPORT_ROUND_STEP;
  return Math.max(TRANSPORT_MIN_FEE, rounded);
}

/**
 * Computes the live preliminary cost breakdown according to Sections 12, 13 & 14
 * plus COMPLETARE §3–§6.
 *
 * The preliminary total includes the transport supplement ONCE
 * (works + transport, never multiplied by valves/rooms/services — §5);
 * Chișinău transport is 0 so its total is unchanged.
 * When the transport fee is unknown (`null`), `totalPreliminaryCost` is
 * `null` so the UI never presents a partial sum as the final total (§3).
 */
export function calculatePreliminaryCost(
  input: CalculatorInput,
): PreliminaryCalculation {
  const transportKind: TransportKind = isChisinau(input.localityValue)
    ? "chisinau"
    : "other";
  const oneWayKm = getLocalityOneWayKm(input.localityValue);
  const roundTripKm = oneWayKm == null ? null : oneWayKm * 2;
  const transportFee = calculateTransportFee(
    input.localityValue,
    oneWayKm,
  );

  const neutralResult = (): PreliminaryCalculation => ({
    mode: "customQuote",
    service: input.service as FormService,
    rooms: null,
    basePoints: 0,
    kitchenIntakePoint: false,
    kitchenCost: 0,
    totalPoints: 0,
    ventilationCost: 0,
    moldTreatmentRooms: 0,
    moldTreatmentCost: 0,
    inspectionCost: 0,
    totalPreliminaryCost: null,
    transportKind,
    transportFee,
    oneWayKm,
    roundTripKm,
  });

  // No service selected yet — all fields start empty by default.
  if (input.service === "") return neutralResult();

  const isNaturalVentService =
    input.service === "ventilatie-pasiva" ||
    input.service === "ventilatie-pasiva-mucegai" ||
    input.service === "ventilatie-pasiva-ozonizare";

  // Ventilation needs a room count before any total may be shown.
  if (isNaturalVentService && input.roomsCount === "") return neutralResult();
  if (
    input.service === "ventilatie-pasiva-mucegai" &&
    input.moldTreatmentRooms === ""
  )
    return neutralResult();

  // Standalone inspection (§12: "Doar deplasare pentru inspecție — 400 de lei")
  // + COMPLETARE §6: outside Chișinău add the locality transport; when the
  // route is unknown show no total (COMPLETARE §3).
  if (input.service === "inspectie") {
    return {
      mode: "inspectionOnly",
      service: input.service,
      rooms: null,
      basePoints: 0,
      kitchenIntakePoint: false,
      kitchenCost: 0,
      totalPoints: 0,
      ventilationCost: 0,
      moldTreatmentRooms: 0,
      moldTreatmentCost: 0,
      inspectionCost: CALCULATOR_PRICES.inspectionOnlyPrice,
      totalPreliminaryCost:
        transportFee === null
          ? null
          : CALCULATOR_PRICES.inspectionOnlyPrice + transportFee,
      transportKind,
      transportFee,
      oneWayKm,
      roundTripKm,
    };
  }

  // Non-standard services or > 5 rooms (§12: "Pentru recuperatoare, găurire, încăperi mari și lucrări nestandardizate")
  if (!isNaturalVentService || input.roomsCount === "moreThan5") {
    return {
      mode: "customQuote",
      service: input.service,
      rooms: null,
      basePoints: 0,
      kitchenIntakePoint: false,
      kitchenCost: 0,
      totalPoints: 0,
      ventilationCost: 0,
      moldTreatmentRooms: 0,
      moldTreatmentCost: 0,
      inspectionCost: 0,
      totalPreliminaryCost: null,
      transportKind,
      transportFee,
      oneWayKm,
      roundTripKm,
    };
  }

  const rooms = Number(input.roomsCount);
  const basePoints = rooms * CALCULATOR_PRICES.pointsPerRoom;
  const baseVentilationCost = rooms * CALCULATOR_PRICES.standardRoomPrice;
  const kitchenPoints = input.kitchenIntakePoint ? 1 : 0;
  const kitchenCost = input.kitchenIntakePoint
    ? CALCULATOR_PRICES.kitchenIntakePrice
    : 0;
  const totalPoints = basePoints + kitchenPoints;
  const ventilationCost = baseVentilationCost + kitchenCost;

  // Natural ventilation + mold treatment (§12: +400 lei per treated room)
  if (input.service === "ventilatie-pasiva-mucegai") {
    const moldRooms = Number(input.moldTreatmentRooms) || 1;
    const moldTreatmentCost =
      moldRooms * CALCULATOR_PRICES.moldTreatmentPerRoomPrice;

    return {
      mode: "withMoldTreatment",
      service: input.service,
      rooms,
      basePoints,
      kitchenIntakePoint: input.kitchenIntakePoint,
      kitchenCost,
      totalPoints,
      ventilationCost,
      moldTreatmentRooms: moldRooms,
      moldTreatmentCost,
      inspectionCost: 0,
      totalPreliminaryCost:
        transportFee === null
          ? null
          : ventilationCost + moldTreatmentCost + transportFee,
      transportKind,
      transportFee,
      oneWayKm,
      roundTripKm,
    };
  }

  // Natural ventilation + ozonation (§12: show ventilation cost, ozonation calculated separately, do not present as total package cost)
  if (input.service === "ventilatie-pasiva-ozonizare") {
    return {
      mode: "withOzonation",
      service: input.service,
      rooms,
      basePoints,
      kitchenIntakePoint: input.kitchenIntakePoint,
      kitchenCost,
      totalPoints,
      ventilationCost,
      moldTreatmentRooms: 0,
      moldTreatmentCost: 0,
      inspectionCost: 0,
      totalPreliminaryCost: null,
      transportKind,
      transportFee,
      oneWayKm,
      roundTripKm,
    };
  }

  // Standard natural ventilation (§12 & §14)
  return {
    mode: "standard",
    service: input.service,
    rooms,
    basePoints,
    kitchenIntakePoint: input.kitchenIntakePoint,
    kitchenCost,
    totalPoints,
    ventilationCost,
    moldTreatmentRooms: 0,
    moldTreatmentCost: 0,
    inspectionCost: 0,
    totalPreliminaryCost:
      transportFee === null ? null : ventilationCost + transportFee,
    transportKind,
    transportFee,
    oneWayKm,
    roundTripKm,
  };
}
