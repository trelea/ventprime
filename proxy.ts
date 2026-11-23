import { withDevalonHeaders } from "@devalon.dev/credits/next";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { devalonCredit } from "@/lib/devalon";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const segment = request.nextUrl.pathname.split("/")[1];
  const locale =
    routing.locales.find((candidate) => candidate === segment) ??
    routing.defaultLocale;

  return withDevalonHeaders(response, { ...devalonCredit, locale });
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
