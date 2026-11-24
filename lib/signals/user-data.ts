/**
 * Meta matching data helpers.
 *
 * The forms collect local Moldovan numbers (e.g. `079120120`), but Meta
 * expects international format. Devalon strips non-digits and leading zeros
 * before hashing, so a local number would otherwise be hashed without the
 * country code and never match a visitor's phone in Events Manager.
 */
const MOLDOVA_CODE = "373";

/** Convert a submitted phone to E.164 for hashed matching. */
export function normalizePhoneForMatching(phone: string): string {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (!digits) return trimmed;
  if (digits.startsWith(MOLDOVA_CODE) && digits.length >= 11) {
    return `+${digits}`;
  }
  if (digits.startsWith("0") && digits.length >= 9) {
    return `+${MOLDOVA_CODE}${digits.slice(1)}`;
  }
  if (trimmed.startsWith("+")) return `+${digits}`;

  return trimmed;
}
