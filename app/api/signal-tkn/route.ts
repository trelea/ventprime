import { createDevalonSignalJwt } from "@devalon.dev/credits/signals";
import { devalonLogs } from "@/lib/devalon";
import { siteUrl } from "@/lib/site";

const PIXEL_ID = "1683475309995701";
const ALLOWED_ORIGIN = new URL(siteUrl).origin;
const WINDOW_MS = 60_000;
const MAX_PER_IP = 10;

/** Best-effort, per-instance rate limit. For real abuse control, also add a
 * rate-limit rule for this path at the edge (Cloudflare/Vercel). */
const hits = new Map<string, number[]>();

export async function GET(request: Request) {
  // Only same-origin browser calls may mint a token.
  const secFetchSite = request.headers.get("sec-fetch-site");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  if (
    secFetchSite !== "same-origin" &&
    origin !== ALLOWED_ORIGIN &&
    !referer?.startsWith(`${ALLOWED_ORIGIN}/`)
  ) {
    return new Response("forbidden", { status: 403 });
  }

  // The secret stays on the server. Never expose it through NEXT_PUBLIC_*.
  // Fail closed with a generic error — no config detail in the response.
  const secret = process.env.DEVALON_SIGNING_SECRET;
  if (!secret) {
    return new Response("Could not mint token", { status: 500 });
  }

  const now = Date.now();
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_IP) {
    return new Response("too many requests", { status: 429 });
  }
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      const fresh = times.filter((time) => now - time < WINDOW_MS);
      if (fresh.length) hits.set(key, fresh);
      else hits.delete(key);
    }
  }

  let jwt: string;
  try {
    jwt = await createDevalonSignalJwt({
      secret,
      pixel_id: PIXEL_ID,
      origin: siteUrl,
      logs: devalonLogs,
    });
  } catch {
    return new Response("Could not mint token", { status: 500 });
  }

  return new Response(jwt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store",
    },
  });
}
