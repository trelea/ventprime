"use client";

import { useCallback, useId, useMemo, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  Info,
  Loader2,
  MapPin,
  Send,
  Sparkles,
  Truck,
} from "lucide-react";
import { submitLead } from "@/lib/actions";
import { formatMDLCurency } from "@/lib/currency";
import { getLocalityLabel, getLocalityRaion } from "@/lib/localities";
import {
  CALCULATOR_PRICES,
  FORM_PREMISES,
  FORM_PROBLEMS,
  FORM_SERVICES,
  MOLD_ROOM_COUNTS,
  PROBLEM_ROOMS,
  ROOM_COUNTS,
  STANDARD_VENTILATION_TABLE,
  calculatePreliminaryCost,
  type FormPremise,
  type FormProblem,
  type FormService,
  type MoldRoomCountOption,
  type ProblemRoom,
  type RoomCountOption,
} from "@/lib/calculator";
import type { ServiceKey } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { LocalityCombobox } from "@/components/forms/locality-combobox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const MAX_PHOTOS = 10;
const MAX_VIDEO_FILES = 2;
const MAX_PHOTO_SIZE_MB = 15;
const MAX_VIDEO_SIZE_MB = 50;

function normalizePreselectedProblem(problem?: string): FormProblem | "" {
  if (!problem) return "";
  if (problem === "humidity" || problem === "condensation") {
    return "highHumidity";
  }
  if ((FORM_PROBLEMS as readonly string[]).includes(problem)) {
    return problem as FormProblem;
  }
  return "";
}

function normalizePreselectedService(
  service?: ServiceKey | FormService,
): FormService | "" {
  if (!service) return "";
  if ((FORM_SERVICES as readonly string[]).includes(service)) {
    return service as FormService;
  }
  return "";
}

export function ContactForm({
  source,
  preselectedService,
  preselectedProblem,
  showHeader = true,
  variant = "default",
}: {
  source: string;
  /** Pre-selects the "Service" field when rendered at the bottom of a service page. */
  preselectedService?: ServiceKey | FormService;
  /** Pre-selects the "Problem" field when rendered at the bottom of a service page. */
  preselectedProblem?: string;
  /** Set to false when the parent section already renders the main H2 & description. */
  showHeader?: boolean;
  /**
   * `"calculator"` — the Home `CostCalculatorSection` treatment: the form card
   * takes the FAQ section's surface tone with one-step-bigger labels, and the
   * preview panel flips to its green variant — white semibold copy in the
   * TECH schema card's colours, rounded/shadow silhouette included.
   * `"default"` — the service-page look: white form card, dark navy panel.
   */
  variant?: "default" | "calculator";
}) {
  const formId = useId();
  const locale = useLocale();
  const t = useTranslations("Form");
  const tOptions = useTranslations("Form.options");
  const tCalc = useTranslations("Form.calculator");
  const tTransport = useTranslations("Form.transport");
  const tValidation = useTranslations("Form.validation");
  const tSuccess = useTranslations("Form.success");
  const tPrivacy = useTranslations("Privacy");
  const tCommon = useTranslations("Common");

  // Controlled form state driving the live preliminary calculator (§11–§14)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [locality, setLocality] = useState("");
  const localityLabel = getLocalityLabel(locality, locale);
  const localityRaion = getLocalityRaion(locality, locale);
  const [address, setAddress] = useState("");
  const [premise, setPremise] = useState<FormPremise | "">("");
  const [problem, setProblem] = useState<FormProblem | "">(() =>
    normalizePreselectedProblem(preselectedProblem),
  );
  const [service, setService] = useState<FormService | "">(() =>
    normalizePreselectedService(preselectedService),
  );
  const [roomsCount, setRoomsCount] = useState<RoomCountOption | "">("");
  const [moldTreatmentRooms, setMoldTreatmentRooms] = useState<
    MoldRoomCountOption | ""
  >("");
  const [kitchenIntakePoint, setKitchenIntakePoint] = useState(false);
  const [problemRooms, setProblemRooms] = useState<ProblemRoom[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Validation & submission state (§15)
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const formatLei = useCallback(
    (amount: number) => formatMDLCurency(amount, locale),
    [locale],
  );

  const calculation = useMemo(
    () =>
      calculatePreliminaryCost({
        service,
        roomsCount,
        moldTreatmentRooms,
        kitchenIntakePoint,
        localityValue: locality,
      }),
    [service, roomsCount, moldTreatmentRooms, kitchenIntakePoint, locality],
  );

  const isNaturalVentService =
    service === "ventilatie-pasiva" ||
    service === "ventilatie-pasiva-mucegai" ||
    service === "ventilatie-pasiva-ozonizare";

  const isStandardRoomRange =
    roomsCount !== "" && roomsCount !== "moreThan5";

  // Neutral calculator state — required selections not made yet.
  const needsSelection =
    service === "" ||
    (isNaturalVentService && roomsCount === "") ||
    (service === "ventilatie-pasiva-mucegai" && moldTreatmentRooms === "");

  // Build human-readable summary string of the preliminary calculation for the company lead (§15 + COMPLETARE §8)
  const calculationSummaryText = useMemo(() => {
    const lines: string[] = [];
    lines.push(
      service
        ? `${t("fields.service")}: ${tOptions(`service.${service}`, {
            price: formatLei(CALCULATOR_PRICES.inspectionOnlyPrice),
          })}`
        : `${t("fields.service")}: —`,
    );
    if (localityLabel) {
      lines.push(
        localityRaion
          ? `${t("fields.locality")}: ${localityLabel} (${localityRaion})`
          : `${t("fields.locality")}: ${localityLabel}`,
      );
    }

    if (calculation.mode === "standard" && calculation.rooms !== null) {
      lines.push(
        `${tCalc("naturalVentilationLabel")} ${tCalc("roomsAndPoints", {
          roomsLabel: tOptions(`roomsCount.${roomsCount}`),
          points: calculation.totalPoints,
        })}`,
      );
      lines.push(
        `${tCalc("equipmentAndInstallLabel")} ${formatLei(
          calculation.rooms * CALCULATOR_PRICES.standardRoomPrice,
        )}`,
      );
      if (calculation.kitchenIntakePoint) {
        lines.push(
          `${tCalc("kitchenIntakeLabel")} ${formatLei(calculation.kitchenCost)}`,
        );
      }
    } else if (
      calculation.mode === "withMoldTreatment" &&
      calculation.rooms !== null
    ) {
      lines.push(
        `${tCalc("naturalVentilationLabel")} ${tCalc("roomsAndPoints", {
          roomsLabel: tOptions(`roomsCount.${roomsCount}`),
          points: calculation.totalPoints,
        })} (${formatLei(calculation.ventilationCost)})`,
      );
      lines.push(
        `${tCalc("moldTreatmentLabel", {
          roomsLabel: tOptions(`roomsCount.${moldTreatmentRooms}`),
        })} ${formatLei(calculation.moldTreatmentCost)}`,
      );
    } else if (
      calculation.mode === "withOzonation" &&
      calculation.rooms !== null
    ) {
      lines.push(
        tCalc("ozonationNotice", {
          amount: formatLei(calculation.ventilationCost),
        }),
      );
    } else if (calculation.mode === "inspectionOnly") {
      lines.push(
        tCalc("inspectionOnlyNotice", {
          price: formatLei(CALCULATOR_PRICES.inspectionOnlyPrice),
        }),
      );
    } else {
      lines.push(tCalc("customQuoteNotice"));
    }

    if (calculation.transportKind === "chisinau") {
      lines.push(
        `${tCalc("transportChisinauLabel")} ${tCalc("transportChisinauValue", {
          price: formatLei(0),
        })}`,
      );
    } else if (calculation.transportFee !== null) {
      lines.push(
        `${tCalc("transportFeeLabel", {
          locality: localityLabel,
        })} ${formatLei(calculation.transportFee)}`,
      );
    } else {
      lines.push(
        `${tCalc("transportOtherLabel")} ${tCalc("transportOtherValue")}`,
      );
    }

    if (calculation.totalPreliminaryCost !== null) {
      lines.push(
        `${tCalc("totalPreliminaryLabel")} ${formatLei(
          calculation.totalPreliminaryCost,
        )}`,
      );
    }

    return lines.join(" | ");
  }, [
    calculation,
    formatLei,
    localityLabel,
    localityRaion,
    moldTreatmentRooms,
    roomsCount,
    service,
    t,
    tCalc,
    tOptions,
  ]);

  const transportIsFree = calculation.transportKind === "chisinau";
  const transportHasFee =
    !transportIsFree && calculation.transportFee !== null;
  const transportTitle = transportIsFree
    ? tCalc("transportChisinauLabel")
    : transportHasFee
      ? tCalc("transportFeeLabel", {
          locality: localityLabel,
        })
      : tCalc("transportOtherLabel");
  const transportValueText = transportIsFree
    ? tCalc("transportChisinauValue", { price: formatLei(0) })
    : transportHasFee
      ? formatLei(calculation.transportFee ?? 0)
      : tCalc("transportOtherValue");

  /**
   * Preview-panel accents that cannot be shared between its two variants — the
   * panel is one markup tree, so the few spots that used to hard-code green
   * choose per variant here (see the comment at the panel itself):
   *
   * `default` (service pages) — the accents stay green on the navy surface,
   * as they always have.
   *
   * `calculator` (Home `#contacte`) — the panel turns the vivid schema green,
   * so the same accents flip: green-on-green disappears (rules, the free-transport value,
   * the table highlight), and a bare blue glyph is near-invisible on green, so
   * the inline icons go white. Blue is kept for what can carry it: the header
   * chip's glyph (on a white chip) and the submit button's fill.
   */
  const isCalculatorVariant = variant === "calculator";
  /** Left rule of the total line and of the notice blocks. */
  const panelAccentRule = isCalculatorVariant
    ? "border-white/40"
    : "border-emerald-500";
  /** The free-transport value and the inline Info / Sparkles glyphs. */
  const panelAccentText = isCalculatorVariant
    ? "text-white"
    : "text-emerald-500";
  /** The highlighted row in the 1–5 rooms reference table. */
  const panelRowHighlight = isCalculatorVariant
    ? "bg-white/15"
    : "bg-emerald-500/20";
  /**
   * The quiet copy on both coloured panels — the site's grey
   * (`text-muted-foreground`) is unreadable on them, so the quiet labels,
   * transport rows, reference table and disclaimer go white instead. On navy
   * they stay secondary at 72% opacity; on the vivid green card they switch
   * to full white, semibold — the same copy treatment the TECH schema card
   * and its point cards carry. Written as plain Tailwind here (no CSS
   * utility re-points the token any more).
   */
  const panelMuted = isCalculatorVariant
    ? "text-white font-semibold"
    : "text-white/72";

  const toggleProblemRoom = (room: ProblemRoom, checked: boolean) => {
    setProblemRooms((prev) =>
      checked
        ? prev.includes(room)
          ? prev
          : [...prev, room]
        : prev.filter((item) => item !== room),
    );
  };

  const resolveErrorText = (field: string, code?: string) => {
    if (!code) return undefined;
    switch (code) {
      case "nameRequired":
        return tValidation("nameRequired");
      case "phoneRequired":
        return tValidation("phoneRequired");
      case "phoneInvalid":
        return tValidation("phoneInvalid");
      case "emailInvalid":
        return tValidation("emailInvalid");
      case "localityRequired":
        return tValidation("localityRequired");
      case "consentRequired":
        return tValidation("consentRequired");
      case "photosMaxExceeded":
        return tValidation("photosMaxExceeded");
      case "photosInvalid":
        return tValidation("photosInvalid");
      case "videoMaxExceeded":
        return tValidation("videoMaxExceeded");
      case "videoInvalid":
        return tValidation("videoInvalid");
      default:
        return field ? tValidation("generic") : undefined;
    }
  };

  // §15: Post-submit message shown ONLY when submission succeeds without any upload or server error.
  if (done) {
    return (
      <div
        className="mx-auto max-w-3xl py-10 text-center sm:py-14"
        role="status"
        aria-live="polite"
      >
        <span className="bg-emerald-500 mx-auto flex size-14 items-center justify-center rounded-full text-white">
          <CheckCircle2 className="size-8" strokeWidth={1.75} />
        </span>
        <h3 className="text-brand-blue-dark mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          {tSuccess("title")}
        </h3>
        <p className="text-brand-blue-dark/85 mx-auto mt-2 max-w-xl text-base leading-relaxed font-medium sm:text-lg">
          {tSuccess("description")}
        </p>
      </div>
    );
  }

  const hasAnyError =
    Object.keys(errors).length > 0 ||
    Boolean(photoUploadError) ||
    Boolean(videoUploadError);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      {/* Left column — Request Form (§11) */}
      {/*
        Card in one of two variants, chosen by the owning section:

        `default` (service pages) — a plain white card, matching the site's
        other white cards (stats cards, testimonials, the pricing note):
        `border-border` hairline, `shadow-sm` on the surface's own background.

        `calculator` (the Home `#contacte` section) — the same card in the FAQ
        section's surface tone (`bg-surface-section`). On Home the surrounding
        section is white, so the tint is what lifts the form off it; on service
        pages the section itself is surface-toned and the white card is what
        provides the contrast. The variant also steps the field labels up
        15px → 16px, and pairs with the green preview panel on the right.

        Label sizing targets `FieldLabel` / `FieldLegend` by their `data-slot`
        hooks rather than every `<label>`, so the radio/checkbox option rows
        keep their smaller sizes.
      */}
      <form
        id={formId}
        noValidate
        className={cn(
          "flex flex-col gap-7 rounded-xl border border-border p-6 shadow-sm sm:p-8 lg:col-span-7",
          variant === "calculator"
            ? "bg-surface-section [&_label[data-slot=field-label]]:text-[16px] [&_legend[data-slot=field-legend]]:text-[16px]"
            : "bg-white",
        )}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);

          // §15: Do not submit or show success if a file upload error is active
          if (photoUploadError || videoUploadError) {
            return;
          }

          startTransition(async () => {
            try {
              const result = await submitLead({
                name,
                phone,
                email,
                locality: getLocalityLabel(locality, locale),
                localityRaion: getLocalityRaion(locality, locale) || undefined,
                address,
                premise,
                problem,
                service,
                roomsCount,
                moldTreatmentRooms:
                  service === "ventilatie-pasiva-mucegai" && moldTreatmentRooms
                    ? moldTreatmentRooms
                    : undefined,
                kitchenIntakePoint: isNaturalVentService
                  ? kitchenIntakePoint
                  : false,
                problemRooms,
                photos: photos.map((file) => ({
                  name: file.name,
                  size: file.size,
                  type: file.type,
                })),
                videos: videos.map((file) => ({
                  name: file.name,
                  size: file.size,
                  type: file.type,
                })),
                message,
                consent,
                preliminaryCalculation: calculation,
                calculationSummaryText,
                requireFullFields: true,
                company: String(formData.get("company") ?? ""),
                source,
              });

              if (result.status === "success") {
                setErrors({});
                setDone(true);
              } else {
                setErrors(result.errors);
              }
            } catch {
              setErrors({ form: "generic" });
            }
          });
        }}
      >
        {showHeader ? (
          <div className="border-b border-border pb-4">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("full.title")}
            </h3>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">
              {t("full.description")}
            </p>
          </div>
        ) : null}

        {hasAnyError ? (
          <div
            role="alert"
            className="border-l-2 border-destructive bg-destructive/[0.04] flex items-start gap-2.5 py-2.5 pr-2 pl-3 font-ui text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>
              {photoUploadError ??
                videoUploadError ??
                resolveErrorText("form", Object.values(errors)[0]) ??
                tValidation("generic")}
            </span>
          </div>
        ) : null}

        <FieldGroup>
          {/* 1. Contact & Location Fields */}
          <FieldSet>
            <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
              <Field data-invalid={Boolean(errors.name) || undefined}>
                <FieldLabel htmlFor={`${formId}-name`}>
                  {t("fields.name")} <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id={`${formId}-name`}
                  name="name"
                  value={name}
                  placeholder={t("fields.namePlaceholder")}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.name;
                        return next;
                      });
                    }
                  }}
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name) || undefined}
                />
                <FieldError>
                  {resolveErrorText("name", errors.name)}
                </FieldError>
              </Field>

              <Field data-invalid={Boolean(errors.phone) || undefined}>
                <FieldLabel htmlFor={`${formId}-phone`}>
                  {t("fields.phone")}{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.phone;
                        return next;
                      });
                    }
                  }}
                  autoComplete="tel"
                  placeholder="+373 60 000 000"
                  required
                  aria-invalid={Boolean(errors.phone) || undefined}
                />
                <FieldError>
                  {resolveErrorText("phone", errors.phone)}
                </FieldError>
              </Field>
            </div>

            <Field data-invalid={Boolean(errors.email) || undefined}>
              <FieldLabel htmlFor={`${formId}-email`}>
                {t("fields.email")}
              </FieldLabel>
              <Input
                id={`${formId}-email`}
                name="email"
                type="email"
                value={email}
                placeholder={t("fields.emailPlaceholder")}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.email;
                      return next;
                    });
                  }
                }}
                autoComplete="email"
                aria-invalid={Boolean(errors.email) || undefined}
              />
              <FieldError>{resolveErrorText("email", errors.email)}</FieldError>
            </Field>

            <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
              <Field data-invalid={Boolean(errors.locality) || undefined}>
                <FieldLabel htmlFor={`${formId}-locality`}>
                  {t("fields.locality")}{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <LocalityCombobox
                  id={`${formId}-locality`}
                  value={locality}
                  invalid={Boolean(errors.locality)}
                  onChange={(val) => {
                    setLocality(val);
                    if (errors.locality) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.locality;
                        return next;
                      });
                    }
                  }}
                />
                <FieldError>
                  {resolveErrorText("locality", errors.locality)}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor={`${formId}-address`}>
                  {t("fields.address")}
                </FieldLabel>
                <Input
                  id={`${formId}-address`}
                  name="address"
                  value={address}
                  placeholder={t("fields.addressPlaceholder")}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                />
              </Field>
            </div>
          </FieldSet>

          {/* 2. Premise, Problem, Service & Room Count (§11 & §12) */}
          <FieldSet>
            <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor={`${formId}-premise`}>
                  {t("fields.premise")}
                </FieldLabel>
                <Select
                  name="premise"
                  value={premise}
                  onValueChange={(val) => {
                    if (val) setPremise(val as FormPremise);
                  }}
                >
                  <SelectTrigger id={`${formId}-premise`} className="w-full rounded-none border-0 border-b border-foreground/35 bg-transparent px-0 font-ui text-[15px] shadow-none transition-colors outline-none hover:border-foreground focus-visible:border-brand-blue focus-visible:ring-0 data-placeholder:text-muted-foreground data-[size=default]:h-11 aria-invalid:border-destructive">
                    <SelectValue placeholder={t("fields.premisePlaceholder")}>
                      {premise ? tOptions(`premise.${premise}`) : undefined}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {FORM_PREMISES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {tOptions(`premise.${option}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor={`${formId}-problem`}>
                  {t("fields.problem")}
                </FieldLabel>
                <Select
                  name="problem"
                  value={problem}
                  onValueChange={(val) => {
                    if (val) setProblem(val as FormProblem);
                  }}
                >
                  <SelectTrigger id={`${formId}-problem`} className="w-full rounded-none border-0 border-b border-foreground/35 bg-transparent px-0 font-ui text-[15px] shadow-none transition-colors outline-none hover:border-foreground focus-visible:border-brand-blue focus-visible:ring-0 data-placeholder:text-muted-foreground data-[size=default]:h-11 aria-invalid:border-destructive">
                    <SelectValue placeholder={t("fields.problemPlaceholder")}>
                      {problem ? tOptions(`problem.${problem}`) : undefined}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {FORM_PROBLEMS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {tOptions(`problem.${option}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor={`${formId}-service`}>
                {t("fields.service")}
              </FieldLabel>
              <Select
                name="service"
                value={service}
                onValueChange={(val) => {
                  if (!val) return;
                  const next = val as FormService;
                  setService(next);
                  if (
                    next === "ventilatie-pasiva-mucegai" &&
                    moldTreatmentRooms === "" &&
                    roomsCount !== "" &&
                    roomsCount !== "moreThan5"
                  ) {
                    setMoldTreatmentRooms(roomsCount);
                  }
                }}
              >
                <SelectTrigger id={`${formId}-service`} className="w-full rounded-none border-0 border-b border-foreground/35 bg-transparent px-0 font-ui text-[15px] shadow-none transition-colors outline-none hover:border-foreground focus-visible:border-brand-blue focus-visible:ring-0 data-placeholder:text-muted-foreground data-[size=default]:h-11 aria-invalid:border-destructive">
                  <SelectValue placeholder={t("fields.servicePlaceholder")}>
                    {service
                      ? tOptions(`service.${service}`, {
                          price: formatLei(
                            CALCULATOR_PRICES.inspectionOnlyPrice,
                          ),
                        })
                      : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {FORM_SERVICES.map((option) => (
                    <SelectItem key={option} value={option}>
                      {tOptions(`service.${option}`, {
                        price: formatLei(
                          CALCULATOR_PRICES.inspectionOnlyPrice,
                        ),
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/*
              Number of rooms where work is needed (§11)

              Option rows in this group and the two below it (mold-treatment
              rooms, problem rooms) sit in the full text colour rather than the
              muted grey used for secondary copy: they are the controls
              themselves, and the selected state still reads through font
              weight plus the radio underline or checkbox tick.
            */}
            <Field>
              <FieldLabel>{t("fields.roomsCount")}</FieldLabel>
              <RadioGroup
                name="roomsCount"
                value={roomsCount}
                onValueChange={(val) => {
                  const nextRoomCount = val as RoomCountOption | "";
                  setRoomsCount(nextRoomCount);
                  if (nextRoomCount !== "" && nextRoomCount !== "moreThan5") {
                    setMoldTreatmentRooms(nextRoomCount);
                  }
                }}
                className="flex flex-wrap gap-x-6 gap-y-1"
              >
                {ROOM_COUNTS.map((option) => {
                  const itemId = `${formId}-rooms-${option}`;
                  const isSelected = roomsCount === option;
                  return (
                    <label
                      key={option}
                      htmlFor={itemId}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 border-b-2 px-0.5 py-1.5 font-ui text-sm text-foreground transition-colors",
                        isSelected
                          ? "border-brand-blue font-medium"
                          : "border-transparent",
                      )}
                    >
                      <RadioGroupItem id={itemId} value={option} />
                      <span>{tOptions(`roomsCount.${option}`)}</span>
                    </label>
                  );
                })}
              </RadioGroup>
            </Field>

            {/* Conditional: Separate number of rooms for mold treatment (§12) */}
            {service === "ventilatie-pasiva-mucegai" && isStandardRoomRange ? (
              <Field className="border-l-2 border-emerald-500 pl-4">
                <FieldLabel>{t("fields.moldTreatmentRooms")}</FieldLabel>
                <RadioGroup
                  name="moldTreatmentRooms"
                  value={moldTreatmentRooms}
                  onValueChange={(val) =>
                    setMoldTreatmentRooms(val as MoldRoomCountOption)
                  }
                  className="mt-1 flex flex-wrap gap-x-5 gap-y-1"
                >
                  {MOLD_ROOM_COUNTS.map((option) => {
                    const itemId = `${formId}-mold-rooms-${option}`;
                    const isSelected = moldTreatmentRooms === option;
                    return (
                      <label
                        key={option}
                        htmlFor={itemId}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 border-b-2 px-0.5 py-1 font-ui text-[13px] text-foreground transition-colors",
                          isSelected
                            ? "border-emerald-500 font-medium"
                            : "border-transparent",
                        )}
                      >
                        <RadioGroupItem id={itemId} value={option} />
                        <span>{tOptions(`roomsCount.${option}`)}</span>
                      </label>
                    );
                  })}
                </RadioGroup>
                <FieldDescription className="mt-1">
                  {t("fields.moldTreatmentRoomsHint", {
                    price: formatLei(
                      CALCULATOR_PRICES.moldTreatmentPerRoomPrice,
                    ),
                  })}
                </FieldDescription>
              </Field>
            ) : null}

            {/* Conditional: Optional separate intake point in kitchen with existing exhaust — 1.500 lei (§12) */}
            {isNaturalVentService && isStandardRoomRange ? (
              <Field orientation="horizontal" className="py-1">
                <Checkbox
                  id={`${formId}-kitchen-intake`}
                  checked={kitchenIntakePoint}
                  onCheckedChange={(checked) =>
                    setKitchenIntakePoint(Boolean(checked))
                  }
                />
                <FieldContent>
                  <label
                    htmlFor={`${formId}-kitchen-intake`}
                    className="cursor-pointer font-ui text-sm leading-snug font-normal text-foreground"
                  >
                    {t("fields.kitchenIntakePoint", {
                      price: formatLei(CALCULATOR_PRICES.kitchenIntakePrice),
                    })}
                  </label>
                </FieldContent>
              </Field>
            ) : null}

            {/* In which rooms does the problem exist? (Multi-select, §11) */}
            <FieldSet>
              <FieldLegend variant="label">
                {t("fields.problemRooms")}
              </FieldLegend>
              <div
                data-slot="checkbox-group"
                className="divide-y divide-border border-y border-border"
              >
                {PROBLEM_ROOMS.map((room) => {
                  const roomId = `${formId}-problem-room-${room}`;
                  const isChecked = problemRooms.includes(room);
                  return (
                    <label
                      key={room}
                      htmlFor={roomId}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 px-1 py-2.5 font-ui text-sm text-foreground transition-colors hover:bg-surface/60",
                        isChecked ? "font-medium" : "font-normal",
                      )}
                    >
                      <Checkbox
                        id={roomId}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          toggleProblemRoom(room, Boolean(checked))
                        }
                      />
                      <span>{tOptions(`problemRooms.${room}`)}</span>
                    </label>
                  );
                })}
              </div>
            </FieldSet>
          </FieldSet>

          {/* 3. Photos (up to 10) & Video Upload (Aceternity FileUpload, §11) */}
          <FieldSet>
            <Field data-invalid={Boolean(photoUploadError || errors.photos) || undefined}>
              <FieldLabel>{t("fields.photos")}</FieldLabel>
              <FileUpload
                variant="photo"
                accept="image/jpeg,image/png,image/webp,image/heic,image/*"
                multiple
                maxFiles={MAX_PHOTOS}
                maxFileSizeMB={MAX_PHOTO_SIZE_MB}
                files={photos}
                onChange={setPhotos}
                onError={setPhotoUploadError}
                labels={{
                  title: t("photos.add"),
                  subtitle: t("photos.subtitle"),
                  dropHint: t("photos.dropHint"),
                  constraintsHint: t("photos.hint"),
                  removeLabel: t("photos.remove"),
                  previewLabel: t("photos.preview"),
                  closeLabel: tCommon("close"),
                  countBadge:
                    photos.length > 0
                      ? `${photos.length} / ${MAX_PHOTOS}`
                      : undefined,
                }}
                errorMessages={{
                  maxFiles: tValidation("photosMaxExceeded"),
                  maxSize: tValidation("photosInvalid"),
                  invalidType: tValidation("photosInvalid"),
                }}
              />
              <FieldError>
                {photoUploadError ?? resolveErrorText("photos", errors.photos)}
              </FieldError>
            </Field>

            <Field data-invalid={Boolean(videoUploadError || errors.videos) || undefined}>
              <FieldLabel>{t("fields.video")}</FieldLabel>
              <FileUpload
                variant="video"
                accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
                multiple
                maxFiles={MAX_VIDEO_FILES}
                maxFileSizeMB={MAX_VIDEO_SIZE_MB}
                files={videos}
                onChange={setVideos}
                onError={setVideoUploadError}
                labels={{
                  title: t("video.add"),
                  subtitle: t("video.subtitle"),
                  dropHint: t("video.dropHint"),
                  constraintsHint: t("video.hint"),
                  removeLabel: t("video.remove"),
                  countBadge:
                    videos.length > 0
                      ? `${videos.length} / ${MAX_VIDEO_FILES}`
                      : undefined,
                }}
                errorMessages={{
                  maxFiles: tValidation("videoMaxExceeded"),
                  maxSize: tValidation("videoInvalid"),
                  invalidType: tValidation("videoInvalid"),
                }}
              />
              <FieldError>
                {videoUploadError ?? resolveErrorText("videos", errors.videos)}
              </FieldError>
            </Field>
          </FieldSet>

          {/* 4. Message & Personal Data Consent (§11) */}
          <FieldSet>
            <Field>
              <FieldLabel htmlFor={`${formId}-message`}>
                {t("fields.message")}
              </FieldLabel>
              <Textarea
                id={`${formId}-message`}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("fields.messagePlaceholder")}
                rows={4}
              />
            </Field>

            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px]">
              <label htmlFor={`${formId}-company`}>Company</label>
              <input
                id={`${formId}-company`}
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <Field
              orientation="horizontal"
              data-invalid={Boolean(errors.consent) || undefined}
            >
              <Checkbox
                id={`${formId}-consent`}
                checked={consent}
                onCheckedChange={(checked) => {
                  setConsent(Boolean(checked));
                  if (errors.consent && checked) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.consent;
                      return next;
                    });
                  }
                }}
                required
                aria-invalid={Boolean(errors.consent) || undefined}
              />
              <FieldContent>
                <div className="font-ui text-sm leading-snug text-muted-foreground">
                  <label htmlFor={`${formId}-consent`} className="cursor-pointer">
                    {t("fields.consentPrefix")}
                  </label>
                  <Dialog>
                    <DialogTrigger
                      render={
                        <button
                          type="button"
                          className="text-brand-blue hover:text-brand-blue-dark font-medium underline underline-offset-2"
                        />
                      }
                    >
                      {t("fields.consentLink")}
                    </DialogTrigger>
                    <DialogContent closeLabel={tCommon("close")}>
                      <DialogHeader>
                        <DialogTitle>{tPrivacy("title")}</DialogTitle>
                        <DialogDescription className="pt-2 text-base">
                          {tPrivacy("body")}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose
                          render={
                            <Button
                              type="button"
                              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                            />
                          }
                        >
                          {tPrivacy("accept")}
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <span>. *</span>
                </div>
                <FieldError>
                  {resolveErrorText("consent", errors.consent)}
                </FieldError>
              </FieldContent>
            </Field>
          </FieldSet>
          {/*
            The form has no submit button of its own: the single „Trimite
            solicitarea cu acest calcul" CTA lives in the preview panel on the
            right (`form={formId}` association), per the calculator-only
            submission choice — on service pages the navy panel carries the
            same action. The form's last visible element is the consent field.
          */}
        </FieldGroup>
      </form>

      {/* Right column — Preliminary Cost Calculator (§12, §13, §14) */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-5">
        {/*
          Stacked order (below `lg`) is the source order itself: the transport
          block comes first so the visitor reads the transport conditions before
          the cost preview, and the tab order follows the same path. `lg:order-2`
          is the only reordering, pushing the transport card below the preview
          panel once the two-column layout kicks in (the preview panel keeps its
          default `order: 0`).
        */}
        {/* Transport & Travel Conditions Block (§13) */}
        <div className="bg-brand-blue-dark rounded-md border border-border p-6 text-white shadow-sm lg:order-2">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500 flex size-10 shrink-0 items-center justify-center rounded-[6px] text-white">
              <Truck className="size-5" />
            </span>
            <h4 className="text-base font-bold tracking-tight">
              {tTransport("title")}
            </h4>
          </div>
          <p className="mt-3 text-base font-medium leading-relaxed text-white/90">
            {tTransport("description")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-white/15 pt-3 font-ui text-sm">
            <span className="bg-emerald-500/20 text-emerald-100 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-readout font-medium tabular-nums">
              <MapPin className="size-3.5" />
              {transportIsFree
                ? tCalc("transportChisinauSupplement", {
                    price: formatLei(0),
                  })
                : transportHasFee
                  ? tCalc("transportChisinauSupplement", {
                      price: formatLei(calculation.transportFee ?? 0),
                    })
                  : tCalc("transportOtherValue")}
            </span>
          </div>
        </div>

        {/*
          The preview panel renders in one of two variants, chosen by the
          section that owns the form:

          `default` (service pages) — the dark card, matching the site's other
          dark blue cards (the Services CTA card, the technology block, the
          transport card that follows it at `lg`): `bg-brand-blue-dark` with
          white copy, the `border-white/85` edge and the same `shadow-sm` →
          `hover:shadow-lg` treatment.

          `calculator` (the Home `#contacte` section) — the green card:
          `bg-emerald-500` with white copy and a `border-white/15` edge — the
          exact colours of the TECH schema card (`tech-section.tsx`), whose
          silhouette (`rounded-lg`, `shadow-lg shadow-black/20` →
          `hover:shadow-xl`) and white semibold copy it also follows, so the
          two green cards read as one family.

          One markup serves both: the root sets the foreground colour and every
          readout child inherits it, while the handful of accents that cannot
          be shared — the total and notice rules, the free-transport value, the
          inline Info / Sparkles glyphs, the reference-table highlight, the
          header chip and the submit button — pick their classes per variant
          from the `panel*` helpers above the return, or with an inline ternary
          where they are single elements.

          The panel is set in the readout face (Exo 2, `--font-readout`): it is
          the one block on the site that is *computed output* rather than copy,
          and it sits next to a form set in the UI face, so the change of face is
          what marks the boundary between "fill this in" and "what it will cost".
          Sizes otherwise match the rest of the form.

          Each surface is set with Tailwind only — no CSS utility re-points the
          palette tokens inside the panel: the internal hairlines are written
          directly (`border-white/15`, `divide-white/15`, the same weight the
          dark cards elsewhere use inside) and the muted readout copy goes
          through the `panelMuted` helper above the return (white/72 on navy,
          full white, semibold on the green). The card's own edge is set
          explicitly rather than through `border-border` (the palette's
          near-white blue-grey): the dark variant matches the near-white
          outline of the transport card, which drops below it at `lg`, the green
          one wears the coloured cards' `border-white/15`.
        */}
        <div
          className={cn(
            "border p-6 font-readout transition-shadow duration-300 sm:p-7",
            isCalculatorVariant
              ? "rounded-lg bg-emerald-500 border-white/15 text-white shadow-lg shadow-black/20 hover:shadow-xl"
              : "rounded-md bg-brand-blue-dark border-white/85 text-white shadow-sm hover:shadow-lg",
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-[6px] shadow-xs",
                isCalculatorVariant
                  ? "bg-white text-brand-blue"
                  : "bg-emerald-500 text-white",
              )}
            >
              <Calculator className="size-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold">{tCalc("title")}</h3>
              <p className={cn("text-sm font-medium", panelMuted)}>
                {service
                  ? tOptions(`service.${service}`, {
                      price: formatLei(
                        CALCULATOR_PRICES.inspectionOnlyPrice,
                      ),
                    })
                  : t("fields.servicePlaceholder")}
              </p>
            </div>
          </div>

          {/* Dynamic Calculation Body (§12 & §14) */}
          <div className="mt-6 flex flex-col gap-4 border-t border-white/15 pt-5">
            {/* Neutral state — required selections not made yet */}
            {needsSelection ? (
              <>
                <div className="flex items-start gap-3 border-l-2 border-white/15 py-0.5 pl-3">
                  <Info className={cn("mt-0.5 size-5 shrink-0", panelMuted)} />
                  <p className={cn(
                    "text-[15px] font-medium leading-snug",
                    panelMuted,
                  )}>
                    {tCalc("selectPrompt")}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-4 border-t border-white/15 pt-3 text-[15px]">
                  <span className={panelMuted}>{transportTitle}</span>
                  <span
                    className={cn(
                      "text-right font-semibold",
                      transportIsFree
                        ? panelAccentText
                        : transportHasFee
                          ? undefined
                          : "max-w-[16rem] text-sm leading-snug",
                    )}
                  >
                    {transportValueText}
                  </span>
                </div>
              </>
            ) : null}

            {/* Case 1 & 2: Standard Natural Ventilation or Natural Ventilation + Mold Treatment */}
            {(calculation.mode === "standard" ||
              calculation.mode === "withMoldTreatment") &&
            calculation.rooms !== null ? (
              <>
                <dl className="flex flex-col gap-3 text-[15px]">
                  <div className="flex items-start justify-between gap-4">
                    <dt className={panelMuted}>
                      {tCalc("naturalVentilationLabel")}
                    </dt>
                    <dd className="text-right font-semibold">
                      {tCalc("roomsAndPoints", {
                        roomsLabel: tOptions(`roomsCount.${roomsCount}`),
                        points: calculation.totalPoints,
                      })}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <dt className={panelMuted}>
                      {tCalc("equipmentAndInstallLabel")}
                    </dt>
                    <dd className="text-right font-semibold">
                      {formatLei(
                        calculation.rooms *
                          CALCULATOR_PRICES.standardRoomPrice,
                      )}
                      .
                    </dd>
                  </div>

                  {calculation.kitchenIntakePoint ? (
                    <div className="flex items-start justify-between gap-4">
                      <dt className={panelMuted}>
                        {tCalc("kitchenIntakeLabel")}
                      </dt>
                      <dd className="text-right font-semibold">
                        {formatLei(calculation.kitchenCost)}.
                      </dd>
                    </div>
                  ) : null}

                  {calculation.mode === "withMoldTreatment" ? (
                    <div className="flex items-start justify-between gap-4">
                      <dt className={panelMuted}>
                        {tCalc("moldTreatmentLabel", {
                          roomsLabel: tOptions(
                            `roomsCount.${moldTreatmentRooms}`,
                          ),
                        })}
                      </dt>
                      <dd className="text-right font-semibold">
                        {formatLei(calculation.moldTreatmentCost)}.
                      </dd>
                    </div>
                  ) : null}

                  {/* Transport line (§13 & §14) */}
                  <div className="flex items-start justify-between gap-4 border-t border-white/15 pt-3">
                    <dt className={panelMuted}>{transportTitle}</dt>
                    <dd
                      className={cn(
                        "text-right font-semibold",
                        transportIsFree
                          ? panelAccentText
                          : transportHasFee
                            ? undefined
                            : "max-w-[16rem] text-sm leading-snug",
                      )}
                    >
                      {transportValueText}
                    </dd>
                  </div>
                </dl>

                {/* Preliminary Total (§14) */}
                {calculation.totalPreliminaryCost !== null ? (
                  <div
                    className={cn(
                      "flex items-baseline justify-between gap-4 border-t-2 pt-3",
                      panelAccentRule,
                    )}
                  >
                    <span className="text-[15px] font-semibold">
                      {tCalc("totalPreliminaryLabel")}
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
                      {formatLei(calculation.totalPreliminaryCost)}.
                    </span>
                  </div>
                ) : null}

                {/* Standard Natural Ventilation Explanation (§12) */}
                <p className={cn(
                  "border-l-2 border-white/15 pl-3 text-sm leading-relaxed",
                  panelMuted,
                )}>
                  {tCalc("standardExplanation")}
                </p>
              </>
            ) : null}

            {/* Case 3: Natural Ventilation + Ozonation (§12: do NOT present as total package cost) */}
            {calculation.mode === "withOzonation" &&
            calculation.rooms !== null ? (
              <>
                <div
                  className={cn("border-l-2 py-0.5 pl-3", panelAccentRule)}
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles
                      className={cn("mt-0.5 size-5 shrink-0", panelAccentText)}
                    />
                    <div>
                      <p className="text-base font-bold leading-snug">
                        {tCalc("ozonationNotice", {
                          amount: formatLei(calculation.ventilationCost),
                        })}
                      </p>
                      <p className={cn("mt-1 text-sm", panelMuted)}>
                        {tCalc("roomsAndPoints", {
                          roomsLabel: tOptions(`roomsCount.${roomsCount}`),
                          points: calculation.totalPoints,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transport line (§13) */}
                <div className="flex items-start justify-between gap-4 border-t border-white/15 pt-3 text-[15px]">
                  <span className={panelMuted}>{transportTitle}</span>
                  <span
                    className={cn(
                      "text-right font-semibold",
                      transportIsFree
                        ? panelAccentText
                        : transportHasFee
                          ? undefined
                          : "max-w-[16rem] text-sm leading-snug",
                    )}
                  >
                    {transportValueText}
                  </span>
                </div>

                <p className={cn(
                  "border-l-2 border-white/15 pl-3 text-sm leading-relaxed",
                  panelMuted,
                )}>
                  {tCalc("standardExplanation")}
                </p>
              </>
            ) : null}

            {/* Case 4: Exclusive Inspection Visit (§12 + COMPLETARE §6) */}
            {calculation.mode === "inspectionOnly" ? (
              <>
                <div
                  className={cn("border-l-2 py-0.5 pl-3", panelAccentRule)}
                >
                  <p className="text-lg font-extrabold">
                    {tCalc("inspectionOnlyNotice", {
                      price: formatLei(CALCULATOR_PRICES.inspectionOnlyPrice),
                    })}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-4 border-t border-white/15 pt-3 text-[15px]">
                  <span className={panelMuted}>{transportTitle}</span>
                  <span
                    className={cn(
                      "text-right font-semibold",
                      transportIsFree
                        ? panelAccentText
                        : transportHasFee
                          ? undefined
                          : "max-w-[16rem] text-sm leading-snug",
                    )}
                  >
                    {transportValueText}
                  </span>
                </div>

                {/* Inspection total (§6: 400 + transport; hidden when route unknown — §3) */}
                {calculation.totalPreliminaryCost !== null ? (
                  <div
                    className={cn(
                      "flex items-baseline justify-between gap-4 border-t-2 pt-3",
                      panelAccentRule,
                    )}
                  >
                    <span className="text-[15px] font-semibold">
                      {tCalc("totalPreliminaryLabel")}
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
                      {formatLei(calculation.totalPreliminaryCost)}.
                    </span>
                  </div>
                ) : null}
              </>
            ) : null}

            {/* Case 5: Recuperators, drilling, large rooms (>5), non-standard works (§12) */}
            {calculation.mode === "customQuote" && !needsSelection ? (
              <>
                <div
                  className={cn(
                    "flex items-start gap-3 border-l-2 py-0.5 pl-3",
                    panelAccentRule,
                  )}
                >
                  <Info
                    className={cn("mt-0.5 size-5 shrink-0", panelAccentText)}
                  />
                  <p className="text-base font-bold leading-snug">
                    {tCalc("customQuoteNotice")}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-4 border-t border-white/15 pt-3 text-[15px]">
                  <span className={panelMuted}>{transportTitle}</span>
                  <span
                    className={cn(
                      "text-right font-semibold",
                      transportIsFree
                        ? panelAccentText
                        : transportHasFee
                          ? undefined
                          : "max-w-[16rem] text-sm leading-snug",
                    )}
                  >
                    {transportValueText}
                  </span>
                </div>
              </>
            ) : null}

            {/* Reference 1–5 rooms table for standard natural ventilation (§12) */}
            <div className="border-t border-white/15 pt-3">
              <p className={cn(
                "text-sm font-semibold uppercase tracking-[0.08em]",
                panelMuted,
              )}>
                {tCalc("referenceTableTitle")}
              </p>
              <ul className="mt-2 flex flex-col divide-y divide-white/15 text-sm">
                {STANDARD_VENTILATION_TABLE.map((row) => {
                  const rowRoomKey = String(row.rooms) as MoldRoomCountOption;
                  const isCurrentRow =
                    isNaturalVentService && roomsCount === rowRoomKey;
                  return (
                    <li
                      key={row.rooms}
                      className={cn(
                        "flex items-center justify-between py-1.5 transition-colors",
                        isCurrentRow
                          ? cn(panelRowHighlight, "font-semibold")
                          : panelMuted,
                      )}
                    >
                      <span>
                        {tOptions(`roomsCount.${rowRoomKey}`)} — {row.points}{" "}
                        {locale === "ru"
                          ? "точки"
                          : locale === "en"
                            ? "points"
                            : "puncte"}
                      </span>
                      <span className="tabular-nums">
                        {formatLei(row.cost)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Client Calculation Block Disclaimer (§14) */}
            <p className={cn("text-sm leading-relaxed", panelMuted)}>
              {tCalc("disclaimer")}
            </p>

            {/* Submit button inside the calculator block (§14) */}
            <Button
              type="submit"
              form={formId}
              size="lg"
              disabled={pending}
              className={cn(
                "mt-1 h-12 w-full gap-2 rounded-lg text-base font-semibold text-white",
                isCalculatorVariant
                  ? "bg-brand-blue hover:bg-brand-blue/90 focus-visible:border-white focus-visible:ring-white/40"
                  : "bg-emerald-500 hover:bg-emerald-500/90",
              )}
            >
              {pending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {pending
                ? t("full.submitting")
                : tCalc("submitWithCalculation")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
